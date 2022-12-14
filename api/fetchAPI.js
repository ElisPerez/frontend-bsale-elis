/**
 * The function fetchAPI fetches data from the API and returns the data as a JavaScript object
 * @returns The items are being returned.
 */
export const fetchAPI = async path => {
  const items = await fetch('http://localhost:8080/api' + path)
    .then(res => res.json())
    .catch(err => console.log('An error here:', err));

  return items;
};

/**
 * ?: Server Enpoints like this:
 * All products: 'http://localhost:8080/api/products';
 * Products by category: 'http://localhost:8080/api/products/category?id=1';
 * All categories: 'http://localhost:8080/api/categories'
 * Search: 'http://localhost:8080/api/products/search?q=red'
 * Access Denied: 'http://localhost:8080/'
 */