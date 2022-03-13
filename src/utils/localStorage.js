const USERS = 'users';

if (!JSON.parse(localStorage.getItem(USERS))) {
  localStorage.setItem(USERS, JSON.stringify([]));
}

const readUsers = () => JSON.parse(localStorage.getItem(USERS));
// console.log(readUsers());

const saveUsers = (user) => localStorage
  .setItem(USERS, JSON.stringify(user));

// para salvar vários
// const addLocalStorageUser = (user) => {
//   if (user) {
//     const users = readUsers();
//     saveUsers([...users, user]);
//   }
// };

const addLocalStorageUser = (user) => {
  if (user) {
    // const users = readUsers();
    saveUsers([user]);
  }
};

export { saveUsers, readUsers, addLocalStorageUser };
