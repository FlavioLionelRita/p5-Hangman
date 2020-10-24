
const WIDTH = 800
const HIGH = 650
let hangman;
let word;


function setup() {
  
  const canvas = createCanvas(WIDTH, HIGH);
  canvas.parent('#canvasHolder');

  hangman = new Hangman();
  word = new Word("Mesopotamia","‘la tierra entre ríos’, o del siríaco ܒܝܬ ܢܗܪܝܢ beth nahrin ‘entre dos ríos’) es el nombre por el cual se conoce a la zona del Oriente Próximo ubicada entre los ríos Tigris y Éufrates, si bien se extiende a las zonas fértiles contiguas a la franja entre ambos ríos, y que coincide aproximadamente con las áreas no desérticas del actual Irak y la zona limítrofe del norte-este de Siria.");
}
function draw() {
    background(0); 

    hangman.draw(word.wrong);
    word.draw();
   
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

    //IAN TODO: hacer brazo izquierdo, pierna izquierda y pierna derecha    
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

    //Lisandro TODO:
    //agregar un rectangulo que contenga el texto de la descripcion. 

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
