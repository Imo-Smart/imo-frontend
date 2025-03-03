import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { FaEnvelope, FaPhone } from "react-icons/fa";

import { Link } from 'react-router-dom'

import imgLogo from '../assets/logo.png'

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <img src={imgLogo} alt="Logo Imosmart" className="w-9 h-9" />
                  Imosmart
                </h4>
                <p>Imosmart é uma plataforma para busca de imóveis, sempre à sua disposição.</p>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-4">Links rápidos</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
                  <li><Link to="/about" className="hover:text-gray-300">Sobre</Link></li>
                  <li><Link to="/offers" className="hover:text-gray-300">Ofertas</Link></li>
                </ul>
              </div>
                  <div>
                      <h4 className="text-lg font-bold mb-4">Contato</h4>
                      <ul className="space-y-2">
                        <li>
                          <a href="mailto:suporte@imosmart.com.br" className="flex items-center gap-2 hover:text-gray-300">
                            <FaEnvelope className="text-lg" /> suporte@imosmart.com.br
                          </a>
                        </li>
                        <li>
                          <a href="tel:+551112345678" className="flex items-center gap-2 hover:text-gray-300">
                            <FaPhone className="text-lg" /> +55 11 1234-5678
                          </a>
                        </li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-lg font-bold mb-4">Rede Social</h4>
                      <div className="flex space-x-4">
                          <a href="#" className="hover:text-blue-400"><AiFillFacebook size={20} /></a>
                          <a href="#" className="hover:text-blue-400"><AiFillInstagram size={20} /></a>
                          <a href="#" className="hover:text-pink-500"><AiFillTwitterCircle size={20} /></a>
                      </div>
                  </div>
              </div>
              <div className="text-center mt-8">
                <p>© 2025 Imosmart. Todos os direitos reservados.</p>
                <hr className="w-1/2 mx-auto my-2 border-gray-500" />
                <p>Desenvolvido por 2System</p>
              </div>

          </div>
      </footer>
    </>
  )
}
