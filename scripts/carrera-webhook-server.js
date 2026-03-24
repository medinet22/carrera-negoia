#!/usr/bin/env node
/**
 * Carrera.negoia.com Webhook Server
 * Recibe triggers desde Vercel y envía system events a OpenClaw
 * 
 * Deploy: systemd service en el VPS
 * Puerto: 4243
 */

import http from 'http';
import { spawn } from 'child_process';
import { createClient } from '@supabase/supabase-js';

const PORT = process.env.CARRERA_WEBHOOK_PORT || 4243;
const WEBHOOK_SECRET = process.env.CARRERA_WEBHOOK_SECRET || 'carrera-negoia-2026';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Initialize Supabase client
const supabase = SUPABASE_URL && SUPABASE_SERVICE_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  : null;

function log(msg) {
  console.log(`[carrera-webhook ${new Date().toISOString()}] ${msg}`);
}

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (d) => {
      body += d;
      if (body.length > 100_000) reject(new Error('Payload too large'));
    });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

// Send system event to OpenClaw
function sendSystemEvent(eventText) {
  return new Promise((resolve, reject) => {
    log(`Sending system event: ${eventText.substring(0, 100)}...`);
    
    const proc = spawn('openclaw', ['system', 'event', '--text', eventText, '--mode', 'now'], {
      stdio: ['ignore', 'pipe', 'pipe']
    });
    
    let stdout = '';
    let stderr = '';
    
    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.stderr.on('data', (d) => { stderr += d.toString(); });
    
    proc.on('close', (code) => {
      if (code === 0) {
        log('System event sent successfully');
        resolve({ success: true, stdout });
      } else {
        log(`System event failed: ${stderr}`);
        reject(new Error(`Process exited with code ${code}: ${stderr}`));
      }
    });
    
    proc.on('error', reject);
    
    // Timeout after 30 seconds
    setTimeout(() => {
      proc.kill();
      reject(new Error('System event timeout'));
    }, 30000);
  });
}

// Verify webhook secret
function verifySecret(req) {
  const secret = req.headers['x-webhook-secret'];
  return secret === WEBHOOK_SECRET;
}

// Handle trigger request
async function handleTrigger(req, res, body) {
  if (!verifySecret(req)) {
    log('Unauthorized request - invalid secret');
    return sendJson(res, 401, { error: 'Unauthorized' });
  }
  
  const { jobId, userId, profileId } = body;
  
  if (!jobId || !userId) {
    return sendJson(res, 400, { error: 'jobId and userId required' });
  }
  
  log(`Trigger received: jobId=${jobId}, userId=${userId}`);
  
  try {
    // Construct event text
    const eventText = `CARRERA_ANALYZE:jobId=${jobId}|userId=${userId}|profileId=${profileId || ''}`;
    
    // Send system event (non-blocking)
    sendSystemEvent(eventText).catch(err => {
      log(`Background event failed: ${err.message}`);
    });
    
    // Return immediately - processing happens async
    sendJson(res, 200, { 
      status: 'triggered',
      jobId,
      message: 'Analysis started'
    });
    
  } catch (err) {
    log(`Trigger error: ${err.message}`);
    sendJson(res, 500, { error: err.message });
  }
}

// Health check
function handleHealth(res) {
  sendJson(res, 200, { 
    status: 'ok', 
    service: 'carrera-webhook',
    timestamp: new Date().toISOString()
  });
}

// Request handler
async function handleRequest(req, res) {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const method = req.method;
  const path = url.pathname;
  
  log(`${method} ${path}`);
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Webhook-Secret');
  
  if (method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }
  
  if (path === '/health' && method === 'GET') {
    return handleHealth(res);
  }
  
  if (path === '/trigger' && method === 'POST') {
    try {
      const body = await parseBody(req);
      return await handleTrigger(req, res, body);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }
  
  sendJson(res, 404, { error: 'Not found' });
}

// Start server
const server = http.createServer(handleRequest);

server.listen(PORT, '0.0.0.0', () => {
  log(`Server started on port ${PORT}`);
  log(`Health check: http://localhost:${PORT}/health`);
  log(`Trigger endpoint: POST http://localhost:${PORT}/trigger`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  log('SIGTERM received, shutting down...');
  server.close(() => {
    log('Server closed');
    process.exit(0);
  });
});
