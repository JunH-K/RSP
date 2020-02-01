const decks = [
  { deck: 'scissors', key: 1,ko:'가위' },
  { deck: 'rock', key: 0 ,ko:'바위'},
  { deck: 'paper', key: -1 ,ko:'보'},
];

const rules = {
  draw: [0],
  wins: [2, -1],
  lose: [1, -2],
};

const randomDeck = () => {
  const randomIndex = Math.floor(Math.random() * 3);
  return decks[randomIndex];
};

const getGameResult = (userSelected, cpuSelected) => {
  const diff = userSelected - cpuSelected;
  let result;

  if(typeof userSelected !== 'number'){
    return 'lose';
  }

  if (rules.wins.includes(diff)) {
    result = 'win';
  } else if (rules.lose.includes(diff)) {
    result = 'lose';
  } else {
    result = 'draw';
  }

  return result;
};

export {  randomDeck, getGameResult };
