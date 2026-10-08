/* ============================================================
   DESARROLLO WEB II - TALLER PRÁCTICO
   Funcionalidades de Interfaz y Módulo de Carrito de Compras
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. FUNCIONALIDADES BÁSICAS DE INTERFAZ
    // ==========================================

    // A. Menú Responsive (classList.toggle)
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("nav-active");
        });
    }

    // B. Modo Claro / Oscuro
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");
            const icon = themeToggle.querySelector("i");
            if (document.body.classList.contains("light-theme")) {
                icon.className = "fa-solid fa-sun";
            } else {
                icon.className = "fa-solid fa-moon";
            }
        });
    }

    // ==========================================
    // 2. MÓDULO DE CARRITO DE COMPRAS BÁSICO
    // ==========================================

    let carrito = [];
    const listaCarritoContainer = document.getElementById("listaCarrito");
    const totalPagarElement = document.getElementById("totalPagar");
    const btnVaciar = document.getElementById("btnVaciar");
    const botonesAgregar = document.querySelectorAll(".btn-agregar");

    // Formateador de moneda
    const formatCOP = (valor) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(valor);
    };

    // Capacidad de capturar el evento click en cada producto
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const btn = e.currentTarget;
            const producto = {
                id: btn.getAttribute("data-id"),
                nombre: btn.getAttribute("data-nombre"),
                precio: parseFloat(btn.getAttribute("data-precio"))
            };

            agregarAlCarrito(producto);
        });
    });

    // Agregar producto al estado del carrito
    function agregarAlCarrito(producto) {
        carrito.push(producto);
        renderizarCarrito();
    }

    // Renderizado dinámico creando nuevos nodos HTML
    function renderizarCarrito() {
        // Limpiar contenido actual
        listaCarritoContainer.innerHTML = "";

        if (carrito.length === 0) {
            listaCarritoContainer.innerHTML = `<p class="carrito-vacio">El carrito está vacío.</p>`;
            totalPagarElement.textContent = formatCOP(0);
            return;
        }

        let total = 0;

        carrito.forEach((item, index) => {
            total += item.precio;

            // Crear elemento contenedor para cada ítem
            const itemElement = document.createElement("div");
            itemElement.classList.add("carrito-item");

            // Estructura interna del nodo
            itemElement.innerHTML = `
                <div class="item-info">
                    <strong>${item.nombre}</strong>
                    <span>${formatCOP(item.precio)}</span>
                </div>
                <button class="btn-eliminar" data-index="${index}" title="Eliminar del carrito">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;

            listaCarritoContainer.appendChild(itemElement);
        });

        // Actualizar el valor total acumulado
        totalPagarElement.textContent = formatCOP(total);

        // Asignar eventos de eliminación a los nuevos botones agregados
        const botonesEliminar = listaCarritoContainer.querySelectorAll(".btn-eliminar");
        botonesEliminar.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = parseInt(e.currentTarget.getAttribute("data-index"));
                eliminarDelCarrito(index);
            });
        });
    }

    // Eliminar producto individual por índice
    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        renderizarCarrito();
    }

    // Vaciar todo el carrito
    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            carrito = [];
            renderizarCarrito();
        });
    }
});
