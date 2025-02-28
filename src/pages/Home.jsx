import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import Carrosel from '../components/Carrosel'
import Head from '../components/Head'

export default function Home() {
  return (
    <>
    <Head />
      <section className="min-h-screen flex items-center dark:bg-gray-900">
      <Helmet>
        <title>ImoSmart</title>
      </Helmet>
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            O imóvel certo está aqui!
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            <span className="text-white font-bold">ImoSmart</span> – A
            plataforma inteligente para encontrar o imóvel dos seus sonhos com
            praticidade e segurança! 🚀🏡
          </p>
          <div className="flex">
            <Link
              to="/sign-in"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Fazer Login
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              to="/initial"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Explorar
            </Link>
          </div>
        </div>
        <div className="pt-5 sm:mt-6 md:mt-8 lg:mt-0 col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-5 flex justify-center">
          <Carrosel />
        </div>
      </div>
    </section>
    </>
  )
}
