import { useState } from 'react';

export default function AddProducts() {
  
  const [state, setState] = useState({
    title: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    // Make a API call to create a product
    
    await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(state),
    });

    setState({
      title: '',
      price: '',
      description: '',
    });
    alert('Product created successfully');
  }

  return (
    <div className="container">
      <h1>Add Products</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={state.title} onChange={handleChange}/>
        <br />
        <label htmlFor="price">Price</label>
        <input type="number" name="price" value={state.price} onChange={handleChange}/>
        <br />
        <label htmlFor="description" >Description</label>
        <textarea name="description" value={state.description} onChange={handleChange}/>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}