// const GET_QUESTIONS__CAT_API = 'https://opentdb.com/api.php?amount=5&category=';
// const { token } = JSON.parse(localStorage.getItem('token'));
// console.log(token);

const getQuestionsAndCat = async (cat, difficulty, type) => {
  console.log('chamou a get questions and cat');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${cat}&difficulty=${difficulty}&type=${type}`);
  const { results } = await response.json();
  console.log(results);
  return results;
};

export default getQuestionsAndCat;
