import CountUp from 'react-countup';
import { Helmet } from 'react-helmet-async';

import imgHouse from '../assets/imgHouse.jpg';

export default function About() {
  return (
    <>
      <Helmet>
        <title>ImoSmart | Sobre Nós</title>
      </Helmet>

      <div className="pt-28 px-4 md:px-16 pb-12 bg-gray-900 min-h-screen">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* Texto */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">Sobre Nós</h1>
            <p className="text-gray-400 mb-4 md:max-w-[90%]">
              A ideia da ImoSmart nasceu da necessidade de modernizar e facilitar o processo de compra, venda e aluguel de imóveis. Muitos proprietários e corretores enfrentavam dificuldades para divulgar seus imóveis de forma eficiente, enquanto compradores e locatários tinham que navegar por plataformas desatualizadas e confusas.
            </p>
            <p className="text-gray-400 mb-4 md:max-w-[90%]">
              Desde o início, o objetivo foi construir uma plataforma intuitiva, onde qualquer pessoa pudesse anunciar ou encontrar imóveis com poucos cliques. Investimos em design moderno, filtros inteligentes e integração com mapas interativos, proporcionando uma experiência fluida e eficiente.
            </p>
            <p className="text-gray-400 mb-6 md:max-w-[90%]">
              Hoje, a ImoSmart não é apenas um portal de anúncios, mas um ecossistema que conecta pessoas, facilitando negociações seguras e ágeis. Continuamos evoluindo, sempre ouvindo nossos usuários e buscando formas inovadoras de transformar o mercado imobiliário.
            </p>

            {/* Cards */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="w-44 p-5 border border-gray-700 rounded-lg text-gray-200 bg-gray-800 shadow-md">
                <h3 className="text-2xl font-bold mb-1">
                  <CountUp end={5} start={0} delay={1} />
                </h3>
                <p className="text-sm">Anos no mercado</p>
              </div>
              <div className="w-44 p-5 border border-gray-700 rounded-lg text-gray-200 bg-gray-800 shadow-md">
                <h3 className="text-2xl font-bold mb-1">
                  <CountUp end={2} start={0} delay={1} />
                </h3>
                <p className="text-sm">Corretores</p>
              </div>
              <div className="w-44 p-5 border border-gray-700 rounded-lg text-gray-200 bg-gray-800 shadow-md">
                <h3 className="text-2xl font-bold mb-1">
                  +<CountUp end={100} start={0} delay={1} />
                </h3>
                <p className="text-sm">Imóveis</p>
              </div>
            </div>
          </div>

          {/* Imagem */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src={imgHouse}
              alt="Imagem sobre a empresa"
              className="w-full max-w-md md:max-w-lg rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
