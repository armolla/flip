const findDeck = function (id) {
  switch (id) {
    case 'simpsons':
      return simpsons;
    case 'simpsonsLego':
      return simpsonsLego;  
    case 'dc':
      return dc;
    case 'marvel':
      return marvel;
    case 'futbol':
      return futbol;
    case 'disney':
      return disney;
  }
}

const clone = function (array, limit) {
  const cloneOne = [...array].filter((value) => {return value.id < limit});
  const cloneTwo = [...array].filter((value) => {return value.id < limit});
  return cloneOne.concat(cloneTwo);
}

const deckGenerator = function (array, callback, limit) {
  const newArray = callback(array, limit);
  newArray.sort(() => {return Math.random() - 0.5});
  newArray.forEach((value, index) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.id = value.id;
    const firstImg = document.createElement('img');
    firstImg.classList.add('front');
    firstImg.src = value.back;
    const secondImg = document.createElement('img');
    secondImg.classList.add('back');
    secondImg.src = value.img;
    div.appendChild(firstImg);
    div.appendChild(secondImg);
    if (newArray.length == 6) {
      if (index < 3) {
        rows[0].appendChild(div);
      } else {
        rows[1].appendChild(div);
      }
    } else if (newArray.length == 8) {
      if (index <= 3) {
        rows[0].appendChild(div);
      } else {
        rows[1].appendChild(div);
      }
    } else if (newArray.length >= 12) {
      if (index <= 3) {
        rows[0].appendChild(div);
      } else if (index > 3 && index <= 7) {
        rows[1].appendChild(div);
      } else if (index > 7 && index <= 11) {
        rows[2].appendChild(div);
      } else if (index > 11 && index <= 15) {
        rows[3].appendChild(div);
      }
    }
  });
}

const panelDelete = function (rows) {
  rows.forEach((row) => {
    while (row.firstChild) {
      row.removeChild(row.firstChild);
    }
  });
}

const boardGenerator = function () {
  const board = document.querySelector('.board');
  board.children[0].textContent = ' ' + move;
  board.children[1].textContent = ' ' + score;
  board.style.display = 'flex';
}

const flip = function (boolean, object) {
  if (boolean) {
    object.firstElementChild.style.transform = 'perspective(500px) rotateY(180deg)';
    object.lastElementChild.style.transform = 'perspective(500px) rotateY(360deg)';
  } else {
    object.firstElementChild.style.transform = 'perspective(500px) rotateY(0deg)';
    object.lastElementChild.style.transform = 'perspective(500px) rotateY(180deg)';
  }
}

const gameEnd = function (boolean) {
  let div = document.querySelector('.end');
  if (boolean) {
    div.firstElementChild.src = './public/images/felicitaciones.png';
  } else {
    div.firstElementChild.src = './public/images/fin.png';
  }
  div.style.display = 'flex';
  div.lastElementChild.addEventListener('click', ()=>{
    div.style.display = 'none';
    document.querySelector('.board').style.display = 'none';
    panelDelete(rows);
    document.querySelector('.deckTitle').style.display = 'block';
    panelCreator();
  });
}

const play = function (array, callback, limit) {
  deckGenerator(array, callback, limit);
  cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    card.addEventListener('click', ()=>{
      if (card.firstElementChild.style.transform != 'perspective(500px) rotateY(180deg)' && cardSelected.length < 2) {
        flip(true, card);
        cardSelected.push(card);
        if (cardSelected.length == 2) {
          if (cardSelected[0].id == cardSelected[1].id) {
            coincidences ++;
            if (move < 7) {
              move ++; 
            }
            score +=10;
            boardGenerator();
            cardSelected.pop();
            cardSelected.pop();
          } else {
            move --;
            boardGenerator();
            if (move == 0) {
              move = 3;
              score = 0;
              setTimeout(() => {
                gameEnd(false);
              }, 2000);  
            }
            setTimeout(function(){
              cardSelected.forEach((selected) => {
              flip(false, selected);
              });
            }, 1000);
            setTimeout(function () {
              cardSelected.pop();
              cardSelected.pop();
            }, 1000)
          }
        }
      }
      if (coincidences == limit - 1) {
        coincidences = 0;
        if (limit < 5) {
          limit ++;
        } else if (limit == 5 || limit == 7) {
          limit += 2;
        } else {
          setTimeout(() => {
            gameEnd(true);
          }, 3000); 
        }
        setTimeout(function() {
          cards.forEach((card) => {
            flip(false, card);
          });
        }, 2000);
        setTimeout(() => {
          panelDelete(rows)
        }, 3000); 
        setTimeout(() => {
          play(array, callback, limit);
        }, 3005);
      }
    });
  });
}

const panelCreator = function () {
  let rows = document.querySelectorAll('.deckRow');
  const decks = [simpsons, simpsonsLego, dc, marvel, futbol, disney];
  const ids = ['simpsons', 'simpsonsLego', 'dc','marvel', 'futbol', 'disney'];
  decks.forEach((deck, index) => {
    deck.forEach((value, position) => {
      if (position == 0) {
        const div = document.createElement('div');
        div.classList.add('deck');
        const img = document.createElement('img');
        img.classList.add('deckImage');
        img.id = ids[index];
        img.src = value.back;
        img.alt = value.alt;
        div.appendChild(img);
        if (index <= 2) { 
          rows[0].appendChild(div);
        } else {
          rows[1].appendChild(div);
        }
      }
    });
  });
  
  const decksChoise = document.querySelectorAll('.deckImage');
  decksChoise.forEach((deck) => {
    deck.addEventListener('click', ()=>{
      let dekcSelected = deck.id;
      document.querySelector('.deckTitle').style.display = 'none';
      boardGenerator();
      panelDelete(rows);
      play(findDeck(dekcSelected), clone, limit);
    });
  });
}