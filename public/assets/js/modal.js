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


function guardarTransaccion() {
    const monto = document.getElementById('modal-monto').value;
    const descripcion = document.getElementById('modal-descripcion').value;
    const fecha = document.getElementById('modal-fecha').value;
    const categoriaId = document.getElementById('selectCategoria').value;
    const usuarioId = obtenerUsuarioId(); // 🔥 Obtenemos el ID del usuario

    if (!monto || isNaN(monto) || !descripcion || !fecha || !categoriaId || !usuarioId) {
        alert('Todos los campos son obligatorios y el monto debe ser un número válido.');
        return;
    }

    const transaccion = {
        monto: parseFloat(monto),
        descripcion,
        fecha,
        categoriaId: parseInt(categoriaId),
        usuarioId: parseInt(usuarioId), // 🔥 Asegurar que es un número
        tipo: tipoTransaccion // Se usa el tipo asignado en openModal()
    };

    console.log('Guardando transacción:', transaccion);

    // Enviar como un array de transacciones
    fetch('http://localhost:3000/api/transacciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([transaccion]) // 🔥 Envolvemos en un array
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error al guardar: ' + data.error);
        } else {
            alert('Transacción guardada con éxito');
            closeModal();
        }
    })
    .catch(error => console.error('Error guardando transacción:', error));
}
