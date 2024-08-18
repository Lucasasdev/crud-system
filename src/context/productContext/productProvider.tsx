import { useState } from "react";
import { productContext } from "./productContext";
import { getProducts, ProductType } from "@/services/productServices";

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const listProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  };

  return (
    <productContext.Provider value={{ products, setProducts, listProducts }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductProvider;
