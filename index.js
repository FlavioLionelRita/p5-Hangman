
const WIDTH = 800
const HIGH = 650
let hangman;
let word;
let word2;

function setup() {
  
  const canvas = createCanvas(WIDTH, HIGH);
  canvas.parent('#canvasHolder');

  hangman = new Hangman();
  word = new Word("Mesopotamia","‘la tierra entre ríos’, o del siríaco ܒܝܬ ܢܗܪܝܢ beth nahrin ‘entre dos ríos’) es el nombre por el cual se conoce a la zona del Oriente Próximo ubicada entre los ríos Tigris y Éufrates, si bien se extiende a las zonas fértiles contiguas a la franja entre ambos ríos, y que coincide aproximadamente con las áreas no desérticas del actual Irak y la zona limítrofe del norte-este de Siria.");
  word2 = new desc('zona del Oriente Próximo');
}
function draw() {
    background(0); 

    hangman.draw(word.wrong);
    word.draw();
    word2.draw();
   
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
   constructor(word,description){
     this.word = word.toUpperCase();
     this.description = description;
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



   


   draw(){
    stroke(400)
    line(80 , 400, 500, 400); //linea superior
    line(80 , 330, 500, 330); //linea inferior
    line(80 , 330, 80, 400); //linea izquierda
    line(500, 400, 500, 330); //linea derecha

   

    fill(255); 
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

class desc
{
   constructor(word2,description2){
     this.word2 = word2;
     this.description2 = description2;
     this.letters1=[];

     this.offset_x = 20;
     this.offset_y = 300;
     this.width = 300;
     this.word2_width  = this.width/this.word2.length;
   }

   draw(){

    stroke(400)
    line(10 , 280, 500, 280); //linea superior
    line(10 , 330, 500, 330); //linea inferior
    line(10 , 280, 10, 330); //linea izquierda
    line(500, 280, 500, 330);

  for(let i=0;i<this.word2.length;i++){  

    let letter2 = this.word2.charAt(i);   
    if(this.letters1.indexOf(letter2) >-1);
    fill('#8a2be2');
          text(letter2,this.offset_x+ (i*this.word2_width) , this.offset_y, 100, 350);
  }
  }
}

