const clone = function (array, limit) {
  const cloneOne = [...array].filter((value) => {return value.id < limit});
  const cloneTwo = [...array].filter((value) => {return value.id < limit});
  return cloneOne.concat(cloneTwo);
}

const panelCreate = function (array, callback, limit) {
  const newArray = callback(array, limit);
  newArray.sort((a, b) => {return Math.random() - 0.5});
  const back = "./public/images/back.png";
  newArray.forEach((value) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.id = value.id;
    const firstImg = document.createElement('img');
    firstImg.classList.add('front');
    firstImg.src = back;
    const secondImg = document.createElement('img');
    secondImg.classList.add('back');
    secondImg.src = value.img;
    div.appendChild(firstImg);
    div.appendChild(secondImg);
    panel.appendChild(div);
  });
}

const panelDelete = function (panel) {
  while (panel.firstChild) {
    panel.removeChild(panel.firstChild);
  }
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
  panel = document.querySelector('#panel');
  panelCreate(array, callback, limit);
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
          panelDelete(panel)
        }, 3000); 
        setTimeout(() => {
          play(array, callback, limit);
        }, 3005);
      }
    });
  });
}