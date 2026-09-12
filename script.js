document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------------------------------------------
    // 1. CAMBIO DE TEMA (Modo Oscuro / Claro)
    // ------------------------------------------------------------------
    const themeBtn = document.getElementById("toggle-theme");

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");

            // Cambiar texto e ícono del botón
            if (document.body.classList.contains("dark-theme")) {
                themeBtn.textContent = "☀️ Modo Claro";
            } else {
                themeBtn.textContent = "🌙 Modo Oscuro";
            }
        });
    }

    // ------------------------------------------------------------------
    // 2. DESCARGAR / IMPRIMIR EN PDF
    // ------------------------------------------------------------------
    const printBtn = document.getElementById("print-cv");

    if (printBtn) {
        printBtn.addEventListener("click", () => {
            window.print();
        });
    }

    // ------------------------------------------------------------------
    // 3. BUSCADOR EN TIEMPO REAL CON RESALTADO (.highlight)
    // ------------------------------------------------------------------
    const buscadorInput = document.getElementById("buscador");

    if (buscadorInput) {
        buscadorInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();

            // Limpiar resaltados previos antes de realizar una nueva búsqueda
            quitarResaltados();

            if (query === "") return;

            // Seleccionar solo los contenedores de texto principales
            const contenedores = document.querySelectorAll(
                ".section p, .section li, .section h3, .header-info h1, .header-info p"
            );

            contenedores.forEach((el) => {
                const textoOriginal = el.innerText;
                const textoMinuscula = textoOriginal.toLowerCase();

                if (textoMinuscula.includes(query)) {
                    // Expresión regular para reemplazar el texto encontrado respetando mayúsculas/minúsculas
                    const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
                    el.innerHTML = textoOriginal.replace(
                        regex,
                        '<mark class="highlight">$1</mark>'
                    );
                }
            });
        });
    }

    // Función auxiliar para quitar la etiqueta <mark> sin perder el texto original
    function quitarResaltados() {
        const resaltados = document.querySelectorAll("mark.highlight");
        resaltados.forEach((mark) => {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize(); // Une nodos de texto adyacentes
        });
    }

    // Función auxiliar para escapar caracteres especiales de expresiones regulares
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
});