const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight / 2;
const window_width = window.innerWidth / 2;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;

    this.dx = (Math.random() < 0.5 ? 1 : -1) * this.speed;
    this.dy = (Math.random() < 0.5 ? 1 : -1) * this.speed;
  }

  draw(context) {
    context.beginPath();
    // Para rellenar el círculo con el color (y que cambie el fondo como pediste)
    context.fillStyle = this.color;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fill();

    // Dibujar el borde
    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.stroke();

    // Dibujar el texto
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillStyle = "white"; // Texto blanco para que resalte
    context.fillText(this.text, this.posX, this.posY);
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // Rebote con los bordes de la pantalla
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Función para calcular la distancia
function getDistance(x1, y1, x2, y2) {
  let xDist = x2 - x1;
  let yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Función para generar un color hexadecimal aleatorio
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Generar N círculos
let circles = [];
const numeroDeCirculos = 10;

for (let i = 0; i < numeroDeCirculos; i++) {
  let radius = Math.floor(Math.random() * 30 + 15);
  let x = Math.random() * (window_width - radius * 2) + radius;
  let y = Math.random() * (window_height - radius * 2) + radius;
  let speed = Math.random() * 2 + 1;
  
  circles.push(new Circle(x, y, radius, getRandomColor(), (i + 1).toString(), speed));
}

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);

  // Detectar colisiones y calcular rebotes
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      let circleA = circles[i];
      let circleB = circles[j];
      let distance = getDistance(circleA.posX, circleA.posY, circleB.posX, circleB.posY);

      if (distance < circleA.radius + circleB.radius) {
        
        // 1. Evitar que se queden pegados (solapamiento)
        let overlap = (circleA.radius + circleB.radius) - distance;
        let nx = (circleB.posX - circleA.posX) / distance;
        let ny = (circleB.posY - circleA.posY) / distance;
        
        // Separamos los círculos para que dejen de tocarse
        circleA.posX -= nx * (overlap / 2);
        circleA.posY -= ny * (overlap / 2);
        circleB.posX += nx * (overlap / 2);
        circleB.posY += ny * (overlap / 2);

        // 2. Calcular el rebote (Física de colisión)
        let dvx = circleA.dx - circleB.dx;
        let dvy = circleA.dy - circleB.dy;
        
        // Velocidad a lo largo de la normal de colisión
        let normalVelocity = dvx * nx + dvy * ny;
        
        // Solo rebotan si se están acercando
        if (normalVelocity > 0) {
          // Intercambian velocidades a lo largo del eje de colisión
          circleA.dx -= normalVelocity * nx;
          circleA.dy -= normalVelocity * ny;
          circleB.dx += normalVelocity * nx;
          circleB.dy += normalVelocity * ny;
          
          // 3. Cambiar el color de fondo al chocar
          circleA.color = getRandomColor();
          circleB.color = getRandomColor();
        }
      }
    }
  }

  // Actualizar posiciones y dibujar
  for (let i = 0; i < circles.length; i++) {
    circles[i].update(ctx);
  }
};

updateCircle();