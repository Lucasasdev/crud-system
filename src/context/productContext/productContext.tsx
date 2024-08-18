import { ProductType } from "@/services/productServices";
import { createContext } from "react";

interface ProductContextType {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  listProducts: () => Promise<void>;
}

export const productContext = createContext<ProductContextType | null>(null);
