import { pagination } from './pagination.js';

const container = document.querySelector('#container');
const pageName = document.querySelector('#page-name');
const btnSearch = document.querySelector('#idbutton');

/* Search: function that is being called when the form is being submitted. */
form.onsubmit = async function (e) {
  e.preventDefault();
  container.innerHTML = ``;

  /* Disabling the button so that the user cannot click on it while the data is being fetched. */
  btnSearch.disabled = true;

  /* Getting the value of the input with the name of 'search'. */
  const search = document.form.search.value;

  if (search.trim().length === 0) {
    /* Enabling the button again so that the user can click on it. */
    btnSearch.disabled = false;
    return;
  }
  /* Changing the name of the page (h1). */
  pageName.innerHTML = `Search`;

  /* Get products and pagination. */
  pagination(`https://bsale-shop-backend-elis.herokuapp.com/api/products/search?q=${search}`);
};
