import { fetchAPI } from '../api/fetchAPI.js';
import { listItems } from './getProductsByCategory.js';
import { capitalizerFirstLetter } from './helpers.js';
import { pagination } from './pagination.js';

const ulCategoryItems = document.querySelector('#ul-category-items');
const container = document.querySelector('#container');

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

  /* Call listItems para crear el array. */
  listItems();

  /* Calling the function pagination() from the file pagination.js. */
  pagination('http://localhost:8080/api/products');
}
