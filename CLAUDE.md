# Portfolio – Teo Cicciari

Sitio web personal en producción en [teocicciari.com.ar](https://teocicciari.com.ar).

## Estructura

Sitio estático sin frameworks. HTML, CSS y JS vanilla puro.

```
index.html          — única página, contiene dos vistas
main.js             — lógica general (filtros de proyectos, modals, FAQ, etc.)
theme-switcher.js   — manejo del cambio de vista (diseño ↔ ajedrez) y tema
style.css           — estilos base
promo.css           — sección CTA boceto gratuito
prices.css          — sección de precios
ajedrez.css         — estilos específicos de la vista de ajedrez
theme-switcher.css  — estilos del switcher de vistas y variables de tema
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
- Vista diseño → sin clase en body (variables por defecto en `:root`)
- Vista ajedrez → `body.theme-forest`

## Convenciones

- No usar frameworks, librerías de componentes ni preprocesadores CSS.
- Las animaciones de entrada usan la clase `.fade-in` con IntersectionObserver (en `main.js`).
- Font Awesome se carga desde CDN con `defer`.
- Analytics (GA, GTM, Clarity) se carga de forma lazy tras la primera interacción del usuario.
- Las imágenes de proyectos van en `img/proyectos/` en formato `.webp`.

## Cosas a evitar

- No agregar archivos que no sean referenciados desde `index.html`.
- No crear páginas HTML separadas para nuevas secciones — todo va como vista dentro de `index.html`.
- No usar `ajedrez.html` — ese archivo fue eliminado, el contenido está fusionado en `index.html`.
