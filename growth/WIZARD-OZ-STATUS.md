# Wizard of Oz — Análisis de Carrera €29
## Estado: 24 Marzo 2026

### ✅ COMPLETADO

1. **Stripe Price creado:** `price_1TEImJKHITR2cWbKWAN3XNQh` (€29, one-time)
2. **Página /analisis-carrera:** LIVE en https://carrera.negoia.com/analisis-carrera
3. **Página de gracias:** /analisis-carrera/gracias
4. **API checkout:** /api/checkout-analisis
5. **API webhook:** /api/webhook-analisis
6. **CTAs en páginas SEO:**
   - /no-se-para-que-soy-bueno ✓
   - /crisis-40-anos-profesional ✓
   - /cambio-carrera-profesional ✓
   - /cuando-odias-tu-trabajo ✓
   - /miedo-a-dejar-trabajo-seguro ✓
7. **Landing principal actualizada:**
   - Badge: "Análisis de Carrera €29 — Entrega 48h"
   - CTA secundario hacia /analisis-carrera
8. **Vercel env vars:**
   - STRIPE_SECRET_KEY ✓ (añadida)
   - SUPABASE_URL ✓
   - SUPABASE_SERVICE_KEY ✓
   - RESEND_API_KEY ✓
9. **Telegraph post:** https://telegra.ph/He-analizado-mi-carrera-con-IA-y-lo-que-vi-me-cambió-el-enfoque-03-24
10. **Posts X/Twitter:** Guardados en growth/distribucion/x-posts-analisis-carrera.md

### ⚠️ REQUIERE ACCIÓN MANUAL

1. **Crear tabla Supabase:**
   - Ir a: https://supabase.com/dashboard/project/goasfxfeaczhzgzwupzg/sql/new
   - Ejecutar: carrera-ia-v1/SETUP-SUPABASE.sql
   
2. **Configurar Webhook Stripe:**
   - Ir a: https://dashboard.stripe.com/webhooks
   - Crear endpoint: `https://carrera.negoia.com/api/webhook-analisis`
   - Eventos: `checkout.session.completed`
   - (Nota: webhook simplificado sin verificación de firma para Wizard of Oz)

3. **PostHog:**
   - API key actual es inválida (403)
   - Analytics fallan silenciosamente — no bloquea funcionalidad
   - Actualizar key en vault cuando sea necesario

### 📊 MÉTRICAS A MONITOREAR

- Visitas a /analisis-carrera (cuando PostHog funcione)
- Checkout sessions iniciadas (Stripe Dashboard)
- Pagos completados (Stripe Dashboard)
- Entregas realizadas (manual tracking)

### 📅 PRÓXIMOS PASOS

1. **Hoy:** Crear tabla Supabase + configurar webhook Stripe
2. **Hoy-Mañana:** Publicar posts X/Twitter (3 posts, espaciados)
3. **48h post-pago:** Entregar análisis manualmente (Claude + PDF)
4. **Día 7:** Evaluar:
   - ¿Cuántos checkouts?
   - ¿Cuántos pagos?
   - ¿Cuántas entregas?
   - Decision: continuar/pivot/kill
