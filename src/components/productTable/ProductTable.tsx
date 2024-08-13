import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { getProducts, ProductType } from "@/services/productServices";

const ProductTable = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const listProducts = async () => {
      const response = await getProducts();

      setProducts(response);
    };

    listProducts();
  }, []);

  return (
    <div className="w-full flex justify-center p-5 border-collapse">
      <table className="w-full max-w-[800px]">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Price</th>
            <th>In Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td className="flex gap-2 ">
                <Button>edit</Button>
              </td>
              <td>
                <Button>remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
