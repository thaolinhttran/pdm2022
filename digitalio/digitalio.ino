//Youtube Link: https://youtu.be/DJSC52xdboo
const int buttonPin1 = 2;     // the number of the first pushbutton pin (pattern1)
const int buttonPin2 = 4;     //number of the second pushbutton pin (pattern2)
const int ledPin1 =  13;      // the number of the red LED pin (=dot)
const int ledPin2 = 8;        //number of yellow LED pin (=dash)

int buttonState1 = 0;         // variable for reading the pushbutton status
int buttonState2 = 0;
unsigned long dotDelay = 250; //one time unit

void setup() {
  // initialize the LED pin as an output:
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin1, INPUT);
  pinMode(buttonPin2, INPUT);
}

void loop() {
  // read the state of the pushbutton value:
  buttonState1 = digitalRead(buttonPin1);
  buttonState2 = digitalRead(buttonPin2);
  

  // button1 say HELP ME in MORSE CODE
  if (buttonState1 == HIGH) {
    //H:
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay*3);
    //E
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay*3);
    //L
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay*3);
    //P
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay);
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay*7);

    //M
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay);
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay);
    //E
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
  }
  
//ANYONE THERE? in MORSE CODE
  if(buttonState2 == HIGH){
    //A
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay*3);

    //N
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay*3);

    //Y
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay);
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay*3);

    //O
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay);
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay);
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay*3);

    //N
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay*3);

    //E
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay*7);

    //T
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay*3);

    //H:
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay*3);

    //E
    digitalWrite(ledPin1, HIGH);
    delay(1000);
    digitalWrite(ledPin1, LOW);
    delay(3000);

    //R
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay*3);

    //E
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay*7);

    //?
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay);
    digitalWrite(ledPin2, HIGH);
    delay(dotDelay*3);
    digitalWrite(ledPin2, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
    delay(dotDelay);
    digitalWrite(ledPin1, HIGH);
    delay(dotDelay);
    digitalWrite(ledPin1, LOW);
  }
}
