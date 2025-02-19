document.addEventListener("DOMContentLoaded", function() {
    const navbar = `
        <nav class="navbar">
            <h1 class="logo">ChanchitoPro</h1>
            <div class="user-info">
                <span class="username">Usuario Test</span>
                <button class="menu-button" onclick="toggleMenu()">☰</button>
                <div class="dropdown-menu" id="dropdownMenu">
                    <ul>
                        <li><a href="#">Perfil</a></li>
                        <li><a href="ingresos.html">Ingresos</a></li>
                        <li><a href="#">Egresos</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    document.body.insertAdjacentHTML("afterbegin", navbar);
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
