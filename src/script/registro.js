document.addEventListener('DOMContentLoaded', function() {
    var profileButton = document.getElementById('profileButton');
    var authButtons = document.getElementById('authButtons');
    var registerButton = document.getElementById('registerButton');
    var loginButton = document.getElementById('loginButton');
    var registerForm = document.getElementById('registerForm');
    var loginForm = document.getElementById('loginForm');
    var registrationForm = document.getElementById('registrationForm');
    var loginFormElement = document.getElementById('loginFormElement');
    var userDetails = document.getElementById('userDetails');
    var userNameSpan = document.getElementById('userName');
    var userPointsSpan = document.getElementById('userPoints');
    var logoutButton = document.getElementById('logoutButton');
    var botonHistorial = document.getElementById('historialPedidos');
    var desplegableHistorial = document.getElementById('historialDesplegable');

    botonHistorial.addEventListener('click', function() {
        var user = JSON.parse(localStorage.getItem('user')); // Obtener el objeto user completo
        var historialPedidos = user ? user.historialPedidos : []; // Acceder a la propiedad historialPedidos
    
        desplegableHistorial.innerHTML = ''; // Limpiar el contenido anterior
        desplegableHistorial.classList.toggle('hidden'); // Mostrar/ocultar el desplegable
    
        if (historialPedidos.length === 0) {
            desplegableHistorial.textContent = 'No hay pedidos en el historial.';
        } else {
            historialPedidos.forEach(function(pedido) {
                var pedidoDiv = document.createElement('div');
                pedidoDiv.className = 'pedido';
    
                // Convertir la fecha ISO a un formato legible
                var fecha = new Date(pedido.fecha);
                var opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
                var fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
    
                var fechaDiv = document.createElement('div');
                fechaDiv.textContent = 'Fecha del Pedido: ' + fechaFormateada;
                pedidoDiv.appendChild(fechaDiv);
    
                // Crear una lista de platos
                var platosLista = document.createElement('ul');
                pedido.items.forEach(function(item) {
                    var plato = document.createElement('li');
                    plato.textContent = item.name; // Utiliza la propiedad 'name' para el nombre del plato
                    platosLista.appendChild(plato);
                });
    
                pedidoDiv.appendChild(platosLista);
                desplegableHistorial.appendChild(pedidoDiv);
            });
        }
    });
    
    

    profileButton.addEventListener('click', function() {
        authButtons.classList.toggle('hidden');
    });

    registerButton.addEventListener('click', function() {
        var currentDisplay = loginForm.style.display;
        loginForm.style.display = currentDisplay === 'none';
        registerForm.style.display = registerForm.style.display === 'block' ? 'none' : 'block';
    });

    loginButton.addEventListener('click', function() {
        var currentDisplay = loginForm.style.display;
        loginForm.style.display = currentDisplay === 'block' ? 'none' : 'block';
        registerForm.style.display = registerForm.style.display === 'none';
    });

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        var puntosFidelidad = 0;
        var historialPedidos = [];

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        var hashedPassword = hashPassword(password);
        localStorage.setItem('user', JSON.stringify({ firstName, lastName, email, hashedPassword, puntosFidelidad, historialPedidos }));
        alert('Registro exitoso');
        registerForm.style.display = 'none';
    });

    loginFormElement.addEventListener('submit', function(event) {
        event.preventDefault();
        var email = document.getElementById('loginEmail').value;
        var password = document.getElementById('loginPassword').value;
    
        var user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email === email && user.hashedPassword === btoa(password)) {
            // Mostrar detalles del usuario
            userDetails.classList.remove('hidden');
            localStorage.setItem('isLoggedIn', 'true');
            userNameSpan.textContent = user.firstName + ' ' + user.lastName;

            userPointsSpan.textContent = 'Puntos: ' + user.puntosFidelidad;
    
            // Ocultar formulario de inicio de sesión y botones de login y registro
            loginForm.style.display = 'none';
            loginButton.style.display = 'none';
            registerButton.style.display = 'none';
        } else {
            alert('Credenciales inválidas');
        }
    });

    function hashPassword(password) {
        // Utiliza btoa para una codificación simple; en una aplicación real, usa un algoritmo de hash seguro.
        return btoa(password);
    }

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    if (localStorage.getItem('isLoggedIn') === 'true') {
        var user = JSON.parse(localStorage.getItem('user'));
        userDetails.classList.remove('hidden');
        userNameSpan.textContent = user.firstName + ' ' + user.lastName;
        userPointsSpan.textContent = 'Puntos: ' + user.puntosFidelidad;
    }

    logoutButton.addEventListener('click', function() {
        localStorage.setItem('isLoggedIn', 'false');
        userDetails.classList.add('hidden');
    });

    if (localStorage.getItem('isLoggedIn') === 'true') {
        var user = JSON.parse(localStorage.getItem('user'));
        userDetails.classList.remove('hidden');
        userNameSpan.textContent = user.firstName + ' ' + user.lastName;
        userPointsSpan.textContent = 'Puntos: ' + user.puntosFidelidad;

        // Ocultar botones de login y registro
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
    }

    logoutButton.addEventListener('click', function() {
        localStorage.setItem('isLoggedIn', 'false');
        userDetails.classList.add('hidden');

        // Mostrar botones de login y registro
        loginButton.style.display = 'block';
        registerButton.style.display = 'block';
    });

    function actualizarEstadoUI() {
        var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            userDetails.classList.remove('hidden');
            botonHistorial.style.display = 'block';
            loginButton.style.display = 'none';
            registerButton.style.display = 'none';
        } else {
            userDetails.classList.add('hidden');
            botonHistorial.style.display = 'none';
            loginButton.style.display = 'block';
            registerButton.style.display = 'block';
        }
    }

    // Inicializar el estado de la interfaz de usuario al cargar la página
    actualizarEstadoUI();

    botonHistorial.addEventListener('click', function() {
        var user = JSON.parse(localStorage.getItem('user'));
        var historialPedidos = user ? user.historialPedidos : [];

        desplegableHistorial.innerHTML = '';
        desplegableHistorial.classList.toggle('hidden');

        if (historialPedidos.length === 0) {
            desplegableHistorial.textContent = 'No hay pedidos en el historial.';
        } else {
            historialPedidos.forEach(function(pedido) {
                // ... (Código existente para mostrar los detalles del pedido)
            });
        }
    });

    // ... (Resto del código para los botones de perfil, registro y login)

    registrationForm.addEventListener('submit', function(event) {
        // ... (Código existente para el formulario de registro)
    });

    loginFormElement.addEventListener('submit', function(event) {
        event.preventDefault();
        var email = document.getElementById('loginEmail').value;
        var password = document.getElementById('loginPassword').value;

        var user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email === email && user.hashedPassword === btoa(password)) {
            localStorage.setItem('isLoggedIn', 'true');
            actualizarEstadoUI(); // Actualizar UI después del login
            // ... (Resto del código para el inicio de sesión exitoso)
        } else {
            alert('Credenciales inválidas');
        }
    });

    logoutButton.addEventListener('click', function() {
        localStorage.setItem('isLoggedIn', 'false');
        actualizarEstadoUI(); // Actualizar UI después del logout
    });



});