

module.exports = class Service
{
    constructor(){
        this.words = [];
        this.load();
    }
    load(){
           this.words  = [ ["Mesopotamia","‘la tierra entre ríos’, o del siríaco ܒܝܬ ܢܗܪܝܢ beth nahrin ‘entre dos ríos’) es el nombre por el cual se conoce a la zona del Oriente Próximo ubicada entre los ríos Tigris y Éufrates, si bien se extiende a las zonas fértiles contiguas a la franja entre ambos ríos, y que coincide aproximadamente con las áreas no desérticas del actual Irak y la zona limítrofe del norte-este de Siria." ]
                         , ["Perro","carnívoro domesticado de la familia Canidae" ]
                         ]; 
    }
    randomWord(){
        let r = Math.floor((Math.random() * this.words.length) );
        return this.words[r];
    }

}