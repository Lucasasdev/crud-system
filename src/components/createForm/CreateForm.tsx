import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createProduct } from "@/services/productServices";

const CreateForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

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

  const handleAddProductClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="w-full min-w-[250px] flex flex-col items-center">
      {isVisible && (
        <form
          onSubmit={handleCreateClick}
          className="bg-secondary flex flex-col m-5 p-5 gap-2 rounded-lg max-w-[800px] w-full"
        >
          <div>
            <label htmlFor="fname">Name</label>
            <Input
              id="fname"
              value={name}
              placeholder="Nome no produto"
              onChange={(e) => setName(e.target.value)}
            ></Input>
          </div>
          <div>
            <label htmlFor="fdescription">Description</label>
            <Input
              id="fdescription"
              value={description}
              placeholder="Descrição breve do produto"
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
              placeholder="Preço total do produto"
              id="fprice"
              onChange={(e) => setPrice(Number(e.target.value))}
            ></Input>
          </div>
          <div>
            <label htmlFor="fstock">Stock</label>
            <Input
              type="number"
              value={stock}
              min={0}
              placeholder="Quantidade em estoque"
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
      )}
      <div className="max-w-[800px] w-full">
        <Button
          type="button"
          className="font-bold m-5"
          onClick={handleAddProductClick}
        >
          Add product
        </Button>
      </div>
    </div>
  );
};

export default CreateForm;
