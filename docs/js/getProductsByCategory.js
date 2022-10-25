const urlCategory = 'https://bsale-shop-backend-elis.herokuapp.com/api/products/category';

const pageName = document.querySelector('#page-name');
const container = document.querySelector('#container');

const divContainerCards = $('#div-container-cards');
const divPagination = $('#pagination-container');

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