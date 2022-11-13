import styles from '../styles/Home.module.css'
import { getProducts } from '../fauna';

export const config = {
  runtime: 'experimental-edge',
}


export async function getServerSideProps() {
  try { 
    const products = await getProducts();
    return {
      props: {
        products: products,
      },
    }
  } catch (error) { 
    return { 
      props: {
        products: error.toString(),
      }
    }
  }
}


export default function Home({ products }) {
  console.log('===>>>>', products);
  return (
    <div className={styles.container}>
      <h1>Products</h1>
      <ul>
      {/* {
        products.map((product) => (
          <li key={product._id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </li>
        ))
      } */}
      </ul>
    </div>
  )
}
