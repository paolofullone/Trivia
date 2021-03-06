const TOKEN_BASE_API = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const response = await fetch(TOKEN_BASE_API);
  const json = await response.json();
  localStorage.setItem('token', JSON.stringify(json));

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getToken;
