import React, { useState, useEffect } from "react";
import { API_URL } from "../../../../api/api";
import ChatHeader from "./components/ChatHeader";
import ChatMessage from "./components/ChatMessage";
import ChatFooter from "./components/ChatFooter";
import ChatPresentation from "./components/ChatPresentation";

interface MessageProps {
  sender: "user" | "bot";
  message: string;
}

const LOCAL_STORAGE_KEY = "chatMessages";

export default function Chat() {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const savedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    // Guardar mensajes en localStorage cada vez que se actualicen
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const submitMessageUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTyping(true);
    if (newMessage.trim() !== "") {
      const newMessageObject: MessageProps = {
        sender: "user",
        message: newMessage,
      };
      setMessages((prev) => [...prev, newMessageObject]);
      responseGemini();
      setNewMessage("");
    }
  };

  const responseGemini = async () => {
    const token = localStorage.getItem("TOKEN_KEY");

    try {
      const res = await fetch(`${API_URL}/gemini/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: newMessage }), // Adjusted to include the message in a JSON object
      });

      if (!res.ok) {
        throw new Error("Fail:" + res.status);
      }
      const data = await res.text();
      setMessages((prev) => [...prev, { message: data, sender: "bot" }]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main className="lg:min-h-screen  bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md h-screen  bg-white rounded-lg shadow-lg flex flex-col">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-t from-pink-300 to-indigo-500">
          <ChatPresentation />
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <ChatFooter
          isTyping={isTyping}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          submitMessageUser={submitMessageUser}
        />
      </div>
    </main>
  );
}
