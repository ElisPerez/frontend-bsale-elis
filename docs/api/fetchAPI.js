/**
 * The function fetchAPI fetches data from the API and returns the data as a JavaScript object
 * @returns The items are being returned.
 */
export const fetchAPI = async path => {
  const items = await fetch('https://bsale-shop-backend-elis.herokuapp.com/api' + path)
    .then(res => res.json())
    .catch(err => console.log('An error here:', err));

  return items;
};

/**
 * ?: Server Enpoints like this:
 * All products: 'https://bsale-shop-backend-elis.herokuapp.com/api/products';
 * Products by category: 'https://bsale-shop-backend-elis.herokuapp.com/api/products/category?id=1';
 * All categories: 'https://bsale-shop-backend-elis.herokuapp.com/api/categories'
 * Search: 'https://bsale-shop-backend-elis.herokuapp.com/api/products/search?q=red'
 * Access Denied: https://bsale-shop-backend-elis.herokuapp.com/
 */
