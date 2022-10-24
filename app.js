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

// Transforma en mayúscula la primera letra de un string
function capitalizerFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// getItems muestra en el html las categorias y los productos.
async function getItems() {
  // Limpiamos contenedor
  container.innerHTML = '';
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

  // Paginamos los productos
  divPagination.pagination({
    dataSource: products,
    pageSize: 4,
    callback: function (data, pagination) {
      // console.log('pagination:', pagination);
      let dataHTML = '<div class="row align-items-center d-flex justify-content-center">';

      $.each(data, function (index, product) {
        // console.log('index each:', index);
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

      dataHTML += '</div>';

      divContainerCards.html(dataHTML);
    },
  });
}

async function getProductsByCategory(id, name) {
  // Limpiamos contenedor
  container.innerHTML = '';

  // Cambiamos titulo
  pageName.innerHTML = `${name}`;

  // Llamado a la API para obtener productos
  const products = await fetch(urlCategory + `?id=${id}`)
    .then(res => res.json())
    .catch(err => console.log('getProducts error:', err));
  // console.log(products);

  // Paginación
  divPagination.pagination({
    dataSource: products,
    pageSize: 4,
    callback: function (data, pagination) {
      // console.log('pagination:', pagination);
      let dataHTML = '<div class="row align-items-center d-flex justify-content-center">';

      $.each(data, function (index, product) {
        // console.log('index each:', index);
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

      dataHTML += '</div>';

      divContainerCards.html(dataHTML);
    },
  });
}

/** Search */
form.onsubmit = async function (e) {
  e.preventDefault();

  // Cambiamos titulo
  pageName.innerHTML = `Search`;
  const search = document.form.search.value;
  // console.log(search);

  // Llamado a la API
  const products = await fetch(urlSearch + `?q=${search}`)
    .then(res => res.json())
    .catch(err => console.log('getProducts error:', err));
  // console.log(products);

  // Condicionamos la vista a que muestre un Mensaje o los productos.
  if (products.length === 0) {
    container.innerHTML = `<div class="col mb-3 d-flex justify-content-center"><h1>Producto No Encontrado</h1></div>`;
    divContainerCards.html('');
    divPagination.html('');
  } else {
    // Limpiamos el contenedor
    container.innerHTML = '';

    // Paginamos los resultados
    divPagination.pagination({
      dataSource: products,
      pageSize: 4,
      callback: function (data, pagination) {
        // console.log('pagination:', pagination);
        let dataHTML = '<div class="row align-items-center d-flex justify-content-center">';

        $.each(data, function (index, product) {
          // console.log('index each:', index);
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

        dataHTML += '</div>';

        divContainerCards.html(dataHTML);
      },
    });
  }
};

/** Footer */

footerID.innerHTML = `
  <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
    © ${new Date().getFullYear()} Copyright:
    <a class="text-dark" href="https://instagram.com/elisperezmusic" style="text-decoration-line: none;">Elis Antonio Perez</a>
  </div>
  `;
