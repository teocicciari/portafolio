// Objeto de traducciones
const translations = {
    es: {
      // Navbar
      "inicio": "Inicio",
      "habitaciones": "Habitaciones",
      "servicios": "Servicios",
      "como-llegar": "¿Cómo llegar?",
      
      // Hero section
      "experiencia-naturaleza": "Una experiencia rodeada de naturaleza.",
      "entrada": "Entrada",
      "salida": "Salida",
      "n-personas": "N° Personas",
      "consultar": "CONSULTAR",
      "mejor-precio": "El mejor precio reservando aquí",
      "validacion-fecha": "Por favor seleccione fechas válidas",
      
      // Habitaciones section
      "nuestras-habitaciones": "Nuestras Habitaciones",
      "habitacion-compartida": "Habitación Compartida",
      "habitacion-doble": "Habitación Doble",
      "habitacion-matrimonial": "Habitación Matrimonial",
      "camas": "camas",
      "cucheta": "Cucheta",
      "doble-cucheta": "Doble + cucheta",
      "banos-compartidos": "Baños compartidos",
      "desc-compartida": "Dormitorio compartido accesibles con una excelente vista, para viajeros solitarios y grupos.",
      "desc-doble": "Cómoda habitación para dos personas, con piso radiante y un escritorio.",
      "desc-matrimonial": "La habitación perfecta para una pareja, con la opción de agregar dos personas en una cucheta.",
      
      // Servicios section
      "wifi-internet": "Wifi & Internet",
      "desc-wifi": "WiFi estable y de alta velocidad en todas nuestras instalaciones, para una experiencia sin interrupciones.",
      "desayuno": "Desayuno",
      "desc-desayuno": "De las cosas que más valoran nuestros huéspedes, desayuno completo y nutritivo para arrancar el día",
      "estacionamiento": "Estacionamiento",
      "desc-estacionamiento": "Espacio amplio y con sombra para estacionar tu auto.",
      
      // Mapa section
      "avion": "1. Llegando en avión a Bariloche 🛩️",
      "reprogramaciones": "(Esta última con muchas reprogramaciones)",
      "aeropuerto-bolson": "2. Del Aeropuero a El Bolsón",
      "bolson-samsara": "3. De El Bolsón a Samsara",
      "info-avion": "El aeropuerto más cercano, desde Buenos Aires podés llegar con:",
      "info-aeropuerto": "Tiempo aproximado de viaje 3hs. <br> <b>Importante!</b> Para la época de enero sacar con anticipación los pasajes<br> Podés comprarlos aquí: <a href=\"https://busplus.com.ar/\" target=\"_blank\">Busplus</a> <br> Buscar de \"Aeropuerto de Bariloche\" a \"El Bolsón\". (Podés buscar a Lago Puelo pero tiene mucha menor frecuencia)<br>",
      "info-bolson": "Desde la terminal de Bolsón al Hostel se puede ir en remis o colectivo.<br> El colectivo tarda 1 hora y sale $2.000 (2025), la parada más cercana a la terminal esta <a href=\"https://maps.app.goo.gl/iFjjXYTCUUG1aCDv8\">acá</a><br> El remis esta aproximadamente $10.000 (2025) y tarda 30 minutos.<br>",
      
      // Footer
      "tu-hogar": "Tu hogar lejos de casa esta en Lago Puelo",
      "contacto": "Contacto",
      "siguenos": "Síguenos",
      "derechos": "Todos los derechos reservados.",
      
      // WhatsApp message
      "whatsapp-msg": "Hola! Me gustaría consultar disponibilidad en Hostel Samsara. Estoy buscando para {{guests}} desde el {{checkin}} hasta el {{checkout}}.{{promo}} Gracias!",
      "una-persona": "una persona",
      "personas": "personas",
      "codigo-promo": "Tengo el código de promoción: ",

      // Testimonios
      "testimonio-1": "Me hicieron sentir como en casa. Muchísimas gracias por todo 😊! (Además hacen la mejor granola casera del planeta ❤️‍🔥)",
      "testimonio-2": "De paso por Puelo, paramos en una de las habitaciones. La losa radiante genial. La ducha sin inconvenientes. Usamos los utensilios, bien completa para cocinar variado. Ameno el ambiente. Recomendable.",
      "testimonio-3": "He estado viajando por mucho tiempo y este fue el mejor lugar en el que he estado para descansar, con todas sus características en perfecto estado y un ambiente que se adapta al entorno del lugar. 10/10 volvería el año que viene",
    },
    en: {
      // Navbar
      "inicio": "Home",
      "habitaciones": "Rooms",
      "servicios": "Services",
      "como-llegar": "How to get here?",
      
      // Hero section
      "experiencia-naturaleza": "An experience surrounded by nature.",
      "entrada": "Check-in",
      "salida": "Check-out",
      "n-personas": "People",
      "consultar": "INQUIRE",
      "mejor-precio": "Best price when booking here",
      "validacion-fecha": "Please select valid dates",
      
      // Habitaciones section
      "nuestras-habitaciones": "Our Rooms",
      "habitacion-compartida": "Shared Room",
      "habitacion-doble": "Double Room",
      "habitacion-matrimonial": "Matrimonial Room",
      "camas": "beds",
      "cucheta": "Bunk bed",
      "doble-cucheta": "Double + bunk bed",
      "banos-compartidos": "Shared bathrooms",
      "desc-compartida": "Accessible shared dormitory with an excellent view, for solo travelers and groups.",
      "desc-doble": "Comfortable room for two people, with radiant floor heating and a desk.",
      "desc-matrimonial": "The perfect room for a couple, with the option to add two people in a bunk bed.",
      
      // Servicios section
      "wifi-internet": "Wifi & Internet",
      "desc-wifi": "Stable and high-speed WiFi throughout our facilities, for an uninterrupted experience.",
      "desayuno": "Breakfast",
      "desc-desayuno": "One of the things our guests value the most, a complete and nutritious breakfast to start the day",
      "estacionamiento": "Parking",
      "desc-estacionamiento": "Spacious and shaded space to park your car.",
      
      // Mapa section
      "avion": "1. Arriving by plane to Bariloche 🛩️",
      "reprogramaciones": "(The last one with a lot of rescheduling)",
      "aeropuerto-bolson": "2. From the Airport to El Bolsón",
      "bolson-samsara": "3. From El Bolsón to Samsara",
      "info-avion": "The nearest airport, from Buenos Aires you can arrive with:",
      "info-aeropuerto": "Approximate travel time 3 hours. <br> <b>Important!</b> For January, purchase tickets in advance<br> You can buy them here: <a href=\"https://busplus.com.ar/\" target=\"_blank\">Busplus</a> <br> Search from \"Bariloche Airport\" to \"El Bolsón\". (You can search to Lago Puelo but it has much less frequency)<br>",
      "info-bolson": "From the Bolsón terminal to the Hostel you can go by taxi or bus.<br> The bus takes 1 hour and costs $2,000 (2025), the closest stop to the terminal is <a href=\"https://maps.app.goo.gl/iFjjXYTCUUG1aCDv8\">here</a><br> The taxi costs approximately $10,000 (2025) and takes 30 minutes.<br>",
      
      // Footer
      "tu-hogar": "Your home away from home is in Lago Puelo",
      "contacto": "Contact",
      "siguenos": "Follow us",
      "derechos": "All rights reserved.",
      
      // WhatsApp message
      "whatsapp-msg": "Hello! I would like to check availability at Hostel Samsara. I'm looking for {{guests}} from {{checkin}} to {{checkout}}.{{promo}} Thank you!",
      "una-persona": "one person",
      "personas": "people",
      "codigo-promo": "I have the promotion code: ",

      // Testimonials
      "testimonio-1": "They made me feel at home. Thank you so much for everything 😊! (They also make the best homemade granola on the planet ❤️‍🔥)",
      "testimonio-2": "Passing through Puelo, we stayed in one of the rooms. The radiant floor heating was great. The shower worked perfectly. We used the utensils, very complete for cooking a variety of meals. Pleasant atmosphere. Recommended.",
      "testimonio-3": "I have been traveling for a long time, and this was the best place I have stayed to rest, with all its features in perfect condition and an atmosphere that adapts to the surroundings. 10/10 would return next year.",
    }
  };
  
  // Función para cambiar el idioma
  function changeLanguage(lang) {
    // Guardar la selección de idioma en localStorage
    localStorage.setItem('selectedLanguage', lang);
    
    // Actualizar la selección visual en el selector de idioma
    document.querySelectorAll('.language-selector a').forEach(el => {
      el.classList.remove('active');
    });
    document.querySelector(`.language-selector a[data-lang="${lang}"]`).classList.add('active');
    
    // Traducir todos los elementos con atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang][key]) {
        if (element.tagName === 'INPUT') {
          element.placeholder = translations[lang][key];
        } else {
          element.innerHTML = translations[lang][key];
        }
      }
    });
    
    // Cambiar el atributo lang del html
    document.documentElement.lang = lang;
  }
  
  // Inicializar idioma al cargar la página
  document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay un idioma guardado en localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    
    // Aplicar el idioma guardado o predeterminado
    changeLanguage(savedLanguage);
    
    // Agregar eventos a los selectores de idioma
    document.querySelectorAll('.language-selector a').forEach(el => {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        changeLanguage(lang);
      });
    });
  });
  
  // Modificar la función sendWhatsApp para usar traducciones
  function sendWhatsApp() {
    // Get form values
    const checkin = document.getElementById('check-in').value;
    const checkout = document.getElementById('check-out').value;
    const guests = document.getElementById('guests').value;
    const promo = document.getElementById('promo').value;
    
    // Get current language
    const currentLang = localStorage.getItem('selectedLanguage') || 'es';
    
    // Format guests text based on language and quantity
    let guestsText = guests > 1 
      ? guests + ' ' + translations[currentLang]["personas"] 
      : translations[currentLang]["una-persona"];
    
    // Format promo text if exists
    let promoText = '';
    if (promo !== "") {
      promoText = ' ' + translations[currentLang]["codigo-promo"] + promo + '.';
    }
    
    // Get message template and replace placeholders
    let messageTemplate = translations[currentLang]["whatsapp-msg"];
    let message = messageTemplate
      .replace('{{guests}}', guestsText)
      .replace('{{checkin}}', checkin)
      .replace('{{checkout}}', checkout)
      .replace('{{promo}}', promoText);
    
    // Encode message for WhatsApp URL
    var encodedMessage = encodeURIComponent(message);
    
    // WhatsApp API URL with the hostel's WhatsApp number
    var whatsappURL = `https://wa.me/5492944820534?text=${encodedMessage}`;
    
    // Open WhatsApp with the pre-filled message
    window.open(whatsappURL, '_blank');
  }