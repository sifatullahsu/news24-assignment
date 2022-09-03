const querySelector = path =>{
  return document.querySelector(path);
}

const getId = id =>{
  return document.getElementById(id);
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

const loaderControl = (path, bool) =>{
  const loader = querySelector(path);

  if(bool === true){
    loader.innerHTML = `
    <button class="btn btn-primary" type="button" disabled>
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Loading...
    </button>
    `;
  } 
  else{
    loader.innerHTML = '';
  }
}

const newsCategoriesAPI = () => {
  loaderControl('#news-category .loader', true);

  fetch('https://openapi.programming-hero.com/api/news/categories')
  .then(response => response.json())
  .then(data => newsCategories(data.data.news_category))
}

const newsCategories = data => {
  const categories = querySelector('#news-category ul');

  data.forEach(element => {
    const li = document.createElement('li');
    li.innerHTML = `<button onclick="getNewsByCategoryAPI('${element.category_id}')">${element.category_name}</button>`;
    categories.append(li);
  });

  loaderControl('#news-category .loader', false);
}

newsCategoriesAPI();


// =================================


const getNewsByCategoryAPI = category_id =>{
  loaderControl('#news-query-result .loader',true);

  fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
  .then(response => response.json())
  .then(data => getNewsByCategory(data.data))
}

const getNewsByCategory = data =>{
  // Data Sorting by total_view
  data.sort((a, b) => b.total_view - a.total_view);
  
  const totalNews = data.length;

  const itemCount = querySelector('#news-query-result p');

  const news = querySelector('#news-area');
  news.innerHTML = '';

  if (totalNews){
    itemCount.innerText = `${totalNews} items found`;
    
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
                <p class="text-muted">${element.details.length > 400 ? element.details.slice(0, 400) + '...' : element.details}</p>
              </div>
              <div class="row d-flex align-items-center">
                <div class="col-6 col-lg-3 d-flex">
                  <img src="${element.author.img}" alt="" class="rounded-circle" width="50px" height="50px">
                  <div class="d-flex flex-column ps-2">
                    <span>${element.author.name !== null ? element.author.name : 'No Data Available'}</span>
                    <span class="text-muted">${dateMaker(element.author.published_date)}</span>
                  </div>
                </div>
                <div class="col-3 col-lg-3 text-center">
                  <img src="img/carbon_view.svg" alt="">
                  <span>${element.total_view !== null ? element.total_view : 'No Data Available'}</span>
                </div>
                <div class="col-12 col-lg-3 -order-1 text-start text-lg-center">
                  ${ratingMaker(element.rating.number)}
                </div>
                <div class="col-3 col-lg-3 text-end">
                  <img src="img/bi_arrow-right-short.svg" alt="" onclick="getFullNewsAPI('${element._id}')" data-bs-toggle="modal" data-bs-target="#newsModal">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
      news.append(div);
    });
  } else {
    itemCount.innerText = `No data found..`;

    news.innerHTML = `<div class="row"><div class="col-12"><h3>No Data Found..</h3></div></div>`;
  }

  loaderControl('#news-query-result .loader', false);
}


// getNewsByCategoryAPI('01');


// =====================

const getFullNewsAPI = id =>{
  loaderControl('.modal .loader', true);

  fetch(`https://openapi.programming-hero.com/api/news/${id}`)
  .then(response => response.json())
  .then(data => getFullNews(data.data[0]))
}

const getFullNews = element =>{
  const modalBody = querySelector('.news-modal-body');
  modalBody.innerHTML = '';

  const div = document.createElement('div');
  div.innerHTML = `
  <div class="row">
    <div class="col-12 news bg-white rounded p-3 mb-4">
      <div class="row">
        <div class="col-12 d-flex flex-column justify-content-between py-2">
          <div>
            <h2>${element.title}</h2>
            <img src="${element.image_url}" alt="" class="rounded img-fluid my-3 w-50">
            <p class="text-muted">${element.details}</p>
          </div>
          <div class="row d-flex align-items-center mt-5">
            <div class="col-6 col-lg-4 d-flex">
              <img src="${element.author.img}" alt="" class="rounded-circle" width="50px" height="50px">
              <div class="d-flex flex-column ps-2">
                <span>${element.author.name !== null ? element.author.name : 'No Data Found'}</span>
                <span class="text-muted">${dateMaker(element.author.published_date)}</span>
              </div>
            </div>
            <div class="col-3 col-lg-4 text-center">
              <img src="img/carbon_view.svg" alt="">
              <span>${element.total_view !== null ? element.total_view : 'No Data Found'}</span>
            </div>
            <div class="col-12 col-lg-4 -order-1 text-start text-lg-end">
              ${ratingMaker(element.rating.number)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  modalBody.append(div);

  loaderControl('.modal .loader', false);
}

querySelector('.modal .btn-close').addEventListener('click', function(){
  const modalBody = querySelector('.news-modal-body');
  modalBody.innerHTML = '';
});