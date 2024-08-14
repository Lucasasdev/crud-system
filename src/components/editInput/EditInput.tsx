import { ProductType } from "@/services/productServices";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface EditInputProps {
  product: ProductType;
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const EditInput = ({ product, products, setProducts }: EditInputProps) => {
  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.value;
    const newProduct = products.map((currProduct) =>
      currProduct.id === product.id
        ? { ...currProduct, name: name }
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
          onChange={handleInput}
        />
      </td>
      <td>
        <Input
          type="number"
          name="price"
          min={0}
          step="0.01"
          value={product.price}
        />
      </td>
      <td>
        <Input type="number" name="stock" min={0} value={product.stock} />
      </td>
      <td>
        <Button type="submit">Update</Button>
      </td>
    </tr>
  );
};

export default EditInput;
