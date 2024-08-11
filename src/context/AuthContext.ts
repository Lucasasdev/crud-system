import { createContext } from "react";
import { LoginType } from "./AuthProvider";

interface AuthContextType {
  user: string | null;
  signed: boolean;
  signIn: ({ taxNumber, password }: LoginType) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
