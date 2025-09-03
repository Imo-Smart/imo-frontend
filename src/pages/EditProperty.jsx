// src/pages/EditProperty.jsx
import React, { useState, useEffect } from "react";

import api from "../service/api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    bedrooms: "",
    bathrooms: "",
    category: "casa",
    description: "",
    price: "",
    countInStock: "",
    parking: "",
    furnished: "",
    address: "",
    offer: "",
    regularPrice: "",
    discountedPrice: "",
    type: "sale",
    rentalDuration: "short-term",
    deposit: "",
    monthlyRent: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Buscar dados do imóvel
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await api.get(`/api/properties/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setFormData({
          name: data.name,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          category: data.category,
          description: data.description,
          price: data.price,
          countInStock: data.countInStock,
          parking: data.parking,
          furnished: data.furnished,
          address: data.address,
          offer: data.offer || "",
          regularPrice: data.regularPrice || "",
          discountedPrice: data.discountedPrice || "",
          type: data.type,
          rentalDuration: data.rentalDetails?.duration || "short-term",
          deposit: data.rentalDetails?.deposit || "",
          monthlyRent: data.rentalDetails?.monthlyRent || "",
        });
        setImages(data.images || []);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao buscar dados do imóvel");
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "rentalDuration" && key !== "deposit" && key !== "monthlyRent") {
          data.append(key, value);
        }
      });
      // Adiciona detalhes de aluguel se aplicável
      if (formData.type === "rental") {
        data.append("rentalDetails[duration]", formData.rentalDuration);
        data.append("rentalDetails[deposit]", formData.deposit);
        data.append("rentalDetails[monthlyRent]", formData.monthlyRent);
      }
      images.forEach((img) => data.append("images", img));

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await api.put(`/api/properties/${id}`, data, config);

      toast.success("Imóvel atualizado com sucesso!");
      navigate("/admin/properties");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || error.message || "Erro ao atualizar imóvel"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-blue-950 mb-6">Editar Imóvel</h1>
      <form
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nome do imóvel"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="number"
            name="bedrooms"
            placeholder="Quartos"
            value={formData.bedrooms}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="number"
            name="bathrooms"
            placeholder="Banheiros"
            value={formData.bathrooms}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="number"
            name="countInStock"
            placeholder="Quantidade em estoque"
            value={formData.countInStock}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Descrição do imóvel"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Preço"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="number"
            name="regularPrice"
            placeholder="Preço regular"
            value={formData.regularPrice}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="discountedPrice"
            placeholder="Preço com desconto"
            value={formData.discountedPrice}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="parking"
            placeholder="Vagas de estacionamento"
            value={formData.parking}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="furnished"
            placeholder="Mobiliado"
            value={formData.furnished}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Endereço"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="terreno">Terreno</option>
            <option value="chacara">Chácara</option>
            <option value="sitio">Sítio</option>
          </select>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="sale">Venda</option>
            <option value="rental">Aluguel</option>
          </select>
        </div>

        {formData.type === "rental" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="rentalDuration"
              value={formData.rentalDuration}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="short-term">Curto prazo</option>
              <option value="long-term">Longo prazo</option>
            </select>
            <input
              type="number"
              name="deposit"
              placeholder="Depósito"
              value={formData.deposit}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              name="monthlyRent"
              placeholder="Aluguel mensal"
              value={formData.monthlyRent}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
        )}

        <div>
          <label className="block mb-2 font-medium">Imagens do imóvel (até 10)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-950 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition w-full"
        >
          {loading ? "Atualizando..." : "Atualizar Imóvel"}
        </button>
      </form>
    </div>
  );
}
