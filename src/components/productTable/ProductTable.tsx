import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { getProducts, ProductType } from "@/services/productServices";
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

  const handleEditClick = (id: number | undefined) => {
    setUpdateStateId(id);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;

    const inputName = (
      formElement.elements.namedItem("name") as HTMLInputElement
    ).value;

    const inputPrice = Number(
      (formElement.elements.namedItem("price") as HTMLInputElement).value
    );

    const inputStock = Number(
      (formElement.elements.namedItem("stock") as HTMLInputElement).value
    );

    const newProduct = products.map((product) =>
      product.id === updateStateId
        ? { ...product, name: inputName, price: inputPrice, stock: inputStock }
        : product
    );

    setProducts(newProduct);
    setUpdateStateId(-1);
  };

  const handleDeleteClick = (id: number | undefined) => {
    const newProduct = products.filter((product) => product.id !== id);

    setProducts(newProduct);
  };

  return (
    <div className="w-full flex justify-center p-5 border-collapse">
      <form onSubmit={handleSubmit} className="w-full max-w-[800px]">
        <table className="w-full ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Price</th>
              <th>In Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) =>
              updateStateId === product.id ? (
                <EditInput
                  product={product}
                  products={products}
                  setProducts={setProducts}
                />
              ) : (
                <tr key={product.id} className="text-center">
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td className="flex gap-2 ">
                    <Button
                      variant="secondary"
                      onClick={() => handleEditClick(product.id)}
                    >
                      edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="secondary"
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
      </form>
    </div>
  );
};

export default ProductTable;
