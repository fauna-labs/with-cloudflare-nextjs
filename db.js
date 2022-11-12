import fauna from 'faunadb';

const q = fauna.query;
const client = new fauna.Client({ secret: process.env.FAUNA_SECRET });

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
