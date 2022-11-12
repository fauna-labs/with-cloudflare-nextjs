import { createProduct } from '../../db'
export const config = {
  runtime: 'experimental-edge',
}

export default async function (req) {
  if(req.method === 'POST') {
    const { title, price, description } = req.body;
    const product = await createProduct(title, price, description);
    // Save the product to the database
    return new Response(
      JSON.stringify({ 
        message: 'Product created successfully',
        product: {
          id: product.ref.id,
          ...req.body,
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}