
const WIDTH = 800
const HIGH = 650
let hangman;
let word;
let desc;

async function setup() {
  
  const canvas = createCanvas(WIDTH, HIGH);
  canvas.parent('#canvasHolder');
  hangman = new Hangman();
  let _word = await $.ajax({url: '/word/random',type: 'GET'});
  word = new Word(_word[0]);
  desc = new Desc(_word[1]);
}

async function draw() {
    background(0); 
       
    if(hangman && word && desc){
      hangman.draw(word.wrong);
      word.draw();
      desc.draw();
      if(word.wrong>=6){
        alert('Game over');
        noLoop();
      }
      if(word.pending == 0){
        alert('winer');
        noLoop();
      }
    }   
}

function keyPressed() {  
  word.ingress(key);
}



class Hangman
{
  constructor(){

    this.offset_x = 550;
    this.offset_y = 100;
    this.higth = 500;
  }




  draw(wrong){

    stroke(153);
    //estructura
    line(this.offset_x+50 , this.offset_y, this.offset_x+50, this.offset_y+50);
    line(this.offset_x+50 , this.offset_y, this.offset_x+150, this.offset_y);
    line(this.offset_x+150 , this.offset_y, this.offset_x+150, this.offset_y+this.higth);
    line(this.offset_x+100 , this.offset_y+this.higth, this.offset_x+200, this.offset_y+this.higth);

    //cuerpo
    fill(255);
    if(wrong>=1)
      ellipse(this.offset_x+50,this.offset_y+75, 50, 50);//cabeza
    if(wrong>=2)    
      line(this.offset_x+50 , this.offset_y+100, this.offset_x+50, this.offset_y+300);//torso
    if(wrong>=3)    
      line(this.offset_x+50 , this.offset_y+120, this.offset_x+90, this.offset_y+175); //brazo derecho 
    if (wrong>=4)
      line(this.offset_x+50 , this.offset_y+120, this.offset_x+8, this.offset_y+175); //brazo izquierdo
    if (wrong>=5)
      line(this.offset_x+50 , this.offset_y+300, this.offset_x+80, this.offset_y+400); //pienra derecha
      if (wrong>=6)
      line(this.offset_x+50 , this.offset_y+300, this.offset_x+20, this.offset_y+400); //pierna izquierdo
    

  }
}

class Word
{
   constructor(word){
     this.word = word.toUpperCase();
     this.letters=[];
     this._wrong = 0;

     this.text_size = 40;
     this.offset_x = 20;
     this.offset_y = 500;
     this.width = 500;
     this.word_width  = this.width/this.word.length;

     textSize(this.text_size);
     textAlign(CENTER, CENTER);
   }

   get wrong(){return this._wrong;}
   get pending(){ 
      let pending = 0; 
      for(let i=0;i<this.word.length;i++){  
        let letter = this.word.charAt(i); 
        if(this.letters.indexOf(letter) <=-1)
          pending++
      }
      return pending;

   }

   draw(){

    fill(255); 
    this._pending=0;
    for(let i=0;i<this.word.length;i++){  
        let x =this.offset_x+ (i*this.word_width); 
        let letter = this.word.charAt(i);   
        if(this.letters.indexOf(letter) >-1){          
          text(letter,x+(this.word_width/2), this.offset_y);
        }
        line(x , this.offset_y+(this.text_size/2), x+this.word_width, this.offset_y+(this.text_size/2));
    }      
   }
   ingress(letter){
      letter = letter.toUpperCase();
      if(this.word.includes(letter)){
          if(this.letters.indexOf(letter) ==-1){
            this.letters.push(letter);
          }
      }else{
        this._wrong++;
      }
    }
  }

class Desc
{
   constructor(description){
     this.description = description;
     this.offset_x = 20;
     this.offset_y = 100;
     this.width = 500;
     this.higth  = 230;
   }

   draw(){

    fill('#999999'); 
    strokeWeight(4);
    stroke(51);
    rect(this.offset_x ,this.offset_y, this.offset_x+this.width, this.offset_y+this.higth);

    textSize(20);
    text(this.description,this.offset_x, this.offset_y,this.width,this.higth);
  }
}

