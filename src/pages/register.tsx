import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [redirect, setRedirect] = useState(false);

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

      console.log(response?.status);

      alert("Usuário registrado com sucesso!");

      setRedirect(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert("Ocorreu um error ao registrar novo usuário.");
        console.error(error.response?.data.message);
      }
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="h-[100vh] w-full flex justify-center items-center p-5 mt-5 overflow-auto">
      <form
        onSubmit={handleRegisterUser}
        className="max-w-[25rem] bg-secondary flex flex-col gap-4 p-5 rounded-lg w-full justify-center"
      >
        <span className="font-semibold text-2xl m-5 text-center">
          Registrar
        </span>
        <div>
          <label htmlFor="fname">Name</label>
          <Input
            value={name}
            type="text"
            id="fname"
            required
            placeholder="Nome do usuário"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <label htmlFor="femail">Email</label>
          <Input
            value={mail}
            type="email"
            id="femail"
            required
            placeholder="E-mail"
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fphone">Phone</label>
          <Input
            value={phone}
            type="text"
            id="fphone"
            required
            placeholder="Telefone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fpassword">Password</label>
          <Input
            value={password}
            type="password"
            id="fpassword"
            required
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit" className="w-full font-bold">
            Registrar
          </Button>
        </div>
        <div className="flex gap-2 my-5 text-sm">
          <span>Já possui uma conta?</span>
          <Link to={"/"} className="text-cyan-600 underline">
            Entrar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
