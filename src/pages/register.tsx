import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterUser: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    const data = {
      name,
      taxNumber,
      mail,
      phone,
      password,
    };

    try {
      const response = await api.post("/api/auth/register", data);

      console.log(response.data);
      console.log(response.status);
    } catch (error) {
      console.log("There's an error:", error);
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <form
        onSubmit={handleRegisterUser}
        className="max-w-[25rem] bg-secondary flex flex-col gap-4 p-4 rounded-sm w-full justify-center"
      >
        <span className="font-semibold text-2xl m-5 text-center">
          Registrar
        </span>
        <div>
          <Input
            value={name}
            type="text"
            required
            placeholder="Nome do usuário"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Input
            value={taxNumber}
            type="text"
            required
            placeholder="CPF ou CNPJ"
            onChange={(e) => setTaxNumber(e.target.value)}
          />
        </div>
        <div>
          <Input
            value={mail}
            type="email"
            required
            placeholder="E-mail"
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div>
          <Input
            value={phone}
            type="text"
            required
            placeholder="Telefone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <Input
            value={password}
            type="password"
            required
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit" className="w-full">
            Registrar
          </Button>
        </div>
        <div className="flex gap-2 my-5">
          <span>Já possui uma conta?</span>
          <Link to={"/"} className="text-cyan-500">
            Entrar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
