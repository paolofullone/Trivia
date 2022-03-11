const token = JSON.parse(localStorage.getItem('token'));
console.log(token.token);

const getQuestions = async () => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
  const json = await response.json();
  localStorage.setItem('questions', JSON.stringify(json));

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getQuestions;
