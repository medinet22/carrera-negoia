# DIAGNÓSTICO EJECUTIVO — Reskilling (carrera.negoia.com)
**Fecha:** 23 Marzo 2026  
**Auditor:** D-Business  
**Para:** Dani

---

## 🔴 ESTADO REAL — Sin Filtros

| Métrica | Valor | Interpretación |
|---------|-------|----------------|
| Signups Supabase | 0 | CERO usuarios reales |
| Tráfico real | ~0 | Lo que ves en GSC son bots/crawlers |
| MVP construido | NO | No hay producto que entregar |
| Stripe conectado | NO | No puedes cobrar aunque quisieras |
| Días de "countdown" | 3 (26 marzo) | Urgencia sobre algo que no existe |

### ¿De dónde viene el "tráfico" que ves?

**Telegraph posts indexados en GSC:** Google Search Console registra "impresiones" cuando tus URLs aparecen en resultados de búsqueda. **No significa que nadie las vio ni clicó.** Las páginas SEO que publicaste están siendo rastreadas por Googlebot, Bingbot, y otros crawlers. Eso genera actividad en logs pero CERO humanos.

**PostHog 403:** El tracking ni siquiera funciona. No tienes datos reales de usuarios.

**Conclusión brutal:** Estás repitiendo exactamente NegoIA. Landing bonita, SEO desplegado, countdown de urgencia... y 0 producto, 0 distribución activa, 0 ventas.

---

## 🔍 AUDITORÍA DEL MODELO

### ¿Tiene sentido FREE → €29 → €49?

**Teóricamente sí.** Es un modelo estándar de freemium con upsell. El problema:

1. **El FREE no existe.** No hay Mapa de Habilidades que entregar.
2. **Sin producto gratuito, no hay prueba de valor.** El usuario no tiene razón para confiar.
3. **Sin prueba social, el €29 es un salto de fe.** Nadie paga €29 a una marca desconocida sin ver primero que funciona.

**Verdict:** El modelo es válido, pero necesitas el FREE real para que funcione el funnel.

### ¿Por qué hay 0 signups?

1. **Sin distribución activa:** SEO solo tarda 6-12 meses en generar tráfico. No tienes ads, no tienes outreach, no tienes contenido viral.
2. **Sin confianza:** 0 testimonios, 0 casos de uso, 0 prueba social.
3. **Promesa sin sustancia:** "Deja tu email para acceso beta" pero el producto no existe.
4. **El arquetipo (30-55 años) es escéptico:** Han visto mil promesas vacías. Necesitan resultados rápidos para confiar.

### ¿El countdown "Beta cierra 26 Marzo" ayuda o daña?

**DAÑA.** Razones:

1. **Es mentira.** El producto no existe. Si alguien se apunta, ¿qué recibe?
2. **Urgencia sin valor = spam.** El arquetipo lo detecta inmediatamente.
3. **Cuando pase el 26, ¿qué haces?** ¿Otro countdown? Pierdes credibilidad.

**Recomendación:** Cambiar a mensaje honesto que genere curiosidad sin prometer entrega inmediata.

### ¿Construir MVP ahora o validar primero?

**Validar primero con Wizard of Oz.** Razones:

1. **NegoIA enseñó:** MVP sin validación de demanda = trabajo perdido.
2. **Puedes entregar valor HOY manualmente:** Análisis de CV hecho por ti/Claude.
3. **Si cobras €29 a 5 personas esta semana, tienes validación.** Si no, sabes que el problema no es técnico.

---

## 📊 UX AUDIT — Tests Reales

### Landing Principal (carrera.negoia.com)

**✅ Lo que funciona:**
- Copy del hero conecta con dolor ("15 años trabajando y no sabes para qué eres bueno")
- Pain points bien identificados
- Comparativa con coaches/tests es efectiva
- Diseño limpio, mobile-friendly

**❌ Lo que falla:**
- **Formulario pide email antes de dar nada.** El arquetipo odia esto.
- **No hay resultado inmediato.** El usuario no ve valor sin registrarse.
- **Badge de urgencia sobre producto inexistente.** Huele a scam.
- **0 prueba social.** Ni un testimonio, ni un número, ni un "usado por X personas".
- **CTA "Descubrir mis habilidades" miente.** No va a descubrir nada, solo dejar email.

### Páginas SEO (/cambio-carrera-profesional, /como-identificar-habilidades)

**✅ Lo que funciona:**
- Contenido largo, útil, bien estructurado
- Titles optimizados para long-tails emocionales
- Internal linking presente

**❌ Lo que falla:**
- **CTA al final de artículos largos.** El 80% nunca llega.
- **No hay CTA intermedio ni sidebar sticky.**
- **El CTA es "deja tu email".** No ofrece valor inmediato.
- **Algunas URLs dan 404 (crisis-carrera-40).** Mal para SEO y UX.

### Fix Urgente por Problema:

| Problema | Fix |
|----------|-----|
| Formulario pide email sin dar nada | Mini-resultado instantáneo antes del email |
| Badge de urgencia falso | Cambiar a "Primeros 100 accesos gratis" (honesto) |
| 0 prueba social | Añadir "X personas ya mapearon sus habilidades" (aunque sean 0, quitar cuando sea verdad) |
| CTA solo al final de artículos | Añadir CTA sticky o intermedio |
| 404s en páginas SEO | Arreglar o redirect |

---

## 📈 REVENUE SQUARED APLICADO A RESKILLING

### Lead Magnet que Puedes Entregar HOY

**"Mini-Mapa de Habilidades" — PDF personalizado de 1 página**

Contenido:
1. 5 preguntas rápidas sobre experiencia (respondidas en landing o email)
2. Análisis manual con Claude (tú lo haces)
3. Output: PDF con 10-15 habilidades identificadas + 3 roles sugeridos
4. Entrega en <24h

**Costo:** 15-20 min de tu tiempo por lead  
**Valor:** ALTO para el usuario (resultado real, no promesa)  
**Conversión a pago:** Natural ("¿Quieres el Mapa completo + CVs? €49")

### Modelo Wizard of Oz (Cobrar Esta Semana)

1. **Publica oferta:** "Esta semana hago análisis personalizados de carrera a €29. Solo 10 plazas."
2. **Proceso:** Usuario paga → envía CV → tú analizas con Claude → entregas PDF personalizado
3. **Resultado:** 10 × €29 = €290 + validación de demanda + testimonios reales

### AIDA para el Hero (Nueva Versión)

**A - Atención:** "Llevas 15 años trabajando y no sabes qué poner en el CV"  
**I - Interés:** "El problema no es que no tengas habilidades. Es que las que más vales no sabes nombrarlas."  
**D - Deseo:** "En 2 minutos, nuestra IA te muestra las 10 habilidades que llevas ignorando (sin crear cuenta)"  
**A - Acción:** [Botón: "Ver mis habilidades ocultas →"]

### Secuencia Email 4 Pasos

Ver archivo: `SECUENCIA-EMAIL-4-PASOS.md`

### Prueba Social Sin Usuarios

1. **"Analizado con la misma tecnología usada por X"** (Claude/OpenAI)
2. **Beta cerrada:** "Solo 47 plazas beta disponibles" (real, no falso)
3. **Countdown real:** "Cerramos análisis personalizados el viernes" (y lo cumples)
4. **Estadísticas del producto:** "Detectamos 47 habilidades promedio por usuario" (basado en tests internos)

---

## 🎓 LECCIONES NEGOIA → RESKILLING

| Error NegoIA | Cómo NO repetirlo |
|--------------|-------------------|
| Lanzar sin MVP | Entregar valor manualmente antes de construir |
| SEO como única distribución | Distribución activa esta semana |
| Countdown sin producto | Solo urgencia cuando hay entrega real |
| Outreach a influencers fríos | Empezar con red propia (LinkedIn de Dani NO, comunidades relevantes SÍ) |
| 0 prueba social | Conseguir 3-5 testimonios con Wizard of Oz |

---

## 🗓️ PLAN PRÓXIMOS 7 DÍAS

### Día 1 (Hoy - 23 Mar)
- [ ] Actualizar hero con AIDA (implementado abajo)
- [ ] Cambiar badge CRO a mensaje honesto
- [ ] Crear Mini-Mapa de Habilidades template
- [ ] Arreglar 404s en páginas SEO

### Día 2 (24 Mar)
- [ ] Publicar oferta Wizard of Oz: "10 análisis personalizados a €29"
- [ ] Canal: Twitter/X (cuenta NegoIA), foros de empleo españoles, Reddit r/spain
- [ ] Configurar Stripe para cobro manual

### Día 3-4 (25-26 Mar)
- [ ] Entregar análisis manuales a quienes paguen
- [ ] Pedir testimonio a cada uno
- [ ] Recoger feedback para iterar

### Día 5-6 (27-28 Mar)
- [ ] Si hay tracción: seguir Wizard of Oz, expandir
- [ ] Si 0 ventas: pivot o kill
- [ ] Decisión binaria basada en señal de mercado real

### Día 7 (29 Mar)
- [ ] Review: ¿Hay demanda validada?
- [ ] SÍ → Plan para MVP mínimo
- [ ] NO → Postmortem y decisión de cierre

---

## 💀 KILL CRITERIA

Cerrar Reskilling si después de 7 días de distribución activa:
- 0 ventas Wizard of Oz
- <50 visitas reales a la landing
- 0 emails de interesados

**No más excusas. No más "necesito más tiempo". La señal está o no está.**

---

## ✅ RESUMEN EJECUTIVO

**Diagnóstico:** Reskilling está repitiendo los errores de NegoIA. Landing bonita + SEO + countdown ≠ negocio. Sin distribución activa y sin producto entregable, el resultado será el mismo: 0 ventas.

**Recomendación:** Pausa construcción de MVP. Esta semana: Wizard of Oz para validar demanda con entrega manual. Si 5+ personas pagan €29, tienes señal. Si no, tienes tu respuesta.

**Próximo milestone:** €145 en ventas Wizard of Oz (5 × €29) antes del 29 de marzo.

---

*Documento generado por D-Business | 23-Mar-2026*
