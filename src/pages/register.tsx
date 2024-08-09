import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <form className="max-w-[25rem] bg-secondary flex flex-col gap-4 p-4 rounded-sm w-full justify-center">
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
            value={cpf}
            type="text"
            required
            placeholder="CPF ou CNPJ"
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <div>
          <Input
            value={email}
            type="text"
            required
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
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
