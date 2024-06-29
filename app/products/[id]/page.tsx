"use server";
import { CoolblueProductProps } from "@/app/types";
import axios from "axios";

export default async function ProductPage(props: any) {
  const { id } = props.params;

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const product: CoolblueProductProps = await fetchProduct();

  return (
    <div>
      <h1>{product.product_name}</h1>
      <ul>
        {product && (
          <li key={product.sku}>
            <h2>{product.brand}</h2>
            <p>{product.price}</p>
          </li>
        )}
      </ul>
    </div>
  );
}
