let img,img1;
let pitch = 1000;

// Set up Tone
let osc = new Tone.Oscillator("C#3",'square4').start()
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner(1).connect(gain);
pan.pan.rampTo(-1,0.5);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8,
  tempo: 60,
  dampening:1200
}).connect(pan);
ampEnv.volume = -30;
osc.connect(ampEnv);

let freqLFO = new Tone.LFO(10,1500,1700).start();
freqLFO.connect(osc.frequency); 


let noise = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  playbackRate: 0.2,
  attackCurve: "exponential",
  attack: 0.3,
  decay: 0.2,
  sustain: 0.9,
  release: 0.2,
  volume: -15
}).connect(gain);
let noiseEff = new Tone.Tremolo({
  frequency: 3,
  type: "triangle",
  dept: 0.6,
  spread: 180,
  wet: 0.9
}).connect(noiseEnv);
noise.connect(noiseEff);
function preload(){
  img = loadImage("/ufo.jpg");
  img1 = loadImage("/ufo1.jpg");
}
function setup() {
  createCanvas(600, 400);
  img.resize(600,400);
}

function draw() {
  background(220);

  image(img1, 0, 0);
  if(mouseIsPressed){
    image(img, 0, 0);
  }
}

function mousePressed() {
  Tone.start();
  console.log('pressed');
  if(mouseY > 0 && mouseY < height) {
    ampEnv.triggerAttackRelease('2n');
    pitch = pitch + mouseY * 500
    osc.frequency.linearRampToValueAtTime(pitch, '+1');
    ampEnv.triggerAttackRelease('2n','+1');
    osc.frequency.value = mouseX + 100;
    noiseEnv.triggerAttackRelease(0.5);
    noiseEff.start(0.55);
    noiseEnv.triggerAttackRelease(0.6);
  }

}