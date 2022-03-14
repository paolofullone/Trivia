const USERS = 'users';
// const USERS_RANKING = 'users_ranking';

if (!JSON.parse(localStorage.getItem(USERS))) {
  localStorage.setItem(USERS, JSON.stringify([]));
}

const readUsers = () => JSON.parse(localStorage.getItem(USERS));
// console.log(readUsers());

const saveUsers = (user) => localStorage
  .setItem(USERS, JSON.stringify(user));

const addLocalStorageUser = (user) => {
  if (user) {
    // const users = readUsers();
    saveUsers([user]);
  }
};

// para salvar vários
// const addLocalStorageUserRanking = (user) => {
//   if (user) {
//     const users = readUsers();
//     saveUsers([...users, user]);
//   }
// };

// export { saveUsers, readUsers, addLocalStorageUser, addLocalStorageUserRanking };
export { saveUsers, readUsers, addLocalStorageUser };
