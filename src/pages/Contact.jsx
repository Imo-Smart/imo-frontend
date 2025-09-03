import { FiClock } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Helmet } from 'react-helmet-async';

import { Map } from "../components/Map";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>ImoSmart | Contato</title>
      </Helmet>

      <div className="pt-28 px-6 md:px-16 pb-12 bg-gray-900 min-h-screen flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Mapa */}
        <div className="flex-1 w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-lg">
          <Map />
        </div>

        {/* Informações de Contato */}
        <div className="flex-1 max-w-lg text-center md:text-left space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100">Nosso Contato</h1>

          {/* Agenda */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-100">
              Agenda <FiClock size={20} />
            </h3>
            <div className="mt-2 text-gray-300 space-y-1">
              <div className="flex justify-between">
                <span>Segunda a Sexta</span>
                <span>10hrs - 17hrs</span>
              </div>
              <div className="flex justify-between">
                <span>Sábados</span>
                <span>10hrs - 16hrs</span>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-100">
              Endereço <IoLocationOutline size={20} />
            </h3>
            <p className="mt-2 text-gray-300 leading-relaxed">
              Rua João Moreira Borges N°20,<br />
              Santa Inês<br />
              São José dos Campos - SP
            </p>
          </div>

          {/* Contato */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-3 text-gray-300">
            <a href="#" className="flex items-center gap-2 hover:text-white transition">
              <FaWhatsapp size={20} />
              (11) 99999-9999
            </a>
            <a href="mailto:contato@imosmart.com" className="flex items-center gap-2 hover:text-white transition">
              <FaEnvelope size={20} />
              contato@imosmart.com
            </a>
          </div>

          {/* Redes Sociais */}
          <div className="text-gray-300">
            <p className="text-lg font-semibold mb-2">Nossas redes sociais</p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="hover:text-white transition">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
