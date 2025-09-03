import { useState } from "react";
import { Home, Building2, Mountain, TreePine, Map } from "lucide-react";

export default function Hero({ onSearch }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ category: selectedCategory, query });
  };

  const handleCategory = (cat) => {
    setSelectedCategory(cat);
    onSearch({ category: cat, query });
  };

  const categories = [
    { key: "casa", label: "Casa", icon: <Home className="w-5 h-5" /> },
    { key: "apartamento", label: "Apartamento", icon: <Building2 className="w-5 h-5" /> },
    { key: "terreno", label: "Terreno", icon: <Map className="w-5 h-5" /> },
    { key: "chacara", label: "Chácara", icon: <TreePine className="w-5 h-5" /> },
    { key: "sitio", label: "Sítio", icon: <Mountain className="w-5 h-5" /> },
  ];

  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gray-50">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Encontre o imóvel dos seus sonhos com a{" "}
        <span className="text-blue-600">Imosmart</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mb-6">
        Casas, apartamentos, terrenos e muito mais. A Imosmart conecta você às melhores oportunidades.
      </p>

      {/* Formulário de busca */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden mb-4"
      >
        <input
          type="text"
          placeholder="Digite cidade ou bairro ."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 outline-none"
        />
        <button className="bg-blue-600 text-white px-6 hover:bg-blue-700 transition">
          Buscar
        </button>
      </form>

      {/* Seleção de categoria com ícones */}
      <div className="flex gap-4 mt-4 flex-wrap justify-center">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => handleCategory(cat.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
              selectedCategory === cat.key
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
