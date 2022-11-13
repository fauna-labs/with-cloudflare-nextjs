import fauna from 'faunadb';

const q = fauna.query;

export const createProduct = async (title, price, description, fauna_secret) => {
  const client = new fauna.Client({ secret: fauna_secret });
  const product = {
    data: {
      title,
      price,
      description,
    },
  };
  return client.query(q.Create(q.Collection('Products'), product));
};


export const getProducts = async (fauna_secret) => {
  const client = new fauna.Client({ secret: fauna_secret });
  const response = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('Products'))),
      q.Lambda(x => q.Get(x))
    )
  );
  const products = response.data.map((product) => ({ ...product.data, _id: product.ref.id }));
  return products;
}