// src/pages/EditProfile.jsx
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import api from "../service/api";
import { toast } from "react-toastify";

export default function EditProfile() {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
      });
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Usuário não autenticado");

    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });
      if (avatar) data.append("avatar", avatar);

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const res = await api.put("/api/users/edit-profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setUser(res.data.user);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      toast.success("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-24 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-blue-950">Editar Perfil</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          <label className="mb-2 font-medium">Avatar</label>
          <div className="relative w-32 h-32">
            <img
              src={avatarPreview || "/default-avatar.png"}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Clique na imagem para alterar o avatar
          </p>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          cursor="not-allowed"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          cursor="not-allowed"
        />
        <input
          type="password"
          name="password"
          placeholder="Nova senha (opcional)"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-950 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          {loading ? "Atualizando..." : "Atualizar Perfil"}
        </button>
      </form>
    </div>
  );
}
