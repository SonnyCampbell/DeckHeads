import Card from './card';
import DeckOfCards from './myDeck';
import translate from './lib/translate'
import prefix from './lib/prefix'
import React from 'react';
import ReactDOM from 'react-dom';
import Deck  from './lib/deck';
import getFontSize from './lib/fontSize'

var Hand = React.createClass({
    componentWillReceiveProps(nextProps) {
        this.forceUpdate();  
        console.log("test");  
    },
    onMouseOver: function(card){
        if (this.props.activePlayer){
            setTimeout(function() {
                let transform = prefix('transform')
                card.$el.style[transform] = translate(card.x + 'px', (card.y - 20) + 'px') + 'rotate(' + card.rot + 'deg)' ;
            }, 70);  
        }                
    },
    onMouseLeave: function(card){
        if (this.props.activePlayer){
            setTimeout(function() {
                let transform = prefix('transform')
                card.$el.style[transform] = translate(card.x + 'px', (card.y) + 'px') + 'rotate(' + card.rot + 'deg)' ;
            }, 70);
        }
        
    },
    reSortHand: function(hand){
        let fontSize = getFontSize();
        //console.log(hand.length);

        for (let i = 0; i < hand.length; i++) {
            let card = hand[i];

            if(card.rot != (-10 + (i * 5))) // If card actually needs to move a spot
            // TODO: Make this check better
            {
                card.animateTo({
                    duration: 10,
                    delay: 250,

                    x: Math.round((i - 2.05) * 20 * fontSize / 16),
                    y: Math.round(-130 * fontSize / 16) + ((260 * fontSize / 16) * this.props.player),   
                    rot: -10 + (i * 5)
                });
            }
            

            
        }
    },
    discardCard: function(card){
        if(this.props.activePlayer) {
            card.$el.style.zIndex = 100;
            card.$el.onclick = {}

            card.animateTo({
                delay: 10,
                duration: 250,
                x: Math.round(this.props.deckX + 100),
                y: Math.round(this.props.deckY),
                rot: 0
            }); 
            
            let hand = this.props.hand;
            for (var i =0; i < hand.length; i++){
                if (hand[i].suit === card.suit && hand[i].rank === card.rank) {
                    hand.splice(i,1);
                    break;
                }
            }

            this.props.discard(card, this.props.activePlayer, hand);
            this.reSortHand(hand);

            this.setState({
                hand: hand
            });
        }
    },
    render: function(){
        let hand = this.props.hand;
        let player = this.props.player;
        let active = this.props.activePlayer;

        //console.log('handsize ' + hand.length);
        //this.reSortHand(hand, player);
        //this.reSortHand(hand);

        if (active)
            hand.map((theCard) => theCard.setSide('front'));
        else
            hand.map((theCard) => theCard.setSide('back'));

        for (let card of hand){
            //card.$el.onclick = this.props.discard.bind(null, card, active, hand);
            card.$el.onclick = this.discardCard.bind(this, card);
            card.$el.onmouseover = this.onMouseOver.bind(null, card);
            card.$el.onmouseleave = this.onMouseLeave.bind(null, card);
        };

        return null;
    }
});

var Game = React.createClass({
    getInitialState: function(){
        return {  
            deck: Deck(false),
            playerHands: [],
            discardZ: 0,
            numOfPlayers: 2,
            playerTurn: 0
        };
    },
    componentDidMount: function(){
        var $deckContainer = document.getElementById('deckContainer');
        let deck = this.state.deck;

        // add to DOM
        deck.mount($deckContainer);

        for(let i = 0; i < deck.cards.length; i++)
        {
            let card = deck.cards[i];
            card.$el.onclick = this.dealCard.bind(this, card);

            setTimeout(function () {
                card.setSide('back')
            }, i * 7.5)
        }
        
        deck.shuffle();

        let playerHands = [];
        for (let i = 0; i < this.state.numOfPlayers; i++){
            let hand = deck.deal(5, i);
    
            playerHands.push(<Hand hand={hand} 
                                player={i} 
                                discard={this.discard} 
                                activePlayer={i===0}
                                deckX = {this.state.deck.cards[0].x}
                                deckY = {this.state.deck.cards[0].y} 
                                key={i}/>);

        }

        this.setState({ playerHands: playerHands });
    },
    dealCard: function(card){
        let len = this.state.deck.cards.length; 
        this.state.deck.cards.pop();
        let hand = this.state.playerHands[this.state.playerTurn].props.hand;
        let fontSize = getFontSize();
        let zIndex = hand.length > 0 ? Number(hand[hand.length-1].$el.style.zIndex) + 1 : card.$el.style.zIndex;

        console.log(this.state.playerTurn);

        card.animateTo({
          delay: 0,
          duration: 250,

          x: Math.round((hand.length - 2.05) * 20 * fontSize / 16),
          y: Math.round(-130 * fontSize / 16) + ((260 * fontSize / 16) * this.state.playerTurn),
          rot: -10 + (hand.length * 5),

          onStart: function () {
            card.$el.style.zIndex = zIndex;
            //console.log(card.$el.style.zIndex );
          },
          onComplete: function () {
            card.setSide('front')
          }
        });
        
        hand.push(card); 

        let playerHands = this.state.playerHands;
        playerHands[this.state.playerTurn] = React.cloneElement(
            playerHands[this.state.playerTurn], 
            { hand: hand }
        );

        this.setState({ 
            playerHands: playerHands
        });
        
    },
    discard: function(card, active, hand){

        let discard = this.state.discardZ;
        setTimeout(function() {
            card.$el.style.zIndex = discard;           
        }, 250);       
        this.state.discardZ = this.state.discardZ + 1;

        let playerHands = this.state.playerHands;
        let playerTurn = (this.state.playerTurn + 1) % this.state.numOfPlayers;
        
        for(let i = 0; i < playerHands.length; i++) {
            if(i === playerTurn){
                playerHands[i] = React.cloneElement(
                    playerHands[i], 
                    { activePlayer: true }
                );
            } else {
                playerHands[i] = React.cloneElement(
                    playerHands[i],
                    { activePlayer: false }
                );
                
            }
            //playerHands[i].forceUpdate();
        }

        this.setState({ 
            playerHands: playerHands,
            playerTurn: playerTurn
        });
    
    },
    render: function() {
        return (
            <div id="game">
                <h1>Deck Heads</h1>
                <hr />           
                {this.state.playerHands}           
            </div>
        );
    }
});


// Render a component to the browser:
ReactDOM.render(
  <Game />,
  document.getElementById('container') 
);





// -------------------------------
// MyDeck stuff
// -------------------------------

    //let thedeck = new DeckOfCards();   
    //thedeck.Shuffle();


    // thedeck.Deal().ToString();
    // thedeck.Deal().ToString();

    // thedeck.PutInDiscardPile(thedeck.Deal());
    // thedeck.TakeTopOfDiscardPile().ToString();

// -------------------------------
// JS Functional/Prototypal Class
// -------------------------------
// function Testing(par1, par2, par3){
//     let priv = 'abc';

//     this.test1 = par1;
//     this.test2 = par2;
//     this.test3 = par3;

//     this.theFunc = () => {
//         console.log(`${this.test1} and ${this.test2} and ${this.test3} and ${priv}.`);
//     }
// }


// -------------------------------
// 
// -------------------------------
// let theThing = new Testing(1, 2, 3);
// theThing.theFunc();


// import {fellowship, total} from './fellowship'
// import mult from './math'

//console.log(add(10, 5));
// console.log(mult(10, 5));
// let values = [20, 30, 40]; 

// let doubled = values.map((n) => n*2);
// console.log(doubled);

// let filtered = values.filter((n) => n > 25);
// console.log(filtered);



// let cheer = () => {
//     console.log("woohoo!");
// }
// cheer();

// let cheer = function(){
//     console.log("woohoo!");
// }
// cheer();




// let king = {name:'Mufasa', kids:1};
// let { name, kids } = king;
// console.log(name, kids);


// let z = [4, 5, 6];
// let [four, five] = z;

// console.log(four, five);





// let a = [20, 30, 40];
// let b = [10, ...a, 50];

// console.log(b);

// function collect(...a) {
//     console.log(a);
// }

// collect(1,2,3,4,5);




// let b = `birthday`;
// let c = `happy ${b}`;
// console.log(c);

// let a = `good`;
// let greeting = `${a} morning`;
// console.log(greeting);


// let limit = 200;


// {
//     let limit = 10;
//     console.log("backstage " + limit);

// }
// //limit = 200;
// console.log("total " + limit);


// function hello() {
//     let message = "Hello!";
//     console.log(message);
// }

// function greeting() {
//     let message = "How are you?";
//     console.log(message);
// }

// hello();
// greeting();



// const emails = ['frodo@email.com', 'sam@email.com', 'merry@email.com'];
// emails.push('pippin@email.com');
// console.log(emails);