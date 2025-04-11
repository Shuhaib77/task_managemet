import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Usemessage from "../../../hooks/messageHook";
import Input from "../../../common/components/input/Input";
import Button from "../../../common/components/button/Button";

// connect to backend server
const socket = io("http://localhost:407");

function Message() {
  const userId = localStorage.getItem("userId"); // assume this exists
  const [recipient, setRecipient] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Listen for incoming socket messages
  useEffect(() => {
    socket.on("newMessage", (data) => {
      const isRelevant =
        (data.sender === userId && data.recipient === recipient) ||
        (data.sender === recipient && data.recipient === userId);

      if (isRelevant) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [recipient, userId]);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load old messages from DB
  const loadMessages = async () => {
    console.log(recipient, recipient, userId, recipient);
    try {
      const res = await axios.get(
        `http://localhost:407/api/get_message?senderId=${userId}&recipientId=${recipient}`
      );
      setMessages(res.data.data);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  // Form handling using your custom hook
  const { formik } = Usemessage(
    { message: "", recipient: "" },
    async (values) => {
      const msgData = {
        sender: userId,
        recipient: values.recipient,
        message: values.message,
      };

      try {
        // Send via socket (backend will save and broadcast)
        socket.emit("send_message", msgData);

        // Optimistically show own message
        setMessages((prev) => [...prev, msgData]);

        formik.resetForm();
      } catch (err) {
        console.error("Error sending message", err);
      }
    }
  );
  console.log(recipient, recipient, "llollol");

  return (
    <div className="max-w-xl mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-4">Chat Room</h2>

      <Input
        type="text"
        name="recipient"
        placeholder="Enter recipient ID"
        value={formik.values.recipient}
        handlechange={(e) => {
          formik.handleChange(e);
          setRecipient(e.target.value);
        }}
        handleblur={formik.handleBlur}
      />

      <Button
        name="Load Messages"
        type="button"
        className="my-4 bg-gray-300"
        onclick={loadMessages}
      />

      <div className="h-64 overflow-y-auto border p-2 rounded bg-white mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-1 ${
              msg.sender === userId ? "text-right" : "text-left"
            }`}
          >
            <span className="inline-block p-2 rounded bg-blue-100">
              {msg.message}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={formik.handleSubmit} className="flex gap-2">
        <Input
          type="text"
          name="message"
          placeholder="Enter message"
          value={formik.values.message}
          handlechange={formik.handleChange}
          handleblur={formik.handleBlur}
        />
        <Button
          name="Send"
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        />
      </form>
    </div>
  );
}

export default Message;
