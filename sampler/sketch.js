//Video link: https://www.youtube.com/watch?v=w4n8EEFzIV0
const sounds = new Tone.Players({
  calm: "media/calm-ambient-7540.mp3",
  eastern: "media/eastern-morning-13407.mp3", 
  gates: "media/gates-of-heaven-music-6705.mp3",
  loop: "media/loop-black-box-exciting-bass-loop-130bpm-13888.mp3"
})

let soundsInOrder = ['calm', 'eastern', 'gates', 'loop'];
let nextSoundPlayed = 0;

let delay = new Tone.FeedbackDelay("7n", 0.5);
let gain = new Tone.Gain().toDestination();
sounds.connect(delay);
delay.connect(gain);
sounds.connect(gain);

//sounds.toDestination();

let button1, button2, button3, button4, button5;
let slider1;

let nxSlider;
let nxDial;
let nxButtons = [];

function preload(){
  nxSlider = new Nexus.Slider('#slider');

  nxDial = Nexus.Add.Dial('#dial', {'size': [100, 100]});

  soundsInOrder.forEach((sound, index) => {
    nxButtons[index] = Nexus.Add.TextButton('#instrument',{
      'size': [80, 30],
      'state': false,
      'text': sound
    })
  })
}

function setup() {
  createCanvas(400, 400);

  Tone.context.resume();
  button1 = createButton("Calm Ambient", 'calm');
  button1.position(100, 250);
  button1.mousePressed(buttonSound);

  button2 = createButton("Eastern Morning", 'eastern');
  button2.position(100, 350);
  button2.mousePressed( () => buttonSound('eastern'));

  button3 = createButton("Gates of Heaven", 'gates');
  button3.position(100, 450);
  button3.mousePressed( () => buttonSound('gates'));
  
  button4 = document.getElementById('loopDiv');
  button4.onclick = () => buttonSound('loop');

  slider1 = createSlider(0,1,0,0.1);
  slider1.mouseReleased(()=>{
    let delayTime = slider1.value();
    delay.delayTime.value = delayTime;
    //delay.delayTime.rampTo(delayTime, 1);
  });

  nxSlider.on('change', function (v){
    delay.delayTime.value = v;
  })

  nxDial.on('change', (v)=>{
    console.log(v)
    gain.gain.value = v;
  })

  soundsInOrder.forEach((sound, index)=>{
    nxButtons[index].on('change', function (v){
      console.log(v);
      sounds.player(soundsInOrder[index]).start();
    })
  });
}

function draw() {
  background(220);
}

function keyPressed(){
  console.log(key, keyCode);
  if(key === "1"){
    sounds.player("calm").start();
  }
  else if(key === "2"){
    sounds.player("eastern").start();
  }
  else if(key === "3"){
    sounds.player("gates").start();
  }

  if(keyCode == 32){
    sounds.player(soundsInOrder[nextSoundPlayed]).start();
    ++nextSoundPlayed;
    if(nextSoundPlayed >= soundsInOrder.length)
      nextSoundPlayed = 0;
  }
}
 
function buttonSound(sound='calm'){
  Tone.start();
  sounds.player(sound).start();
}