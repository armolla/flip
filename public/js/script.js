let limit = 4;
let cards = 0;
const cardSelected = [];
let coincidences = 0;
let move = 3;
let score = 0;

let rows = document.querySelectorAll('.deckRow');
const decks = document.querySelectorAll('.deckImage');
decks.forEach((deck) => {
  deck.addEventListener('click', ()=>{
    let dekcSelected = deck.id;
    const container = document.querySelector('.mainContainer');
    container.removeChild(container.firstElementChild);
    boardGenerator();
    panelDelete(rows);
    play(findDeck(dekcSelected), clone, limit);
  });
});