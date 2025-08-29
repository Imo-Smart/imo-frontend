import { Link } from "react-router-dom"
import { useState } from "react"
import { FaUserShield } from "react-icons/fa"

const AdminNav = ({ userInfo }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  if (!userInfo || !userInfo.isAdmin) return null

  return (
    <div className="relative">
      {/* Botão do Menu Admin */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        <FaUserShield size={18} />
        <span>Admin</span>
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg overflow-hidden z-50 border border-gray-200">
          {[
            { name: "Dashboard", path: "/admin/dashboard" },
            { name: "Produtos", path: "/admin/products" },
            { name: "Pedidos", path: "/admin/orders" },
            { name: "Usuários", path: "/admin/users" },
            { name: "Suporte", path: "/admin/chat" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminNav
