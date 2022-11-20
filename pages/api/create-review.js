import { createReview } from '../../db'
import { readRequestBodyStream } from './products';

export const config = {
  runtime: 'experimental-edge',
}

export default async function (req) {
  if(req.method === 'POST') {
    const body = await readRequestBodyStream(req.body);
    const { name, review, productId } = JSON.parse(body);
    const newReview = await createReview(name, review, productId);
    return new Response(
      JSON.stringify({ 
        message: 'Review created successfully',
        newReview,
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