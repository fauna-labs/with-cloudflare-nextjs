export const createProduct = async (title, price, description) => {
  
  const query = JSON.stringify({
    query: `
      mutation CreatePost {
        createProduct(data: {
          title: "${title}"
          description: "${description}"
          price: ${price}
        }) {
          _id
        }
      }
    `
  });

  const response = await fetch(`https://graphql.fauna.com/graphql`, {
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Bearer fnAE1Mw_HoACUF0b3pyCj9Sr85hnPlkZqu5r_a6b`
    },
    method: 'POST',
    body: query,
  });

  const responseJson = await response.json();
  return responseJson.data.createProduct;
};


export const getProducts = async () => {
  const query = JSON.stringify({
    query: `
      query ListProducts {
        listProducts {
          data {
            _id
            title
            description
            price
          }
        }
      }
    `
  });

  const response = await fetch(`https://graphql.fauna.com/graphql`, {
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Bearer fnAE1Mw_HoACUF0b3pyCj9Sr85hnPlkZqu5r_a6b`
    },
    method: 'POST',
    body: query,
  });

  const responseJson = await response.json();
  return responseJson;
}