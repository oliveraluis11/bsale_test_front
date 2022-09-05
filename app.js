const baseLink = 'https://bsale-products-api.herokuapp.com/api/';

let myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');


let toggleLoading = (isLoading)=>{
 
  if(isLoading){
    document.getElementById("loading").style.display="block";
    document.getElementById("products").style.display="none";
    return;
  }
  document.getElementById("loading").style.display="none";
  document.getElementById("products").style.display="flex";
};

let requestOptions = {
  headers: myHeaders,
};

const getCategories = async () => {
  const response = await fetch(baseLink + 'categories');
  const categories = await response.json()
  const select_categories = document.getElementById('filterCategoria');
  for (let category of categories) {
    select_categories.innerHTML += `<option value="${category.id}">${category.name}</option>`
  }
}


const getProducts = async () => {
  fetch(baseLink + 'products?skip=0&limit=10')
    .then(res => res.json())
    .then(response => {
      console.log(response);
      const div_card = document.getElementById("products");
      div_card.innerHTML = ""
      for (let product of response) {
        div_card.innerHTML += `<div class="col-xl-3 col-lg-4 col-md-6">
                <div class="gallery-item h-200 mt-2">
                  <img src="${product.url_image}" class="img-fluid rounded" alt="">
                  <div class="gallery-links d-flex align-items-center justify-content-center">
                    <a href="${product.url_image}" title="${product.name}" class="glightbox preview-link"><i class="bi bi-arrows-angle-expand"></i></a>
                    <a href="gallery-single.html" class="details-link"><i class="bi bi-link-45deg"></i></a>
                  </div>
                </div>`;
      }
    })
    .catch(err => console.log(err));
};

const getProductsByCategory = async (category_id) => {
  console.log("Value ~>",category_id);
  toggleLoading(true);
  const response = await fetch(baseLink + 'categories/' + category_id+"/products?skip=0&limit=12");
  const products = await response.json();
  const div_card = document.getElementById("products");
  div_card.innerHTML = ""
  for (let product of products) {
    div_card.innerHTML += `<div class="col-xl-3 col-lg-4 col-md-6">
                <div class="gallery-item h-200 mt-2">
                  <img src="${product.url_image}" class="img-fluid rounded" alt="">
                  <div class="gallery-links d-flex align-items-center justify-content-center">
                    <a href="${product.url_image}" title="${product.name}" class="glightbox preview-link"><i class="bi bi-arrows-angle-expand"></i></a>
                    <a href="gallery-single.html" class="details-link"><i class="bi bi-link-45deg"></i></a>
                  </div>
                </div>`;
  }
  toggleLoading(false);
}

getCategories();
