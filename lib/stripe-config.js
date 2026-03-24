/**
 * @fileoverview Stripe configuration and constants
 * @module lib/stripe-config
 * 
 * Centralizes all Stripe-related configuration for easy management
 * between test and live environments.
 */

/**
 * Detect if we're in test mode based on the Stripe key
 * @returns {boolean}
 */
export function isTestMode() {
  const key = process.env.STRIPE_SECRET_KEY || ''
  return key.startsWith('sk_test_') || key.startsWith('rk_test_')
}

/**
 * Get the appropriate price ID based on plan and environment
 * @param {'basic' | 'complete'} plan - The plan type
 * @returns {string} - The Stripe price ID
 */
export function getPriceId(plan) {
  const prices = isTestMode() ? PRICES.test : PRICES.live
  return prices[plan] || prices.basic
}

/**
 * Price IDs for different environments
 * Update these when creating new prices in Stripe
 */
export const PRICES = {
  live: {
    basic: process.env.STRIPE_PRICE_BASIC || 'price_basic_live',
    complete: process.env.STRIPE_PRICE_COMPLETE || 'price_complete_live',
  },
  test: {
    basic: process.env.STRIPE_PRICE_BASIC_TEST || 'price_basic_test',
    complete: process.env.STRIPE_PRICE_COMPLETE_TEST || 'price_complete_test',
  }
}

/**
 * Price amounts in cents (EUR)
 * Used for display and validation
 */
export const AMOUNTS = {
  basic: 2900,      // €29
  complete: 4900,   // €49
}

/**
 * Plan features for display
 */
export const PLAN_FEATURES = {
  basic: {
    name: 'Básico',
    price: 29,
    currency: 'EUR',
    features: [
      'Mapa de habilidades completo',
      'Top 5 roles compatibles',
      'Análisis de fortalezas y gaps',
      'Salarios por país',
    ],
  },
  complete: {
    name: 'Completo',
    price: 49,
    currency: 'EUR',
    features: [
      'Todo del plan Básico',
      '26+ roles compatibles',
      'CV optimizado para ATS',
      'Carta de presentación',
      'LinkedIn About section',
      'Elevator pitch',
      'Plan de transición personalizado',
    ],
  }
}

/**
 * Stripe checkout session configuration
 * @param {Object} params
 * @returns {Object} - Checkout session config
 */
export function getCheckoutConfig({ 
  userId, 
  plan, 
  email, 
  successUrl, 
  cancelUrl 
}) {
  return {
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{
      price: getPriceId(plan),
      quantity: 1,
    }],
    customer_email: email,
    success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/profile?userId=${userId}&success=true`,
    cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/upgrade?userId=${userId}`,
    metadata: {
      userId,
      plan,
      source: 'carrera.negoia.com',
    },
    allow_promotion_codes: true,
  }
}

/**
 * Webhook endpoint secret for signature verification
 * @returns {string | undefined}
 */
export function getWebhookSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET
}

export default {
  isTestMode,
  getPriceId,
  getCheckoutConfig,
  getWebhookSecret,
  PRICES,
  AMOUNTS,
  PLAN_FEATURES,
}
