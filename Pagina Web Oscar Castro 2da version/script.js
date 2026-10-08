/* ============================================================
   SEMILLERO DE INVESTIGACIÓN OCSYSTEM - FUNCIONALIDADES
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    // Formulario de Contacto
    const form = document.getElementById("contactForm");
    const feedback = document.getElementById("formFeedback");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();

            if (nombre && correo && mensaje) {
                feedback.textContent = "¡Mensaje enviado con éxito al equipo del Semillero OCSYSTEM!";
                feedback.className = "feedback-msg success";
                form.reset();

                setTimeout(() => {
                    feedback.style.display = "none";
                }, 5000);
            }
        });
    }

    // Animación suave de desplazamiento para el menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});