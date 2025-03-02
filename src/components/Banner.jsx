import React from "react";

import imgRent from '../assets/rent.svg'

const Banner = () => {
  return (
    <div className="px-4 dark:bg-gray-900 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
      <div className="mx-auto max-w-screen-lg bg-blue-500 p-8 text-white md:flex md:items-center md:justify-around md:p-16 lg:rounded-xl">
  <div className="mr-10 mb-10 md:mb-0">
    <h2 className="mb-8 max-w-lg text-3xl font-bold sm:text-4xl">Aqui na Imosmart você vai encontrar</h2>
    <ul className="flex max-w-xl flex-wrap gap-4">
      <li className="flex space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-green-300">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
        </svg>
        <p className="text-gray-100">Melhores preços</p>
      </li>
      <li className="flex space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-green-300">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
        </svg>
        <p className="text-gray-100">Bom atentimento</p>
      </li>
      <li className="flex space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-green-300">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
        </svg>
        <p className="text-gray-100">Rapidez e agilidade</p>
      </li>
      <li className="flex space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-green-300">
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
        </svg>
        <p className="text-gray-100">Imóveis em otimas localidades</p>
      </li>
    </ul>
  </div>
  <div className="whitespace-nowrap">
    <button className="focus:outline-4 rounded-xl bg-emerald-400 px-4 py-3 font-medium text-white shadow-md outline-white transition hover:bg-emerald-500">Ver Ofertas</button>
  </div>
</div>

    </div>
  );
};

export default Banner;
