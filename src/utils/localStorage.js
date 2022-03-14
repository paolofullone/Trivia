const PLAYER = 'player';

if (!JSON.parse(localStorage.getItem(PLAYER))) {
  localStorage.setItem(PLAYER, JSON.stringify([]));
}

const readPlayer = () => JSON.parse(localStorage.getItem(PLAYER));
// console.log(readPlayer());

const savePlayer = (user) => localStorage
  .setItem(PLAYER, JSON.stringify(user));

const addLocalStoragePlayer = (user) => {
  if (user) {
    // const Player = readPlayer();
    savePlayer([user]);
  }
};

// para salvar vários (ranking)
const PLAYERS_RANKING = 'players_ranking';

if (!JSON.parse(localStorage.getItem(PLAYERS_RANKING))) {
  localStorage.setItem(PLAYERS_RANKING, JSON.stringify([]));
}

const readPlayers = () => JSON.parse(localStorage.getItem(PLAYERS_RANKING));
// console.log(readUsers());

const savePlayers = (player) => localStorage
  .setItem(PLAYERS_RANKING, JSON.stringify(player));

const addLocalStoragePlayersRanking = (player) => {
  if (player) {
    const players = readPlayers();
    savePlayers([...players, player]);
  }
};

export {
  readPlayer,
  savePlayer,
  addLocalStoragePlayer,
  readPlayers,
  savePlayers,
  addLocalStoragePlayersRanking,
};
