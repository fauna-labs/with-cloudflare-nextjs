import { getProductById } from '../../db';
import { useState } from 'react';


export const config = {
  runtime: 'experimental-edge',
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const product = await getProductById(id);
  return {
    props: { product: {
      ...product,
      _id: id
    } },
  }
}


export default function ProductPage({ product }) {
  const [state, setState] = useState({
    name: '',
    review: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }
  
  const submitReview = async (e) => {
    e.preventDefault();
    // Make a API call to create a review
    try {
      const response = await fetch('/api/create-review', {
        method: 'POST',
        body: JSON.stringify(state),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>

      <h3>Add your review</h3>
      <form onSubmit={submitReview}>
        <input type="text" name="name" placeholder="Your name" onChange={handleChange}/>
        <br />
        <br />
        <textarea name="review" placeholder="Your review" onChange={handleChange}/>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}