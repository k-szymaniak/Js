const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballCounterParagraph = document.getElementById("ballCounterParagraph");
let balls = [];
let numBalls = 10;
let distance = 50;
let isRunning = false;


function start() {
  if (isRunning) {
    return;
  }
  isRunning = true;

  // Kulki
  for (let i = 0; i < numBalls; i++) {
    balls.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * 2 - 1,
    });
  }

  requestAnimationFrame(animate);

  ballCounter();
}

function animate() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Kulki
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();

    // Odległości
    for (let j = i + 1; j < balls.length; j++) {
      const otherBall = balls[j];
      const dx = ball.x - otherBall.x;
      const dy = ball.y - otherBall.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Linie
      if (dist < distance) {
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(otherBall.x, otherBall.y);
        ctx.strokeStyle = "gray";
        ctx.stroke();
      }
    }

    // Odbijanie kulek
    if (ball.x + ball.dx > canvas.width || ball.x + ball.dx < 0) {
      ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy > canvas.height || ball.y + ball.dy < 0) {
      ball.dy = -ball.dy;
    }
    // Aktualizowanie położenia kulek
    ball.x += ball.dx;
    ball.y += ball.dy;
  }

  requestAnimationFrame(animate);
}

function ballCounter() {
    ballCounterParagraph.innerHTML = `Aktualna liczba kulek: ${balls.length}`;
}

function restart() {
  // Czyszczenie canvas i tablicy z kulkami
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];

    numBalls = document.getElementById("numBalls").value;
    distance = document.getElementById("distance").value;
    isRunning = false;
    ballCounter();
}

canvas.width = 500;
canvas.height = 500;

document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("restartBtn").addEventListener("click", restart);