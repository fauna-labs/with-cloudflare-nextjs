import fauna from 'faunadb';

const q = fauna.query;

const client = new fauna.Client({ secret: 'fnAE1PwtvPACUXZPrvFD4shtOSC29hPZB2ev9Jj8' });

export const createProduct = async (title, price, description) => {
  const product = {
    data: {
      title,
      price,
      description,
    },
  };
  return client.query(q.Create(q.Collection('Products'), product));
};


export const getProducts = async () => {
  const response = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('Products'))),
      q.Lambda(x => q.Get(x))
    )
  );
  const products = response.data.map((product) => ({ ...product.data, _id: product.ref.id }));
  return products;
}

export const getProductById = async (id) => {
  const response = await client.query(
    q.Get(q.Ref(q.Collection('Products'), id))
  );
  return response.data;
}

export const createReview = async (name, review, productId) => {
  const response = await client.query(
    q.Create(q.Collection('Reviews'), {
      data: {
        name,
        review,
        product: q.Ref(q.Collection('Products'), productId)
      },
    })
  );
  return response.data;
}