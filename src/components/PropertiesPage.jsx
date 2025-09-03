import { useEffect, useState } from "react";
import api from "../service/api"; // sua instância do axios
import PropertyCard from "./PropertyCard";

export default function PropertiesPage({ filters }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/api/properties", {
          params: filters, // envia query e categoria
        });
        setProperties(data);
      } catch (err) {
        console.error("Erro ao buscar imóveis", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  return (
    <section className="py-12 max-w-7xl mx-auto px-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Imóveis disponíveis
      </h3>

      {loading ? (
        <p className="text-gray-600">Carregando imóveis...</p>
      ) : properties.length === 0 ? (
        <p className="text-gray-600">Nenhum imóvel encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
}
