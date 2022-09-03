const querySelector = path =>{
  return document.querySelector(path);
}

const dateMaker = dateTime =>{
  return new Date(dateTime).toLocaleDateString();
}

const ratingMaker = rating =>{
  const star1 = `<i class="fa-regular fa-star"></i>`;
  const star2 = `<i class="fa-regular fa-star-half-stroke"></i>`;
  const star3 = `<i class="fa-solid fa-star"></i>`;

  var result = '';
  
  if(rating == 5){
    result = star3 + star3 + star3 + star3 + star3;
  }
  else if(rating > 4){
    result = star3 + star3 + star3 + star3 + star2;
  }
  else if(rating == 4){
    result = star3 + star3 + star3 + star3 + star1;
  }
  else if(rating > 3){
    result = star3 + star3 + star3 + star2 + star1;
  }
  else if(rating == 3){
    result = star3 + star3 + star3 + star1 + star1;
  }
  else if(rating > 2){
    result = star3 + star3 + star2 + star1 + star1;
  }
  else if(rating == 2){
    result = star3 + star3 + star1 + star1 + star1;
  }
  else if(rating > 1){
    result = star3 + star2 + star1 + star1 + star1;
  }
  else if(rating == 1){
    result = star3 + star1 + star1 + star1 + star1;
  }
  else if(rating > 0){
    result = star2 + star1 + star1 + star1 + star1;
  }
  else{
    result = star1 + star1 + star1 + star1 + star1;
  }

  return result;
}

const newsCategoriesAPI = () => {
  fetch('https://openapi.programming-hero.com/api/news/categories')
  .then(response => response.json())
  .then(data => newsCategories(data.data.news_category))
}

const newsCategories = data => {
  const categories = querySelector('#news-category ul');

  data.forEach(element => {
    const li = document.createElement('li');
    li.innerHTML = `<button>${element.category_name}</button>`;
    categories.append(li);

    // Get Category By category_id
    // getNewsByCategoryAPI(element.category_id);
  });
}

newsCategoriesAPI()


// =================================


const getNewsByCategoryAPI = category_id =>{
  fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
  .then(response => response.json())
  .then(data => getNewsByCategory(data.data))
}

const getNewsByCategory = data =>{
  console.log(data);

  const news = querySelector('#news-area');

  data.forEach(element => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="row">
      <div class="col-12 news bg-white rounded p-3 mb-4">
        <div class="row">
          <div class="col-12 col-md-4 col-lg-3">
            <img src="${element.thumbnail_url}" alt="" class="rounded img-fluid w-100">
          </div>
          <div class="col-12 col-md-8 col-lg-9 d-flex flex-column justify-content-between py-2">
            <div>
              <h3>${element.title}</h3>
              <p class="text-muted">${element.details}</p>
            </div>
            <div class="row d-flex align-items-center">
              <div class="col-6 col-lg-3 d-flex">
                <img src="${element.author.img}" alt="" class="rounded-circle" width="50px" height="50px">
                <div class="d-flex flex-column ps-2">
                  <span>${element.author.name}</span>
                  <span class="text-muted">${dateMaker(element.author.published_date)}</span>
                </div>
              </div>
              <div class="col-3 col-lg-3 text-center">
                <img src="img/carbon_view.svg" alt="">
                <span>${element.total_view}</span>
              </div>
              <div class="col-12 col-lg-3 -order-1 text-start text-lg-center">
                ${ratingMaker(element.rating.number)}
              </div>
              <div class="col-3 col-lg-3 text-end">
                <img src="img/bi_arrow-right-short.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    news.append(div);
  });
}


getNewsByCategoryAPI('01');