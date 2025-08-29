import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import api from "../service/api";
import imgSmart from "../assets/logo.png";
import imgHouse2 from "../assets/imgHouse2.jpg";

// Validação com Yup
const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  password: yup.string().min(6, "Senha mínima 6 caracteres").required("Senha obrigatória"),
});

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

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
      toast.success(`👋 Bem-vindo, ${res.data.name}!`);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      navigate(redirect);
    } catch (err) {
      const message = err.response?.data?.message || "Erro ao realizar login";
      toast.error(message);
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      <img className="absolute w-full h-full object-cover" src={imgHouse2} alt="Casa" />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 bg-gray-900 bg-opacity-80 p-8 w-full max-w-md mx-auto rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <img className="mx-auto mb-4 w-40" src={imgSmart} alt="LogoSmart" />
          <h2 className="text-2xl font-bold text-white">Entrar</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Seu email"
              {...register("email")}
              className="w-full px-3 py-2 rounded-lg border placeholder-gray-400 bg-gray-700 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              {...register("password")}
              className="w-full px-3 py-2 rounded-lg border placeholder-gray-400 bg-gray-700 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible color="#ddd" /> : <AiFillEye color="#ddd" />}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Entrar
          </button>
        </form>

        <div className="text-center text-sm text-gray-300 mt-4">
          Não tem uma conta?{" "}
          <Link to="/sign-up" className="text-blue-400 hover:underline">
            Cadastrar
          </Link>
          <div className="text-center text-sm text-gray-300 mt-4">
          <Link to="/forgot-password" className="text-blue-400 hover:underline">
            Esqueci minha senha?
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
}
