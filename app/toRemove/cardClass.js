class Card {

    static SUITS(){
        return ['S','C','H','D'];
    }

    constructor(suit, value){
        this.suit = suit;
        this.value = value;
    }

    toString() {
        console.log(`The ${this.value} of ${this.suit}.`);
    }
    
    static anotherFunction() {
        console.log('Somthing else');
    }  
}



// class HSCard extends Card {
//     constructor(suit, value, power){
//         super(suit, value);
//         this.power = power;
//     }

//     toString() {
//         console.log(`The ${this.value} of ${this.suit} with power: ${this.power}.`);
//     }
// }



//let aceOfS = new Card('S', 1);
//console.log(aceOfS);

export default Card;