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
            Na Barbershop, estamos comprometidos em oferecer uma experiência
            única em cuidados masculinos. Fundada pelo talentoso e renomado
            barbeiro Wes Borland, nossa barbearia se destaca pela paixão e
            habilidade incomparáveis. Com anos de experiência e expertise no
            setor, Wes Borland se tornou uma referência no mundo dos cortes de
            cabelo e barbas estilizadas.
          </p>
          <p className="text-lg text-gray-400 mb-5 max-w-[80%] mx-auto md:max-w-full">
            Além de oferecer cortes e estilos impecáveis, também nos preocupamos
            com o bem-estar dos nossos clientes. Utilizamos produtos de alta
            qualidade, garantindo resultados excepcionais e cuidando da saúde e
            vitalidade dos cabelos e da pele.
          </p>
          <p className="text-lg text-gray-400 mb-5 max-w-[80%] mx-auto md:max-w-full">
            Na Barbershop, acreditamos que o estilo é uma expressão individual.
            Valorizamos a singularidade de cada cliente, trabalhando em estreita
            colaboração para criar looks personalizados que reflitam sua
            personalidade e realcem sua beleza única.
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
              <p>Corretor</p>
            </div>
            <div className="text-center text-gray-400 w-[180px] p-5 border-2 border-[#FFF] rounded-lg m-2">
              <h3 className="font-numans text-2xl">
                + <CountUp end={100} start={0} delay={2} />
              </h3>
              <p>Iméveis</p>
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
