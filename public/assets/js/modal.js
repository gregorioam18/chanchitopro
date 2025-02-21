let tipoTransaccion = '';

document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();
});

function openModal(tipo) {
    tipoTransaccion = tipo;
    document.getElementById('modal-title').textContent = tipo === 'ingreso' ? 'Cargar Ingreso' : 'Cargar Egreso';
    document.getElementById('modal-overlay').style.display = 'block';
    cargarCategorias();
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

function cargarCategorias() {
    const select = document.getElementById('selectCategoria');
    if (!select) {
        console.error("Elemento selectCategoria no encontrado");
        return;
    }

    fetch('http://localhost:3000/api/categorias/getAll')
        .then(response => response.json())
        .then(data => {
            select.innerHTML = '<option value="" disabled selected>Seleccione una categoría</option>';
            data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.nombre;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error cargando categorías:', error));
}

function obtenerUsuarioId() {
    return localStorage.getItem('usuarioId') || null; // Devuelve el ID o null si no existe
    console.log('Usuario ID:', usuarioId);
}



function usarFechaHoraActual() {
    const ahora = new Date();

    // Formatear la fecha como 'YYYY-MM-DD' (formato de input type="date")
    const fechaActual = ahora.toISOString().split('T')[0];

    // Formatear la hora como 'HH:MM' (formato de input type="time")
    const horaActual = ahora.toTimeString().split(' ')[0].slice(0, 5);

    // Asignar la fecha y hora actual a los campos
    document.getElementById('modal-fecha').value = fechaActual;
    document.getElementById('modal-hora').value = horaActual;
}



function guardarTransaccion() {
    const monto = document.getElementById('modal-monto').value;
    const descripcion = document.getElementById('modal-descripcion').value;
    const fecha = document.getElementById('modal-fecha').value;
    const hora = document.getElementById('modal-hora').value;
    const categoriaId = document.getElementById('selectCategoria').value;
    const usuarioId = obtenerUsuarioId();

    if (!monto || isNaN(monto) || !descripcion || !fecha || !hora || !categoriaId || !usuarioId) {
        alert('Todos los campos son obligatorios y el monto debe ser un número válido.');
        return;
    }

    // Combinar fecha y hora en un solo valor DATETIME
    const fechaHora = `${fecha}T${hora}:00.000Z`;

    const transaccion = {
        monto: parseFloat(monto),
        descripcion,
        fecha: fechaHora, // Usamos la fecha y hora combinadas
        categoriaId: parseInt(categoriaId),
        usuarioId: parseInt(usuarioId),
        tipo: tipoTransaccion
    };

    console.log('Guardando transacción:', transaccion);

    // Enviar como un array de transacciones
    fetch('http://localhost:3000/api/transacciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([transaccion])
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error al guardar: ' + data.error);
        } else {
            alert('Transacción guardada con éxito');
            closeModal();
            location.reload(); // Recargar la página para actualizar la lista
        }
    })
    .catch(error => console.error('Error guardando transacción:', error));
}



async function eliminarTransaccion() {
    const transaccionId = document.getElementById('details-modal-overlay').getAttribute('data-transaccion-id');

    if (!transaccionId) {
        alert('Error: No se encontró el ID de la transacción.');
        return;
    }

    const confirmacion = confirm('¿Estás seguro de que querés eliminar esta transacción? Esta acción no se puede deshacer.');

    if (!confirmacion) return;

    try {
        const response = await fetch(`http://localhost:3000/api/transacciones/${transaccionId}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (data.error) {
            alert('Error al eliminar la transacción: ' + data.error);
        } else {
            alert('Transacción eliminada con éxito');
            closeDetailsModal();
            location.reload(); // Recargar para actualizar la lista de transacciones
        }
    } catch (error) {
        console.error('Error eliminando la transacción:', error);
        alert('Error al eliminar la transacción.');
    }
}
