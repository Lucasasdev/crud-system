import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createProduct } from "@/services/productServices";

const CreateForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const handleCreateClick: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const product = {
      name,
      description,
      price,
      stock,
    };

    await createProduct(product);

    setName("");
    setDescription("");
    setPrice(0);
    setStock(0);
  };

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleCreateClick}
        className="bg-secondary flex flex-col m-5 p-4 gap-2 rounded-lg max-w-[800px] w-full"
      >
        <div>
          <label htmlFor="fname">Name</label>
          <Input
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </div>
        <div>
          <label htmlFor="fdescription">Description</label>
          <Input
            id="fdescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Input>
        </div>
        <div>
          <label htmlFor="fprice">Price</label>
          <Input
            type="number"
            value={price}
            min={0}
            step="0.01"
            id="fprice"
            onChange={(e) => setPrice(Number(e.target.value))}
          ></Input>
        </div>
        <div>
          <label htmlFor="fstock">Stock</label>
          <Input
            type="number"
            value={stock}
            step="0.01"
            min={0}
            id="fstock"
            onChange={(e) => setStock(Number(e.target.value))}
          ></Input>
        </div>
        <div>
          <Button type="submit" className="font-bold">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
