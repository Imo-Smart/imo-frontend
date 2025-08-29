import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import api from "../service/api.jsx";
import imgSmart from "../assets/logo.png";
import imgHouse2 from "../assets/imgHouse2.jpg";

// 📌 Validação com Yup
const schema = yup.object().shape({
  email: yup.string().email("Digite um email válido").required("O email é obrigatório"),
});

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // 📌 Envio para backend
  const onSubmit = async (data) => {
    try {
      // Aqui você conecta com sua rota de recuperação de senha (exemplo)
      const res = await api.post("/api/users/forgot-password", data);

      toast.success("Se o email estiver cadastrado, enviaremos instruções de recuperação.");
      reset();
    } catch (error) {
      toast.error("Erro ao enviar solicitação. Tente novamente.");
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      {/* Imagem de fundo */}
      <img className="absolute w-full h-full object-cover" src={imgHouse2} alt="Casa" />

      {/* Sobreposição escura */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Formulário */}
      <div className="relative z-10 bg-gray-900 bg-opacity-80 p-8 w-full max-w-md mx-auto rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <img className="mx-auto mb-4 w-40" src={imgSmart} alt="LogoSmart" />
          <h2 className="text-2xl font-bold text-white">Recuperar Senha</h2>
          <p className="text-gray-300 text-sm mt-1">
            Informe seu email para receber o link de redefinição.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Seu email"
              {...register("email")}
              className={`w-full px-3 py-2 rounded-lg border placeholder-gray-400 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "Recuperar"}
          </button>
        </form>
      </div>
    </section>
  );
}
