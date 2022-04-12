let serialPDM;
let portName = "COM3";

let sensor;

function setup() {
  serialPDM = new PDMSerial(portName);
  sensor= serialPDM.sensorData;

  createCanvas(600,400);
}

function draw() {
  background('#89CFF0');
  noStroke();
  ellipse(width/2, height/2, sensor.a0);

  //console.log([sensor.a0]);
}

function mousePressed(){
  serialPDM.transmit('mouse', mouseY);
  console.log(mouseY);
}