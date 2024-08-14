import { ProductType } from "@/services/productServices";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface EditInputProps {
  product: ProductType;
  products: ProductType[];
  editProduct: () => Promise<void>;
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const EditInput = ({ product, products, setProducts }: EditInputProps) => {
  const handleInputName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputName = e.target.value;
    const newProduct = products.map((currProduct) =>
      currProduct.id === product.id
        ? { ...currProduct, name: inputName }
        : currProduct
    );
    setProducts(newProduct);
  };

  const handleInputPrice: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const inputPrice = Number(value);

    const newProduct = products.map((currProduct) =>
      currProduct.id === product.id
        ? { ...currProduct, price: inputPrice }
        : currProduct
    );
    setProducts(newProduct);
  };

  const handleInputStock: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const inputStock = Number(value);

    const newProduct = products.map((currProduct) =>
      currProduct.id === product.id
        ? { ...currProduct, stock: inputStock }
        : currProduct
    );
    setProducts(newProduct);
  };

  return (
    <tr>
      <td></td>
      <td>
        <Input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputName}
        />
      </td>
      <td>
        <Input
          type="number"
          name="price"
          min={0}
          step="0.01"
          value={product.price}
          onChange={handleInputPrice}
        />
      </td>
      <td>
        <Input
          type="number"
          name="stock"
          min={0}
          value={product.stock}
          onChange={handleInputStock}
        />
      </td>
      <td>
        <Button type="submit" onClick={() => {}}>
          Update
        </Button>
      </td>
    </tr>
  );
};

export default EditInput;
