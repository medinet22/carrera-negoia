/**
 * Input Validation & Sanitization Utilities
 * Seguridad crítica para carrera.negoia.com
 */

// Email validation
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  // RFC 5322 simplified regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Sanitize text input to prevent prompt injection
export function sanitizeForPrompt(text) {
  if (!text || typeof text !== 'string') return '';
  
  // Remove potential injection patterns
  const dangerousPatterns = [
    /ignore (all |the )?(previous |above )?(instructions|rules|prompts)/gi,
    /you are now/gi,
    /new instructions?:/gi,
    /system:?\s*(override|disable|ignore)/gi,
    /SYSTEM PROMPT/gi,
    /<\/?system>/gi,
    /\[INST\]/gi,
    /<<SYS>>/gi,
    /Human:|Assistant:/gi,
  ];
  
  let sanitized = text;
  dangerousPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '[FILTERED]');
  });
  
  return sanitized.trim();
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
