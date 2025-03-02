import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { MdOutlineSupportAgent } from "react-icons/md";
import Modal from "./Modal";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:3333"
    : window.location.host;

export function ChatBox() {
  const uiMessagesRef = useRef(null);
  const [messages, setMessages] = useState([
    { from: "Elisa", body: "Olá, qual sua dúvida?" },
  ]);
  const [socket, setSocket] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const supportHandler = () => {
    if (!userName) {
      openModal(); // Abre o modal se o nome não estiver definido
    } else {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
      setIsOpen(true); // Abre o chat se o nome já estiver definido
      sk.emit("onLogin", { name: userName }); // Envia o nome ao conectar
    }
  };

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }

    if (socket) {
      socket.on("message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }
  }, [messages, socket]);

  const closeHandler = () => {
    setIsOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Erro. Digite uma mensagem.");
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { body: messageBody, from: userName, to: "Elisa" },
      ]);
      setTimeout(() => {
        socket.emit("onMessage", { body: messageBody, from: userName, to: "Elisa" });
      }, 1000);
      setMessageBody("");
    }
  };

  return (
    <div className="chatbox fixed bottom-5 right-5">
      {!isOpen ? (
        <button
          onClick={supportHandler}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
        >
          <MdOutlineSupportAgent size={60} />
        </button>
      ) : (
        <div className="bg-white shadow-lg rounded-lg w-80 border border-gray-300">
          <div className="p-4 border-b flex justify-between items-center">
            <strong className="text-xl text-black">Suporte</strong>
            <button
              onClick={closeHandler}
              className="text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              ×
            </button>
          </div>
          <div className="p-4 space-y-2 h-60 overflow-y-auto" ref={uiMessagesRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md ${
                  msg.from === userName ? "bg-blue-100 text-blue-900" : "bg-gray-200 text-gray-900"
                }`}
              >
                <strong>{msg.from}:</strong> {msg.body}
              </div>
            ))}
          </div>
          <form onSubmit={submitHandler} className="p-4 gap-2 border-t flex dark:text-black">
            <input
              type="text"
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 p-2 border rounded-l-md outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-500"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
      <Modal isOpen={isModalOpen} closeModal={closeModal} setUserName={setUserName} supportHandler={supportHandler} />
    </div>
  );
}
