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
    <div className="h-screen w-screen relative pt-16">
      {/* Background com overlay escuro + gradiente */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={imgHouse2}
        alt="Casa"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-blur-sm"></div>

      {/* Card central */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-gray-900/80 backdrop-blur-md p-8 w-full max-w-md rounded-2xl shadow-2xl border border-gray-700 animate-fadeIn">
          <div className="text-center mb-6">
            <img className="mx-auto mb-4 w-32" src={imgSmart} alt="LogoSmart" />
            <h2 className="text-3xl font-bold text-white">Bem-vindo</h2>
            <p className="text-gray-400 text-sm">Faça login para continuar</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Campo Email */}
            <div>
              <input
                type="email"
                placeholder="Seu email"
                {...register("email")}
                className="w-full px-4 py-3 rounded-lg border border-gray-600 placeholder-gray-400 bg-gray-800 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Campo Senha */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                {...register("password")}
                className="w-full px-4 py-3 rounded-lg border border-gray-600 placeholder-gray-400 bg-gray-800 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible color="#ddd" size={20} />
                ) : (
                  <AiFillEye color="#ddd" size={20} />
                )}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-[1.02] shadow-md"
            >
              Entrar
            </button>
          </form>

          {/* Links extras */}
          <div className="text-center text-sm text-gray-300 mt-6 space-y-2">
            <p>
              Não tem uma conta?{" "}
              <Link to="/sign-up" className="text-blue-400 hover:underline">
                Cadastrar
              </Link>
            </p>
            <Link to="/forgot-password" className="text-blue-400 hover:underline">
              Esqueci minha senha
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
