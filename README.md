# Colisiones 2D 💥

Una aplicación web interactiva que simula el movimiento, la detección de solapamiento y la física de rebote de múltiples objetos (círculos) en un espacio bidimensional utilizando la API de Canvas.

## 📌 Descripción del Proyecto

Este laboratorio virtual permite observar y manipular el comportamiento de objetos en movimiento dentro de un entorno cerrado. El proyecto está dividido en tres módulos o tableros interactivos, cada uno diseñado para demostrar una etapa diferente en la programación de físicas de videojuegos y simulaciones:

1. **Movimiento Libre:** Generación de objetos con direcciones aleatorias y rebote básico contra los límites de la pantalla.
2. **Detección Visual:** Algoritmo que calcula la distancia entre los centros de los objetos (Teorema de Pitágoras) para detectar cuándo se tocan, cambiando su estado (color) temporalmente.
3. **Física de Rebote:** Implementación de resolución de solapamiento y cálculo de vectores normales para simular rebotes elásticos realistas e intercambio de energía entre los objetos.

## ✨ Características Principales

* **Interfaz Moderna:** Diseño basado en *Glassmorphism* (efecto de cristal translúcido) sobre un fondo dinámico.
* **Paneles de Control Independientes:** Cada módulo cuenta con controles para ajustar en tiempo real el ancho y alto del canvas, así como la cantidad de círculos a generar.
* **Single Page Application (SPA):** Navegación fluida entre los tres módulos utilizando las pestañas de navegación, sin necesidad de recargar la página.
* **Encapsulamiento:** Lógica de JavaScript aislada mediante funciones IIFE para evitar conflictos de variables entre los tres simuladores.

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica y elemento `<canvas>`.
* **CSS3:** Estilos personalizados, variables y efecto Glassmorphism (`backdrop-filter`).
* **JavaScript (Vanilla):** Programación Orientada a Objetos (Clases), animaciones con `requestAnimationFrame` y matemáticas aplicadas.
* **Bootstrap 5:** Sistema de cuadrícula (Grid), tarjetas y componentes de navegación.

## 🚀 Instrucciones de Uso

1. Clona o descarga este repositorio en tu computadora.
2. Asegúrate de mantener la siguiente estructura de carpetas:
   ```text
   📁 APP-CANVAS-COLISION
   ├── 📄 index.html
   ├── 📄 README.md
   └── 📁 assets
       ├── 📁 css
       │   └── 📄 style.css
       └── 📁 js
           ├── 📄 main.js
           ├── 📄 main_colision.js
           └── 📄 main_rebote.js