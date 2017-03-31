
import createElement from './createElement'
import getFontSize from './fontSize'

import animationFrames from './animationFrames'
import ease from './ease'
import bysuit from './modules/bysuit'
import fan from './modules/fan'
import intro from './modules/intro'
import poker from './modules/poker'
import shuffle from './modules/shuffle'
import sort from './modules/sort'
import flip from './modules/flip'

import observable from './observable'
import queue from './queue'
import prefix from './prefix'
import translate from './translate'

import Card from './card'

export default function Deck (jokers) {
  // init cards array
  var cards = new Array(jokers ? 55 : 52)

  var $el = createElement('div')
  var self = observable({deal, mount, unmount, cards, $el})
  var $root

  var modules = Deck.modules
  var module

  // make queueable
  queue(self)

  // load modules
  for (module in modules) {
    addModule(modules[module])
  }

  // add class
  $el.classList.add('deck')

  var card

  // create cards
  for (var i = cards.length; i; i--) {
    card = cards[i - 1] = Card(i - 1)
    card.mount($el)
  }



  return self

  function mount (root) {
    // mount deck to root
    $root = root
    $root.appendChild($el)
  }

  function unmount () {
    // unmount deck from root
    $root.removeChild($el)
  }

  function addModule (module) {
    module.deck && module.deck(self)
  }

    function deal(numCards, player) {
      let len = cards.length;     
      let fontSize = getFontSize()
      let hand = [];
      
      for (let i = 0; i < numCards; i++)
      {
        let card = cards.pop()
        card.disableFlipping()
        //card.disableDragging()

        let delay = 250 + (250 * i)
        hand.push(card)

        card.animateTo({
          delay: delay,
          duration: 250,

          x: Math.round((i - 2.05) * 20 * fontSize / 16),
          y: Math.round(-130 * fontSize / 16) + (260 * fontSize / 16 * player),
          rot: -10 + (i * 5),

          onStart: function () {
            card.$el.style.zIndex = (len - 1) + i
            console.log( card.$el.style.zIndex)
          },
          onComplete: function () {
            card.setSide('front')
          }
        });

        //card.$el.style.zIndex = i
        //console.log(card.$el.style.zIndex);
      }

      return hand;
      
  }

  
}
Deck.animationFrames = animationFrames
Deck.ease = ease
Deck.modules = {bysuit, fan, intro, poker, shuffle, sort, flip}
Deck.Card = Card
Deck.prefix = prefix
Deck.translate = translate
