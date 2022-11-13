import styles from '../styles/Home.module.css'
import { getProducts } from '../db';

export const config = {
  runtime: 'experimental-edge',
}


export async function getServerSideProps() {
  const fauna_secret = process.env.NEXT_RUNTIME;
  // const products = await getProducts(fauna_secret);
  return {
    props: {
      products: [],
      fauna_secret
    },
  }
}


export default function Home({ products, fauna_secret }) {
  console.log('=FFA==>>>', fauna_secret);
  return (
    <div className={styles.container}>
      <h1>Products</h1>
      <ul>
      {
        products.map((product) => (
          <li key={product._id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </li>
        ))
      }
      </ul>
    </div>
  )
}