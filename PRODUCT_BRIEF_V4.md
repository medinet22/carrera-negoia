# RESKILLING AI COACH — GUÍA DEFINITIVA V4
## Modelo de negocio, UX de plataforma, y especificación para D-Business (OpenClaw)
### Documento listo para ejecución — Marzo 2026

---

## CAMBIO FUNDAMENTAL VS V3: De PDFs a plataforma viva

El V3 proponía entregar PDFs por email. Eso es un producto muerto. 

**Este producto es una plataforma donde el usuario vive, explora, decide y actúa.** No descarga un PDF y desaparece. Tiene un panel donde ve su perfil, explora roles con datos reales, descarta y prioriza, ve gaps, descarga CVs cuando quiere. 

Con OpenClaw / D-Business como motor de desarrollo (vibe coding), montar esta plataforma no requiere meses — requiere sprints enfocados. El bot puede crear la web app completa.

---

## PARTE 1: MODELO DE NEGOCIO

### 1.1 ICP (Ideal Customer Profile)

**ICP Primario: El quemado que no sabe para qué sirve (30-42 años)**

Este es tu buyer. No está desempleado todavía — está empleado pero miserable. Tiene trabajo pero se siente atrapado. El trigger es un cumpleaños redondo, una crisis de domingo por la noche, un amigo que cambió de carrera, o un susto de ERE.

- Busca en Google: "no sé para qué soy bueno", "cambiar de carrera a los 35", "test vocacional adultos"
- Ya ha probado: tests vocacionales gratuitos (resultados vagos), ChatGPT (sin estructura), LinkedIn scrolling infinito
- Disposición a pagar: €29-49 si percibe valor inmediato (es menos que una cena, infinitamente menos que un coach)
- Dónde está: España (poder adquisitivo alto), México/Colombia/Argentina (volumen alto, CPC bajo)

**ICP Secundario: El recién despedido / ERE (40-55 años)**
- Trigger: acaba de perder su trabajo o está en proceso de ERE
- Tiene urgencia real y dinero (indemnización)
- Busca: "qué hacer después de un despido", "recolocación profesional"
- Más dispuesto a pagar pero necesita más handholding

**ICP Terciario: El profesional LATAM buscando remoto (25-38 años)**
- Quiere saltar de mercado local a remoto/internacional
- Muy digital, acostumbrado a herramientas online
- Sensible al precio en moneda local pero alto volumen
- Ideal para escalar con Meta Ads baratos (CPM €2-4 en LATAM)

### 1.2 Propuesta de Valor

**En una frase:** "Descubre tus habilidades ocultas, encuentra los roles donde mejor encajas con datos reales de mercado, y sal con tus CVs listos para aplicar."

**Posicionamiento contra competencia:**

| Contra... | Tu ángulo |
|-----------|-----------|
| ChatGPT manual | "ChatGPT te da respuestas. Nosotros te damos un plan." El 95% no sabe hacer buenos prompts. Tu producto empaqueta 15 prompts expertos en un flujo guiado con datos reales de mercado. |
| Tests vocacionales gratuitos | "Los tests te dicen que eres creativo. Nosotros te dicen que eres perfecto para Customer Success Manager con 87% match y €42K de salario medio en Madrid." Especificidad mata generalidad. |
| Coaches humanos (€300-1.500) | "Lo que un coach te cobra en €300 por una sesión, aquí lo tienes completo por €39." Ancla de precio brutal. |
| CV builders (Canva, Kickresume) | "No somos un CV builder. Somos un coach de carrera que además te hace el CV." El CV es el output, no el producto. |

### 1.3 Pricing

**Modelo: Free assessment + pago único (NO suscripción)**

Razones basadas en datos:
- Freemium puro convierte ~2.6% free→pago (First Page Sage, 86 empresas SaaS). Demasiado bajo para volumen inicial.
- Pero un assessment gratuito que genera sunk cost (10-15 min invertidos) + results preview parciales convierte al 8-15% de quienes lo completan. Esa es tu palanca.
- Nadie se suscribe para buscar trabajo. Es un evento puntual. Pago único elimina fricción.

**Estructura de precios:**

| Nivel | Precio | Qué incluye | Qué ve el usuario |
|-------|--------|-------------|-------------------|
| **Descubre** (GRATIS) | €0 | Assessment completo + Mapa de Habilidades + preview parcial de roles (top 3 con % match pero sin detalles) | Su perfil de habilidades visualizado, texto motivacional, imagen compartible. Teaser de roles. |
| **Plan Básico** | €29 | Acceso completo a la plataforma: todos los roles con datos detallados (día a día, salarios, pros/contras), sistema de selección/descarte/priorización, gap analysis por rol | Explora roles, ve datos reales, decide cuáles le interesan, ve qué le falta. |
| **Plan Completo** | €39 | Todo lo del Básico + CV genérico optimizado (ATS + LinkedIn + HR ready), CVs específicos por rol seleccionado, cartas de presentación, bullets de LinkedIn, elevator pitch, plan de estudio para cerrar gaps | Todo lo anterior + sale con documentos listos para aplicar. |

**Charm pricing a €39:** Según la investigación, €39 es el sweet spot. Es comparable a JobTest.org ($34.90 tier más popular), un tercio del precio de una sesión de coaching en España, y accesible para LATAM.

### 1.4 Unit Economics con Datos Reales

**Benchmarks verificados:**
- Google Ads CPC España (career keywords): €0.50-€2.50
- Google Ads CPC LATAM: €0.20-€1.00
- Meta Ads CPM España: ~€8-10
- Meta Ads CPM LATAM: México $3.92, Colombia $2.00
- Landing page conversion (education sector): 8-11% mediana (Unbounce, 57M conversiones)
- Assessment completion rate target: 70-80% (vs 60% industria)
- Free assessment → pago: 8-15% de completadores (con sunk cost + preview)

**Escenario validación con €5/día Google Ads (España):**

| Métrica | Valor |
|---------|-------|
| Presupuesto diario | €5 |
| CPC medio | €1.50 |
| Clicks/día | ~3 |
| Clicks/semana | ~21 |
| Landing → Start assessment (30%) | ~6/semana |
| Assessment completion (75%) | ~4-5/semana |
| Completadores → pago (10%) | ~0.5/semana |
| **En 2 semanas: ~40 clicks, ~12 assessments, ~1 venta** | **€39 revenue vs €70 spend** |

Esto NO es rentable en Google Ads España a €5/día — pero eso es irrelevante. **El objetivo de las 2 semanas no es rentabilidad, es validación de señales:**
- ¿La gente completa el assessment? (>60% = señal positiva)
- ¿Alguien llega al paywall? (>30% de completadores = señal fuerte)
- ¿Alguien paga? (1+ venta en 2 semanas = señal de GO)
- ¿Alguien comparte su Mapa? (cualquier share = señal de viralidad)

**Escenario escalado (mes 6, post-validación):**

| Canal | Inversión/mes | Registros | Completadores | Compradores | Revenue |
|-------|--------------|-----------|---------------|-------------|---------|
| Google Ads LATAM | €100 | 100-200 | 75-150 | 8-15 | €310-585 |
| SEO programático | €0 | 300-800 | 225-600 | 22-60 | €860-2.340 |
| Viralidad orgánica | €0 | 50-200 | 40-150 | 4-15 | €155-585 |
| **TOTAL** | **€100** | **450-1.200** | **340-900** | **34-90** | **€1.325-3.510** |
| Coste operativo (IA + hosting) | | | | | **-€50-120** |
| **Beneficio neto** | | | | | **€1.205-3.390** |

---

## PARTE 2: UX DE PLATAFORMA — Flujo Completo

### 2.1 Principios de UX

1. **Una pregunta por pantalla.** Estilo Typeform. Incrementa completion rate al 70-80% vs formularios tradicionales (~33%).
2. **Mostrar progreso siempre.** "Paso 3 de 5" + barra visual + "12 habilidades identificadas hasta ahora."
3. **Micro-celebraciones entre secciones.** "✨ Tus habilidades de liderazgo son excepcionales" — mantiene engagement.
4. **El paywall va después del momento "hostia".** El usuario ve su Mapa completo + preview de roles. Ya invirtió 10-15 minutos. La conversión ocurre en el pico emocional.
5. **La plataforma es el producto, no un PDF.** El usuario vuelve, explora, decide. Los documentos son descargables pero la experiencia es la web app.

### 2.2 Mapa de Pantallas

```
LANDING PAGE (/)
    │
    ▼
INTAKE FLOW (/start)
    │ Paso 1: Email + nombre + país
    │ Paso 2: Subir CV (drag & drop)
    │ Paso 3-7: Preguntas tipo coach (una por pantalla)
    │
    ▼
PROCESANDO... (/processing)
    │ Animación 15-30 segundos
    │ "Analizando tu perfil..."
    │ Skills aparecen en tiempo real
    │
    ▼
MI PERFIL (/profile) ← GRATIS
    │ Mapa de Habilidades visual (radar chart interactivo)
    │ Texto narrativo motivacional
    │ Niveles por skill (clickeable para ver evidencia)
    │ Botón compartir (PNG para LinkedIn/WhatsApp)
    │ Preview: "3 roles donde encajas >80%" (nombres + % solo)
    │
    ▼
PAYWALL (/upgrade)
    │ Plan Básico €29 / Plan Completo €39
    │ Stripe Checkout
    │
    ▼
EXPLORAR ROLES (/roles) ← PAGADO
    │ Lista de 5-8 roles con:
    │   • % match y tipo (alta afinidad / oportunidad)
    │   • Descripción del día a día
    │   • Pros y contras HONESTOS
    │   • Rango salarial por país del usuario
    │   • Demanda de mercado
    │   • Botón: ❤️ Me interesa / ❌ Descartar
    │
    ▼
MIS SELECCIONES (/selected)
    │ Roles marcados como "me interesa"
    │ Para cada uno:
    │   • Gap analysis detallado
    │   • Qué te falta + cómo aprenderlo (cursos concretos)
    │   • Plan de estudio estimado (semanas/meses)
    │   • Links pre-configurados a búsquedas de empleo
    │
    ▼
MIS DOCUMENTOS (/documents) ← PLAN COMPLETO
    │ CV genérico (ATS + LinkedIn + HR ready)
    │   → Preview en pantalla + descargar PDF
    │ CV específico por rol seleccionado
    │   → Preview en pantalla + descargar PDF
    │ Carta de presentación por rol
    │ Bullets de LinkedIn
    │ Elevator pitch (texto copiable)
    │ Plan de gaps consolidado
    │
    ▼
SIGUIENTE PASO (/next)
    │ CTA: "Comparte tu Mapa" (viralidad)
    │ CTA: "Programa tu revisión en 30 días" (retención)
    │ Links a búsquedas reales de empleo
```

### 2.3 Diseño de Pantallas Clave

#### Pantalla: MI PERFIL (/profile) — La más importante

Esta es la pantalla que decide si el usuario paga. Debe generar el efecto "hostia, es verdad que sé hacer todo esto."

**Layout:**
```
┌─────────────────────────────────────────────┐
│ HEADER: "Tu Mapa de Habilidades"     [🔗 Compartir] │
├─────────────────────────────────────────────┤
│                                             │
│     [RADAR CHART INTERACTIVO]               │
│     6-8 ejes: Liderazgo, Análisis,          │
│     Comunicación, Técnico, Creatividad,     │
│     Negociación...                          │
│     Color: verde=fuerte, ámbar=medio,       │
│     rojo=gap                                │
│     Click en cada eje → ver evidencia       │
│                                             │
├─────────────────────────────────────────────┤
│ TEXTO NARRATIVO (300-500 palabras)          │
│ "María, en tus 12 años has desarrollado..." │
│ Cálido, validador, específico.              │
│ Menciona logros concretos del CV.           │
├─────────────────────────────────────────────┤
│ SKILLS DETALLADOS                           │
│ ┌──────────────────────────────────────────┐│
│ │ Gestión de Equipos     ████████░░ 4/5   ││
│ │ Evidencia: "Lideraste equipos de 8+..."  ││
│ │ Confianza: Alta ✦                        ││
│ └──────────────────────────────────────────┘│
│ ┌──────────────────────────────────────────┐│
│ │ Análisis de Datos      █████░░░░░ 3/5   ││
│ │ Evidencia: "Usaste Excel/SQL en..."      ││
│ │ Confianza: Media                         ││
│ └──────────────────────────────────────────┘│
│ ... (expandible)                            │
├─────────────────────────────────────────────┤
│ PREVIEW ROLES (teaser)                      │
│ ┌──────────────────┐┌──────────────────┐   │
│ │Customer Success  ││Product Manager   │   │
│ │Manager           ││                  │   │
│ │Match: 87% ████▓  ││Match: 82% ████▓ │   │
│ │€38-52K España    ││€45-65K España   │   │
│ │[🔒 Ver detalles] ││[🔒 Ver detalles]│   │
│ └──────────────────┘└──────────────────┘   │
│                                             │
│ [═══ DESBLOQUEAR ROLES COMPLETOS — €29 ═══]│
└─────────────────────────────────────────────┘
```

**Detalles críticos del preview de roles:**
- Mostrar el NOMBRE del rol + % de match + rango salarial (dato gancho)
- El resto (día a día, pros/contras, gap analysis) está borroso/bloqueado
- El usuario ya ve que hay roles específicos con datos reales → FOMO natural

#### Pantalla: EXPLORAR ROLES (/roles) — Donde se toman decisiones

**Cada rol es una tarjeta expandible:**

```
┌─────────────────────────────────────────────┐
│ Customer Success Manager          Match 87% │
│ ───────────────────────────────────────────  │
│ [Expandir para ver detalles ▼]              │
│                                             │
│ QUÉ HACES EN EL DÍA A DÍA:                 │
│ "Gestionas una cartera de 20-40 cuentas     │
│ B2B. Tu trabajo es asegurar que los         │
│ clientes extraigan máximo valor del          │
│ producto. Mezcla de calls estratégicas,     │
│ análisis de uso, y resolución de problemas. │
│ Mucho Zoom, Slack, y CRM."                 │
│                                             │
│ ✅ PROS:                                    │
│ • Alta demanda, especialmente en SaaS       │
│ • Mucha interacción humana                  │
│ • Camino claro a VP Customer Success        │
│                                             │
│ ⚠️ CONTRAS (honestos):                     │
│ • Puede ser emocionalmente demandante       │
│ • Presión de retención / churn              │
│ • Algunos lo ven como "soporte glorificado" │
│                                             │
│ 💰 SALARIO:                                │
│ España: €32-52K | México: $25-45K MXN/mes  │
│ Colombia: $4-8M COP/mes | Remoto: $50-80K  │
│                                             │
│ 📊 DEMANDA: Alta ↑ | Crecimiento: +23%/año │
│ 🏢 Empresas que contratan: HubSpot,        │
│    Salesforce, Typeform, Factorial, Platzi  │
│                                             │
│ 🔍 TU FIT:                                 │
│ • Gestión de relaciones: 5/5 ✓ Perfecto    │
│ • Comunicación: 4/5 ✓ Fuerte               │
│ • Análisis de datos: 3/5 ⚠ Gap menor      │
│ • Conocimiento SaaS: 2/5 ❌ Gap importante │
│                                             │
│ [❤️ Me interesa]  [❌ Descartar]  [⭐ Prioridad] │
└─────────────────────────────────────────────┘
```

**Sistema de selección:**
- ❤️ Me interesa → va a "Mis Selecciones"
- ❌ Descartar → se quita de la lista (con undo)
- ⭐ Prioridad → marcado como favorito, aparece primero
- El usuario puede seleccionar hasta 3-5 roles para profundizar

#### Pantalla: MIS SELECCIONES (/selected) — Gap analysis y plan de acción

Para cada rol seleccionado:

```
┌─────────────────────────────────────────────┐
│ Customer Success Manager — Tu plan de ruta  │
│                                             │
│ GAPS A CERRAR:                              │
│                                             │
│ 1. Conocimiento SaaS (2/5 → 4/5 necesario) │
│    ⏱ ~4-6 semanas                          │
│    📚 Recursos:                             │
│    • Curso: "SaaS Fundamentals" (Coursera)  │
│    • Libro: "Customer Success" (N. Mehta)   │
│    • Práctica: Usar HubSpot free tier       │
│                                             │
│ 2. Herramientas CRM (1/5 → 3/5 necesario)  │
│    ⏱ ~2-3 semanas                          │
│    📚 Recursos:                             │
│    • Curso: "HubSpot Academy" (gratis)      │
│    • Práctica: Configurar un pipeline       │
│                                             │
│ TIMELINE TOTAL ESTIMADO: 6-9 semanas        │
│                                             │
│ BUSCAR ESTE ROL:                            │
│ [🔗 LinkedIn] [🔗 InfoJobs] [🔗 Indeed]    │
│ (links pre-configurados con keywords)       │
│                                             │
│ [📄 Generar CV para este rol]  ← Solo Plan Completo │
└─────────────────────────────────────────────┘
```

#### Pantalla: MIS DOCUMENTOS (/documents) — Solo Plan Completo

```
┌─────────────────────────────────────────────┐
│ Tus Documentos                              │
│                                             │
│ CV GENÉRICO (LinkedIn + HR + ATS ready)     │
│ ┌─────────────────────────────────────────┐ │
│ │ [Preview visual del CV]                 │ │
│ │                                         │ │
│ │ María García López                      │ │
│ │ Profesional de gestión con 12 años...   │ │
│ │ ...                                     │ │
│ └─────────────────────────────────────────┘ │
│ [📋 Copiar texto] [📥 Descargar PDF] [📥 DOCX] │
│                                             │
│ CV ESPECÍFICO: Customer Success Manager     │
│ ┌─────────────────────────────────────────┐ │
│ │ [Preview adaptado al rol]               │ │
│ └─────────────────────────────────────────┘ │
│ [📋 Copiar] [📥 PDF] [📥 DOCX]             │
│                                             │
│ CARTA DE PRESENTACIÓN: CSM                  │
│ [Preview] [📋 Copiar] [📥 PDF]              │
│                                             │
│ LINKEDIN BULLETS:                           │
│ "• Gestioné cartera de 30+ cuentas B2B..."  │
│ "• Incrementé retención de clientes en..."  │
│ [📋 Copiar todos]                           │
│                                             │
│ ELEVATOR PITCH (30 seg):                    │
│ "Soy María, llevo 12 años gestionando      │
│ relaciones B2B y equipos multidisciplinares.│
│ Mi fortaleza está en..."                    │
│ [📋 Copiar]                                 │
└─────────────────────────────────────────────┘
```

---

## PARTE 3: VALIDACIÓN RÁPIDA (€5/DÍA, 2 SEMANAS)

### 3.1 Qué construir ANTES de validar

**Mínimo absoluto para validar (1-3 días de trabajo para D-Business):**

1. **Landing page** en el dominio final (Next.js desplegado en Vercel)
   - Hero: "Descubre tus habilidades ocultas y los roles donde mejor encajas"
   - 3 pasos visuales del proceso
   - Anclaje de precio: "Lo que un coach cobra en €300, aquí desde €29"
   - CTA: "Descubre tu Mapa gratis →"
   - Botón de compra que lleva a Stripe Checkout (aunque el producto no esté listo)
   - Post-compra: "Tu análisis estará listo en 24-48h. Te avisamos por email."

2. **Formulario de intake funcional** (el assessment completo)
   - Subida de CV + 5-7 preguntas tipo coach
   - Captura de email
   - Al final: "Tu Mapa está siendo generado..."

3. **Google Ads** con €5/día
   - Manual CPC (NO Smart — necesitas control)
   - Keywords exactas y de frase: [cambiar de carrera], [test vocacional adultos], [no sé para qué soy bueno], [reorientación profesional]
   - Negativos agresivos: -gratis, -gratuito, -universidad, -master, -adolescentes, -bachillerato
   - Geo: España primero, expandir a México/Colombia semana 2

### 3.2 Qué medir

| Señal | Cómo medirla | Umbral GO |
|-------|-------------|-----------|
| Landing → start assessment | GA4 event | >25% |
| Assessment completion | GA4 event | >60% |
| Completadores → click "Comprar" | GA4 event | >8% |
| Compras reales | Stripe | 1+ en 2 semanas = GO |
| Shares del Mapa | Click en botón compartir | Cualquier share = bonus |
| Email capture rate | Total emails / total visitors | >15% |

### 3.3 Decisión GO/NO-GO (día 14)

| Resultado | Decisión |
|-----------|----------|
| 1+ compra real + >60% completion | **GO TOTAL. Construir plataforma completa.** |
| 0 compras pero >8% click en "Comprar" | **GO con iteración. El interés existe, ajustar precio/copy.** |
| 0 compras, <5% click en "Comprar", pero >60% completion | **Iterar propuesta de valor. El assessment engancha pero el paywall no.** |
| <40% completion | **Iterar el assessment. Las preguntas no enganchan.** |
| <100 visitas totales en 2 semanas | **Insuficiente data. Subir a €10/día o expandir a LATAM.** |

---

## PARTE 4: SEO & AI DISCOVERY

### 4.1 SEO Programático

**La jugada más importante a medio plazo.** Generar 200-500 páginas con este patrón:

**URL:** `/transicion/{profesion-origen}-a-{profesion-destino}`

**Ejemplos:**
- `/transicion/profesor-a-ux-designer`
- `/transicion/abogado-a-data-analyst`
- `/transicion/enfermero-a-product-manager`
- `/transicion/marketing-a-customer-success`
- `/transicion/administrativo-a-project-manager`

**Cada página contiene (generado por IA, pero con datos reales):**
- H1: "Cómo pasar de [A] a [B]: Guía completa 2026"
- Tabla comparativa: salario A vs B por país
- Skills transferibles que ya tienes
- Skills nuevos que necesitas
- Dificultad estimada (1-5) y timeline
- Pasos concretos para la transición
- CTA: "¿Vienes de [A]? Descubre TODOS los roles donde encajas →"

**Combinaciones: 20 profesiones origen × 15 destinos × 4 países = 1.200 páginas potenciales**

Empezar con 50-100 de las combinaciones más buscadas. D-Business puede generarlas en batch.

### 4.2 GEO (Generative Engine Optimization)

Para que ChatGPT, Perplexity y Claude recomienden tu producto cuando alguien pregunte "herramientas para cambiar de carrera en español":

- **Estadísticas propias:** "El 73% de nuestros usuarios descubrió roles que nunca había considerado" → los LLMs priorizan datos originales (+33.9% visibilidad).
- **Citas de expertos:** Incluir quotes de profesionales de RRHH en el blog.
- **Estructura pregunta-respuesta:** Headings tipo "¿Cómo sé para qué soy bueno?" con respuesta inmediata.
- **Schema markup:** Product, Course, FAQPage, HowTo en JSON-LD en cada página.
- **Presencia en Reddit:** Participar genuinamente en r/spain, r/mexico, subreddits de empleo. Reddit es la fuente #2 de citas de ChatGPT.

### 4.3 Keywords Prioritarias

**Tier 1 (alto intent, competencia media):**
- "cambiar de carrera" / "cambio de carrera"
- "reorientación profesional"
- "no sé para qué soy bueno"
- "qué hacer después de un despido"
- "habilidades transferibles"

**Tier 2 (alto volumen, competencia alta):**
- "test vocacional" / "test vocacional adultos"
- "orientación laboral"
- "cómo hacer un CV"

**Tier 3 (long-tail, competencia baja — para SEO programático):**
- "de [profesión A] a [profesión B]"
- "cambiar de carrera a los 40"
- "cuánto gana un [rol] en [país]"
- "qué hace un [rol] en el día a día"

---

## PARTE 5: ESPECIFICACIÓN TÉCNICA PARA D-BUSINESS (OPENCLAW)

### 5.1 Cómo D-Business debe leer este documento

D-Business, esto es lo que necesitas construir. El producto es una web app con las siguientes pantallas y funcionalidades. Puedes usar el stack que mejor conozcas (Next.js + Supabase + Stripe es el camino más directo), pero lo importante es que el usuario pueda:

1. Hacer el assessment completo (subir CV + responder preguntas)
2. Ver su Mapa de Habilidades con visualización interactiva
3. Compartir su Mapa como imagen
4. Pagar (Stripe) para desbloquear roles completos
5. Explorar roles con datos detallados (día a día, salarios, pros/contras)
6. Seleccionar/descartar/priorizar roles
7. Ver gap analysis y plan de estudio por rol seleccionado
8. Descargar CVs (genérico + específicos), cartas, y bullets de LinkedIn

### 5.2 Stack

- **Frontend:** Next.js 14+ (App Router) + Tailwind CSS
- **Backend:** Next.js API Routes (o FastAPI si preferido para IA)
- **DB:** Supabase (PostgreSQL + Auth + Storage)
- **IA:** API de Claude (Anthropic) — modelo Sonnet para velocidad, Opus para calidad de narrativa
- **Pagos:** Stripe Checkout (ya configurado)
- **Email:** Resend
- **Charts:** Recharts o Chart.js para radar chart interactivo
- **PDF:** react-pdf o Puppeteer para generar CVs descargables
- **Hosting:** Vercel
- **Analytics:** Plausible o PostHog (ya tiene key en vault)

### 5.3 Base de Datos (esquema completo)

```sql
-- Usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  country TEXT, -- ES, MX, CO, AR, etc.
  source TEXT, -- google_ads, organic, referral, social
  utm_campaign TEXT,
  utm_source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Perfiles (datos del intake)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  cv_raw_text TEXT,
  cv_file_url TEXT,
  intake_answers JSONB,
  parsed_cv JSONB, -- Output del parsing de CV por IA
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Mapas de habilidades generados
CREATE TABLE skills_maps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id),
  hard_skills JSONB, -- [{name, level, confidence, evidence}]
  soft_skills JSONB,
  domain_knowledge JSONB,
  narrative_text TEXT,
  summary_one_liner TEXT,
  share_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Catálogo de roles (curado, ~50-100 roles)
CREATE TABLE roles_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_es TEXT NOT NULL,
  category TEXT, -- tech, business, creative, operations, consulting
  day_to_day TEXT NOT NULL, -- Descripción real del día a día
  pros TEXT[] NOT NULL,
  cons TEXT[] NOT NULL, -- Honestos, no marketing
  required_hard_skills JSONB,
  required_soft_skills JSONB,
  salary_ranges JSONB, -- {ES: {min, max, currency}, MX: {...}, ...}
  demand_level TEXT, -- alta, media, baja
  growth_trend TEXT, -- growing, stable, declining
  growth_percentage INTEGER,
  remote_friendly BOOLEAN DEFAULT false,
  companies_hiring TEXT[], -- Empresas conocidas que contratan
  linkedin_search_template TEXT,
  infojobs_search_template TEXT,
  indeed_search_template TEXT,
  transition_from TEXT[], -- Roles desde los que típicamente se transiciona
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Matches usuario-rol
CREATE TABLE role_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skills_map_id UUID REFERENCES skills_maps(id),
  role_id UUID REFERENCES roles_catalog(id),
  match_percentage INTEGER,
  match_type TEXT, -- high_affinity, opportunity
  why_you_fit TEXT, -- Narrativa personalizada
  gaps JSONB, -- [{skill, current_level, required_level, how_to_close, resources, time_estimate}]
  user_status TEXT DEFAULT 'pending', -- pending, interested, discarded, priority
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Pedidos
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  plan TEXT NOT NULL, -- basic, complete
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  status TEXT DEFAULT 'pending', -- pending, paid, refunded
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Documentos generados
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id),
  doc_type TEXT NOT NULL, -- cv_generic, cv_specific, cover_letter, linkedin_bullets, elevator_pitch, gap_plan
  role_id UUID REFERENCES roles_catalog(id), -- NULL para genérico
  content JSONB, -- Contenido estructurado
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 5.4 Prompts de IA (los 4 principales)

**[Se mantienen los mismos 4 prompts del documento de arquitectura anterior: Parsing de CV, Generación del Mapa, Matching de Roles, Generación de CV. Referir al documento `reskilling_arquitectura_openclaw.md` para los prompts completos.]**

### 5.5 Catálogo de Roles Seed (50 roles iniciales)

**Tech & Digital (15):** Product Manager, UX Designer, UX Researcher, Data Analyst, Business Analyst, Scrum Master, QA Tester, Technical Writer, Customer Success Manager, Solutions Engineer, Growth Marketer, SEO Specialist, Content Strategist, Community Manager, CRM Manager

**Business & Operations (12):** Project Manager, Operations Manager, Account Manager, Business Development Rep, Sales Manager, Procurement Specialist, Supply Chain Analyst, HR Business Partner, Talent Acquisition, Learning & Development, Office Manager, Executive Assistant

**Creative & Communication (9):** Copywriter, Brand Strategist, PR Specialist, Event Manager, Social Media Manager, Video Producer, Podcast Producer, Graphic Designer (digital), Motion Designer

**Consulting & Advisory (6):** Management Consultant, Strategy Analyst, Change Management Specialist, Process Improvement, Training Facilitator, Career Coach

**Emerging & Remote (8):** Revenue Operations, Customer Experience Designer, AI Prompt Engineer, No-Code Developer, Virtual Assistant (premium), Online Course Creator, Freelance Consultant, Partnership Manager

**Cada rol necesita:** título en inglés y español, descripción del día a día (200-300 palabras, realista), 3-4 pros, 3-4 contras honestos, skills requeridos con niveles, salarios por país (ES, MX, CO, AR, remoto), nivel de demanda, trend de crecimiento, 3-5 empresas que contratan, templates de búsqueda de empleo.

### 5.6 Prioridad de Desarrollo

**Sprint 1 — Validación (días 1-5):**
- [ ] Landing page con copy y CTA
- [ ] Formulario de intake funcional (CV upload + preguntas)
- [ ] Backend: parsing CV + generación Mapa de Habilidades
- [ ] Visualización del Mapa (radar chart + texto + skills con niveles)
- [ ] Botón compartir → generar PNG
- [ ] Stripe Checkout para Plan Básico (€29) y Completo (€39)
- [ ] Post-pago: "Tu análisis completo estará listo en 24h" (entrega manual inicialmente)
- [ ] Google Ads configurados

**Sprint 2 — Plataforma core (días 6-15):**
- [ ] Pantalla de roles completa con datos, sistema de selección/descarte/prioridad
- [ ] Gap analysis por rol seleccionado
- [ ] Auth (magic link email via Supabase)
- [ ] Secuencia de emails automática (4 emails)

**Sprint 3 — Documentos y polish (días 16-25):**
- [ ] Generación de CVs (genérico + específicos)
- [ ] Cartas de presentación, LinkedIn bullets, elevator pitch
- [ ] Preview de documentos en pantalla + descarga PDF/DOCX
- [ ] Plan de gaps consolidado

**Sprint 4 — Crecimiento (días 26+):**
- [ ] 100-200 páginas SEO programáticas
- [ ] Schema markup (Product, FAQPage, HowTo)
- [ ] Meta Ads LATAM
- [ ] A/B testing de landing y paywall
- [ ] Optimización de prompts según feedback

---

## PARTE 6: EMAILS AUTOMÁTICOS

### Secuencia post-assessment (usuario free)

**Email 1 — Inmediato:** "Tu Mapa de Habilidades está listo 🗺️"
- Preview del radar chart como imagen
- Link a la plataforma
- CTA: "Ver mi Mapa completo"

**Email 2 — Día 2:** "Encontramos 3 roles perfectos para tu perfil"
- Nombre del top 3 roles + % match (sin detalles)
- CTA: "Ver mis roles → (desde €29)"

**Email 3 — Día 5:** "Tu plan de recolocación completo"
- Propuesta del Plan Completo
- Anclaje: "Lo que un coach cobra en €300..."
- CTA: "Obtener mi plan → (€39)"

**Email 4 — Día 10:** "Un regalo antes de que te vayas"
- 15% descuento temporal (€39 → €33)
- Urgencia: "Válido 48 horas"

### Email post-compra
- "Todo está listo 🎉"
- Link directo al dashboard
- "¿Conoces a alguien que necesite esto? Comparte tu Mapa →"

---

*Este documento es la guía definitiva. D-Business puede ejecutar Sprint 1 inmediatamente. Los prompts de IA detallados están en el documento de arquitectura adjunto (`reskilling_arquitectura_openclaw.md`). El catálogo de roles seed debe crearse como primera tarea del Sprint 2.*

*Siguiente paso: D-Business arranca Sprint 1. Daniel configura Google Ads. Validación en 14 días.*
