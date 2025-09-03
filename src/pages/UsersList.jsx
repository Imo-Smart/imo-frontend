import { useEffect, useState, useContext } from "react";
import api from "../service/api";
import { UserContext } from "../context/UserContext";

const UsersList = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!user?.token) {
          console.log("⚠️ Nenhum token encontrado");
          setLoading(false);
          return;
        }

        const { data } = await api.get("/api/users/user", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  if (loading) return <p className="mt-20 text-center">Carregando usuários...</p>;

  return (
    <div className="pt-24 px-6"> {/* adiciona espaço para o header */}
      <h1 className="text-2xl font-bold mb-6">Usuários Cadastrados</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {users.length === 0 ? (
          <p>Nenhum usuário encontrado.</p>
        ) : (
          users.map((u) => (
            <div
              key={u._id}
              className="bg-white shadow-lg rounded-xl p-5 flex items-center gap-4 hover:shadow-xl transition-shadow"
            >
              {u.avatar ? (
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-600"
                />
              ) : (
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white text-lg font-bold">
                  {u.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <h3 className="font-semibold text-lg">{u.name}</h3>
                <p className="text-sm text-gray-600">{u.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Cadastro: {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersList;
