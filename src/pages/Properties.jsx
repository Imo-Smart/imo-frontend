// src/pages/Properties.jsx
import React, { useEffect, useState } from "react";
import api from "../service/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaBed, FaBath, FaCar, FaCouch } from "react-icons/fa";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/api/properties");
        setProperties(data);
      } catch (err) {
        console.error(err);
        toast.error("Erro ao buscar imóveis");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((p) => {
    return (
      (filterType === "all" || p.type === filterType) &&
      (filterCategory === "all" || p.category === filterCategory)
    );
  });

  if (loading) return <p className="mt-24 text-center text-blue-950">Carregando imóveis...</p>;

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-blue-950 mb-6">Imóveis</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Todos os tipos</option>
          <option value="sale">Venda</option>
          <option value="rental">Aluguel</option>
        </select>

        <select
          className="border p-2 rounded"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">Todas as categorias</option>
          <option value="casa">Casa</option>
          <option value="apartamento">Apartamento</option>
          <option value="terreno">Terreno</option>
          <option value="chacara">Chácara</option>
          <option value="sitio">Sítio</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Link
            to={`/property/${property._id}`}
            key={property._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
          >

            <img
              src={
                property.images?.length > 0
                  ? property.images[0].url || property.images[0] // pega url ou a string diretamente
                  : "/default-property.jpg"
              }
              alt={property.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-blue-950">{property.name}</h2>
              <p className="text-gray-600 mb-2">{property.address}</p>
              <p className="text-gray-800 font-semibold mb-2">
                {property.type === "sale" ? "Venda: " : "Aluguel: "}
                {property.type === "sale"
                  ? property.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                  : property.monthlyRent?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
              <div className="flex flex-wrap gap-4 text-gray-600 mb-2">
                <span className="flex items-center gap-1"><FaBed /> {property.bedrooms}</span>
                <span className="flex items-center gap-1"><FaBath /> {property.bathrooms}</span>
                <span className="flex items-center gap-1"><FaCar /> {property.parking}</span>
                {property.furnished && <span className="flex items-center gap-1"><FaCouch /> {property.furnished}</span>}
              </div>
              <p className="text-gray-600 mb-1">Categoria: {property.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
