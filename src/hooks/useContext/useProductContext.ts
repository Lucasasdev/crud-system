import { productContext } from "@/context/productContext/productContext";
import { useContext } from "react";

export default function useProductContext() {
  const context = useContext(productContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
