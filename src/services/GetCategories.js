const GET_CAT_API = 'https://opentdb.com/api_category.php';
// const { token } = JSON.parse(localStorage.getItem('token'));
// console.log(token);

const getCategories = async () => {
  const response = await fetch(GET_CAT_API);
  // console.log(response);
  const { trivia_categories: categories } = await response.json();
  // console.log(categories);

  return categories;
};

export default getCategories;
