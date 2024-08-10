import { api } from "@/services/api";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface LoginType {
  taxNumber: string;
  password: string;
}

interface AuthContextType {
  user: string | null;
  signed: boolean;
  signIn: ({ taxNumber, password }: LoginType) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const loadingStoreData = () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(storageUser);
      }
    };

    loadingStoreData();
  }, []);

  const signIn = async ({ taxNumber, password }: LoginType) => {
    try {
      const response = await api.post("/api/auth/login", {
        taxNumber,
        password,
      });

      console.log(response.status);
      console.log(response);
      alert(response);

      setUser(JSON.stringify(response.data));

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      localStorage.setItem(
        "@Auth:token",
        JSON.stringify(response.data.data.token)
      );
      localStorage.setItem("@Auth:user", JSON.stringify(response.data));
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
