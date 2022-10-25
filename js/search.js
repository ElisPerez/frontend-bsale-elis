import { fetchAPI } from '../api/fetchAPI.js';

const container = document.querySelector('#container');

const divContainerCards = $('#div-container-cards');
const divPagination = $('#pagination-container');

/* Search: function that is being called when the form is being submitted. */
form.onsubmit = async function (e) {
  e.preventDefault();

  /* Changing the name of the page (h1). */
  pageName.innerHTML = `Search`;

  /* Getting the value of the input with the name of 'search'. */
  const search = document.form.search.value;

  /* Get products: Fetching the data from the API and returning products as a JSON object. */
  const products = await fetchAPI('/products/search' + `?q=${search}`);

  /* Checking if the products array is empty. If it is empty, it is displaying a message saying that the product was not found. If it is not empty, it is cleaning the container and displaying the products. */
  if (products.length === 0) {
    /* Cleaning the container and displaying a message saying that the product was not found. */
    container.innerHTML = `<div class="col mb-3 d-flex justify-content-center"><h2>Producto No Encontrado</h2></div>`;

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
                src="${product.url_image ? product.url_image : '/img/no-image.jpg'}"
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
