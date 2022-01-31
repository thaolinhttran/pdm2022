let colorBlock = [];
let colorSelected;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorBlock[0] = color(255, 0, 0); //red
  colorBlock[1] = color(255, 165, 0); //orange
  colorBlock[2] = color(255, 255, 0); //yellow
  colorBlock[3] = color(0, 255, 0); //green
  colorBlock[4] = color(0, 255, 255); //cyan
  colorBlock[5] = color(0, 0, 255); //blue
  colorBlock[6] = color(255, 0, 255); //magenta
  colorBlock[7] = color(139, 69, 19); //brown
  colorBlock[8] = color(255, 255, 255); //white
  colorBlock[9] = color(0, 0, 0); //black

  background(255);
}

function draw() {
  let i;
  var x = 0, y = 0;

  if(mouseIsPressed){
    strokeWeight(5);
    stroke(colorSelected);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  for(i=0; i < 10; i++){
    paletteBlock(x, y, colorBlock[i]);
    y+=30;
  }
}

function paletteBlock(x, y, c){
  strokeWeight(2);
  stroke(255);
  fill(c);
  rect(x, y, 30, 30);
}

function mousePressed() {
  if((mouseX < 30) && (mouseY < 300)){
    if(mouseY < 30){
      colorSelected = colorBlock[0];
    }
    else if(mouseY < 60){
      colorSelected = colorBlock[1];
    }
    else if(mouseY < 90){
      colorSelected = colorBlock[2];
    }
    else if(mouseY < 120){
      colorSelected = colorBlock[3];
    }
    else if(mouseY < 150){
      colorSelected = colorBlock[4];
    }
    else if(mouseY < 180){
      colorSelected = colorBlock[5];
    }
    else if(mouseY < 210){
      colorSelected = colorBlock[6];
    }
    else if(mouseY < 240){
      colorSelected = colorBlock[7];
    }
    else if(mouseY < 270){
      colorSelected = colorBlock[8];
    }
    else{
      colorSelected = colorBlock[9];
    }
  }
}