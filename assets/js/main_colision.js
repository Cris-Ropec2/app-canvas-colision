const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
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
    this.originalColor = color; // Guardamos el color original para restaurarlo
    this.text = text;
    this.speed = speed;

    // Direcciones aleatorias iniciales para que no vayan todos hacia el mismo lado
    this.dx = (Math.random() < 0.5 ? 1 : -1) * this.speed;
    this.dy = (Math.random() < 0.5 ? 1 : -1) * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color; // Usa el color actual (que puede cambiar si hay colisión)
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
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

// Función auxiliar para calcular la distancia entre dos puntos (Teorema de Pitágoras)
function getDistance(x1, y1, x2, y2) {
  let xDist = x2 - x1;
  let yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// 1. Generar N círculos
let circles = [];
const numeroDeCirculos = 10; // Cambia este número para tener más o menos círculos

for (let i = 0; i < numeroDeCirculos; i++) {
  let radius = Math.floor(Math.random() * 30 + 15); // Radios más pequeños para que quepan mejor
  
  // Aseguramos que los círculos aparezcan completamente dentro del canvas
  let x = Math.random() * (window_width - radius * 2) + radius;
  let y = Math.random() * (window_height - radius * 2) + radius;
  
  let speed = Math.random() * 2 + 1;
  
  circles.push(new Circle(x, y, radius, "blue", (i + 1).toString(), speed));
}

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);

  // 2. Restaurar el color original de todos los círculos en cada frame
  for (let i = 0; i < circles.length; i++) {
    circles[i].color = circles[i].originalColor;
  }

  // 3. Detectar colisiones (comparar todos contra todos)
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      let circleA = circles[i];
      let circleB = circles[j];
      let distance = getDistance(circleA.posX, circleA.posY, circleB.posX, circleB.posY);

      // Si la distancia es menor a la suma de los radios, están colisionando
      if (distance < circleA.radius + circleB.radius) {
        circleA.color = "red"; // Cambia el color a rojo al tocarse
        circleB.color = "red";
      }
    }
  }

  // 4. Actualizar posiciones y dibujar
  for (let i = 0; i < circles.length; i++) {
    circles[i].update(ctx);
  }
};

updateCircle();