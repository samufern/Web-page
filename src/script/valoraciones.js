document.addEventListener('DOMContentLoaded', function() {
    const formularioValoracion = document.getElementById('formulario-valoracion');
    const contenedorComentarios = document.querySelector('.contenedor-comentarios');

    formularioValoracion.addEventListener('submit', function(e) {
        e.preventDefault();

        const estrellas = formularioValoracion.querySelector('input[name="estrellas"]:checked').value;
        const comentario = formularioValoracion.querySelector('#comentario').value;
        const nombre = formularioValoracion.querySelector('#nombre').value || 'Anónimo'; // Capturar el nombre
        const fecha = new Date().toISOString().split('T')[0]; // Definir la fecha aquí

        const nuevoComentario = document.createElement('div');
        nuevoComentario.classList.add('comentario-individual');
        nuevoComentario.innerHTML = `
            <p class="comentario-autor">${nombre} - <span class="comentario-fecha">${fecha}</span></p>
            <p><strong>Estrellas: ${estrellas}</strong></p>
            <p class="comentario-texto">${comentario}</p>
        `;

        contenedorComentarios.prepend(nuevoComentario);
        formularioValoracion.reset();
    });

    // Simulación de carga de comentarios preexistentes
    cargarComentariosSimulados();
});

function cargarComentariosSimulados() {
    const comentariosSimulados = [
        { autor: 'Juan Pérez', fecha: '2023-12-01', estrellas: 5, texto: 'Excelente servicio y comida deliciosa.' },
        { autor: 'Ana Gómez', fecha: '2023-11-30', estrellas: 4, texto: 'Buena experiencia, pero la espera fue un poco larga.' },
        { autor: 'Pedro', fecha: '2023-09-30', estrellas: 4, texto: 'Muy buena comida y de alta calidad.' }
    ];

    const contenedorComentarios = document.querySelector('.contenedor-comentarios');
    comentariosSimulados.forEach(comentario => {
        const elementoComentario = document.createElement('div');
        elementoComentario.classList.add('comentario-individual');
        elementoComentario.innerHTML = `
            <p class="comentario-autor">${comentario.autor} - <span class="comentario-fecha">${comentario.fecha}</span></p>
            <p><strong>Estrellas: ${comentario.estrellas}</strong></p>
            <p class="comentario-texto">${comentario.texto}</p>
        `;
        contenedorComentarios.appendChild(elementoComentario);
    });
}
