let guy, green, yang, viking;

function preload() {
  guySheet = loadImage("SpelunkyGuy.png");
  greenSheet = loadImage("Green.png");
  yangSheet = loadImage("Yang.png");
  vikingSheet = loadImage("viking.png");
}
function setup() {
  createCanvas(1000, 600);
  imageMode(CENTER);

  guy = new Character(guySheet, 0, 50);
  green = new Character(greenSheet, 0, 200);
  yang = new Character (yangSheet, 0, 350);
  viking = new Character(vikingSheet, 0, 500);

}

function keyPressed(){
  if (keyCode == RIGHT_ARROW){
    guy.go(1);
    green.go(1);
    yang.go(1);
    viking.go(1);
  }
  else if (keyCode == LEFT_ARROW){
    guy.go(-1);
    green.go(-1);
    yang.go(-1);
    viking.go(-1);
  }
}

function keyReleased(){
  guy.stop();
  green.stop();
  yang.stop();
  viking.stop();
}

function draw() {
  background(161, 61, 45);
  guy.draw();
  green.draw();
  yang.draw();
  viking.draw();
  let i = 120;
  while(i < 600){
    stroke(255);
    strokeWeight(10);
    line(0, i, width, i);
    i = i + 150;
  }
}

class Character{
  constructor(spriteSheet, x, y){
    this.spriteSheet = spriteSheet;
    this.x = x;
    this.y = y;
    this.sx = 0;
    this.move = 0;
    this.facing = 1;
  }
draw(){
  push();
  translate(this.x, this.y);
  scale(1/2*this.facing, 1/2);

  if(this.move == 0){
    image(this.spriteSheet, 0, 0, 200, 200, 0, 0, 80, 80);
  }
  else{
    image(this.spriteSheet, 0, 0, 200, 200, 80 * (this.sx + 1), 0, 80, 80);
  }

  if (frameCount % 5 == 0){
    this.sx = (this.sx + 1) % 8;
  }
  this.x += random(10) * this.move;
  pop();
}

go(direction){
  this.move = direction;
  this.facing = direction;
  this.sx = 3;
}

stop(){
  this.move = 0;
}
}