let bug = [];
let font;
let count = 20;
let startTime;
let gameState = 'wait';
let score = 0;

function preload(){
  mosquitoSheet = loadImage("mosquitosprite.png");
  font = loadFont('SevenSidedGames.ttf');
}
function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  textFont(font);
  for(i = 0; i < count; i++){
    bug[i] = new Bug(mosquitoSheet, random(50, 550), random(50, 550), random(1, 3), random([-1, 1]));
  }
}

function timer(){
  return int((millis() - startTime) / 1000);
}

function mousePressed(){
  let dmin = -1;
  let bugID = -1;

  for(i = 0; i < count; i++){
    let d = bug[i].grabCheck(); 
    if (d != -1){
      if (dmin == -1 || d < dmin){
        dmin = d;
        bugID = i;
      }
    }
  }

  if(bugID != -1) {
    bug[bugID].grab();
  }
}

function mouseReleased(){
  for(i = 0; i < count; i++){
    bug[i].drop();
    bug.push(new Bug(mosquitoSheet, random(30, 570), random(30, 570), bug[i].speed + random(2, 4), random([-1, 1])));
  }
}

function draw() {
  background(205, 230, 242);
  let totalTime = 30;
  if(gameState == 'wait'){
    textSize(40);
    text('KILL THE MOSQUITOES', 150, 300);
    textSize(15);
    text('Press any key to start', 250, 350);
    if(mouseIsPressed){
      startTime = millis();
      gameState = 'playing';
    }
  }
  else if(gameState == 'playing'){
    for(i = 0; i < count; i++){
      bug[i].draw();
    } 
    let time = timer();
    textSize(20);
    text("Time: " + (totalTime - time), 10, 30);
    text("Score: " + score, 10, 70);
    if (time >= 30){
      gameState = 'end';
    }
  }
  else if(gameState == 'end') {
    textSize(40);
    text("GAME OVER", 230, 270);
    textSize(30);
    text("You killed " + score, 200, 333);
    text("mosquitoes!", 325, 333);
    textSize(20);
    text("Press any key to restart", 220, 400);
    if(mouseIsPressed){
      startTime = millis();
      gameState = 'playing';
      score = 0;
    }
  }
}

class Bug{
  constructor(spriteSheet, x, y, speed, move){
    this.spriteSheet = spriteSheet;
    this.x = x;
    this.y = y;
    //this.sx = 0;
    this.move = move;
    this.facing = move;
    this.speed = speed;
    this.grabbed = false;
    this.spriteFrame = 0;
    this.dead = false;
  }

  animate(){
    let sx;
    if(this.move == 0){
      if(this.grabbed){
        //squished
        sx = this.spriteFrame % 2 + 6;
      }
      else{
        //standing still
        sx = 0;
      }
    }
    else{
      //flying
      sx = this.spriteFrame % 5 + 1;
    }
    return sx;
  }

  draw(){
    push();
      translate(this.x, this.y);
      scale(1/4*this.facing, 1/4);

      //draw sprite based on animation
      let sx = this.animate();
      image(this.spriteSheet, 0, 0, 250, 200, 102 * sx, 0, 105, 105);
      
      //duration of each sprite
      if(frameCount % 3 == 0){
        this.spriteFrame += 1;
      }

      //movement
      this.x += random(1, 5) * this.speed * this.move;
      this.y += random(1, 3) * this.speed * this.move;

      //revert at boundary
      if(this.x < 30){
        this.move = 1;
        this.facing = 1;
      }
      else if (this.x > width - 30){
        this.move = -1;
        this.facing = -1
      }
    pop();
  }

  stop(){
    this.move = 0;
  }

  grabCheck(){
    let d = -1;
    if(mouseX > this.x - 30 && mouseX < this.x + 30 &&
      mouseY > this.y - 30 && mouseY < this.y + 30){
        d = dist(mouseX, mouseY, this.x, this.y);
    }
    return d;
  }

  grab(){
        this.stop();
        this.grabbed = true;
        this.offsetX = this.x - mouseX;
        this.offsetY = this.y - mouseY;
  }

  drag(){
    if(this.grabbed){
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  drop(){
    if(this.grabbed){
      this.grabbed = false;
      this.dead = true;
      if(this.dead){
        score++;
      }
      this.x = -100;
      this.y = 0;
    }
  }
}