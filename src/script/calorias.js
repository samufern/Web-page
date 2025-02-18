document.addEventListener('DOMContentLoaded', function() {
    const botones = document.querySelectorAll('.add-to-counter');
    let sumaCalorias = 0, sumaProteinas = 0, sumaHidratos = 0, sumaGrasas = 0;
    let tabla = document.getElementById('tablaCalorias');

    function crearTablaSiNoExiste() {
        if (!tabla) {
            tabla = document.createElement('table');
            tabla.id = 'tablaCalorias';
            tabla.innerHTML = `
                <tr>
                    <th>Plato</th>
                    <th>Calorías</th>
                    <th>Proteínas</th>
                    <th>Hidratos de Carbono</th>
                    <th>Grasas</th>
                    <th></th>
                </tr>
            `;
            document.getElementById('desplegableCalorias').appendChild(tabla);

            // Crear fila del total al inicio
            let filaTotal = tabla.insertRow(-1);
            filaTotal.id = 'filaTotalCalorias';
            filaTotal.innerHTML = '<td>Total</td><td id="totalCalorias">0</td><td colspan="3"></td>';
        }
    }

    function actualizarSumas() {
        // Reinicia las sumas
        sumaCalorias = sumaProteinas = sumaHidratos = sumaGrasas = 0;

        // Recalcula las sumas
        Array.from(tabla.rows).slice(1, -1).forEach(row => { // Excluye la fila del total
            sumaCalorias += parseInt(row.cells[1].textContent) || 0;
            sumaProteinas += parseInt(row.cells[2].textContent) || 0;
            sumaHidratos += parseInt(row.cells[3].textContent) || 0;
            sumaGrasas += parseInt(row.cells[4].textContent) || 0;
        });

        // Actualiza la fila del total
        document.getElementById('totalCalorias').textContent = sumaCalorias;
    }

    botones.forEach(btn => {
        btn.addEventListener('click', function() {
            crearTablaSiNoExiste();

            const nombrePlato = this.getAttribute('data-name');
            const calorias = parseInt(this.getAttribute('data-calorias'));
            const proteinas = parseInt(this.getAttribute('data-proteinas'));
            const hidratos = parseInt(this.getAttribute('data-hidratos'));
            const grasas = parseInt(this.getAttribute('data-grasas'));

            if (puedeAgregarPlato(calorias, proteinas, hidratos, grasas)) {
                const fila = tabla.insertRow(tabla.rows.length - 1); // Inserta antes de la fila del total
                fila.innerHTML = `
                    <td>${nombrePlato}</td>
                    <td>${calorias}</td>
                    <td>${proteinas}</td>
                    <td>${hidratos}</td>
                    <td>${grasas}</td>
                `;

                const btnEliminar = document.createElement('button');
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.onclick = function() {
                    fila.remove();
                    actualizarSumas();
                };

                const cell = fila.insertCell();
                cell.appendChild(btnEliminar);

                sumaCalorias += calorias;
                sumaProteinas += proteinas;
                sumaHidratos += hidratos;
                sumaGrasas += grasas;

                actualizarSumas();
            } else {
                alert('Añadir este plato superaría tus objetivos nutricionales.');
            }
        });
    });

    document.getElementById('botonContadorCalorias').addEventListener('click', function() {
        var desplegable = document.getElementById('desplegableCalorias');
        if (desplegable.classList.contains('desplegable-oculto')) {
            desplegable.classList.remove('desplegable-oculto');
            desplegable.classList.add('desplegable-visible');
        } else {
            desplegable.classList.remove('desplegable-visible');
            desplegable.classList.add('desplegable-oculto');
        }
    });

    function puedeAgregarPlato(calorias, proteinas, hidratos, grasas) {
        const objetivoCalorias = parseInt(document.getElementById('objetivoCalorias').value) || Infinity;
        const objetivoProteinas = parseInt(document.getElementById('objetivoProteinas').value) || Infinity;
        const objetivoHidratos = parseInt(document.getElementById('objetivoHidratos').value) || Infinity;
        const objetivoGrasas = parseInt(document.getElementById('objetivoGrasas').value) || Infinity;

        return sumaCalorias + calorias <= objetivoCalorias &&
               sumaProteinas + proteinas <= objetivoProteinas &&
               sumaHidratos + hidratos <= objetivoHidratos &&
               sumaGrasas + grasas <= objetivoGrasas;
    }
});

