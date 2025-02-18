document.addEventListener('DOMContentLoaded', function() {
    var botonDescuento = document.getElementById('aplicar-descuento');
    var importeSpan = document.getElementById('importe-total');
    var formularioPago = document.getElementById('formulario-pago');
    var botonCanjear = document.getElementById('canjearPedidoGratis');

    // Generar y mostrar un número de pedido aleatorio de 5 cifras
    var numeroPedido = Math.floor(10000 + Math.random() * 90000);
    document.getElementById('numero-pedido').textContent = numeroPedido;

    // Recuperar el importe original del carrito de las cookies
    var cartTotalOriginal = getCookie('cartTotalOriginal');
    if (!cartTotalOriginal) {
        var cartTotal = getCookie('cartTotal');
        if (cartTotal) {
            cartTotalOriginal = cartTotal;
            document.cookie = 'cartTotalOriginal=' + cartTotal + ';path=/';
        }
    }

    // Mostrar siempre el importe original al cargar la página
    if (cartTotalOriginal) {
        importeSpan.textContent = parseFloat(cartTotalOriginal).toFixed(2) + "€";
    }

    botonDescuento.addEventListener('click', aplicarDescuento);
    formularioPago.addEventListener('submit', function(event) {
        event.preventDefault();  // Previene el envío normal del formulario
    
        // Recuperar el usuario desde localStorage y parsear a objeto
        var user = JSON.parse(localStorage.getItem('user'));

        var cartItems = getCookie('cartItems');
        var parsedCartItems = cartItems ? JSON.parse(cartItems) : [];

        // Recuperar el historial de pedidos del localStorage
        var historialPedidos = user.historialPedidos;

        // Agregar el pedido actual al historial
        var pedidoActual = {
            fecha: new Date().toISOString(),
            items: parsedCartItems
        };
        historialPedidos.push(pedidoActual);

        // Guardar el historial actualizado en localStorage
        localStorage.setItem('historialPedidos', JSON.stringify(historialPedidos));
    
        // Verificar si el usuario existe y actualizar sus puntos de fidelidad
        if (user) {
            user.puntosFidelidad = (user.puntosFidelidad || 0) + 100;
            localStorage.setItem('user', JSON.stringify(user));
    
            alert('Pago realizado con éxito. Puntos de fidelidad acumulados: ' + user.puntosFidelidad);
        } else {
            alert('Usuario no encontrado. No se pudo actualizar los puntos de fidelidad.');
        }
    
        // Redirigir a index.html
        window.location.href = 'index.html';
    });
    
    function aplicarDescuento() {
        var codigo = document.getElementById('codigo-descuento').value;
        var importeOriginal = parseFloat(cartTotalOriginal);
        
        // Comprobar si el código de descuento es "NUEVO25" y si no se ha aplicado antes
        if (codigo === 'NUEVO25' && getCookie('codigo_descuento') !== 'NUEVO25') {
            var descuento = importeOriginal * 0.25;
            var importeConDescuento = importeOriginal - descuento;
            importeSpan.textContent = importeConDescuento.toFixed(2) + "€";
            
            // Guardar el código de descuento aplicado en la cookie
            document.cookie = 'codigo_descuento=' + codigo + ';path=/';
        }
    }

    // Función para obtener el valor de una cookie por su nombre
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    // Restablecer el código de descuento al recargar la página
    document.cookie = 'codigo_descuento=; Max-Age=0; path=/';
    document.cookie = 'cartTotalOriginal=; Max-Age=0; path=/';

    var tipoEntregaSelect = document.getElementById('tipo-entrega');
    var seleccionRestaurante = document.getElementById('seleccion-restaurante');
    var direccionEntrega = document.getElementById('direccion-entrega');
    var cpEntrega = document.getElementById('cp-entrega');
    var ciudadEntrega = document.getElementById('ciudad-entrega');

    tipoEntregaSelect.addEventListener('change', function() {
        cambiarTipoEntrega();
        guardarInformacionEntrega();
    });

    seleccionRestaurante.addEventListener('change', guardarInformacionEntrega);
    direccionEntrega.addEventListener('input', guardarInformacionEntrega);
    cpEntrega.addEventListener('input', guardarInformacionEntrega);
    ciudadEntrega.addEventListener('input', guardarInformacionEntrega);

    function cambiarTipoEntrega() {
        var tipoEntrega = tipoEntregaSelect.value;
        var opcionesRestaurante = document.getElementById('opciones-restaurante');
        var direccionDomicilio = document.getElementById('direccion-domicilio');

        opcionesRestaurante.style.display = tipoEntrega === 'restaurante' ? 'block' : 'none';
        direccionDomicilio.style.display = tipoEntrega === 'domicilio' ? 'block' : 'none';
    }

    function guardarInformacionEntrega() {
        var tipoEntrega = tipoEntregaSelect.value;
        var infoEntrega;

        if (tipoEntrega === 'restaurante') {
            infoEntrega = seleccionRestaurante.value;
        } else {
            infoEntrega = 'Dirección: ' + direccionEntrega.value +
                          ', CP: ' + cpEntrega.value +
                          ', Ciudad: ' + ciudadEntrega.value;
        }

        document.cookie = 'infoEntrega=' + encodeURIComponent(infoEntrega);
    }

    // Borrar la cookie al cargar la página
    document.cookie = 'infoEntrega=; Max-Age=0; path=/';

    // Llamada inicial para configurar la vista y guardar la información de entrega
    cambiarTipoEntrega();
    
    var botonAceptar = document.getElementById('boton-aceptar');
    var tiempoEstimado = document.getElementById('tiempo-estimado');

    botonAceptar.addEventListener('click', function() {
        guardarInformacionEntrega();
        mostrarTiempoEstimado();
    });

    function mostrarTiempoEstimado() {
        var tiempo = Math.floor(Math.random() * 31) + 30; // Genera un número entre 30 y 60
        tiempoEstimado.querySelector('span').textContent = tiempo + ' minutos';
        tiempoEstimado.style.display = 'block';
    }

    botonCanjear.addEventListener('click', function() {
        var user = JSON.parse(localStorage.getItem('user'));
    
        if (user && user.puntosFidelidad >= 1000) {
            // Restar 1000 puntos
            user.puntosFidelidad -= 1000;
    
            // Actualizar el usuario en localStorage
            localStorage.setItem('user', JSON.stringify(user));
    
            alert('Pedido gratis canjeado. Puntos actuales:' + user.puntosFidelidad);
    
            // Redirigir a index.html
            window.location.href = 'index.html';
        } else {
            alert('No tienes suficientes puntos para canjear un pedido gratis. Puntos actuales: ' + (user ? user.puntosFidelidad : '0'));
        }
    });

    document.cookie = 'infoEntrega=; Max-Age=0; path=/';
});
