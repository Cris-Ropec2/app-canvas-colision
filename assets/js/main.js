// Encapsulamiento IIFE para evitar conflictos de variables globales
(() => {
    const canvas = document.getElementById("canvas-main");
    const ctx = canvas.getContext("2d");
    let animationId; // Para poder detener la animación al actualizar
    let circles = [];
    let window_width, window_height;

    // Función de Inicialización/Reinicio
    function initMain() {
        // Detener animación previa si existe
        if (animationId) cancelAnimationFrame(animationId);

        // Leer valores del panel de control específico
        window_width = parseInt(document.getElementById("w-main").value) || 600;
        window_height = parseInt(document.getElementById("h-main").value) || 300;
        let numCirculos = parseInt(document.getElementById("n-main").value) || 5;

        // Ajustar tamaño del canvas
        canvas.width = window_width;
        canvas.height = window_height;
        canvas.style.background = "#ff8"; // Mantenemos tu fondo amarillo

        circles = [];

        // Definición de la clase dentro del scope local
        class Circle {
            constructor(x, y, radius, color, text, speed) {
                this.posX = x; this.posY = y; this.radius = radius;
                this.color = color; this.text = text; this.speed = speed;
                this.dx = (Math.random() < 0.5 ? 1 : -1) * this.speed;
                this.dy = (Math.random() < 0.5 ? 1 : -1) * this.speed;
            }
            draw(context) {
                context.beginPath();
                context.strokeStyle = this.color;
                context.textAlign = "center"; context.textBaseline = "middle";
                context.font = "20px Arial"; context.fillText(this.text, this.posX, this.posY);
                context.lineWidth = 2;
                context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
                context.stroke(); context.closePath();
            }
            update(context) {
                this.draw(context);
                if (this.posX + this.radius > window_width || this.posX - this.radius < 0) this.dx = -this.dx;
                if (this.posY + this.radius > window_height || this.posY - this.radius < 0) this.dy = -this.dy;
                this.posX += this.dx; this.posY += this.dy;
            }
        }

        // Crear círculos
        for (let i = 0; i < numCirculos; i++) {
            let radius = Math.floor(Math.random() * 30 + 15);
            let x = Math.random() * (window_width - radius * 2) + radius;
            let y = Math.random() * (window_height - radius * 2) + radius;
            let speed = Math.random() * 2 + 1;
            circles.push(new Circle(x, y, radius, "blue", (i + 1).toString(), speed));
        }

        // Bucle de animación
        function updateCircle() {
            animationId = requestAnimationFrame(updateCircle);
            ctx.clearRect(0, 0, window_width, window_height);
            circles.forEach(c => c.update(ctx));
        }
        updateCircle();
    }

    // Escuchar al botón de actualizar
    document.getElementById("btn-main").addEventListener("click", initMain);
    // Iniciar automáticamente la primera vez
    initMain();
})();