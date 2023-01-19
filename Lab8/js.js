var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

 
 canvas.width = 800;
 canvas.height = 600;


 var balls = [];
 var numBalls = 50;
 var lineLength = 80;

 
 class Ball {
     constructor(x, y, vx, vy, radius) {
         this.x = x;
         this.y = y;
         this.vx = vx;
         this.vy = vy;
         this.radius = radius;
     }

     
     draw() {
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
         ctx.fillStyle = "blue";
         ctx.fill();
         ctx.closePath();
     }

     
     update() {
         this.x += this.vx;
         this.y += this.vy;

         // Odbijanie się od krawędzi
         if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
             this.vx = -this.vx;
         }
         if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
             this.vy = -this.vy;
         }
     }
 }

 
 for (var i = 0; i < numBalls; i++) {
     var x = Math.random() * canvas.width;
     var y = Math.random() * canvas.height;
     var vx = (Math.random() - 0.5) * 10;
     var vy = (Math.random() - 0.5) * 10;
     var radius = 20;
     balls.push(new Ball(x, y, vx, vy, radius));
 }

 
 function animate() {
     requestAnimationFrame(animate);
     ctx.clearRect(0, 0, canvas.width, canvas.height);

    
     for (var i = 0; i < balls.length; i++) {
        for (var j = i + 1; j < balls.length; j++) {
            var distance = Math.sqrt(Math.pow(balls[i].x - balls[j].x, 2) + Math.pow(balls[i].y - balls[j].y, 2));
            if (distance < lineLength) {
            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[j].x, balls[j].y);
            ctx.strokeStyle = "red";
            ctx.stroke();
            }
            }
            }
    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
    }
}

animate();
