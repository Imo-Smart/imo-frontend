// src/components/ChatBox.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { MdOutlineSupportAgent } from "react-icons/md";
import Modal from "./Modal";
import io from "socket.io-client";

const ENDPOINT =
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:3333"
    : `${window.location.protocol}//${window.location.host}`;

export function ChatBox() {
  const socketRef = useRef(null);
  const uiMessagesRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const supportHandler = useCallback(() => {
    if (!userName) return openModal();

    if (!socketRef.current) {
      const sk = io(ENDPOINT);
      socketRef.current = sk;

      // Entrar na sala de conversa específica
      sk.emit("joinConversation", { userName });

      // Receber mensagens do backend
      sk.on("newMessage", (msg) => {
        // Evita adicionar duplicadas pelo createdAt ou id
        setMessages((prev) => {
          const exists = prev.some(
            (m) =>
              m.from === msg.from &&
              m.body === msg.body &&
              new Date(m.time).getTime() === new Date(msg.createdAt).getTime()
          );
          if (exists) return prev;
          return [
            ...prev,
            {
              ...msg,
              time: new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ];
        });
      });


      // Receber aviso de digitação
      sk.on("typing", () => {
        setTyping(true);
        setTimeout(() => setTyping(false), 1500);
      });
    }

    setIsOpen(true);
  }, [userName]);

  // Auto scroll
  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollTop = uiMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (!messageBody.trim() || !socketRef.current) return;

      const msg = {
        from: userName,
        to: "Admin",
        body: messageBody,
      };

      // Envia para o backend (não adiciona localmente)
      socketRef.current.emit("sendMessage", {
        conversationId: userName,
        ...msg,
      });

      setMessageBody(""); // limpa input
    },
    [messageBody, userName]
  );

  const handleTyping = useCallback(() => {
    if (socketRef.current && isOpen) {
      socketRef.current.emit("typing", { from: userName, to: "Admin" });
    }
  }, [userName, isOpen]);

  return (
    <div className="chatbox fixed bottom-5 right-5 z-50">
      {!isOpen ? (
        <button
          onClick={supportHandler}
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
        >
          <MdOutlineSupportAgent size={50} />
        </button>
      ) : (
        <div className="bg-white shadow-lg rounded-lg w-80 border border-gray-300 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <strong className="text-black">Suporte</strong>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div
            ref={uiMessagesRef}
            className="p-4 overflow-y-auto h-60 flex flex-col gap-2"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md ${
                  msg.from === userName
                    ? "bg-blue-100 text-blue-900 self-end text-right"
                    : "bg-gray-200 text-gray-900 self-start text-left"
                }`}
              >
                <div className="text-sm text-black">{msg.from}</div>
                <div>{msg.body}</div>
                <div className="text-xs text-black mt-1">{msg.time}</div>
              </div>
            ))}
            {typing && (
              <div className="text-sm text-black italic">Admin está digitando...</div>
            )}
          </div>

          <form onSubmit={submitHandler} className="flex border-t p-2 gap-2">
            <input
              type="text"
              value={messageBody}
              onChange={(e) => {
                setMessageBody(e.target.value);
                handleTyping();
              }}
              placeholder="Digite sua mensagem..."
              className="flex-1 border rounded-l-md p-2 text-black outline-none"
            />
            <button className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-500">
              Enviar
            </button>
          </form>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        setUserName={setUserName}
        supportHandler={supportHandler}
      />
    </div>
  );
}
