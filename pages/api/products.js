import { createProduct } from '../../db'
export const config = {
  runtime: 'experimental-edge',
}

export default async function (req) {
  if(req.method === 'POST') {
    const body = await readRequestBodyStream(req.body);
    const { title, price, description } = JSON.parse(body);
    const product = await createProduct(title, price, description);
    // Save the product to the database
    return new Response(
      JSON.stringify({ 
        message: 'Product created successfully',
        product,
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

async function readRequestBodyStream(body) {
  const reader = body.getReader();
  let result = new Uint8Array(0);

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
        break;
    }

    const newResult = new Uint8Array(result.length + value.length);
    newResult.set(result);
    newResult.set(value, result.length);
    result = newResult;
  }
  return new TextDecoder().decode(result);
}