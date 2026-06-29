# GEO Audit Report: Teo Cicciari — teocicciari.com.ar

**Fecha de auditoría:** 2026-06-29
**URL:** https://teocicciari.com.ar
**Tipo de negocio:** Agencia/Servicios (freelance) — diseño web + clases de ajedrez (híbrido, dominante = servicios)
**Páginas analizadas:** 1 página principal (single-page con vistas) + recursos GEO (llms.txt, robots.txt, sitemap.xml)

---

## Resumen ejecutivo

**GEO Score global: 74/100 (Fair — al borde de Good)**

El sitio tiene una base GEO muy por encima del promedio: HTML estático renderizado en servidor (todo el contenido es visible para crawlers sin ejecutar JS), llms.txt completo, JSON-LD con `@graph` (Person + ProfessionalService + FAQPage), canonical, Open Graph y Twitter Cards. La fortaleza real es la infraestructura técnica. Los dos frenos son: (1) **autoridad de marca como diseñador web** casi inexistente fuera del propio sitio —la presencia de "Teo Cicciari" en la web está dominada por ajedrez (FIDE, Lichess, ChessBase, prensa)— y (2) **datos estructurados incompletos** con una **inconsistencia de handle de Instagram** entre el JSON-LD y el llms.txt.

### Desglose de puntaje

| Categoría | Score | Peso | Ponderado |
|---|---|---|---|
| AI Citability | 78/100 | 25% | 19.5 |
| Brand Authority | 62/100 | 20% | 12.4 |
| Content E-E-A-T | 72/100 | 20% | 14.4 |
| Technical GEO | 88/100 | 15% | 13.2 |
| Schema & Structured Data | 80/100 | 10% | 8.0 |
| Platform Optimization | 65/100 | 10% | 6.5 |
| **GEO Score global** | | | **74/100** |

---

## Issues críticos (arreglar ya)

Ninguno de bloqueo. El sitio es indexable, los crawlers de IA tienen acceso y hay datos estructurados válidos.

---

## Issues de prioridad ALTA (esta semana)

1. **Inconsistencia de handle de Instagram (daña el reconocimiento de entidad).**
   El JSON-LD declara `https://www.instagram.com/teocicciari.web/` (`sameAs`), pero el llms.txt enlaza `https://www.instagram.com/__.teo.____/`. Para un modelo de IA, dos perfiles distintos = señal de entidad confusa. Hay que unificar al handle real y único.

2. **`Person` schema sin domicilio/área local.** El contenido dice claramente "El Bolsón, Río Negro, Argentina", pero el schema no tiene `address` ni `homeLocation`. Agregar `PostalAddress` mejora el reconocimiento como entidad local (clave porque vendés a hospedajes regionales).

3. **`sameAs` incompleto.** Tu presencia de marca más fuerte hoy es ajedrez y no está enlazada desde el schema: faltan Lichess (`lichess.org/@/Wubadubalublub`), ChessBase y, si querés, el perfil FIDE ya está. Sumar estos perfiles consolida la entidad "Teo Cicciari".

---

## Issues de prioridad MEDIA (este mes)

4. **sitemap.xml desactualizado y pobre.** `lastmod` quedó en 2026-06-10 y solo lista 3 URLs (home + 2 diseños). No incluye `privacidad.html` ni `manual-marca.html`. Actualizar fechas y completar.

5. **robots.txt no nombra crawlers de IA explícitamente.** Funcionalmente `Allow: /` ya los habilita, pero declarar GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc. de forma explícita es una señal de intención clara y a prueba de cambios futuros de defaults.

6. **Falta `speakable` en el JSON-LD.** Para asistentes de voz / respuestas habladas, marcar las secciones citables (descripción de servicio, FAQ) con `speakable` SpecificationSchema.

7. **Autoridad de marca como diseñador web = casi nula fuera del sitio.** Búsquedas de "Teo Cicciari diseñador web" devuelven básicamente tu propio sitio + GitHub. No hay reseñas de terceros, ni menciones en directorios, ni casos publicados fuera de tu dominio. Es el techo real de tu GEO score y no se arregla con código (ver plan).

---

## Issues de prioridad BAJA (cuando se pueda)

8. **`ProfessionalService` sin `aggregateRating`/`review`.** Tenés testimonios en la página ("Lo que dicen los clientes") pero no están marcados como `Review`. Marcarlos da estrellas potenciales en respuestas de IA.
9. **Dato FIDE inconsistente entre fuentes** (la página dice 1987; fuentes externas 1867/1964). No es crítico, pero conviene que el número de la página coincida con tu perfil FIDE oficial vigente.
10. **`og:image` / `twitter:image` apuntan a overview.png** — verificar que sea una imagen representativa y con buen ratio (1200×630).

---

## Deep dives por categoría

### AI Citability (78/100)
Contenido muy citable: precios con planes nombrados, proceso de trabajo en 4 pasos, FAQ con respuestas autocontenidas, condiciones de pago explícitas (50/50, transferencia/MP/PayPal), tiempos de entrega (~2 semanas). Todo en HTML estático = extraíble sin JS. Mejora posible: párrafos de apertura tipo "respuesta directa" en cada sección (definición en la primera oración) para que el modelo pueda citar sin reescribir.

### Brand Authority (62/100)
Asimetría marcada. **Ajedrez:** entidad fuerte y verificable (FIDE 140821, Lichess, ChessBase, ChessBites, prensa local Red43/Canal12). **Diseño web:** prácticamente solo tu propio dominio + GitHub. Los modelos de IA recomiendan a quien aparece citado por terceros; hoy te reconocen más como ajedrecista que como diseñador.

### Content E-E-A-T (72/100)
Experiencia y expertise bien señaladas: 10 años enseñando, Elo FIDE, formación en FAMAF (UNC), portfolio real con sitios en vivo (tiaursula.com.ar, ikeuken.com.ar, etc.), ubicación concreta. Falta: bio de autor con credenciales enlazadas a fuentes externas, y citas/enlaces salientes a fuentes autoritativas. Los proyectos en vivo son tu mejor activo E-E-A-T.

### Technical GEO (88/100)
Lo más fuerte del sitio. Estático/SSR, llms.txt completo y bien estructurado, robots.txt limpio con sitemap declarado, canonical correcto, OG + Twitter Cards, multi-idioma (es/en con i18n.js), fonts locales (woff2). Único pendiente real: sitemap desactualizado.

### Schema & Structured Data (80/100)
JSON-LD con `@graph` uniendo Person + ProfessionalService + FAQPage y referencias cruzadas (`provider` → `#teo`): bien hecho. Restan: `address` en Person, `sameAs` completo y consistente, `Review`/`aggregateRating` en el servicio, y `speakable`.

### Platform Optimization (65/100)
Buena cobertura en plataformas de ajedrez que los modelos consumen. Para diseño web: ausente en directorios/comunidades (no hay perfil en plataformas de freelance, ni menciones en Reddit/foros, ni reseñas de Google Business). Ahí está el upside.

---

## Quick wins (esta semana)

1. **Unificar el handle de Instagram** en JSON-LD y llms.txt (un solo perfil real).
2. **Agregar `PostalAddress`** (El Bolsón, Río Negro, AR) al `Person` del JSON-LD.
3. **Completar `sameAs`** con Lichess y ChessBase.
4. **Actualizar sitemap.xml** (fechas `lastmod` a hoy + agregar privacidad.html y manual-marca.html).
5. **robots.txt explícito para crawlers de IA** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, etc. con Allow).

## Plan a 30 días

### Semana 1: Consistencia de entidad (código)
- [ ] Unificar Instagram en JSON-LD + llms.txt
- [ ] Sumar `address` al Person schema
- [ ] Completar `sameAs` (Lichess, ChessBase, FIDE)

### Semana 2: Infraestructura GEO (código)
- [ ] Actualizar sitemap.xml (fechas + páginas faltantes)
- [ ] robots.txt con crawlers de IA explícitos
- [ ] Marcar testimonios como `Review` + `aggregateRating` en ProfessionalService
- [ ] Agregar `speakable` a servicio y FAQ

### Semana 3: Autoridad de marca como diseñador (fuera del código)
- [ ] Crear/optimizar Google Business Profile como diseñador web local
- [ ] Publicar 1-2 casos de estudio (problema → solución → resultado) citables
- [ ] Pedir reseñas a clientes ya entregados (Tía Úrsula, I Keu Ken, etc.)

### Semana 4: Contenido citable
- [ ] Reescribir aperturas de sección con "respuesta directa" en la 1ª oración
- [ ] Sumar 2-3 preguntas más a la FAQ (precio aproximado, zonas, idiomas)
- [ ] Alinear el dato de Elo FIDE de la página con el perfil oficial

---

## Apéndice: páginas analizadas

| URL | Título | Issues GEO |
|---|---|---|
| / | Teo Cicciari \| Diseñador Web & Profesor de Ajedrez | Schema incompleto (address/sameAs/review), inconsistencia IG |
| /sitemap.xml | — | lastmod viejo, 3 URLs |
| /robots.txt | — | sin crawlers IA explícitos |
| /llms.txt | — | OK (revisar handle IG) |

**Fuentes de marca consultadas:**
[Sitio propio](https://teocicciari.com.ar/) · [GitHub](https://github.com/teocicciari) · [Lichess](https://lichess.org/@/Wubadubalublub) · [FIDE](https://ratings.fide.com/profile/140821) · [ChessBase](https://players.chessbase.com/en/player/cicciari_teo%20dante/365388) · [Red43](https://www.red43.com.ar/nota/2026-3-5-16-41-30-gracias-por-hacernos-ilusionar)
