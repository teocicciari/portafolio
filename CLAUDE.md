# Portfolio – Teo Cicciari

Sitio web personal en producción en [teocicciari.com.ar](https://teocicciari.com.ar).

## Estructura

Sitio estático sin frameworks. HTML, CSS y JS vanilla puro.

```
index.html          — única página, contiene dos vistas
main.js             — lógica general (filtros de proyectos, modals, FAQ, menú mobile, etc.)
theme-switcher.js   — manejo del cambio de vista (diseño ↔ ajedrez) y tema
style.css           — tokens de diseño (:root) + estilos base + CTA boceto
prices.css          — sección de precios
ajedrez.css         — estilos específicos de la vista de ajedrez
theme-switcher.css  — estilos del switcher de vistas
disenos/            — páginas de diseños de muestra (elefante.html, sol.html)
img/                — imágenes del sitio
fonts/              — Space Grotesk (fuente local)
```

## Arquitectura de vistas

`index.html` tiene **dos vistas** dentro del mismo `<main>`:

- `#view-design` — portfolio de diseño web (activa por defecto)
- `#view-chess` — página de clases de ajedrez (activa con hash `#chess`)

El switcher cambia la vista, el tema CSS del body, los nav-links, los footer-links y el título de la página. Todo esto está en `theme-switcher.js`.

**Temas:**
- Vista diseño → sin clase en body (variables por defecto en `:root`) — paleta **verde bosque** (`#1a2f1a` / acento `#7ac142`)
- Vista ajedrez → `body.theme-forest` — paleta **púrpura oscura** (`#121212` / acento `#8a5cf7`). El nombre "forest" es histórico, no describe el color.

**Tokens de diseño:** todas las variables viven en el único `:root` de `style.css` (color, tipografía fluida con `clamp`, espaciado, radios, sombras, curvas de movimiento). `body.theme-forest` solo redefine la paleta y sus derivados. No hardcodear colores del acento: usar `--accent`, `--accent-soft`, `--accent-transparent`, `--border-hover`, `--shadow-glow`, etc., para que ambas vistas hereden el estilo.

## Convenciones

- No usar frameworks, librerías de componentes ni preprocesadores CSS.
- Las animaciones de entrada usan la clase `.fade-in` con IntersectionObserver (en `main.js`). No redefinir `.fade-in` en otros CSS.
- Respetar `prefers-reduced-motion`: el bloque global está al final de `style.css`.
- Font Awesome se carga desde CDN con `defer`.
- Analytics (GA, GTM, Clarity) se carga de forma lazy tras la primera interacción del usuario (loader inline al final de `index.html` — no tocarlo).
- Las imágenes de proyectos van en `img/proyectos/` en formato `.webp` (se muestran con `aspect-ratio: 21/9`).
- El número de WhatsApp (`5492944812580`) está hardcodeado en varios `href` de `index.html`, `theme-switcher.js` y `privacidad.html`. Si cambia, buscarlo con grep y reemplazar en todos lados.

## Cosas a evitar

- No agregar archivos que no sean referenciados desde `index.html`.
- No crear páginas HTML separadas para nuevas secciones — todo va como vista dentro de `index.html`.
- No usar `ajedrez.html` — ese archivo fue eliminado, el contenido está fusionado en `index.html`.
