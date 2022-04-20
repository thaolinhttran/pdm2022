//Arduino controller implementation: Control gameplay using joystick instead of a mouse.
//When a bug is squished, it transmits signals to the arduino buzzer and make noise.
//Youtube: https://youtu.be/N1rOeP2G01U
let serialPDM;
let portName = "COM3";
let xMouse = 0, yMouse = 0;

let sensor;

let bug = [];
let font;
let count = 20;
let startTime;
let gameState = 'wait';
let score = 0;
const homeSound = new Tone.Player("/media/FastFeelBananaPeel-320bit.mp3");
//Tone.start() must be in console terminal to hear at the wait screen
const laugh = new Tone.Player("/media/zapsplat_animals_mice_baby_whining_short_high_pitched_designed_001_80839.mp3");
const vol = new Tone.Volume(-30).toDestination();
homeSound.connect(vol);
laugh.connect(vol);
let gain = new Tone.Gain().connect(vol);
let mosquito = new Tone.Synth({
  oscillator: {
    type: "fatsine4",
    spread: 80,
    count: 10,
    frequency: 10000
  },
  envelope: {
    attack: 0.7,
    decay: 0.01,
    sustain: 1,
    attackCurve: "sine",
    releaseCurve: "sine",
    release: 0.2,
    volume: -2000,
  }
});
mosquito.connect(gain);
let mosDis = new Tone.Distortion({
  distortion: 5.3,
  wet: 0.5
});
mosquito.connect(mosDis);
mosquito.connect(gain);

let tempo = 120;
const loopMos = new Tone.Loop(time => {
  mosquito.triggerAttackRelease("F4", "16n", time);
}, "16n").start(0);
Tone.Transport.bpm.value = tempo;

let slap = new Tone.NoiseSynth({
  noise: {
    type: "white",
    playbackRate: 5
  },
  envelope: {
    attack: 0.1,
    decay: 0.01,
    release: 0.3
  }
});
let slapE = new Tone.JCReverb({
  roomSize: 0.2,
  wet: 0.9
});
slap.connect(slapE).toDestination();
function preload(){
  mosquitoSheet = loadImage("mosquitosprite.png");
  font = loadFont('SevenSidedGames.ttf');
}
function setup() {
  serialPDM = new PDMSerial(portName);
  sensor = serialPDM.sensorData;

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

function joyPressed(){
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
    serialPDM.transmit('state', 1);
    console.log('state');
    //slap.triggerAttack("16n", Tone.now());
  }
  else if(bugID == -1)
  {
      const now = Tone.now();
      laugh.start(now);
  }
}

function joyReleased(){
  for(i = 0; i < count; i++){
    bug[i].drop();
    bug.push(new Bug(mosquitoSheet, random(30, 570), random(30, 570), bug[i].speed + random(2, 4), random([-1, 1])));
  }
}

Tone.start();
function draw() {
  background(205, 230, 242);

  if(sensor.x != undefined || sensor.y != undefined){
    xMouse+=sensor.x;
    yMouse-=sensor.y;
  }
  console.log(sensor.x + "," + sensor.y);
  push();
  fill('black');
  ellipse(xMouse, yMouse, 30);
  pop();

  let totalTime = 30;
  if(gameState == 'wait'){
    homeSound.autostart=true;
    textSize(40);
    text('KILL THE MOSQUITOES', 150, 300);
    textSize(15);
    text('Press any key to start', 250, 350);
    if(sensor.z == 1){
      //mosquito.triggerAttackRelease("A4", "8n");
      startTime = millis();
      gameState = 'playing';
    }
  }
  else if(gameState == 'playing'){
    homeSound.stop();
    if(sensor.z == 1){
      joyPressed();
    }
    else if(sensor.z == 0){
      joyReleased();
    }
    for(i = 0; i < count; i++){
      bug[i].draw();
    }
    Tone.start();
    Tone.Transport.start();
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
    if(sensor.z == 1){
      startTime = millis();
      gameState = 'playing';
      score = 0;
    }
    Tone.Transport.stop(0);
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
    if(xMouse > this.x - 40 && xMouse < this.x + 40 &&
      xMouse > this.y - 40 && yMouse < this.y + 40){
        d = dist(xMouse, yMouse, this.x, this.y);
    }
    return d;
  }

  grab(){
        this.stop();
        this.grabbed = true;
        this.offsetX = this.x - xMouse;
        this.offsetY = this.y - xMouse;
  }

  drag(){
    if(this.grabbed){
      this.x = xMouse + this.offsetX;
      this.y = xMouse + this.offsetY;
    }
  }

  drop(){
    if(this.grabbed){
      this.grabbed = false;
      this.dead = true;
      if(this.dead){
        score++;
        tempo = tempo + (score * 5);
        //increase bpm if everytime a mosquito is dead
        Tone.Transport.bpm.rampTo(tempo, 3);
      }
      this.x = -100;
      this.y = 0;
    }
  }
}