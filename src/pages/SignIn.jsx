import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../services/api";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("Senha é obrigatória"),
});

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/api/users/login", data);

      // pega o nome do usuário retornado pelo backend
      const userName = res.data?.name || "Usuário";

      toast.success(`👋 Bem-vindo, ${userName}! Login realizado com sucesso!`);

      // se quiser salvar o token e dados
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      // redirecionar para dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err.response?.data?.message || "Erro ao realizar login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Entrar</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Senha</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default SignIn;
