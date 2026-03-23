(() => {
    const canvas = document.getElementById("canvas-rebote");
    const ctx = canvas.getContext("2d");
    let animationId;
    let circles = [];
    let window_width, window_height;

    function getDistance(x1, y1, x2, y2) { return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); }
    function getRandomColor() {
        const letters = '0123456789ABCDEF'; let color = '#';
        for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
        return color;
    }

    function initRebote() {
        if (animationId) cancelAnimationFrame(animationId);

        window_width = parseInt(document.getElementById("w-rebote").value) || 600;
        window_height = parseInt(document.getElementById("h-rebote").value) || 300;
        let numCirculos = parseInt(document.getElementById("n-rebote").value) || 15;

        canvas.width = window_width; canvas.height = window_height;
        canvas.style.background = "#ff8";
        circles = [];

        class Circle {
            constructor(x, y, radius, color, text, speed) {
                this.posX = x; this.posY = y; this.radius = radius;
                this.color = color; this.text = text; this.speed = speed;
                this.dx = (Math.random() < 0.5 ? 1 : -1) * this.speed;
                this.dy = (Math.random() < 0.5 ? 1 : -1) * this.speed;
            }
            draw(context) {
                context.beginPath();
                context.fillStyle = this.color; // Fondo relleno
                context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
                context.fill();
                context.lineWidth = 2; context.strokeStyle = "black"; context.stroke();
                context.textAlign = "center"; context.textBaseline = "middle";
                context.font = "20px Arial"; context.fillStyle = "white"; context.fillText(this.text, this.posX, this.posY);
                context.closePath();
            }
            update(context) {
                this.draw(context);
                if (this.posX + this.radius > window_width || this.posX - this.radius < 0) this.dx = -this.dx;
                if (this.posY + this.radius > window_height || this.posY - this.radius < 0) this.dy = -this.dy;
                this.posX += this.dx; this.posY += this.dy;
            }
        }

        for (let i = 0; i < numCirculos; i++) {
            let radius = Math.floor(Math.random() * 20 + 10);
            let x = Math.random() * (window_width - radius * 2) + radius;
            let y = Math.random() * (window_height - radius * 2) + radius;
            let speed = Math.random() * 2 + 1;
            circles.push(new Circle(x, y, radius, getRandomColor(), (i + 1).toString(), speed));
        }

        function updateCircle() {
            animationId = requestAnimationFrame(updateCircle);
            ctx.clearRect(0, 0, window_width, window_height);

            // Física de Colisiones y Rebotes
            for (let i = 0; i < circles.length; i++) {
                for (let j = i + 1; j < circles.length; j++) {
                    let circleA = circles[i], circleB = circles[j];
                    let distance = getDistance(circleA.posX, circleA.posY, circleB.posX, circleB.posY);

                    if (distance < circleA.radius + circleB.radius) {
                        // Resorción de solapamiento
                        let overlap = (circleA.radius + circleB.radius) - distance;
                        let nx = (circleB.posX - circleA.posX) / distance, ny = (circleB.posY - circleA.posY) / distance;
                        circleA.posX -= nx * (overlap / 2); circleA.posY -= ny * (overlap / 2);
                        circleB.posX += nx * (overlap / 2); circleB.posY += ny * (overlap / 2);

                        // Cálculo de rebote (intercambio de energía)
                        let dvx = circleA.dx - circleB.dx, dvy = circleA.dy - circleB.dy;
                        let normalVelocity = dvx * nx + dvy * ny;
                        
                        if (normalVelocity > 0) {
                            circleA.dx -= normalVelocity * nx; circleA.dy -= normalVelocity * ny;
                            circleB.dx += normalVelocity * nx; circleB.dy += normalVelocity * ny;
                            circleA.color = getRandomColor(); circleB.color = getRandomColor();
                        }
                    }
                }
            }
            circles.forEach(c => c.update(ctx));
        }
        updateCircle();
    }

    document.getElementById("btn-rebote").addEventListener("click", initRebote);
    initRebote();
})();