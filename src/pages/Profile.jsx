import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import api from "../service/api";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user) setFormData({ name: user.name, email: user.email, password: "" });
  }, [user]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setAvatar(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });
      if (avatar) data.append("avatar", avatar);

      const res = await api.put("/api/users/edit-profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(res.data.user);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      toast.success("Perfil atualizado com sucesso!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Erro ao atualizar perfil");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Meu Perfil</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nome" className="w-full p-2 border rounded" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Nova senha" className="w-full p-2 border rounded" />
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded w-full">Atualizar Perfil</button>
      </form>
    </div>
  );
}
