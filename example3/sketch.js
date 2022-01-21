function setup() {
  createCanvas(600, 300);
}

function draw() {
  angleMode(DEGREES);
  rectMode(CENTER);
  background(0);
  noStroke();
  fill('yellow');
  push();
  translate(150, 150);
  rotate(225);
  arc(0, 0, 250, 250, 0, 270, PIE);
  pop();
  push();
  fill('red');
  stroke('red');
  rect(450, 210, 250, 125);
  translate(450, 150)
  scale(1, -1);
  arc(0, 0, 250, 250, 0, 180);
  pop();
  push();
  fill(255);
  translate(390, 150);
  circle(0, 0, 80);
  fill(0, 0, 255);
  circle(0, 0, 50);
  pop();
  push();
  fill(255);
  translate(510, 150);
  circle(0, 0, 80);
  fill(0, 0, 255);
  circle(0, 0, 50);
  pop();
}