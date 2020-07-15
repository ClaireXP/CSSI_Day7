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
 *    keyCode, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,
 *    text, textSize
 *    loadImage, image
 *    collideRectCircle
 */

let backgroundColor, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V, car, carLeft;
let frogSpeed = 20;
let cars = [];
let logs = [];
let riverY = 200;

function preload(){
  car = loadImage("https://cdn.glitch.com/e911600f-795c-44bd-a7ac-86e6b8b64455%2Fjeep.png?v=1594745795765");
  carLeft = loadImage("https://cdn.glitch.com/e911600f-795c-44bd-a7ac-86e6b8b64455%2Fjeep%20(2).png?v=1594774507143");
}

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = width/2;
  frogY = height-20;
  score = 0;
  lives = 3;
  gameIsOver = false;
  
  refresh();
}

function draw() {
  if(lives>0){
    background(backgroundColor);
    // Code for gold goal line
    fill(60, 80, 80);
    rect(0, 0, width, 50);
    // Code to display Frog

    fill(175, 60, 80);
    rect(0, riverY, width, 30);

    for(const c of cars){
      moveCars(c);
      drawCars(c);
      checkCollisions(c);
    }for(const l of logs){
      moveLogs(l);
      drawLogs(l);
      checkLog(l);
    }

    fill(120, 80, 80);
    ellipse(frogX, frogY, 20);

    checkWin();
    displayScores();
  }
}

function refresh(){
  addRow(80);
  addRow(120);
  addRow(240);
  addRow(350);
  
  let numC = random([2, 3, 4]);
  let v = random(3);
  for(let i=0; i<numC; i++){
    addLog(-30+(width+30)/numC*i, riverY, v);
  }
}

function addRow(y){
  let numC = random([2, 3, 4]);
  let v;
  if(numC==4) v = random([-2, -1.5, -1, -.5, .5, 1, 1.5, 2]);
  else v = random([-4, -3.5, -3, -2.5, -2, -1.5, -1, 1, 1.5, 2, 2.5, 3, 3.5, 4]);
  for(let i=0; i<numC; i++){
    addCar(-30+(width+30)/numC*i, y, v);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) frogY -= frogSpeed;
  if (keyCode === DOWN_ARROW) frogY += frogSpeed;
  if (keyCode === LEFT_ARROW) frogX -= frogSpeed;
  if (keyCode === RIGHT_ARROW) frogX += frogSpeed;
}

function moveCars(c) {
  // Move the car
  c.x += c.v
  
  // Reset if it moves off screen
  if(c.x>width && c.v>0) c.x = -30;
  if(c.x<-30 && c.v<0) c.x = width;
}

function drawCars(c) {
  // Code for car 1
  fill(0, 80, 80);
  if(c.v>0) image(car, c.x, c.y, c.w, c.h);
  else image(carLeft, c.x, c.y, c.w, c.h);
}

function moveLogs(l) {
  // Move the car
  l.x += l.v
  
  // Reset if it moves off screen
  if(l.x>width && l.v>0) l.x = -30;
  if(l.x<-30 && l.v<0) l.x = width;
}

function drawLogs(l) {
  fill(35, 72, 22);
  rect(l.x, l.y, l.w, l.h);
}

function checkCollisions(c) {
  // If the frog collides with the car, reset the frog and subtract a life.
  let hit = collideRectCircle(c.x, c.y, c.w, c.h, frogX, frogY, 20);
  if(hit){
    frogY = height-20;
    lives--;
  }
}

function checkLog(l){
  let onLog = collideRectCircle(l.x, l.y, l.w, l.h, frogX, frogY, 20);
  if(onLog){
    if(!keyPressed) frogY=l.y+l.h/2;
    frogX+=l.v;
    if(frogX>width){
      frogY = height-20;
      lives--;
    }
  }else{
    let inRiver = collideRectCircle(0, riverY, width, 30, frogX, frogY, 20);
    
    if(inRiver){
      frogY = height-20;
      lives--;
    }
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if(frogY<50){
    frogY = height-20;
    score++;
    
    cars = [];
    logs = [];
    
    refresh();
  } 
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score
  text(`Score: ${score}`, 10, 40);
  // Display game over message if the game is over

}

function addCar(x, y, v){
  cars.push({
    x: x,
    y: y,
    v: v,
    w: 50,
    h: 30,
    color: random(255),
  });
}

function addLog(x, y, v){
  logs.push({
    x: x,
    y: y,
    v: v,
    w: 60,
    h: 30,
  });
}