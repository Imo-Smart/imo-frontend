import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        // Redireciona se não estiver logado
        if (!userInfo) {
          navigate("/sign-in");
          return;
        }

        // Redireciona se não for admin
        if (!userInfo.isAdmin) {
          navigate("/properties");
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        // 🔹 Use a rota correta para buscar todos os usuários (não /user)
        const resUsers = await api.get("/api/users/user", config); // <-- todos os usuários
        const resProperties = await api.get("/api/properties", config);

        setUsers(resUsers.data);
        setProperties(resProperties.data);
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard:", err);
        // Se der 403, força logout/redireciona
        if (err.response?.status === 403) {
          localStorage.removeItem("userInfo");
          navigate("/sign-in");
        }
      }
    };

    fetchData();
  }, [navigate]);

  // 📊 Usuários cadastrados
  const totalUsers = users.length;

  // 📊 Venda vs Aluguel
  const propertyStatusData = [
    { name: "Venda", value: properties.filter(p => p.rentalDetails?.duration === "long-term" || p.type === "sale").length },
    { name: "Aluguel", value: properties.filter(p => p.rentalDetails?.duration === "short-term" || p.type === "rent").length },
  ];

  // 📊 Categorias
  const categories = ["Casa", "Apartamento", "Terreno", "Chácara/Sítio"];
  const categoryData = categories.map(cat => ({
    name: cat,
    value: properties.filter(p => p.category?.toLowerCase() === cat.toLowerCase()).length
  }));

  const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="p-6 mt-16">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

      {/* Total de usuários */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold">Usuários cadastrados</h2>
        <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Venda x Aluguel */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Imóveis: Venda x Aluguel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={propertyStatusData}
                cx="50%" cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {propertyStatusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Categorias */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Imóveis por Categoria</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
