document.addEventListener("DOMContentLoaded", () => {
    const btnAgregarNota = document.getElementById("btnAgregarNota");
    const modalNota = document.getElementById("modalNota");
    const closeModal = document.querySelector(".close");
    const guardarNota = document.getElementById("guardarNota");
    const notasContainer = document.getElementById("notasContainer");
    const tituloInput = document.getElementById("tituloNota");
    const contenidoInput = document.getElementById("contenidoNota");

    let notas = JSON.parse(localStorage.getItem("notas")) || [];

    // Mostrar notas almacenadas
    function renderNotas() {
        notasContainer.innerHTML = "";
        notas.forEach((nota, index) => {
            const notaElement = document.createElement("div");
            notaElement.classList.add("nota");
            notaElement.innerHTML = `
                <h3>${nota.titulo}</h3>
                <p>${nota.contenido}</p>
                <button class="eliminar-nota" data-index="${index}">✖</button>
            `;
            notasContainer.appendChild(notaElement);
        });

        document.querySelectorAll(".eliminar-nota").forEach(btn => {
            btn.addEventListener("click", eliminarNota);
        });
    }

    // Mostrar modal
    btnAgregarNota.addEventListener("click", () => {
        modalNota.style.display = "flex";
    });

    // Cerrar modal
    closeModal.addEventListener("click", () => {
        modalNota.style.display = "none";
    });

    // Guardar nota
    guardarNota.addEventListener("click", () => {
        const titulo = tituloInput.value.trim();
        const contenido = contenidoInput.value.trim();

        if (titulo && contenido) {
            notas.push({ titulo, contenido });
            localStorage.setItem("notas", JSON.stringify(notas));
            renderNotas();
            tituloInput.value = "";
            contenidoInput.value = "";
            modalNota.style.display = "none";
        }
    });

    // Eliminar nota
    function eliminarNota(event) {
        const index = event.target.dataset.index;
        notas.splice(index, 1);
        localStorage.setItem("notas", JSON.stringify(notas));
        renderNotas();
    }

    // Renderizar notas al inicio
    renderNotas();
});
