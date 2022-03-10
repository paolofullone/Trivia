const TRIVIA_QUESTIONS_BASE_API = 'https://opentdb.com/api.php?amount=5&token=';
// const token = getLocalstorate()
const token = 1;

const getQuestions = async () => {
  const response = await fetch(`${TRIVIA_QUESTIONS_BASE_API}${token}`);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getQuestions;
