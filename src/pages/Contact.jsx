import { FiClock } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

import { Helmet } from 'react-helmet-async'

import { Map } from "../components/Map";

export default function Contact() {
  return (
    <>
        <Helmet>
          <title>ImoSmart | Contato</title>
        </Helmet>
      <div className=" dark:bg-gray-900 flex flex-col md:flex-row justify-between items-center px-6 py-10 md:h-screen space-y-10 md:space-y-0">
        {/* Mapa */}
        <div className="flex-1 h-[600px] w-full flex justify-center items-center">
          <Map />
        </div>

        {/* Contato */}
        <div className="flex-1 max-w-lg text-center md:text-left space-y-6">
          <h1 className="text-4xl font-bold ">Nosso Contato</h1>

          {/* Agenda */}
          <div className=" p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Agenda <FiClock size={20} />
            </h3>
            <div className="flex justify-between text-gray-600">
              <p className="text-gray-500 dark:text-gray-400">Segunda a Sexta</p> <span className="text-gray-500 dark:text-gray-400">10hrs - 17hrs</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <p className="text-gray-500 dark:text-gray-400">Sábados</p> <span className="text-gray-500 dark:text-gray-400">10hrs - 16hrs</span>
            </div>
          </div>

          {/* Endereço */}
          <div className="p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Endereço <IoLocationOutline size={20} />
            </h3>
            <p className="text-gray-500 dark:text-gray-400">Rua João Moreira Borges N°20,<br /> Santa ines l <br />
            São José dos Campos - SP</p>
          </div>

          {/* Contato */}
          <div className="space-y-3">
            <a href="#" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 ">
              <FaWhatsapp size={20} className="" />
              (11) 99999-9999
            </a>

            <a href="mailto:contato@barber.com" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 ">
              <FaEnvelope size={20} className="" />
              contato@barber.com
            </a>
          </div>

          {/* Redes Sociais */}
          <div className="mt-4">
            <p className="text-lg font-semibold">Nossas redes sociais</p>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <a href="#">
                <FaFacebook size={24} />
              </a>
              <a href="#">
                <FaInstagram size={24} />
              </a>
              <a href="#">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
