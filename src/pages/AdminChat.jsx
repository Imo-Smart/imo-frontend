import React, { useEffect, useState, useRef, useCallback } from "react";
import io from "socket.io-client";
import axios from "axios";

const ENDPOINT =
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:3333"
    : `${window.location.protocol}//${window.location.host}`;

export default function AdminChat() {
  const socketRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef(null);

  // Conecta socket
  useEffect(() => {
    const socket = io(ENDPOINT);
    socketRef.current = socket;

    socket.emit("joinAdmin");

    socket.on("newMessage", (msg) => {
      // Adiciona usuário na lista se não existir
      if (msg.from !== "Admin" && !users.includes(msg.from)) {
        setUsers((prev) => [...prev, msg.from]);
      }

      // Atualiza mensagens se for o usuário selecionado
      if (selectedUser?.name === msg.from || selectedUser?.name === msg.to) {
        setMessages((prev) => {
          // Evita duplicadas
          const exists = prev.some(
            (m) =>
              m.from === msg.from &&
              m.body === msg.body &&
              m.time === new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
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
      }
    });

    socket.on("typing", (conversationId) => {
      if (selectedUser?.name === conversationId) {
        setTyping(true);
        setTimeout(() => setTyping(false), 1500);
      }
    });

    return () => socket.disconnect();
  }, [selectedUser?.name]); // remove users das dependências

  // Scroll automático
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  // Seleciona usuário e busca histórico
  const selectUserHandler = useCallback(async (userName) => {
    setSelectedUser({ name: userName });
    setMessages([]);

    try {
      const res = await axios.get(`${ENDPOINT}/api/conversations/${userName}`);
      const conv = res.data;

      const formattedMessages = conv.messages.map((msg) => ({
        from: msg.from,
        to: msg.to,
        body: msg.body,
        time: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setMessages(formattedMessages);
    } catch (err) {
      console.error("Erro ao buscar histórico:", err);
      setMessages([]);
    }
  }, []);

  // Enviar mensagem
  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (!messageBody.trim() || !selectedUser) return;

      const msg = {
        from: "Admin",
        to: selectedUser.name,
        body: messageBody,
      };

      // Envia para o backend, mas não adiciona localmente
      socketRef.current.emit("sendMessage", {
        conversationId: selectedUser.name,
        ...msg,
      });

      setMessageBody("");
    },
    [messageBody, selectedUser]
  );

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] mt-[80px] gap-4 p-2 bg-blue-950">
      {/* Lista de usuários */}
      <div className="md:w-1/4 w-full bg-blue-100 p-4 rounded overflow-y-auto max-h-[calc(100vh-100px)]">
        <h3 className="font-bold mb-2 text-black">Usuários Online</h3>
        {users.map((user) => (
          <div
            key={user}
            onClick={() => selectUserHandler(user)}
            className={`p-2 rounded mb-1 cursor-pointer text-black ${
              selectedUser?.name === user ? "bg-blue-200" : "hover:bg-gray-200"
            }`}
          >
            {user} 🟢
          </div>
        ))}
      </div>

      {/* Chat com usuário */}
      <div className="flex-1 flex flex-col bg-white border rounded shadow-lg max-h-[calc(100vh-100px)]">
        <div className="p-4 border-b font-bold sticky top-0 text-gray-900 z-20">
          {selectedUser?.name || "Selecione um usuário"}
        </div>

        <div
          ref={messagesRef}
          className="flex-1 p-4 overflow-y-auto flex flex-col gap-2"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[70%] p-2 rounded-md break-words ${
                msg.from === "Admin"
                  ? "bg-blue-300 self-end text-right"
                  : "bg-gray-300 self-start text-left"
              }`}
            >
              <div className="text-sm text-gray-600">{msg.from}</div>
              <div className="text-black">{msg.body}</div>
              <div className="text-xs text-gray-950 mt-1">{msg.time}</div>
            </div>
          ))}
          {typing && (
            <div className="text-sm text-black italic">
              {selectedUser?.name} está digitando...
            </div>
          )}
        </div>

        {selectedUser && (
          <form onSubmit={sendMessage} className="flex border-t p-2 gap-2 text-black">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="flex-1 border rounded-l-md p-2 outline-none"
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-500">
              Enviar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
