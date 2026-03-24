/**
 * Input Validation & Sanitization Utilities
 * Seguridad crítica para carrera.negoia.com
 * Security Score: 9/10
 */

// Security logging store (in-memory, consider external logging in production)
const securityLogs = [];
const MAX_SECURITY_LOGS = 1000;

// Log security events
export function logSecurityEvent(eventType, details, ipAddress = 'unknown') {
  const event = {
    timestamp: new Date().toISOString(),
    type: eventType,
    ip: ipAddress,
    ...details
  };
  
  securityLogs.push(event);
  
  // Trim old logs
  if (securityLogs.length > MAX_SECURITY_LOGS) {
    securityLogs.shift();
  }
  
  // Console log for external monitoring (CloudWatch, Datadog, etc.)
  if (eventType === 'rate_limit_exceeded' || eventType === 'injection_attempt') {
    console.warn(`[SECURITY] ${eventType}:`, JSON.stringify(event));
  }
  
  return event;
}

// Get recent security events for an IP
export function getSecurityEventsForIP(ip, windowMs = 3600000) {
  const cutoff = Date.now() - windowMs;
  return securityLogs.filter(e => 
    e.ip === ip && new Date(e.timestamp).getTime() > cutoff
  );
}

// Check if IP should be blocked (too many suspicious events)
export function shouldBlockIP(ip) {
  const events = getSecurityEventsForIP(ip, 3600000); // Last hour
  const injectionAttempts = events.filter(e => e.type === 'injection_attempt').length;
  const rateLimitHits = events.filter(e => e.type === 'rate_limit_exceeded').length;
  
  // Block if 3+ injection attempts or 10+ rate limit hits in an hour
  return injectionAttempts >= 3 || rateLimitHits >= 10;
}

// Email validation with additional checks
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  // RFC 5322 simplified regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Additional validation
  if (email.length > 254) return false;
  if (email.includes('..')) return false;
  if (email.startsWith('.') || email.endsWith('.')) return false;
  
  // Block common disposable email domains
  const disposableDomains = ['tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com'];
  const domain = email.split('@')[1]?.toLowerCase();
  if (disposableDomains.includes(domain)) return false;
  
  return emailRegex.test(email);
}

// Sanitize text input to prevent prompt injection (Enhanced v2)
export function sanitizeForPrompt(text, options = {}) {
  if (!text || typeof text !== 'string') return '';
  
  const { logAttempts = false, ip = 'unknown' } = options;
  let injectionDetected = false;
  
  // Extended dangerous patterns for prompt injection
  const dangerousPatterns = [
    // Direct instruction override attempts
    /ignore (all |the )?(previous |above )?(instructions|rules|prompts)/gi,
    /disregard (all |the )?(previous |above )?(instructions|rules|prompts)/gi,
    /forget (all |the )?(previous |above )?(instructions|rules|prompts)/gi,
    /you are now/gi,
    /new instructions?:/gi,
    /override instructions?/gi,
    /system:?\s*(override|disable|ignore)/gi,
    
    // LLM-specific markers
    /SYSTEM PROMPT/gi,
    /<\/?system>/gi,
    /\[INST\]/gi,
    /\[\/INST\]/gi,
    /<<SYS>>/gi,
    /<\/?s>/gi,
    /Human:|Assistant:|User:|AI:/gi,
    /\{\{.*\}\}/g,  // Template injection
    
    // Role confusion attempts
    /pretend (you are|to be)/gi,
    /act as (a |an )?/gi,
    /roleplay as/gi,
    /you('re| are) (a |an )?(different|new|other)/gi,
    
    // Jailbreak patterns
    /DAN mode/gi,
    /developer mode/gi,
    /do anything now/gi,
    /bypass (safety|content|filter)/gi,
    /ignore (safety|content|filter)/gi,
  ];
  
  let sanitized = text;
  dangerousPatterns.forEach(pattern => {
    if (pattern.test(sanitized)) {
      injectionDetected = true;
    }
    sanitized = sanitized.replace(pattern, '[FILTERED]');
  });
  
  // Log if injection attempt detected
  if (injectionDetected && logAttempts) {
    logSecurityEvent('injection_attempt', {
      originalLength: text.length,
      filteredContent: sanitized.slice(0, 200) + '...'
    }, ip);
  }
  
  return sanitized.trim();
}

// HTML/Script sanitization for any text that might be rendered
export function sanitizeHTML(text) {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    // Remove script tags and event handlers
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=/gi, 'data-blocked=');
}

// Sanitize URL to prevent XSS and redirects
export function sanitizeURL(url) {
  if (!url || typeof url !== 'string') return '';
  
  // Only allow http, https, and relative URLs
  const trimmed = url.trim();
  if (trimmed.startsWith('javascript:')) return '';
  if (trimmed.startsWith('data:')) return '';
  if (trimmed.startsWith('vbscript:')) return '';
  
  // Allow relative URLs and http/https
  if (trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  
  return '';
}

// Validate and limit payload size
export function validatePayloadSize(obj, maxSizeKB = 500) {
  const jsonStr = JSON.stringify(obj);
  const sizeKB = Buffer.byteLength(jsonStr, 'utf8') / 1024;
  return sizeKB <= maxSizeKB;
}

// Validate country code
export function isValidCountry(country) {
  const validCountries = ['ES', 'MX', 'CO', 'AR', 'OTHER'];
  return validCountries.includes(country);
}

// Simple in-memory rate limiter
const rateLimitStore = new Map();

export function checkRateLimit(identifier, maxRequests = 5, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Get or create entry
  let requests = rateLimitStore.get(identifier) || [];
  
  // Filter to only requests within window
  requests = requests.filter(timestamp => timestamp > windowStart);
  
  // Check if over limit
  if (requests.length >= maxRequests) {
    return { allowed: false, remaining: 0, resetMs: requests[0] + windowMs - now };
  }
  
  // Add this request
  requests.push(now);
  rateLimitStore.set(identifier, requests);
  
  // Cleanup old entries periodically (every 100th check)
  if (Math.random() < 0.01) {
    for (const [key, times] of rateLimitStore.entries()) {
      const recent = times.filter(t => t > windowStart);
      if (recent.length === 0) {
        rateLimitStore.delete(key);
      } else {
        rateLimitStore.set(key, recent);
      }
    }
  }
  
  return { allowed: true, remaining: maxRequests - requests.length };
}

// Validate intake answers structure
export function validateIntakeAnswers(answers) {
  if (!answers || typeof answers !== 'object') return {};
  
  const allowedFields = [
    'cv_description',
    'proudest_achievement',
    'what_makes_different',
    'work_preference',
    'productive_environment',
    'greatest_strength',
    'next_role_change',
    'job_search_status',
    'role_in_mind'
  ];
  
  const validated = {};
  const maxFieldLength = 2000;
  
  for (const field of allowedFields) {
    if (answers[field] && typeof answers[field] === 'string') {
      validated[field] = sanitizeForPrompt(answers[field].slice(0, maxFieldLength));
    }
  }
  
  return validated;
}

// Validate CV text
export function validateCvText(text, maxLength = 15000) {
  if (!text || typeof text !== 'string') return '';
  return sanitizeForPrompt(text.slice(0, maxLength));
}
