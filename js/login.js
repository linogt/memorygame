const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');


const validateInput = ({ target }) => {
  if (target.value.length > 3) {
    button.removeAttribute('disabled');
    return;
  }

  button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location = 'pages/game.html';
}

const ranking = localStorage.getItem('ranking');

if (ranking) {
  const rankingData = JSON.parse(ranking);
  const rankingElement = document.querySelector('.ranking');
  rankingElement.innerHTML = '';

  rankingData.forEach(entry => {
    const playerEntry = document.createElement('p');
    playerEntry.textContent = `${entry.playerName} | Tempo: ${entry.playerTime} s | Dificuldade: ${entry.difficulty}`;
    rankingElement.appendChild(playerEntry);
  });
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
