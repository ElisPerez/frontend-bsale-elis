export const fetchAPI = async path => {
  const items = await fetch('http://localhost:8080/api' + path)
    .then(res => res.json())
    .catch(err => console.log('getProducts error:', err));

  return items;
};
