const divPagination = $('#pagination-container');
const divContainerCards = $('#div-container-cards');

const container = document.querySelector('#container');
const btnSearch = document.querySelector('#idbutton');

// export const pagination = url => {
//   divPagination.pagination({
//     dataSource: url, // Like this: http://localhost:8080/api/products/category?id=1&pageSize=4&pageNumber=1&_=1667774822605 OR like this: http://localhost:8080/api/products/?pageSize=4&pageNumber=1&_=1667774822605
//     locator: 'products', // products: array fron response.
//     totalNumberLocator: function (response) {
//       // console.log('Response:', response.totalRows);
//       return response.totalRows;
//     },
//     pageSize: 4,
//     ajax: {
//       beforeSend: function () {
//         /* Showing a loading spinner while the data is being fetched from the API. */
//         divContainerCards.html(`<div class="d-flex justify-content-center">
//         <div class="m-5 p-5 d-flex align-content-center spinner-border text-secondary" role="status">
//         <span class="visually-hidden">Loading...</span>
//       </div>
//         </div>`);
//       },
//     },
//     callback: function (data, pagination) {
//       // console.log('data:', data);
//       // console.log('pagination:', pagination);
//       /* Creating a variable called dataHTML and Add the opening div tag to it. */
//       let dataHTML = '<div class="row align-items-center d-flex justify-content-center">';

//       /* jQuery function to assign all cards to the dataHTML variable */
//       $.each(data, function (index, product) {
//         dataHTML += `
//           <div class="col col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3 d-flex justify-content-center">
//             <div class="card" style="width: 14rem; height: 20rem">
//               <img
//                 src="${product.url_image ? product.url_image : '/img/no-image.jpg'}"
//                 class="card-img-top"
//                 alt="${product.name}"
//                 style="width: auto; height: 240px"
//               />
//               <div class="card-body">
//                 <h6 class="card-title">${product.name}</h6>
//                 <p class="card-title">Price: $${product.price}</p>
//               </div>
//             </div>
//           </div>`;
//       });

//       /* Adding the closing div tag to the variable dataHTML. */
//       dataHTML += '</div>';

//       /* Replacing the content of the div with the id of 'div-container-cards' with the content of the
//       variable dataHTML. */
//       divContainerCards.html(dataHTML);
//     },
//   });
// };

export const pagination = url => {
  divPagination.pagination({
    dataSource: url, // Like this: http://localhost:8080/api/products/category?id=1&pageSize=4&pageNumber=1&_=1667774822605 OR like this: http://localhost:8080/api/products?pageSize=4&pageNumber=1&_=1667774822605 OR like this: http://localhost:8080/api/products?q=something&pageSize=4&pageNumber=1&_=1667774822605
    locator: 'products', // products: array fron response.
    totalNumberLocator: function (response) {
      // console.log('Response:', response.totalRows);
      return response.totalRows;
    },
    pageSize: 4,
    ajax: {
      beforeSend: function () {
        /* Showing a loading spinner while the data is being fetched from the API. */
        divContainerCards.html(`<div class="d-flex justify-content-center">
        <div class="m-5 p-5 d-flex align-content-center spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
        </div>`);
      },
    },
    callback: function (data, pagination) {
      // console.log('data:', data);
      // console.log('pagination:', pagination);
      /* Creating a variable called dataHTML and Add the opening div tag to it. */

      if (data.length === 0) {
        /* Cleaning the container and displaying a message saying that the product was not found. */
        container.innerHTML = `<div class="col mb-3 d-flex justify-content-center"><h2>Producto No Encontrado</h2></div>`;

        /* Cleaning the container and the pagination. */
        divContainerCards.html('');
        divPagination.html('');

        /* Enabling the button again so that the user can click on it. */
        btnSearch.disabled = false;
      } else {
        /* Cleaning the container. */
        container.innerHTML = '';

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

        /* Enabling the button again so that the user can click on it. */
        btnSearch.disabled = false;
      }
    },
  });
};
