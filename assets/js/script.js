const querySelector = path =>{
  return document.querySelector(path);
}

const newsCategoriesAPI = () => {
  fetch('https://openapi.programming-hero.com/api/news/categories')
  .then(response => response.json())
  .then(data => newsCategories(data.data.news_category))
}

const newsCategories = data => {
  const categories = querySelector('#news-category ul');
  console.log(categories); 

  data.forEach(element => {
    const li = document.createElement('li');
    li.innerHTML = `<button>${element.category_name}</button>`;
    categories.append(li);

    // Get Category By category_id
    getNewsByCategoryAPI(element.category_id);
  });
}

newsCategoriesAPI();