const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

let characters = [
  'coragem1',
  'coragem2',
  'coragem3',
  'coragem4',
  'coragem5',
  'coragem6',
  'coragem7',
  'coragem8',
  'coragem9',
  'coragem10',
];

function changeTheme() {
  const select = document.getElementById('tema');
  const theme = select.value;
  switch (theme) {
    case 'coragem':
      characters = [
        'coragem1',
        'coragem2',
        'coragem3',
        'coragem4',
        'coragem5',
        'coragem6',
        'coragem7',
        'coragem8',
        'coragem9',
        'coragem10',
      ];
      break;
    case 'jovens_titas':
      characters = [
        'titas1',
        'titas2',
        'titas3',
        'titas4',
        'titas5',
        'titas6',
        'titas7',
        'titas8',
        'titas9',
        'titas10',
      ];
      break;
    case 'hora_de_aventura':
      characters = [
        'hora1',
        'hora2',
        'hora3',
        'hora4',
        'hora5',
        'hora6',
        'hora7',
        'hora8',
        'hora9',
        'hora10',
      ];
      break;
    default:
      characters = [];
  }

  restartGame();

  
  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = '';
  for (let i = 0; i < characters.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.backgroundImage = `url('images/${characters[i]}.jpg')`;
    cardsContainer.appendChild(card);
    
  }
  
}

const select = document.getElementById('tema');
select.addEventListener('change', changeTheme);

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  const cards = document.querySelectorAll('.card');

  if (disabledCards.length === cards.length) {
    clearInterval(loop);
    timer.classList.add('stopped');
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
    loop = null;
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }
}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const numPairs = {
    'easy': 5,
    'medium': 8,
    'hard': 10
  };
  const numCards = numPairs[document.querySelector('#difficulty').value] * 2;
  const duplicateCharacters = [...characters, ...characters];
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
  const pairsArray = shuffledArray.slice(0, numPairs[document.querySelector('#difficulty').value]);
  const cardsToShow = pairsArray.concat(pairsArray).sort(() => Math.random() - 0.5);

  cardsToShow.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
  startTimer();
}


let loop = null;

const startTimer = () => {
  let currentTime = 0;

  if (loop) {
    clearInterval(loop);
  }

  loop = setInterval(() => {
    currentTime++;
    timer.innerHTML = currentTime;
  }, 1000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}


const restartGame = () => {
  grid.innerHTML = '';
  clearInterval(loop);
  timer.classList.remove('stopped');
  timer.innerHTML = '0';
  loop = null;
  loadGame();
}

document.querySelector('#difficulty').addEventListener('change', restartGame);