let drum = new Tone.MembraneSynth({
	"pitchDecay"  : 0.1 ,
	"octaves"  : 2.2 ,
	"oscillator"  : {
		"type"  : "square"
}  ,
	"envelope"  : {
		"attack"  : 0.001 ,
		"decay"  : 0.8 ,
		"sustain"  : 0.1 ,
		"release"  : 0.4 ,
		"attackCurve"  : "exponential"
	}
});
//Youtube Link: https://www.youtube.com/shorts/tIxHmAo8aCY
let notes = {
  'a' : 'D3',
  's' : 'E3',
  'd' : 'F3',
  'f' : 'G3',
  'h' : 'A3',
  'j' : 'B3',
  'k' : 'C4',
  'l' : 'D4',
};

const reverb = new Tone.JCReverb(0.4).toDestination();
const osc = new Tone.OmniOscillator("C#4", "pwm").start();
const ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.2,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
})

osc.connect(ampEnv);
ampEnv.connect(reverb);

//synth.connect(reverb);
drum.connect(reverb);
let slider1, slider2;

function setup() {
  createCanvas(400, 400);
  drum.release = 2;

  drum.triggerAttackRelease("C3", "3n");

  slider1 = new Nexus.Slider(reverb);
  slider1.on('change', (v)=>{
    reverb.roomSize.value = v;
  });


}

function draw() {
  background(220);
}

function keyPressed(){
  let toPlay = notes[key];
  console.log(toPlay);
  Tone.start();
  osc.frequency.value = toPlay;
  ampEnv.triggerAttackRelease('3n');
}