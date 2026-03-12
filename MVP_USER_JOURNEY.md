# Reskilling AI Coach — MVP User Journey
## Documento completo del flujo de usuario

**Fecha:** 2026-03-11
**Versión:** 1.0
**Estado:** Diseño (no publicado)

---

## 1. VISIÓN GENERAL

### Qué es el producto
Una web app que guía a profesionales hispanohablantes (30-55 años) que no saben para qué son buenos a través de:
1. **Autoconocimiento** → Descubren sus habilidades reales
2. **Matching** → Ven qué roles profesionales les encajan
3. **Acción** → Obtienen CVs y materiales para aplicar

### Usuario objetivo
- **Demografía:** 30-55 años, hispanohablante (España + LATAM)
- **Situación:** Varios trabajos en su carrera, o mucho tiempo en uno solo
- **Problema:** No sabe identificar sus habilidades ni hacia dónde moverse
- **Trigger:** Despedido, quemado, estancado, o simplemente perdido

### Modelo de negocio
| Tier | Qué incluye | Precio |
|------|-------------|--------|
| **FREE** | Mapa de Habilidades (motor viral) | €0 |
| **Pack Básico** | Mapa de Roles personalizado (5-8 roles) | €29 |
| **Pack Completo** | Roles + CV genérico + 3 CVs específicos + cartas + pitches | €49 |

---

## 2. USER JOURNEY COMPLETO

### FASE 0: Descubrimiento (cómo llega el usuario)

```
┌─────────────────────────────────────────────────────────────┐
│                    CANALES DE ENTRADA                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📱 Meta Ads          🔍 SEO               🔗 Viral         │
│  "¿Estancado en      "cómo cambiar de    "María compartió  │
│   tu carrera?"        carrera a los 40"   su Mapa"         │
│                                                             │
│  Target: 30-55        Long-tail pages     Imagen PNG del   │
│  años, intereses      (200+ páginas)      Mapa compartida  │
│  carrera/empleo                           en LinkedIn/WA   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                     carrera.negoia.com
```

**Canales principales:**
1. **Meta Ads** — Campañas de adquisición pagada
2. **SEO** — Páginas programáticas tipo `/transicion/profesor-a-ux-designer`
3. **Viral** — Usuarios que comparten su Mapa de Habilidades

---

### FASE 1: Landing Page

**URL:** `carrera.negoia.com` (raíz)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🏠 LANDING PAGE                                            │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │   "Descubre tus habilidades ocultas y los roles      │  │
│  │    donde mejor encajas"                               │  │
│  │                                                       │  │
│  │   [━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]   │  │
│  │   │  📧 Tu email                              │      │  │
│  │   [━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]   │  │
│  │                                                       │  │
│  │   [ 🚀 Descubre tu Mapa gratis → ]                   │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │ PASO 1  │  │ PASO 2  │  │ PASO 3  │                     │
│  │ Sube CV │→→│Descubre │→→│Encuentra│                     │
│  │         │  │habilid. │  │tu camino│                     │
│  └─────────┘  └─────────┘  └─────────┘                     │
│                                                             │
│  💬 "Lo que un coach te cobra en €300, aquí desde €29"     │
│                                                             │
│  ❓ FAQ (3-4 preguntas)                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Elementos clave:**
- Hero con propuesta de valor clara
- Input de email como primera acción (baja fricción)
- 3 pasos visuales del proceso
- Anclaje de precio vs. coach humano
- Social proof (cuando exista): testimonios, número de usuarios
- FAQ mínimo

**Métricas a trackear:**
- Visitantes únicos
- Tasa de click en CTA principal
- Emails capturados

---

### FASE 2: Intake Flow (Registro + Cuestionario)

**URL:** `carrera.negoia.com/start`

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  📝 INTAKE FLOW                                             │
│                                                             │
│  PANTALLA 1/10: Datos básicos                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │   ¿Cómo te llamas?                                   │  │
│  │   [━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]                 │  │
│  │                                                       │  │
│  │   ¿En qué país estás?                                │  │
│  │   [🇪🇸 España     ▼]                                  │  │
│  │                                                       │  │
│  │                              [ Siguiente → ]          │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 10%              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  PANTALLA 2/10: Subir CV                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │   📄 Sube tu CV (PDF o Word)                         │  │
│  │                                                       │  │
│  │   ┌─────────────────────────────────────────────┐    │  │
│  │   │                                             │    │  │
│  │   │     🗂️  Arrastra tu CV aquí                │    │  │
│  │   │         o haz click para buscar             │    │  │
│  │   │                                             │    │  │
│  │   └─────────────────────────────────────────────┘    │  │
│  │                                                       │  │
│  │   💡 Tu CV nos ayuda a detectar habilidades que      │  │
│  │      quizás no sabías que tenías                     │  │
│  │                                                       │  │
│  │                              [ Siguiente → ]          │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 20%              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Las 8 preguntas del cuestionario (una por pantalla, estilo Typeform):**

| # | Pregunta | Tipo de respuesta |
|---|----------|-------------------|
| 1 | ¿Cuántos años de experiencia profesional tienes? | Selector: 1-5, 5-10, 10-15, 15-20, 20+ |
| 2 | ¿En cuántos trabajos/empresas diferentes has estado? | Selector: 1-2, 3-4, 5-7, 8+ |
| 3 | De todos tus trabajos, ¿en cuál te sentías más tú? | Texto libre (2-3 frases) |
| 4 | ¿Qué se te da bien que la gente siempre te pide? | Texto libre |
| 5 | ¿Qué parte de tu trabajo actual/último te daba más energía? | Texto libre |
| 6 | ¿Y qué parte te quitaba energía o te aburría? | Texto libre |
| 7 | Si pudieras diseñar tu trabajo ideal, ¿cómo sería tu día a día? | Texto libre |
| 8 | ¿Qué te frena ahora mismo de dar el siguiente paso? | Multi-select: No sé para qué soy bueno / Síndrome del impostor / No sé qué opciones tengo / Miedo al cambio / Tema económico / Otro |

**UX crítica:**
- Cada pregunta en pantalla completa
- Transiciones suaves entre preguntas
- Barra de progreso visible
- Debe sentirse como una CONVERSACIÓN, no un formulario burocrático
- Opción de "saltar" para preguntas de texto libre (pero incentivando responder)

**Métricas a trackear:**
- Tasa de inicio del intake
- Drop-off por pregunta (funnel)
- Tasa de completion (llegan al final)
- % que sube CV vs. skip

---

### FASE 3: Procesamiento (Lo que pasa en el backend)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ⏳ PANTALLA DE PROCESAMIENTO                               │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │              🔄 Analizando tu perfil...              │  │
│  │                                                       │  │
│  │              ████████████░░░░░░░░░░░ 65%             │  │
│  │                                                       │  │
│  │   ✅ Extrayendo experiencias de tu CV                │  │
│  │   ✅ Identificando habilidades técnicas              │  │
│  │   🔄 Analizando habilidades blandas                  │  │
│  │   ⏳ Generando tu narrativa personal                 │  │
│  │   ⏳ Creando imagen compartible                      │  │
│  │                                                       │  │
│  │   💡 Sabías que el 73% de las habilidades valiosas   │  │
│  │      son las que damos por sentadas?                 │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Procesos en backend (15-30 segundos):**

1. **Parsing del CV** (Claude API)
   ```json
   {
     "experiencias": [
       {"empresa": "...", "rol": "...", "duracion_meses": 24, "responsabilidades": [...], "sector": "..."}
     ],
     "formacion": [...],
     "idiomas": [...],
     "skills_mencionados": [...],
     "resumen_trayectoria": "..."
   }
   ```

2. **Generación del Mapa de Habilidades** (Claude API)
   - Cruza datos del CV con respuestas del intake
   - Genera hard skills con nivel (1-5) y confianza
   - Genera soft skills con nivel (1-5) y confianza
   - Detecta dominios de industria
   - Crea "Mapa de Confianza": lo que da energía = alta confianza
   - Escribe texto narrativo personalizado (300-500 palabras)

3. **Generación de imagen compartible**
   - Renderiza el Mapa como infografía PNG
   - Optimizada para compartir en LinkedIn/WhatsApp
   - Incluye nombre del usuario y resumen visual

---

### FASE 4: Resultados — Mapa de Habilidades (GRATIS)

**URL:** `carrera.negoia.com/results/[user_id]` (o token único)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🎯 TU MAPA DE HABILIDADES                                  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │   Hola María,                                        │  │
│  │                                                       │  │
│  │   En tus 12 años de trayectoria has desarrollado     │  │
│  │   un perfil único que combina gestión operativa      │  │
│  │   con visión estratégica...                          │  │
│  │                                                       │  │
│  │   [Texto narrativo personalizado de 300-500 palabras │  │
│  │    que valida al usuario y le hace sentir visto]     │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            🔧 HABILIDADES TÉCNICAS                  │    │
│  │                                                     │    │
│  │  Gestión de proyectos     ████████████░░ 4/5  🔥   │    │
│  │  Análisis de datos        ██████████░░░░ 3/5       │    │
│  │  Excel avanzado           ████████████░░ 4/5  🔥   │    │
│  │  Presentaciones           ██████████████ 5/5  🔥   │    │
│  │  SQL básico               ██████░░░░░░░░ 2/5       │    │
│  │                                                     │    │
│  │  🔥 = Alta confianza (te da energía)               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            💡 HABILIDADES BLANDAS                   │    │
│  │                                                     │    │
│  │  Comunicación             ██████████████ 5/5  🔥   │    │
│  │  Liderazgo de equipos     ████████████░░ 4/5  🔥   │    │
│  │  Resolución de conflictos ██████████░░░░ 3/5       │    │
│  │  Pensamiento estratégico  ████████████░░ 4/5       │    │
│  │  Adaptabilidad            ████████████░░ 4/5  🔥   │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            🏢 DOMINIOS DE INDUSTRIA                 │    │
│  │                                                     │    │
│  │  Retail / Distribución        ████████████ Profundo │    │
│  │  Consultoría                  ████████░░░░ Moderado │    │
│  │  Tecnología / SaaS            ██████░░░░░░ Básico   │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                     │    │
│  │   📷 COMPARTIR MI MAPA                              │    │
│  │                                                     │    │
│  │   [ 🔗 LinkedIn ]  [ 💬 WhatsApp ]  [ ⬇️ Descargar ]│    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ═══════════════════════════════════════════════════════   │
│                                                             │
│   Ahora que sabes LO QUE SABES HACER...                    │
│   ¿Quieres saber PARA QUÉ ROLES eres perfecto?             │
│                                                             │
│   [ 🎯 Descubrir mis Roles → ]  (desde €29)                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Elementos clave:**
- Texto narrativo PRIMERO (conexión emocional)
- Visualización clara de skills con niveles
- Indicador de "confianza" (🔥) basado en respuestas de energía
- Botones de compartir prominentes (VIRAL LOOP)
- CTA claro al paywall

**El PNG compartible:**
```
┌─────────────────────────────────────────┐
│                                         │
│   🎯 MAPA DE HABILIDADES               │
│   ─────────────────────                │
│   María García                          │
│                                         │
│   "Profesional con perfil híbrido      │
│    entre gestión y análisis, con       │
│    fortaleza excepcional en            │
│    coordinación de equipos"            │
│                                         │
│   TOP 3 HABILIDADES:                   │
│   🔥 Comunicación (5/5)                │
│   🔥 Gestión de proyectos (4/5)        │
│   🔥 Liderazgo de equipos (4/5)        │
│                                         │
│   ─────────────────────────────────    │
│   carrera.negoia.com                   │
│   Descubre el tuyo gratis →            │
│                                         │
└─────────────────────────────────────────┘
```

---

### FASE 5: Paywall — Upgrade

**URL:** `carrera.negoia.com/upgrade`

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  💼 ELIGE TU PACK                                           │
│                                                             │
│  ┌──────────────────────────┐  ┌──────────────────────────┐ │
│  │                          │  │  ⭐ MÁS POPULAR          │ │
│  │   PACK BÁSICO            │  │                          │ │
│  │                          │  │   PACK COMPLETO          │ │
│  │   €29                    │  │                          │ │
│  │   pago único             │  │   €49                    │ │
│  │                          │  │   pago único             │ │
│  │   ─────────────────      │  │                          │ │
│  │                          │  │   ─────────────────      │ │
│  │   ✅ Tu Mapa de Roles    │  │                          │ │
│  │      personalizado       │  │   ✅ Todo del Pack       │ │
│  │      (5-8 roles)         │  │      Básico              │ │
│  │                          │  │                          │ │
│  │   ✅ Para cada rol:      │  │   ✅ CV genérico         │ │
│  │      • Día a día         │  │      optimizado (ATS)    │ │
│  │      • Pros y contras    │  │                          │ │
│  │      • Rango salarial    │  │   ✅ 3 CVs específicos   │ │
│  │      • % de match        │  │      por rol             │ │
│  │                          │  │                          │ │
│  │   ✅ Gap analysis:       │  │   ✅ 3 cartas de         │ │
│  │      qué te falta y      │  │      presentación        │ │
│  │      cómo aprenderlo     │  │                          │ │
│  │                          │  │   ✅ Bullet points       │ │
│  │   ✅ PDF descargable     │  │      para LinkedIn       │ │
│  │                          │  │                          │ │
│  │   ✅ Email de entrega    │  │   ✅ Elevator pitch      │ │
│  │                          │  │      de 30 seg por rol   │ │
│  │                          │  │                          │ │
│  │   [ Elegir Básico ]      │  │   [ Elegir Completo ]    │ │
│  │                          │  │                          │ │
│  └──────────────────────────┘  └──────────────────────────┘ │
│                                                             │
│  💡 Lo que un coach te cobra en €300+, aquí desde €29      │
│                                                             │
│  🔒 Pago seguro con Stripe · Satisfacción garantizada      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Proceso de pago:**
1. Usuario elige pack → Stripe Checkout (redirect o embedded)
2. Pago completado → Redirect a `/dashboard/[user_id]`
3. Backend procesa matching de roles y genera documentos
4. Usuario ve resultados + recibe email con todo

---

### FASE 6: Dashboard de Resultados (Post-pago)

**URL:** `carrera.negoia.com/dashboard/[user_id]`
**Acceso:** Magic link por email (expira en 7 días)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  👋 Hola María                           [ 🔔 ] [ ⚙️ ]     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  📍 NAVEGACIÓN                                      │    │
│  │                                                     │    │
│  │  [ Mi Mapa ]  [ Mis Roles ]  [ Mis Documentos ]    │    │
│  │      ✓           ✓ NUEVO        ✓ NUEVO            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ═══════════════════════════════════════════════════════   │
│  📊 MIS ROLES (Pack Básico/Completo)                        │
│  ═══════════════════════════════════════════════════════   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  🥇 Product Manager                      92% match  │    │
│  │  ───────────────────────────────────────────────── │    │
│  │                                                     │    │
│  │  Por qué encajas:                                  │    │
│  │  "María, tu experiencia gestionando equipos        │    │
│  │   cross-funcionales en retail te da una base       │    │
│  │   perfecta para PM. Tu fortaleza en comunicación   │    │
│  │   y pensamiento estratégico son exactamente..."    │    │
│  │                                                     │    │
│  │  📅 Día a día:                                     │    │
│  │  "Definir roadmap de producto, priorizar features, │    │
│  │   coordinar con engineering y design, analizar     │    │
│  │   métricas de uso, hablar con clientes..."         │    │
│  │                                                     │    │
│  │  ✅ Pros                    ❌ Contras              │    │
│  │  • Alta demanda            • Alta presión          │    │
│  │  • Buen salario            • Muchas reuniones      │    │
│  │  • Impacto visible         • Responsabilidad sin   │    │
│  │  • Crecimiento rápido        autoridad directa     │    │
│  │                                                     │    │
│  │  💰 Salario España: €45K - €80K                    │    │
│  │  💰 Salario LATAM: $25K - $50K USD                 │    │
│  │                                                     │    │
│  │  ⚠️ Gap Analysis:                                  │    │
│  │  ┌─────────────────────────────────────────────┐   │    │
│  │  │ Skill            Tienes   Necesitas  Cómo   │   │    │
│  │  │ ─────────────────────────────────────────── │   │    │
│  │  │ Metodologías     2/5      4/5       Curso   │   │    │
│  │  │ ágiles                              Scrum.org│   │    │
│  │  │                                             │   │    │
│  │  │ Métricas de      2/5      3/5       Curso   │   │    │
│  │  │ producto                            Reforge │   │    │
│  │  └─────────────────────────────────────────────┘   │    │
│  │                                                     │    │
│  │  [ 🔗 Buscar en LinkedIn ]  [ 🔗 Buscar en InfoJobs]│    │
│  │                                                     │    │
│  │  [ ▼ Ver más detalles ]                            │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  🥈 Customer Success Manager             87% match  │    │
│  │  [ ▼ Expandir ]                                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  🥉 Business Development Manager         84% match  │    │
│  │  [ ▼ Expandir ]                                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ... (5-8 roles total)                                      │
│                                                             │
│  ═══════════════════════════════════════════════════════   │
│  📄 MIS DOCUMENTOS (Solo Pack Completo)                     │
│  ═══════════════════════════════════════════════════════   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                     │    │
│  │  📄 CV Genérico (ATS-optimizado)                   │    │
│  │     [ 👁️ Preview ]  [ ⬇️ Descargar PDF ]           │    │
│  │                                                     │    │
│  │  📄 CV para Product Manager                        │    │
│  │     [ 👁️ Preview ]  [ ⬇️ Descargar PDF ]           │    │
│  │                                                     │    │
│  │  📄 CV para Customer Success Manager               │    │
│  │     [ 👁️ Preview ]  [ ⬇️ Descargar PDF ]           │    │
│  │                                                     │    │
│  │  📄 CV para Business Development                   │    │
│  │     [ 👁️ Preview ]  [ ⬇️ Descargar PDF ]           │    │
│  │                                                     │    │
│  │  ───────────────────────────────────────────────   │    │
│  │                                                     │    │
│  │  ✉️ Carta de presentación - Product Manager        │    │
│  │     [ 👁️ Preview ]  [ 📋 Copiar ]  [ ⬇️ PDF ]      │    │
│  │                                                     │    │
│  │  ✉️ Carta de presentación - CS Manager             │    │
│  │     [ 👁️ Preview ]  [ 📋 Copiar ]  [ ⬇️ PDF ]      │    │
│  │                                                     │    │
│  │  ✉️ Carta de presentación - BD Manager             │    │
│  │     [ 👁️ Preview ]  [ 📋 Copiar ]  [ ⬇️ PDF ]      │    │
│  │                                                     │    │
│  │  ───────────────────────────────────────────────   │    │
│  │                                                     │    │
│  │  💬 Bullet points LinkedIn                         │    │
│  │     [ 📋 Copiar al portapapeles ]                  │    │
│  │                                                     │    │
│  │  🎤 Elevator Pitch - Product Manager (30 seg)      │    │
│  │     "Soy María, y en los últimos 12 años he..."    │    │
│  │     [ 📋 Copiar ]                                  │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. SECUENCIA DE EMAILS AUTOMÁTICOS

### Email 1 — Inmediato (post-registro free)
**Trigger:** Usuario completa intake y genera Mapa
**Asunto:** `[Nombre], tu Mapa de Habilidades está listo 🎯`

```
Hola María,

Tu Mapa de Habilidades está listo.

[IMAGEN: Preview del Mapa]

→ Ver mi Mapa completo

En tu Mapa encontrarás:
• Tus 5 habilidades técnicas principales (con nivel)
• Tus 5 habilidades blandas principales
• Tu "Mapa de Confianza": lo que te da energía vs. lo que te drena
• Un texto personalizado sobre tu perfil único

¿Conoces a alguien que también esté buscando claridad?
Comparte tu Mapa y ayúdale a descubrir el suyo.

—
Carrera by NegoIA
```

### Email 2 — Día 2 (nurturing hacia pago)
**Asunto:** `[Nombre], encontramos 3 roles perfectos para tu perfil`

```
Hola María,

Analizamos tu Mapa de Habilidades y encontramos 3 roles 
donde encajas >80%:

🥇 [Rol 1] — 92% match
🥈 [Rol 2] — 87% match
🥉 [Rol 3] — 84% match

¿Quieres saber qué harías en cada uno, cuánto pagan,
y qué te falta para conseguirlos?

→ Ver mis Roles (Pack Básico, €29)

—
Carrera by NegoIA
```

### Email 3 — Día 5 (push al Pack Completo)
**Asunto:** `¿Y si en 48h tuvieras tus CVs listos para aplicar?`

```
Hola María,

Imagina esto:
• Saber exactamente qué roles buscar
• Tener CVs optimizados para cada uno
• Cartas de presentación escritas
• Tu pitch de 30 segundos practicado

Un coach de carrera te cobraría €300+ por esto.
Aquí lo tienes por €49.

→ Obtener mi Pack Completo (€49)

—
Carrera by NegoIA
```

### Email 4 — Día 10 (última oportunidad + descuento)
**Asunto:** `20% de descuento en tu Pack (solo 48h)`

```
Hola María,

Han pasado 10 días desde que generaste tu Mapa.

Si todavía no has dado el siguiente paso, 
te dejo un descuento especial:

Pack Básico: €29 → €23
Pack Completo: €49 → €39

Solo válido 48 horas.

→ Obtener mi Pack con descuento

—
Carrera by NegoIA
```

### Email 5 — Post-compra (inmediato)
**Trigger:** Pago completado
**Asunto:** `Tu [Pack Básico/Completo] está listo 🎉`

```
Hola María,

¡Gracias por confiar en nosotros!

Tu Pack [Básico/Completo] está listo en tu dashboard:

→ Ver mi Dashboard

También te adjuntamos todos los PDFs a este email
por si prefieres tenerlos guardados.

¿Conoces a alguien que necesite esto?
Comparte tu Mapa de Habilidades y ayúdale.

Mucha suerte en tu siguiente paso,
—
Carrera by NegoIA
```

---

## 4. CATÁLOGO DE ROLES (50 roles iniciales)

El backend necesita una tabla `roles_catalog` con estos roles como seed:

### Tech & Digital (15)
1. Product Manager
2. UX Designer
3. UX Researcher
4. Data Analyst
5. Business Analyst
6. Scrum Master
7. QA Tester
8. Technical Writer
9. Customer Success Manager
10. Solutions Engineer
11. Growth Marketer
12. SEO Specialist
13. Content Strategist
14. Community Manager
15. CRM Manager

### Business & Operations (12)
16. Project Manager
17. Operations Manager
18. Account Manager
19. Business Development Manager
20. Sales Manager
21. Procurement Specialist
22. Supply Chain Analyst
23. HR Business Partner
24. Talent Acquisition Specialist
25. Learning & Development Manager
26. Office Manager
27. Executive Assistant

### Creative & Communication (9)
28. Copywriter
29. Brand Strategist
30. PR Specialist
31. Event Manager
32. Social Media Manager
33. Video Producer
34. Podcast Producer
35. Graphic Designer (digital)
36. Motion Designer

### Consulting & Advisory (5)
37. Management Consultant
38. Strategy Analyst
39. Change Management Consultant
40. Process Improvement Specialist
41. Training Facilitator

### Coaching & Development (3)
42. Career Coach
43. Executive Coach
44. Corporate Trainer

### Emerging & Remote-friendly (6)
45. Revenue Operations Manager
46. Customer Experience Designer
47. AI Prompt Engineer
48. No-Code Developer
49. Virtual Assistant (premium)
50. Online Course Creator

**Para cada rol, el catálogo incluye:**
- `title` / `title_es`
- `category`
- `description_day_to_day`
- `pros` / `cons`
- `required_hard_skills` / `required_soft_skills`
- `salary_ranges` (por país: ES, MX, CO, AR, CL)
- `seniority_levels`
- `remote_friendly`
- `growth_trend`
- `linkedin_search_url_template`
- `transition_from` (roles típicos de origen)

---

## 5. STACK TÉCNICO RESUMIDO

| Componente | Tecnología | Estado actual |
|------------|------------|---------------|
| Frontend | Next.js 14+ (App Router) | ✅ Existe (carrera-ia-v1) |
| Styling | Tailwind CSS | ✅ Configurado |
| Backend/API | Next.js API Routes | ⏳ Por construir |
| Base de datos | Supabase (PostgreSQL) | ✅ Configurado |
| IA | Claude API (Anthropic) | ✅ Disponible |
| Pagos | Stripe Checkout | ⏳ Por conectar |
| Email | Resend | ✅ Configurado (d@negoia.com) |
| PDF Generation | Puppeteer o react-pdf | ⏳ Por implementar |
| Hosting | Vercel | ✅ Deployado |
| Analytics | Por definir | ⏳ Pendiente |

---

## 6. MÉTRICAS CLAVE

### Funnel principal
1. Visita landing → % click en CTA
2. Inicio intake → % completion
3. Mapa generado → % share (viral)
4. Visita upgrade → % click
5. Inicio pago → % completion
6. Compra completada → revenue

### KPIs semanales
- Registros free / semana
- Mapas generados / semana
- Mapas compartidos / semana (proxy de viralidad)
- Conversión free → pago (%)
- Revenue / semana
- CPA por comprador (cuando haya ads)
- Coste API IA / usuario

### Targets iniciales (post-lanzamiento)
- Semana 1-2: 100+ registros free, 5+ pagos
- Mes 1: 500+ registros free, 25+ pagos, €800+ revenue
- Mes 3: 2000+ registros free, 100+ pagos, €3500+ revenue

---

## 7. PRIORIDAD DE DESARROLLO

### Sprint 1 (Semanas 1-3): MVP con monetización
**Must have:**
- [ ] Landing page (ya existe, mejorar CTA)
- [ ] Formulario de intake (8 preguntas + subida CV)
- [ ] Backend: parsing CV + generación Mapa
- [ ] Visualización del Mapa (web)
- [ ] Export PNG compartible
- [ ] Página de pricing/upgrade
- [ ] Integración Stripe
- [ ] Email de confirmación post-registro

**Nice to have Sprint 1:**
- [ ] Animación de "procesando"
- [ ] Botón compartir LinkedIn/WhatsApp

### Sprint 2 (Semanas 4-6): Entregables de pago
**Must have:**
- [ ] Matching de roles (backend)
- [ ] Panel de resultados con roles
- [ ] Generación de CVs
- [ ] Generación de cartas
- [ ] PDFs descargables
- [ ] Secuencia de emails (4 emails)
- [ ] Email post-compra

**Nice to have Sprint 2:**
- [ ] Elevator pitch por rol
- [ ] Bullet points LinkedIn
- [ ] Links a búsquedas de empleo

### Sprint 3 (Semanas 7-12): Crecimiento
- [ ] 200 páginas SEO programáticas
- [ ] Meta Ads setup
- [ ] A/B testing landing
- [ ] Dashboard de métricas
- [ ] Optimización de prompts
- [ ] Email de descuento (día 10)

---

## 8. PRÓXIMOS PASOS INMEDIATOS

1. **TRÁFICO (prioridad):** Configurar Meta Ads → validar interés
2. **MVP:** Construir intake flow + backend de Mapa de Habilidades
3. **VALIDACIÓN:** 200+ signups → decidir si construir el resto

---

*Documento creado: 2026-03-11*
*Última actualización: 2026-03-11*
*Versión: 1.0*
