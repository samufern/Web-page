document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendario-eventos');
    var modal = document.getElementById("eventModal");
    var modalTitle = document.getElementById("eventTitle");
    var modalDescription = document.getElementById("eventDescription");
    var closeModal = document.getElementsByClassName("close1")[0];

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Vista inicial en formato de mes
        locale: 'es', // Establece el idioma a español
        events: [
            {
                title: 'Noche de Tapas',
                start: '2023-12-05',
                description: 'Únete a nuestra Noche de Tapas especial, donde podrás degustar una deliciosa selección de tapas tradicionales, perfectamente maridadas con vinos locales. ¡Una experiencia culinaria que no te puedes perder!'
            },
            {
                title: 'Cata de Vinos',
                start: '2023-12-12',
                description: 'Explora el fascinante mundo del vino en nuestra Cata de Vinos. Descubre sabores únicos y aprende sobre las variedades de uvas, regiones vinícolas y técnicas de cata.'
            },
            {
                title: 'Concierto de Jazz',
                start: '2023-12-19',
                description: 'Disfruta de una velada inolvidable con nuestro Concierto de Jazz en vivo. Déjate llevar por las melodías suaves y el ambiente relajado, ideal para una noche romántica o para disfrutar con amigos.'
            },
            {
                title: 'Festival Gastronómico',
                start: '2023-12-26',
                end: '2023-12-28',
                description: 'Celebra con nosotros en el Festival Gastronómico. Tres días de exquisita comida, chefs invitados y actividades culinarias para toda la familia. ¡Ven y saborea los placeres de la cocina gourmet!'
            }
        ],
        eventClick: function(info) {
            info.jsEvent.preventDefault();

            modalTitle.textContent = info.event.title;
            modalDescription.textContent = info.event.extendedProps.description;

            modal.style.display = "block";

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    });

    calendar.render();

    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
