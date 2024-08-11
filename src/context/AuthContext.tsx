import { createContext, useEffect, useState } from "react";
import { api } from "@/services/api";
import { Navigate } from "react-router-dom";

interface LoginType {
  taxNumber: string;
  password: string;
}

interface AuthContextType {
  user: string | null;
  signed: boolean;
  signIn: ({ taxNumber, password }: LoginType) => Promise<void>;
  signOut: () => void;
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

        api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
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

      setUser(JSON.stringify(response.data));

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      localStorage.setItem("@Auth:token", response.data.data.token);
      localStorage.setItem("@Auth:user", JSON.stringify(response.data));
    } catch (error) {
      alert("Houve um error ao fazer o login!");
      console.error(error);
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to={"/"} />;
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
