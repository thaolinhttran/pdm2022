function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0, 0, 128);
  stroke(255);
  strokeWeight(5);
  fill('#006400');
  circle(300, 300, 250);
  push();
  fill('red');
  beginShape();
  vertex(300, 175);
  vertex(270, 255);
  vertex(185, 255);
  vertex(253, 310);
  vertex(230, 408);
  vertex(300, 350);
  vertex(370, 408);
  vertex(347, 310);
  vertex(415, 255);
  vertex(330, 255);
  endShape(CLOSE);
  pop();
}