import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import api from "../service/api";
import imgSmart from "../assets/logo.png";
import imgHouse2 from "../assets/imgHouse2.jpg";

// Validação com Yup
const schema = yup.object().shape({
  password: yup.string().min(6, "Senha deve ter no mínimo 6 caracteres").required("Senha é obrigatória"),
});

export default function ResetPassword() {
  const { token } = useParams(); // captura o token da URL
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await api.put(`/api/users/reset-password/${token}`, data);
      toast.success("Senha redefinida com sucesso!");
      reset();
      navigate("/sign-in"); // redireciona para login
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao redefinir a senha");
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      <img className="absolute w-full h-full object-cover" src={imgHouse2} alt="Casa" />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 bg-gray-900 bg-opacity-80 p-8 w-full max-w-md mx-auto rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <img className="mx-auto mb-4 w-40" src={imgSmart} alt="LogoSmart" />
          <h2 className="text-2xl font-bold text-white">Nova Senha</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua nova senha"
              {...register("password")}
              className="w-full px-3 py-2 rounded-lg border placeholder-gray-400 bg-gray-700 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible color="#ddd" /> : <AiFillEye color="#ddd" />}
            </span>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Alterar Senha
          </button>
        </form>
      </div>
    </section>
  );
}
