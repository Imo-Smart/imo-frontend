import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import api from "../service/api.jsx";
import imgSmart from "../assets/logo.png";
import imgHouse2 from "../assets/imgHouse2.jpg";

// ✅ Validação com Yup
const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A nova senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não coincidem")
    .required("Confirme sua senha"),
});

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Submissão com integração ao backend
  const onSubmit = async (data) => {
    try {
      // Exemplo de chamada API (ajuste para sua rota backend)
      const res = await api.post("/api/users/reset-password/:token", data);

      console.log("Nova senha enviada:", data.password);

      toast.success("Senha redefinida com sucesso!");
      reset();
    } catch (error) {
      toast.error("Erro ao redefinir a senha. Tente novamente.");
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      {/* Imagem de fundo */}
      <img
        className="absolute w-full h-full object-cover"
        src={imgHouse2}
        alt="Casa"
      />

      {/* Sobreposição escura */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Formulário */}
      <div className="relative z-10 bg-gray-900 bg-opacity-80 p-8 w-full max-w-md mx-auto rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <img className="mx-auto mb-4 w-40" src={imgSmart} alt="LogoSmart" />
          <h2 className="text-2xl font-bold text-white">Nova Senha</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo Nova Senha */}
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
              {showPassword ? (
                <AiFillEyeInvisible color="#ddd" />
              ) : (
                <AiFillEye color="#ddd" />
              )}
            </span>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Campo Confirmar Senha */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirme sua senha"
              {...register("confirmPassword")}
              className="w-full px-3 py-2 rounded-lg border placeholder-gray-400 bg-gray-700 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isSubmitting ? "Alterando..." : "Alterar Senha"}
          </button>
        </form>
      </div>
    </section>
  );
}
