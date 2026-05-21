
document.addEventListener('DOMContentLoaded', function() {
    // Configuración de fechas
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    // Formatear fechas para mostrar
    const formatDate = (date) => {
      const day = date.getDate();
      const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    };
    
    // Inicializar check-in datepicker
    const checkInPicker = flatpickr("#check-in", {
      locale: "es",
      dateFormat: "d M Y",
      minDate: "today",
      defaultDate: today,
      onChange: function(selectedDates, dateStr) {
        // Actualizar la fecha mínima del checkout para que sea posterior al checkin
        const nextDay = new Date(selectedDates[0]);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOutPicker.set("minDate", nextDay);
        
        // Si la fecha de salida es anterior a la nueva fecha de entrada + 1
        if (checkOutPicker.selectedDates[0] <= selectedDates[0]) {
          checkOutPicker.setDate(nextDay);
        }
        
        // Formatear fecha para mostrar
        document.getElementById('check-in').value = formatDate(selectedDates[0]);
      }
    });
    
    // Inicializar check-out datepicker
    const checkOutPicker = flatpickr("#check-out", {
      locale: "es",
      dateFormat: "d M Y",
      minDate: tomorrow,
      defaultDate: tomorrow,
      onChange: function(selectedDates) {
        // Formatear fecha para mostrar
        document.getElementById('check-out').value = formatDate(selectedDates[0]);
      }
    });
    
    // Establecer valores iniciales
    document.getElementById('check-in').value = formatDate(today);
    document.getElementById('check-out').value = formatDate(tomorrow);

    // Cerrar los pickers al hacer scroll
    document.addEventListener('scroll', function () {
      checkInPicker.close();
      checkOutPicker.close();
    }, true); // el 'true' asegura que el evento se capture durante la fase de captura
});
