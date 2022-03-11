const GET_QUESTIONS_API = 'https://opentdb.com/api.php?amount=5&token=';
const { token } = JSON.parse(localStorage.getItem('token'));
// console.log(token);

const getQuestions = async () => {
  const response = await fetch(`${GET_QUESTIONS_API}${token}`);
  const json = await response.json();
  localStorage.setItem('questions', JSON.stringify(json));

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getQuestions;
