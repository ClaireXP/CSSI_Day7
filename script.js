/* ____    ___       _      _       ____  
  / ___|  / _ \     / \    | |     / ___| 
 | |  _  | | | |   / _ \   | |     \___ \ 
 | |_| | | |_| |  / ___ \  | |___   ___) |
  \____|  \___/  /_/   \_\ |_____| |____/ 
                       
1) 

  ____    _____   ____    _____   _____    ____   _   _ 
 / ___|  |_   _| |  _ \  | ____| |_   _|  / ___| | | | |
 \___ \    | |   | |_) | |  _|     | |   | |     | |_| |
  ___) |   | |   |  _ <  | |___    | |   | |___  |  _  |
 |____/    |_|   |_| \_\ |_____|   |_|    \____| |_| |_|

1) Add multiple cars.
2) Add a certain goal - i.e. score 5 times to end the game.
3) Make it so that you can only move the frog if the game
   is not over.
4) Make the game get more and more challenging as you win
   more and more times.
5) Color code your player pieces.
6) Using some ideas from yesterday’s game, add some
   collectible power-ups that make you temporarily
   invincible, faster, smaller, or rainbow-colored.
7) Add features like a river to the background - make some
   additional modifications to the gameplay - perhaps
   falling into the river also sends you back. Add logs
   that float.

*/

// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global
 *    createCanvas, background
 *    colorMode, HSB, fill
 *    ellipse, rect
 *    random
 *    width, height
 *    keyCode, UP_ARROW
 *    text, textSize
 *    loadImage, image
 */

let backgroundColor, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V, car;

function preload(){
  car = loadImage("https://cdn.glitch.com/e911600f-795c-44bd-a7ac-86e6b8b64455%2Fjeep.png?v=1594745795765");
}

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = random(width);
  frogY = random(height);
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
}

function draw() {
  background(backgroundColor);
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  // Code to display Frog
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    frogY -= 10;
  }
}

function moveCars() {
  // Move the car

  // Reset if it moves off screen

}

function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
  // rect(car1X, car1Y, 40, 30);
  image(car, car1X, car1Y, 50, 30);
  // Code for additional cars
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.

}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score

  // Display game over message if the game is over

}