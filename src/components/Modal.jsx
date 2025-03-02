import React, { useState } from "react";

const Modal = ({ isOpen, closeModal, setUserName, supportHandler }) => {
  const [name, setName] = useState("");

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setUserName(name); // Define o nome do usuário
    closeModal(); // Fecha o modal
    supportHandler(); // Abre o chat após confirmar o nome
  };

  return (
    <div
      id="authentication-modal"
      className={`${
        isOpen ? "flex" : "hidden"
      } fixed top-0 left-0 right-0 z-50 justify-center items-center w-full h-full bg-gray-800 bg-opacity-50`}
    >
      <div className="relative p-6 w-full max-w-md max-h-full bg-white rounded-lg shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">Qual seu nome?</h3>
          <button
            onClick={closeModal}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          <form onSubmit={handleNameSubmit}>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Seu nome:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black"
              placeholder="Digite seu nome"
              required
            />
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
            >
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
