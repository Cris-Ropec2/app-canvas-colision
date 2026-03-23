(() => {
    const canvas = document.getElementById("canvas-colision");
    const ctx = canvas.getContext("2d");
    let animationId;
    let circles = [];
    let window_width, window_height;

    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    function initColision() {
        if (animationId) cancelAnimationFrame(animationId);

        window_width = parseInt(document.getElementById("w-colision").value) || 600;
        window_height = parseInt(document.getElementById("h-colision").value) || 300;
        let numCirculos = parseInt(document.getElementById("n-colision").value) || 10;

        canvas.width = window_width; canvas.height = window_height;
        canvas.style.background = "#ff8";
        circles = [];

        class Circle {
            constructor(x, y, radius, color, text, speed) {
                this.posX = x; this.posY = y; this.radius = radius;
                this.color = color; this.originalColor = color;
                this.text = text; this.speed = speed;
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

        for (let i = 0; i < numCirculos; i++) {
            let radius = Math.floor(Math.random() * 25 + 10);
            let x = Math.random() * (window_width - radius * 2) + radius;
            let y = Math.random() * (window_height - radius * 2) + radius;
            let speed = Math.random() * 2 + 1;
            circles.push(new Circle(x, y, radius, "blue", (i + 1).toString(), speed));
        }

        function updateCircle() {
            animationId = requestAnimationFrame(updateCircle);
            ctx.clearRect(0, 0, window_width, window_height);

            // Restaurar color original
            circles.forEach(c => c.color = c.originalColor);

            // Detectar colisiones (todos contra todos)
            for (let i = 0; i < circles.length; i++) {
                for (let j = i + 1; j < circles.length; j++) {
                    if (getDistance(circles[i].posX, circles[i].posY, circles[j].posX, circles[j].posY) < circles[i].radius + circles[j].radius) {
                        circles[i].color = "red";
                        circles[j].color = "red";
                    }
                }
            }
            circles.forEach(c => c.update(ctx));
        }
        updateCircle();
    }

    document.getElementById("btn-colision").addEventListener("click", initColision);
    initColision();
})();