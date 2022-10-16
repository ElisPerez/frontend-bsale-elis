const form = document.forms['form'];
const pageName = document.querySelector('#page-name');
const ulCategoryItems = document.querySelector('#ul-category-items');
const divContainerCars = document.querySelector('#div-container-cards');
const footerID = document.querySelector('#footer-id');

const urlCategory   = 'https://bsale-shop-backend-elis.herokuapp.com/api/products/category';
const urlCategories = 'https://bsale-shop-backend-elis.herokuapp.com/api/categories';
const urlProducts   = 'https://bsale-shop-backend-elis.herokuapp.com/api/products';
const urlSearch     = 'https://bsale-shop-backend-elis.herokuapp.com/api/products/search';

function capitalizerFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function getItems() {
  // Get all Categories:
  const categories = await fetch(urlCategories)
    .then(res => res.json())
    .catch(err => console.log('getCategories error:', err));
  // console.log(categories);

  ulCategoryItems.innerHTML = categories
    .map(category => {
      let name = capitalizerFirstLetter(category.name);
      return `
          <li onclick="getProductsByCategory(${category.id}, '${name}')"><a class="dropdown-item" href="#">${name}</a></li>
          `;
    })
    .join('');

  // Get All Products
  const products = await fetch(urlProducts)
    .then(res => res.json())
    .catch(err => console.log('getProducts error:', err));
  // console.log(products);

  divContainerCars.innerHTML = products
    .map(
      product => `
          <div class="col mb-3">
            <div class="card" style="width: 12rem">
            <img src="${
              product.url_image ? product.url_image : 'no-image.jpg'
            }" class="card-img-top" alt="${product.name}" />
              <div class="card-body">
                <h6 class="card-title">${product.name}</h6>
                <p class="card-title">Price: $${product.price}</p>
              </div>
            </div>
          </div>
            `
    )
    .join('');
}

async function getProductsByCategory(id, name) {
  pageName.innerHTML = `${name}`;

  const products = await fetch(urlCategory + `?id=${id}`)
    .then(res => res.json())
    .catch(err => console.log('getProducts error:', err));
  // console.log(products);

  divContainerCars.innerHTML = products
    .map(
      product => `
        <div class="col mb-3">
          <div class="card" style="width: 12rem">
          <img src="${
            product.url_image ? product.url_image : 'no-image.jpg'
          }" class="card-img-top" alt="${product.name}" />
            <div class="card-body">
              <h6 class="card-title">${product.name}</h6>
              <p class="card-title">Price: $${product.price}</p>
            </div>
          </div>
        </div>
          `
    )
    .join('');
}

/** Search */
form.onsubmit = async function (e) {
  e.preventDefault();

  pageName.innerHTML = `Search`;
  const search = document.form.search.value;
  // console.log(search);

  const products = await fetch(urlSearch + `?q=${search}`)
    .then(res => res.json())
    .catch(err => console.log('getProducts error:', err));
  // console.log(products);

  if (products.length === 0) {
    divContainerCars.innerHTML = `<div class="col mb-3"><h1>Producto No Encontrado</h1></div>`;
  } else {
    divContainerCars.innerHTML = products
      .map(
        product => `
          <div class="col mb-3">
            <div class="card" style="width: 12rem">
            <img src="${
              product.url_image ? product.url_image : 'no-image.jpg'
            }" class="card-img-top" alt="${product.name}" />
              <div class="card-body">
                <h6 class="card-title">${product.name}</h6>
                <p class="card-title">Price: $${product.price}</p>
              </div>
            </div>
          </div>
            `
      )
      .join('');
  }
};

/** Footer */

footerID.innerHTML = `
  <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
    © ${new Date().getFullYear()} Copyright:
    <a class="text-dark" href="https://instagram.com/elisperezmusic" style="text-decoration-line: none;">Elis Antonio Perez</a>
  </div>`;
