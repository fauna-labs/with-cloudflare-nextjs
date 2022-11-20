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
    q.Let(
      {
        productRef: q.Get(q.Ref(q.Collection("Products"), id)),
        reviewsRef: q.Map(
         q.Paginate(
           q.Match(
            q.Index('reviews_by_product'),
            q.Ref(q.Collection("Products"), id)
           )
         ),
         q.Lambda(x => q.Get(x))
        )
      },
      {
        product: q.Var("productRef"),
        reviews: q.Var("reviewsRef")
      }
    )
  );
  const reviews = response.reviews.data.map((review) => ({ 
    name: review.data.name, 
    review: review.data.review, 
    _id: review.ref.id 
  }));
  return {
    ...response.product.data,
    reviews,
  };
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


// const productsWithReview = response.data.map((product) => {
//   return { 
//     ...product.product.data, 
//     _id: product.product.ref.id, 
//     reviews: product.reviews.data.map(
//       (currentReview) => {
//         const { name, review } = currentReview.data;
//         return { name, review, _id: currentReview.ref.id }
//       }
//     ) 
//   }
// });
// console.log('===>>>', productsWithReview);
// return [];