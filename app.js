const urlCategory = 'http://localhost:8080/api/products/category';
const urlCategories = 'http://localhost:8080/api/categories';
const urlProducts = 'http://localhost:8080/api/products';
const urlSearch = 'http://localhost:8080/api/products/search';

const pageName = document.querySelector('#page-name');
const ulCategoryItems = document.querySelector('#ul-category-items');
const footerID = document.querySelector('#footer-id');
const form = document.forms['form'];
const container = document.querySelector('#container');

const divContainerCards = $('#div-container-cards');
const divPagination = $('#pagination-container');

/**
 * capitalizerFirstLetter: It takes a string, capitalizes the first letter, and returns the new string
 * @param str - The string to capitalize.
 * @returns The first letter of the string is being capitalized and the rest of the string is being
 * returned.
 */
function capitalizerFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * The function getItems() is an asynchronous function that fetches the data from the API and returns
 * the categories and products as a JSON object
 */
async function getItems() {
  /* Cleaning the container. */
  container.innerHTML = '';

  /* Get all Categories: Fetching the data from the API and returning categories as a JSON object. */
  const categories = await fetch(urlCategories)
    .then(res => res.json())
    .catch(err => console.log('getCategories error:', err));

  /* Creating a list of categories. */
  ulCategoryItems.innerHTML = categories
    .map(category => {
      let name = capitalizerFirstLetter(category.name);
      return `
    <li onclick="getProductsByCategory(${category.id}, '${name}')"><a class="dropdown-item" href="#">${name}</a></li>
    `;
    })
    .join('');

  /* Get All Products:Fetching the data from the API and returning products as a JSON object. */
  const products = await fetch(urlProducts)
    .then(res => res.json())
    .catch(err => console.log('getProducts error:', err));

  /* Pagination plugin that is being used to paginate the products. */
  divPagination.pagination({
    dataSource: products,
    pageSize: 4,
    callback: function (data, pagination) {
      /* Creating a variable called dataHTML and Add the opening div tag to it. */
      let dataHTML = '<div class="row align-items-center d-flex justify-content-center">';

      /* jQuery function to assign all cards to the dataHTML variable */
      $.each(data, function (index, product) {
        dataHTML += `
          <div class="col col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3 d-flex justify-content-center">
            <div class="card" style="width: 14rem; height: 20rem">
              <img
                src="${product.url_image ? product.url_image : 'no-image.jpg'}"
                class="card-img-top"
                alt="${product.name}"
                style="width: auto; height: 240px"
              />
              <div class="card-body">
                <h6 class="card-title">${product.name}</h6>
                <p class="card-title">Price: $${product.price}</p>
              </div>
            </div>
          </div>`;
      });

      /* Adding the closing div tag to the variable dataHTML. */
      dataHTML += '</div>';

      /* Replacing the content of the div with the id of 'div-container-cards' with the content of the
      variable dataHTML. */
      divContainerCards.html(dataHTML);
    },
  });
}

/**
 * It gets the products of a category and displays them in the page
 * @param id - The id of the category.
 * @param name - The name of the parameter.
 */
async function getProductsByCategory(id, name) {
  /* Cleaning the container. */
  container.innerHTML = '';

  /* Changing the name of the page (h1). */
  pageName.innerHTML = `${name}`;

  /* Get Products by Category ID: Fetching the data from the API and returning products as a JSON object. */
  const products = await fetch(urlCategory + `?id=${id}`)
    .then(res => res.json())
    .catch(err => console.log('getProducts error:', err));

  /* Pagination plugin that is being used to paginate the products. */
  divPagination.pagination({
    dataSource: products,
    pageSize: 4,
    callback: function (data, pagination) {
      /* Creating a variable called dataHTML and Add the opening div tag to it. */
      let dataHTML = '<div class="row align-items-center d-flex justify-content-center">';

      /* jQuery function to assign all cards to the dataHTML variable */
      $.each(data, function (index, product) {
        dataHTML += `
        <div class="col col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3 d-flex justify-content-center">
          <div class="card" style="width: 14rem; height: 20rem">
            <img
              src="${product.url_image ? product.url_image : 'no-image.jpg'}"
              class="card-img-top" alt="${product.name}"
              style="width: auto; height: 240px"
              />
            <div class="card-body">
              <h6 class="card-title">${product.name}</h6>
              <p class="card-title">Price: $${product.price}</p>
            </div>
          </div>
        </div>
      `;
      });

      /* Adding the closing div tag to the variable dataHTML. */
      dataHTML += '</div>';

      /* Replacing the content of the div with the id of 'div-container-cards' with the content of the variable dataHTML. */
      divContainerCards.html(dataHTML);
    },
  });
}

/* Search: function that is being called when the form is being submitted. */
form.onsubmit = async function (e) {
  e.preventDefault();

  /* Changing the name of the page (h1). */
  pageName.innerHTML = `Search`;

  /* Getting the value of the input with the name of 'search'. */
  const search = document.form.search.value;

  /* Get products: Fetching the data from the API and returning products as a JSON object. */
  const products = await fetch(urlSearch + `?q=${search}`)
    .then(res => res.json())
    .catch(err => console.log('getProducts error:', err));

  /* Checking if the products array is empty. If it is empty, it is displaying a message saying that the product was not found. If it is not empty, it is cleaning the container and displaying the products. */
  if (products.length === 0) {
    /* Cleaning the container and displaying a message saying that the product was not found. */
    container.innerHTML = `<div class="col mb-3 d-flex justify-content-center"><h1>Producto No Encontrado</h1></div>`;

    /* Cleaning the container and the pagination. */
    divContainerCards.html('');
    divPagination.html('');
  } else {
    /* Cleaning the container. */
    container.innerHTML = '';

    /* Pagination plugin that is being used to paginate the products. */
    divPagination.pagination({
      dataSource: products,
      pageSize: 4,
      callback: function (data, pagination) {
        /* Creating a variable called dataHTML and Add the opening div tag to it. */
        let dataHTML = '<div class="row align-items-center d-flex justify-content-center">';

        /* jQuery function to assign all cards to the dataHTML variable */
        $.each(data, function (index, product) {
          dataHTML += `
          <div class="col col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3 d-flex justify-content-center">
            <div class="card" style="width: 14rem; height: 20rem">
              <img
                src="${product.url_image ? product.url_image : 'no-image.jpg'}"
                class="card-img-top"
                alt="${product.name}"
                style="width: auto; height: 240px"
              />
              <div class="card-body">
                <h6 class="card-title">${product.name}</h6>
                <p class="card-title">Price: $${product.price}</p>
              </div>
            </div>
          </div>
        `;
        });

        /* Adding the closing div tag to the variable dataHTML. */
        dataHTML += '</div>';

        /* Replacing the content of the div with the id of 'div-container-cards' with the content of the variable dataHTML. */
        divContainerCards.html(dataHTML);
      },
    });
  }
};

/* Creating the footer with current Year and a Link to instagram. */
footerID.innerHTML = `
  <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
    © ${new Date().getFullYear()} Copyright:
    <a class="text-dark" href="https://instagram.com/elisperezmusic" style="text-decoration-line: none;">Elis Antonio Perez</a>
  </div>
  `;
