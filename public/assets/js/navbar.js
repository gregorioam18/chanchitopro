document.addEventListener("DOMContentLoaded", function() {
    // Obtener usuario guardado en localStorage
    const usuario = localStorage.getItem("usuario") || "Invitado";

    // Plantilla del navbar con el usuario dinámico
    const navbar = `
        <nav class="navbar">
            <h1 class="logo">ChanchitoPro</h1>
            <div class="user-info">
                <span class="username">👤 ${usuario}</span> <!-- Nombre dinámico -->
                <button class="menu-button" onclick="toggleMenu()">☰</button>
                <div class="dropdown-menu" id="dropdownMenu">
                    <ul>
                        <li><a href="#">Perfil</a></li>
                        <li><a href="ingresos.html">Ingresos</a></li>
                        <li><a href="#">Egresos</a></li>
                        <li><button id="logout">Cerrar Sesión</button></li> <!-- Botón logout -->
                    </ul>
                </div>
            </div>
        </nav>
    `;

    // Insertar navbar en el body
    document.body.insertAdjacentHTML("afterbegin", navbar);

    // Agregar evento al botón de cerrar sesión
    document.getElementById("logout").addEventListener("click", function() {
        localStorage.removeItem("usuario"); // Eliminar usuario de localStorage
        window.location.href = "login.html"; // Redirigir al login
    });
});

// Función para mostrar/ocultar el menú
function toggleMenu() {
    document.getElementById("dropdownMenu").classList.toggle("show");
}

// Cerrar el menú si se hace clic fuera
window.onclick = function(event) {
    if (!event.target.matches('.menu-button')) {
        var dropdowns = document.getElementsByClassName("dropdown-menu");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};
