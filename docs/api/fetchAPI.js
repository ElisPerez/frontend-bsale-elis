export const fetchAPI = async path => {
  const items = await fetch('https://bsale-shop-backend-elis.herokuapp.com/api' + path)
    .then(res => res.json())
    .catch(err => console.log('getProducts error:', err));

  return items;
};
