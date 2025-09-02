import { useState, useEffect } from "react";
import Carousel from "../components/Carousel";

import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import Advantages from "../components/Advantages";
import api from "../service/api";

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState([]);

  const fetchProperties = async ({ category, query }) => {
    try {
      let url = "/api/properties";
      if (category) url += `/category/${category}`;
      const res = await api.get(url);
      let data = res.data;

      // Filtrar por query se existir
      if (query) {
        data = data.filter((prop) =>
          prop.name.toLowerCase().includes(query.toLowerCase())
        );
      }

      setFeaturedProperties(data);
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
    }
  };

  // Carregar todos inicialmente
  useEffect(() => {
    fetchProperties({});
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">

       {/* Carrossel */}
        <Carousel />

      {/* Imóveis em Destaque */}
        <Hero onSearch={fetchProperties} />

      {/* Diferenciais */}
      <FeaturedProperties properties={featuredProperties} />

      <Advantages />

      {/* Depoimentos */}
      <section id="depoimentos" className="max-w-4xl mx-auto py-12">
        <h3 className="text-3xl font-bold text-center mb-8">O que dizem nossos clientes</h3>
        <div className="space-y-6">
          <blockquote className="bg-gray-100 p-6 rounded shadow">
            “Site veloz, prático e fácil de usar.” <cite className="block mt-2 font-semibold">— Marcelo Rocha</cite>
          </blockquote>
          <blockquote className="bg-gray-100 p-6 rounded shadow">
            “Sempre inovando e extremamente solícitos.” <cite className="block mt-2 font-semibold">— Heloiza Scherer</cite>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
