// src/components/Advantages.jsx
import { Home, Zap, Link, MessageCircle } from "lucide-react"

const advantages = [
  {
    icon: <Home className="w-6 h-6 text-blue-600" />,
    title: "Imóveis em destaque",
    desc: "Apresentamos imóveis com  qualidade e informações completas.",
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    title: "Navegação rápida e intuitiva",
    desc: "Nosso site é leve, responsivo e oferece uma experiência impecável tanto no celular quanto no computador.",
  },
  {
    icon: <Link className="w-6 h-6 text-blue-600" />,
    title: "Variedade de opções",
    desc: "O que você, procura pode estar aqui, seja na cidade ou na zona rural.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
    title: "Atendimento humanizado",
    desc: "Canal direto via WhatsApp para agilizar o contato com clientes e oferecer um suporte diferenciado.",
  },
]

const Advantages = () => {
  return (
    <section id="diferenciais" className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h3 className="text-3xl font-bold mb-4 text-gray-900">
          Por que escolher a Imosmart?
        </h3>
        <p className="text-gray-600 mb-12">
          Não somos apenas uma plataforma: somos o parceiro digital que sua
          imobiliária precisa para vender mais e encantar seus clientes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                {item.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h4>
              <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Advantages
