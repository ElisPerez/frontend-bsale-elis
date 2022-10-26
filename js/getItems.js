import { fetchAPI } from '../api/fetchAPI.js';
import { capitalizerFirstLetter } from './helpers.js';

const ulCategoryItems = document.querySelector('#ul-category-items');
const container = document.querySelector('#container');

const divContainerCards = $('#div-container-cards');
const divPagination = $('#pagination-container');

/**
 * The function getItems() is an asynchronous function that fetches the data from the API and returns
 * the categories and products as a JSON object
 */
getItems();

async function getItems() {
  /* Cleaning the container. */
  container.innerHTML = '';

  /* Get all Categories: Fetching the data from the API and returning categories as a JSON object. */
  const categories = await fetchAPI('/categories');

  /* Creating a list of categories. */
  ulCategoryItems.innerHTML = categories
    .map(category => {
      let name = capitalizerFirstLetter(category.name);
      return `<li class="liitems" id="idc${category.id}"><a id="ida${category.id}" class="dropdown-item" href="#">${name}</a></li>`;
    })
    .join('');

  /* Get All Products:Fetching the data from the API and returning products as a JSON object. */
  const products = await fetchAPI('/products');

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
