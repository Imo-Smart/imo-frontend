// src/components/Advantages.jsx
import { Home, Zap, Link, MessageCircle } from "lucide-react"

const advantages = [
  {
    icon: <Home className="w-6 h-6 text-blue-600" />,
    title: "Site otimizado para SEO",
    desc: "Seus imóveis aparecem no topo das buscas do Google.",
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    title: "Responsivo e veloz",
    desc: "Navegação fluida em qualquer dispositivo.",
  },
  {
    icon: <Link className="w-6 h-6 text-blue-600" />,
    title: "Integração com CRM",
    desc: "Conecte seus imóveis diretamente ao seu sistema de gestão.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
    title: "Suporte via WhatsApp",
    desc: "Atendimento rápido e prático para sua equipe.",
  },
]

const Advantages = () => {
  return (
    <section id="diferenciais" className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h3 className="text-3xl font-bold mb-4 text-gray-900">
          Nossos diferenciais
        </h3>
        <p className="text-gray-600 mb-12">
          A Imosmart traz soluções modernas para destacar sua imobiliária no
          mercado.
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
