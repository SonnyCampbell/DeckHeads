import Card from './card'

class DeckOfCards {  
    
    constructor(){
        
        this.cards = [];
        this.cardCount = 52;
        this.cardsUsed = 0;

        for (let i = 0; i < Card.SUITS().length; i++)
        {           
            for(let value = 1; value <= 13; value++)
            {               
                this.cards.push(new Card(Card.SUITS()[i], value));
            }
        }
    }

    Shuffle(){
        for(let i = 0; i < this.cards.length; i++){
            let k = Math.floor(Math.random() * this.cards.length);
            let temp = this.cards[i];
            this.cards[i] = this.cards[k];
            this.cards[k] = temp;
        }
    }

    Deal(){
        if(this.cardsUsed >= this.cards.length)
        {
            throw new Error("No cards left in the deck!");
        }

        return this.cards[this.cardsUsed++];
    }

    
}



export default DeckOfCards;