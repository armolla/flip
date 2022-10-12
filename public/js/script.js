let limit = 4;
let cards = 0;
const cardSelected = [];
let coincidences = 0;
let errors = 0;

let rows = document.querySelectorAll('.deckRow');
const decks = document.querySelectorAll('.deckImage');
decks.forEach((deck) => {
  deck.addEventListener('click', ()=>{
    let dekcSelected = deck.id;
    panelDelete(rows);
    play(findDeck(dekcSelected), clone, limit);
  });
});