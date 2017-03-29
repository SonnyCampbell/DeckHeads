import CONST from './constants'

function Card(suit, value) {
    let _suit = suit;
    let _value = value;

    this.GetSuitString = () => {
        switch(_suit){
            case 'S':
                return 'Spades';
            case 'C':
                return 'Clubs';
            case 'H':
                return 'Hearts';
            case 'D':
                return 'Diamonds';
        }
    }

    this.GetValueString = () => {
        switch(_value){
            case 1:
                return 'Ace';
            case 11:
                return 'Jack';
            case 12:
                return 'Queen';
            case 13:
                return 'King';
            default:
                return _value;
        }
    }


    this.ToString = () => {
        return `The ${this.GetValueString()} of ${this.GetSuitString()}.`;
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