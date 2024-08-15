import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  deleteProduct,
  getProducts,
  ProductType,
  updateProduct,
} from "@/services/productServices";
import EditInput from "../editInput/EditInput";

const ProductTable = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const [inputName, setInputName] = useState("");
  const [inputPrice, setInputPrice] = useState(0);
  const [inputStock, setInputStock] = useState(0);

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

  const editProduct = async () => {
    const product = {
      id: updateStateId,
      name: inputName,
      description: "",
      price: inputPrice,
      stock: inputStock,
    };

    await updateProduct(product);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
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

    await editProduct();

    const newProduct = products.map((product) =>
      product.id === updateStateId
        ? { ...product, name: inputName, price: inputPrice, stock: inputStock }
        : product
    );

    setInputName(inputName);
    setInputPrice(inputPrice);
    setInputStock(inputStock);

    setProducts(newProduct);

    setUpdateStateId(-1);
  };

  const handleDeleteClick = async (id: number | undefined) => {
    await deleteProduct(id);
  };

  return (
    <div className="w-full max-h-[80vh] flex justify-center p-5 border-collapse overflow-y-auto">
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
              updateStateId === product.id && updateStateId != -1 ? (
                <EditInput
                  product={product}
                  products={products}
                  setProducts={setProducts}
                  editProduct={editProduct}
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
