var board = document.getElementById("board");
var ball = document.getElementById("ball");
var hole = document.getElementById("hole");
const timer = document.getElementById("timer");
var scoreboard = document.getElementById("scoreboard");
var seconds = 0;
var holeX = 250;
var holeY = 250;
var ballX = 250;
var ballY = 250;
var speedX = 0;
var speedY = 0;
var score = -1;
var startTime;
var endTime;

// Kulka na środku
ball.style.left = ballX + "px";
ball.style.top = ballY + "px";
hole.style.left = holeX + "px";
hole.style.top = holeY + "px";


window.addEventListener("deviceorientation", handleOrientation);

function handleOrientation(event) {

  var x = event.beta;
  var y = event.gamma;

  // Prędkość kulki na podstawie beta i gamma
  speedX = -x * 0.1;
  speedY = y * 0.1;
}
  // Timer
function time() {
let interval = setInterval(() => {timer.innerHTML = `Czas: ${seconds++}`} ,1000);
}
time();

startTime = Date.now();
requestAnimationFrame(animate);

function animate() {

  ballX += speedX;
  ballY += speedY;

  if (ballX < 0) {
    ballX = 0;
    speedX = 0;
  }
  if (ballX > 470) {
    ballX = 470;
    speedX = 0;
  }
  if (ballY < 0) {
    ballY = 0;
    speedY = 0;
  }
  if (ballY > 470) {
    ballY = 470;
    speedY = 0;
  }


  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  // Sprawdzenie czy kulka jest w dziurze
  if (Math.abs(ballX - holeX) < 20 && Math.abs(ballY - holeY) < 20) {

    score++;
    seconds = 0;

    if (score == 5) {
      endTime = Date.now();
      var totalTime = (endTime - startTime) / 1000;
      alert("Gratulacje! Ukończyłeś grę w czasie " + totalTime + " sekund.");
      var userName = prompt("Podaj swoją nazwę.");

      // Zapisywanie wyniku do localStorage
      if (localStorage.getItem("scores") == null) {
        localStorage.setItem("scores", `${userName}: ${totalTime}s`);
      } else {
        var currentScores = localStorage.getItem("scores");
        localStorage.setItem("scores", currentScores + `, ${userName}: ${totalTime}s`);
      }
      // Tabela wyników
      var scores = localStorage.getItem("scores");
      scoreboard.innerHTML = `<h2>Najlepsze Wyniki:</h2> <p> ${scores} </p>`;
      return;
    }

    // Losowanie nowego położenia diury
    holeX = Math.random() * 450;
    holeY = Math.random() * 450;
    hole.style.left = holeX + "px";
    hole.style.top = holeY + "px";

    speedX = 0;
    speedY = 0;
  }

requestAnimationFrame(animate);
}
