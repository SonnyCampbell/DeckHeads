import Card from './card';
import DeckOfCards from './myDeck';
import React from 'react';
import ReactDOM from 'react-dom';
import Deck  from './lib/deck';

var Hand = React.createClass({
    test: function(){
        alert("message");
    },
    render: function(){
        let hand = this.props.hand;
        let player = this.props.player;

        for (let card of hand){
            // card.$el.onclick = () => {
            //     card.animateTo({
            //         delay: 250,
            //         duration: 250,

            //         x: Math.round(100),
            //         y: Math.round(100),
            //         rot: 0
            //     });
            // };
            //card.$el.onclick = function(){test()}
            card.$el.onclick = this.props.discard.bind(null, card)
        };
        return null;
    }
});

var Game = React.createClass({
    getInitialState: function(){
        return {  deck: Deck(false) };
    },
    discard: function(card){
        card.$el.onclick = () => {
            card.animateTo({
                delay: 10,
                duration: 50,

                x: Math.round(this.state.deck.cards[0].x + 100),
                y: Math.round(this.state.deck.cards[0].y),
                rot: 0
            });
        };
    },
    render: function() {

    var $deckContainer = document.getElementById('deckContainer');
    let deck = this.state.deck;

    // add to DOM
    deck.mount($deckContainer);
    deck.cards.forEach(function (card, i) {
        card.enableDragging();
        card.enableFlipping();
        setTimeout(function () {
            card.setSide('back')
        }, i * 7.5)
    });

    deck.shuffle();

    let playerHands = []
    for (let i = 0; i < 2; i++){
        playerHands.push(<Hand hand={deck.deal(5, i)} player={i} discard={this.discard} key={i}/>);
    }

    return (
      <div id="game">
        <h1>Deck Heads</h1>
        <hr />
        
        {playerHands}
        
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