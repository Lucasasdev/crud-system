import { ProductType, updateProduct } from "@/services/productServices";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

interface EditInputProps {
  product: ProductType;
  products: ProductType[];
  updateStateId: number | undefined;
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const EditInput = ({
  product,
  products,
  updateStateId,
  setProducts,
}: EditInputProps) => {
  const [inputName, setInputName] = useState(product.name);
  const [inputPrice, setInputPrice] = useState(product.price);
  const [inputStock, setInputStock] = useState(product.stock);

  const handleInputName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputName = e.target.value;
    const newProduct = products.map((currProduct) =>
      currProduct.id === product.id
        ? { ...currProduct, name: inputName }
        : currProduct
    );
    setProducts(newProduct);
    setInputName(inputName);
  };

  const handleInputPrice: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const inputPrice = Number(value);
    console.log(value);
    const newProduct = products.map((currProduct) =>
      currProduct.id === product.id
        ? { ...currProduct, price: inputPrice }
        : currProduct
    );
    setProducts(newProduct);
    setInputPrice(inputPrice);
  };

  const handleInputStock: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const inputStock = Number(value);
    setInputStock(inputStock);
    const newProduct = products.map((currProduct) =>
      currProduct.id === product.id
        ? { ...currProduct, stock: inputStock }
        : currProduct
    );
    setProducts(newProduct);
    setInputStock(inputStock);
  };

  const handleButtonClick = async () => {
    if (inputName.trim() === "" || inputName.length < 3) {
      alert("Name is mandatory and must have at least 3 characters.");
      return;
    }
    if (inputPrice <= 0) {
      alert("Price number must be a positive");
      return;
    }
    if (inputStock < 0) {
      alert("Stock number must not be negative.");
      return;
    }
    const product = {
      id: updateStateId,
      name: inputName,
      description: "",
      price: inputPrice,
      stock: inputStock,
    };
    await updateProduct(product);
  };

  return (
    <tr>
      <td className="content-space"></td>
      <td className="content-space">
        <Input
          type="text"
          name="name"
          minLength={3}
          value={product.name}
          onChange={handleInputName}
        />
      </td>
      <td className="content-space">
        <Input
          type="text"
          name="price"
          min={1}
          value={product.price}
          onChange={handleInputPrice}
        />
      </td>
      <td className="content-space">
        <Input
          type="text"
          name="stock"
          min={1}
          value={product.stock}
          onChange={handleInputStock}
        />
      </td>
      <td className="content-space">
        <Button type="submit" onClick={handleButtonClick}>
          Update
        </Button>
      </td>
    </tr>
  );
};

export default EditInput;
