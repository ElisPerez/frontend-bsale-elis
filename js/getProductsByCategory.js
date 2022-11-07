import { pagination } from './pagination.js';

const pageName = document.querySelector('#page-name');
const container = document.querySelector('#container');

/* Creating empty array called liItems to save the list of categories. */
const liItems = [];

export const listItems = () => {
  const array = document.querySelectorAll('.liitems');
  liItems.push(array);
  iterarLiItems();
};

const iterarLiItems = () => {
  liItems[0].forEach(liItem =>
    liItem.addEventListener('click', async e => {
      const id = e.target.id.replace('ida', '');
      const name = e.target.text;

      /* Cleaning the container. */
      container.innerHTML = '';

      /* Changing the name of the page (h1). */
      pageName.innerHTML = `${name}`;

      pagination(`http://localhost:8080/api/products/category?id=${id}`);
    })
  );
};
