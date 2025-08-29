import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../service/api.jsx";

export default function ResetPassword() {
  const { token } = useParams(); // pega o token da URL
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Substitua ":token" pelo valor real do token
      const res = await api.put(`/api/users/reset-password/${token}`, { password });

      toast.success("Senha redefinida com sucesso!");
      navigate("/sign-in");
    } catch (err) {
      toast.error(err.response?.data?.message || "Erro ao redefinir a senha.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nova senha"
      />
      <button type="submit">Alterar senha</button>
    </form>
  );
}
