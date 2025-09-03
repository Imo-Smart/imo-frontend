// src/pages/AdminPropertyManagement.jsx
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import api from "../service/api";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

export default function AdminPropertyManagement() {
  const { user } = useContext(UserContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const { data } = await api.get("/api/properties", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProperties(data);
    } catch (err) {
      console.error("Erro ao buscar imóveis:", err);
      toast.error("Erro ao buscar imóveis");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja apagar este imóvel?")) return;
    try {
      await api.delete(`/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Imóvel apagado com sucesso!");
      setProperties(properties.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Erro ao apagar imóvel:", err);
      toast.error("Erro ao apagar imóvel");
    }
  };

  if (!user?.isAdmin) {
    return <p className="text-center py-10 text-red-500">Acesso negado</p>;
  }

  if (loading) {
    return <p className="text-center py-10">Carregando imóveis...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 mt-24">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Imóveis</h1>

      {properties.length === 0 && (
        <p className="text-gray-500">Nenhum imóvel cadastrado.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white shadow-md rounded-lg overflow-hidden relative"
          >
            <img
              src={property.images?.[0] || "https://via.placeholder.com/400x300?text=Sem+imagem"}
              alt={property.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-bold mb-1">{property.name}</h2>
              <p className="text-gray-500 mb-2">{property.address}</p>
              <p className="text-green-600 font-semibold">
                {property.type === "sale"
                  ? `R$ ${property.price.toLocaleString()}`
                  : `R$ ${property.rentalDetails?.monthlyRent?.toLocaleString()} / mês`}
              </p>
            </div>

            <div className="absolute top-2 right-2 flex gap-2">
              <Link
                to={`/admin/edit-property/${property._id}`}
                className="text-blue-500 hover:text-blue-700"
                title="Editar"
              >
                <AiFillEdit size={24} />
              </Link>
              <button
                onClick={() => handleDelete(property._id)}
                className="text-red-500 hover:text-red-700"
                title="Apagar"
              >
                <AiFillDelete size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
