//Youtube: https://youtu.be/qkVyFkBQQu0
//EXPOSE YOUR ENEMY
//The game objective is to light up all three lights of the enemy (on the other side of the breadboard) by covering the photoresistors.
//The player who lights up all three first win.
const int p1led1 = 4;
const int p1led2 = 3;
const int p1led3 = 2;
const int p1win = 8;

const int p2led1 = 13;
const int p2led2 = 12;
const int p2led3 = 11;
const int p2win = 7;

const int player1 = A1;
const int player2 = A0;

int p1led1State = LOW;
int p1led2State = LOW;
int p2led1State = LOW;
int p2led2State = LOW;

const long interval = 500;
bool win1 = false;
bool win2 = false;
void setup() {
  Serial.begin(9600);
  pinMode(p1led1, OUTPUT);
  pinMode(p1led2, OUTPUT);
  pinMode(p1led3, OUTPUT);
  pinMode(p1win, OUTPUT);

  pinMode(p2led1, OUTPUT);
  pinMode(p2led2, OUTPUT);
  pinMode(p2led3, OUTPUT);
  pinMode(p2win, OUTPUT);

  pinMode(player1, INPUT);
  pinMode(player2, INPUT);

}

void loop() {
  int player1Status = analogRead(player1);
  int player2Status = analogRead(player2);

  Serial.println(player1Status);
  Serial.println(player2Status);

  if(player1Status < 600 && player1Status > 400){
      digitalWrite(p1led1, HIGH);
      p1led1State = HIGH;
  }
  else if(player1Status < 400 && player1Status > 200 && p1led1State == HIGH){
      digitalWrite(p1led2, HIGH); 
      p1led2State = HIGH;
  }
  else if(player1Status < 200 && player1Status > 0 && p1led2State == HIGH){
      digitalWrite(p1led3, HIGH);
      win1 = true;
  }
  if(player2Status < 600 && player2Status > 400){
      digitalWrite(p2led1, HIGH);
      p2led1State = HIGH;
  }
  else if(player2Status < 400 && player2Status > 200 && p2led1State == HIGH){
      digitalWrite(p2led2, HIGH);
      p2led2State = HIGH; 
  }
  else if(player2Status < 200 && player2Status > 0 && p2led2State == HIGH){
      digitalWrite(p2led3, HIGH);
      win2 = true;
  }

  
  if(win1 == true || win2 == true){
    if(win1 == true){
      digitalWrite(p1win, HIGH);
      delay(500);
      digitalWrite(p1win, LOW);
      delay(500);
      digitalWrite(p1win, HIGH);
      delay(1000);
      restart();
    }
    else{
      digitalWrite(p2win, HIGH);
      delay(500);
      digitalWrite(p2win, LOW);
      delay(500);
      digitalWrite(p2win, HIGH);
      delay(1000);
      restart();
    }
  }

 delay(1000);
}
void restart(){
  win1 = false;
  win2 = false;
  p1led1State = LOW;
  p1led2State = LOW;
  p2led1State = LOW;
  p2led2State = LOW;
  digitalWrite(p1led1, LOW);  
  digitalWrite(p1led2, LOW);
  digitalWrite(p1led3, LOW); 
  digitalWrite(p1win, LOW); 
  digitalWrite(p2led1, LOW); 
  digitalWrite(p2led2, LOW); 
  digitalWrite(p2led3, LOW);
  digitalWrite(p2win, LOW); 
}
