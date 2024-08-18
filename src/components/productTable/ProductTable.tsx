import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  deleteProduct,
  getProducts,
  ProductType,
} from "@/services/productServices";
import EditInput from "../editInput/EditInput";

const ProductTable = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [updateStateId, setUpdateStateId] = useState<number | undefined>(-1);

  useEffect(() => {
    const listProducts = async () => {
      const response = await getProducts();
      setProducts(response);
    };
    listProducts();
  }, []);

  const handleEditClick = async (id: number | undefined) => {
    setUpdateStateId(id);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setUpdateStateId(-1);
  };

  const handleDeleteClick = async (id: number | undefined) => {
    try {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      await deleteProduct(id);
    } catch (error) {
      alert("Error to remove product");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <div className="w-[800px] overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr>
              <th className="content-space">ID</th>
              <th className="content-space">Product</th>
              <th className="content-space">Price</th>
              <th className="content-space">In Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) =>
              updateStateId === product.id && updateStateId != -1 ? (
                <EditInput
                  product={product}
                  products={products}
                  updateStateId={updateStateId}
                  setProducts={setProducts}
                />
              ) : (
                <tr key={product.id} className="text-center">
                  <td className="content-space">{product.id}</td>
                  <td className="content-space">{product.name}</td>
                  <td className="content-space">{product.price}</td>
                  <td className="content-space">{product.stock}</td>
                  <td className="content-space">
                    <Button
                      className="font-bold bg-orange-500"
                      onClick={() => handleEditClick(product.id)}
                    >
                      edit
                    </Button>
                  </td>
                  <td className="content-space">
                    <Button
                      type="button"
                      className="font-bold bg-red-500"
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      remove
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default ProductTable;
