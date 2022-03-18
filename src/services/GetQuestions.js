const GET_QUESTIONS_API = 'https://opentdb.com/api.php?amount=5&token=';
// const { token } = JSON.parse(localStorage.getItem('token'));
// console.log(token);

const getQuestions = async (token) => {
  const response = await fetch(`${GET_QUESTIONS_API}${token}`);
  const { results } = await response.json();
  // console.log(results);
  return results;
};

export default getQuestions;
