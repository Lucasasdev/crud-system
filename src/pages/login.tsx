import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuthContext from "@/hooks/useAuthContext";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const [taxNumber, setTaxNumber] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signed } = useAuthContext();

  const handleClickSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    const data = {
      taxNumber,
      password,
    };

    await signIn(data);
  };

  if (signed) {
    return <Navigate to={"/home"} />;
  } else {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center px-5">
        <form
          onSubmit={handleClickSubmit}
          className="max-w-[25rem] bg-secondary flex flex-col gap-4 p-5 rounded-lg w-full"
        >
          <span className="font-semibold text-2xl text-center m-5">Entrar</span>
          <div>
            <label htmlFor="ftaxnumber">TaxNumber</label>
            <Input
              value={taxNumber}
              type="text"
              id="ftaxnumber"
              required
              placeholder="CPF ou CNPJ"
              onChange={(e) => setTaxNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fpassword">Password</label>
            <Input
              value={password}
              type="password"
              id="fpassword"
              required
              placeholder="Senha do usuário"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button className="w-full font-bold" type="submit">
              Entrar
            </Button>
          </div>

          <div className="flex gap-2 my-5 text-sm">
            <span>Não tem uma conta?</span>
            <Link to={"/register"} className="text-cyan-600 underline">
              Registrar
            </Link>
          </div>
        </form>
      </div>
    );
  }
};

export default Login;
