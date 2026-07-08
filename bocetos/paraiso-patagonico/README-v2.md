# Paraíso Patagónico - Versión 2.0

## Descripción
Sitio web moderno y responsive para Paraíso Patagónico, cabañas y aparts en El Calafate, Santa Cruz, Argentina.

## Características principales

### Diseño
- **Navbar con tema oscuro permanente** - Header elegante con fondo oscuro y texto claro
- **Resto del sitio con tema claro** - Contenido principal con colores claros para mejor legibilidad
- **Diseño responsive** - Adaptado para móviles, tablets y desktop
- **Animaciones suaves** - Transiciones y efectos visuales modernos

### Componentes Implementados

#### 1. Hero Slider
- Slider automático con 3 imágenes
- Controles de navegación (anterior/siguiente)
- Indicadores interactivos
- Auto-play cada 5 segundos
- Animaciones de entrada

#### 2. Lightbox para Galerías
- Visualización de imágenes en pantalla completa
- Navegación entre imágenes (flechas y teclado)
- Contador de imágenes
- Soporte para 3 galerías: Aparts, Casafue, Lago
- Cerrar con ESC o click fuera

#### 3. Sección de Testimonios
- Carousel automático con 3 testimonios
- Navegación manual
- Calificación con estrellas
- Auto-play cada 6 segundos

#### 4. Datepicker Personalizado
- Modal elegante
- Validaciones inteligentes:
  - Check-in: desde hoy en adelante
  - Check-out: requiere Check-in primero
  - Check-out: solo fechas posteriores al Check-in
- Diseño responsive

#### 5. Formulario de Reservas
- Integración con WhatsApp
- Validación de campos
- Formateo automático de fechas
- Mensaje pre-formateado

#### 6. Funcionalidades Adicionales
- **Scroll to Top** - Botón flotante para volver arriba
- **Smooth Scroll** - Navegación suave entre secciones
- **Lazy Loading** - Carga diferida de imágenes
- **Scroll Animations** - Animaciones al hacer scroll

### Estructura de Archivos

```
paraiso-patagonico/
├── index-v2.html          # HTML principal
├── styles-v2.css          # Estilos (1590+ líneas)
├── script-v2.js           # JavaScript modular
├── img/                   # Imágenes
│   ├── logo.png
│   ├── home.webp
│   ├── aparts/           # Galería aparts (6 imágenes)
│   ├── casafue/          # Galería casafue (6 imágenes)
│   └── lago/             # Galería lago (5 imágenes)
└── README-v2.md          # Este archivo
```

### Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con:
  - Variables CSS personalizadas
  - Grid y Flexbox
  - Animaciones y transiciones
  - Media queries para responsive
- **JavaScript ES6+** - Funcionalidad con:
  - Clases modulares
  - Event listeners
  - Manipulación del DOM
  - Local Storage (para futuras mejoras)

### Sistema de Colores

```css
--color-principal: #f09304      /* Naranja principal */
--color-principal-hover: #d68103 /* Naranja hover */
--color-oscuro: #1a1a1a         /* Negro navbar */
--color-claro: #f5f5f5          /* Gris claro fondo */
--color-blanco: #ffffff         /* Blanco */
--color-texto: #333333          /* Texto principal */
```

### Navegación del Sitio

1. **Inicio** - Hero slider con imágenes destacadas
2. **Bienvenida** - Información sobre Paraíso Patagónico
3. **Alojamientos** - 3 opciones:
   - Aparts (Moderno)
   - Cabaña Casafue (Popular)
   - Cabañas Vista Lago (Premium)
4. **Servicios** - Desayuno, Parrilla, Traslados
5. **Testimonios** - Reseñas de huéspedes
6. **Reserva** - Formulario con datepicker
7. **Contacto** - Información de contacto y mapa

### Características del Navbar Oscuro

- Fondo: `rgba(26, 26, 26, 0.98)` con blur
- Texto: Blanco/claro para contraste
- Logo: Brillo aumentado para mejor visibilidad
- Hover: Efecto naranja (#f09304)
- Botón reserva: Gradiente naranja
- Menú móvil: También con tema oscuro

### Responsive Breakpoints

- **Desktop**: > 968px
- **Tablet**: 600px - 968px
- **Mobile**: < 600px

### Botones Flotantes

1. **WhatsApp** (verde #25D366)
   - Posición: Bottom-right
   - Animación de pulso
   - Link directo a chat

2. **Scroll to Top** (naranja gradiente)
   - Aparece después de 300px scroll
   - Vuelve al inicio suavemente

### Optimizaciones

- Lazy loading de imágenes
- Transiciones suavizadas con throttle/debounce
- CSS optimizado con variables
- JavaScript modular y reutilizable
- Carga asíncrona de recursos

### Accesibilidad

- ARIA labels en todos los botones
- Estados de focus visibles
- Navegación por teclado
- Contraste adecuado
- Textos alternativos en imágenes

### Compatibilidad

- Chrome/Edge (últimas versiones)
- Firefox (últimas versiones)
- Safari (últimas versiones)
- Mobile browsers (iOS/Android)

### Instalación y Uso

1. Descargar todos los archivos
2. Mantener estructura de carpetas
3. Abrir `index-v2.html` en navegador
4. No requiere servidor (funciona en local)

### Configuración

Para personalizar el número de WhatsApp, editar en `script-v2.js`:

```javascript
const CONFIG = {
    numeroWhatsApp: '5492966707154' // Cambiar aquí
};
```

### Créditos

- Fuentes: Google Fonts (Playfair Display, Inter)
- Iconos: Font Awesome 6.5.1
- Diseño: Tema oscuro en navbar, resto claro
- Desarrollado: 2025

### Notas de la Versión 2.0

**Cambios respecto a v1.0:**
- ✅ Navbar con tema oscuro permanente
- ✅ Eliminado botón de cambio de tema
- ✅ Todo el contenido mantiene tema claro
- ✅ Mejor contraste y legibilidad
- ✅ Logo optimizado para fondo oscuro
- ✅ Menú móvil también con tema oscuro

**Mejoras principales:**
- Hero slider con múltiples imágenes
- Lightbox para galerías
- Sección de testimonios
- Datepicker personalizado
- Scroll animations
- Lazy loading
- Código modular y mantenible

---

**Paraíso Patagónico** - Tu hogar en El Calafate
