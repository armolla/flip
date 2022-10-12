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
    if (index < limit - 1) {
      rows[0].appendChild(div);
    } else {
      rows[1].appendChild(div);
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

const flip = function (boolean, object) {
  if (boolean) {
    object.firstElementChild.style.transform = 'perspective(500px) rotateY(180deg)';
    object.lastElementChild.style.transform = 'perspective(500px) rotateY(360deg)';
  } else {
    object.firstElementChild.style.transform = 'perspective(500px) rotateY(0deg)';
    object.lastElementChild.style.transform = 'perspective(500px) rotateY(180deg)';
  }
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
            cardSelected.pop();
            cardSelected.pop();
          } else {
            errors ++;
            if (errors == 4) {
              game = false;
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
        game = true;
        coincidences = 0;
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