function mostrarIngredientes(plato) {
    var id = 'ingredientes-' + plato;
    var ingredientesDiv = document.getElementById(id);

    // Verificar si el div de ingredientes ya está visible
    if (ingredientesDiv.classList.contains('oculto')) {
        // Ocultar todos los ingredientes primero
        document.querySelectorAll('.ingredientes').forEach(function(div) {
            div.classList.add('oculto');
        });

        // Mostrar los ingredientes para el plato clickeado
        ingredientesDiv.classList.remove('oculto');
    } else {
        // Si ya está visible, ocultarlo
        ingredientesDiv.classList.add('oculto');
    }
}

// Asumiendo que tienes botones o elementos interactivos para cada plato
document.querySelectorAll('.plato').forEach(function(plato) {
    plato.addEventListener('click', function() {
        mostrarIngredientes(this.getAttribute('data-plato'));
    });
    // Añade soporte para teclado
    plato.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            mostrarIngredientes(this.getAttribute('data-plato'));
        }
    });
});
