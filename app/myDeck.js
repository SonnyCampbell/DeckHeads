import Card from './card'
import CONST from './constants'

function DeckOfCards() {  
    let _cardCount = 52;
    let _cardsUsed = 0;

    let cards = [];
    let discardPile = [];
        
    // this.cards = [];
    // this.discardPile = 

    for (let i = 0; i < CONST.SUITS().length; i++)
    {           
        for(let value = 1; value <= 13; value++)
        {               
            cards.push(new Card(CONST.SUITS()[i], value));
        }
    }


    this.Shuffle = () => {
        for(let i = 0; i < cards.length; i++){
            let k = Math.floor(Math.random() * cards.length);
            let temp = cards[i];
            cards[i] = cards[k];
            cards[k] = temp;
        }
    }

    this.Deal = () => {
        if(_cardsUsed >= cards.length)
        {
            throw new Error("No cards left in the deck!");
        }
        return cards[_cardsUsed++];
    }

    this.CardsUsed = () => {
        return _cardsUsed;
    }

    this.CardsLeft = () => {
        return _cardCount - _cardsUsed;
    }

    this.PutInDiscardPile = (theCard) => {
        discardPile.push(theCard);
    }

    this.TakeTopOfDiscardPile = () => {
        if (discardPile.length > 0){
            return discardPile.pop();
        } else {
            console.log('Discard pile is empty!');
            return null;
        }
    }
   
}



export default DeckOfCards;