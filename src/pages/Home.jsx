import { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import Advantages from "../components/Advantages";
import PropertiesPage from "../components/PropertiesPage";
import api from "../service/api";

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [filters, setFilters] = useState({});

  const handleSearch = (searchParams) => {
    setFilters(searchParams); // atualiza filtros vindos do Hero
  };

  const fetchProperties = async ({ category, query }) => {
    try {
      let url = "/api/properties";
      if (category) url += `/category/${category}`;
      const res = await api.get(url);
      let data = res.data;

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

  useEffect(() => {
    fetchProperties({});
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">

      {/* Carrossel */}
      <section className="w-full overflow-hidden">
        <Carousel />
      </section>

      <section className="w-full px-4 md:px-16 -mt-20 md:-mt-32 relative z-10">
        <Hero onSearch={handleSearch} />
      </section>

      {/* Listagem de imóveis */}
      <section className="w-full px-4 md:px-16 py-12 max-w-[1200px] mx-auto">
        <PropertiesPage filters={filters} />
      </section>

      {/* Imóveis em Destaque */}
      <section className="w-full px-4 md:px-16 py-12 max-w-[1200px] mx-auto">
        <FeaturedProperties properties={featuredProperties} />
      </section>

      {/* Diferenciais */}
      <section className="w-full px-4 md:px-16 py-12 bg-white">
        <Advantages />
      </section>

      {/* Depoimentos */}
      <section
        id="depoimentos"
        className="max-w-4xl mx-auto py-12 px-4 md:px-0 space-y-6"
      >
        <h3 className="text-3xl font-bold text-center mb-8">
          O que dizem nossos clientes
        </h3>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          <blockquote className="flex-1 bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            “Site veloz, prático e fácil de usar.”
            <cite className="block mt-2 font-semibold">— Marcelo Rocha</cite>
          </blockquote>
          <blockquote className="flex-1 bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            “Sempre inovando e extremamente solícitos.”
            <cite className="block mt-2 font-semibold">— Heloiza Scherer</cite>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
