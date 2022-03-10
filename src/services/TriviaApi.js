const TRIVIA_BASE_API = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const response = await fetch(TRIVIA_BASE_API);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getToken;
