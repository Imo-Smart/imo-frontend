import CountUp from 'react-countup'
import { Helmet } from 'react-helmet-async'

import imgHouse from '../assets/imgHouse.jpg'

export default function About() {
  return (
    <>
        <Helmet>
          <title>ImoSmart | Sobre Nós</title>
        </Helmet>
      <div className="flex justify-between items-center p-5 flex-col md:flex-row dark:bg-gray-900">
        <div className="flex-1 md:mr-20 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-100 mb-5">Sobre-nós</h1>
          <p className="text-lg text-gray-400 mb-5 max-w-[80%] mx-auto md:max-w-full">
            A ideia da ImoSmart nasceu da necessidade de modernizar e facilitar o processo de compra, venda e aluguel de imóveis. Muitos proprietários e corretores enfrentavam dificuldades para divulgar seus imóveis de forma eficiente, enquanto compradores e locatários tinham que navegar por plataformas desatualizadas e confusas.
          </p>
          <p className="text-lg text-gray-400 mb-5 max-w-[80%] mx-auto md:max-w-full">
          Desde o início, o objetivo foi construir uma plataforma intuitiva, onde qualquer pessoa pudesse anunciar ou encontrar imóveis com poucos cliques. Para isso, investimos em um design moderno, filtros inteligentes e integração com mapas interativos, proporcionando uma experiência fluida e eficiente.
          </p>
          <p className="text-lg text-gray-400 mb-5 max-w-[80%] mx-auto md:max-w-full">
            Hoje, a ImoSmart não é apenas um portal de anúncios, mas um ecossistema que conecta pessoas, facilitando negociações seguras e ágeis. Continuamos evoluindo, sempre ouvindo nossos usuários e buscando formas inovadoras de transformar o mercado imobiliário, tornando-o mais acessível e eficiente para todos.
          </p>

          <div className="flex justify-between items-center pt-4 flex-wrap">
            <div className="text-center text-gray-400 w-[180px] p-5 border-2 border-[#FFF] rounded-lg m-2">
              <h3 className="font-numans text-2xl">
                <CountUp end={5} start={0} delay={2} />
              </h3>
              <p>Anos no mercado</p>
            </div>
            <div className="text-center text-gray-400 w-[180px] p-5 border-2 border-[#FFF] rounded-lg m-2">
              <h3 className="font-numans text-2xl">
                <CountUp end={2} start={0} delay={2} />
              </h3>
              <p>Corretores</p>
            </div>
            <div className="text-center text-gray-400 w-[180px] p-5 border-2 border-[#FFF] rounded-lg m-2">
              <h3 className="font-numans text-2xl">
                + <CountUp end={100} start={0} delay={2} />
              </h3>
              <p>Imóveis</p>
            </div>
          </div>
        </div>

        <div className="flex-1 md:w-auto flex justify-center items-center mt-12 md:mt-0">
          <img
            src={imgHouse}
            alt="Image"
            className="w-full max-w-[100%] max-h-[80vh] rounded-lg"
          />
        </div>
      </div>
    </>
  )
}
