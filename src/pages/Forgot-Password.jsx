import { useState } from "react";

import imgSmart from "../assets/logo.png";
import imgHouse2 from "../assets/imgHouse2.jpg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Apenas demonstração: você pode adicionar validação ou redirecionamento
    alert(`Email: ${email}\nSenha: ${password}`);
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
          <h2 className="text-2xl font-bold text-white">Recuperar senha</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border placeholder-gray-400 bg-gray-700 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Recuperar
          </button>
        </form>
      </div>
    </section>
  );
}
