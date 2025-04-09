import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Usemessage from "../../../hooks/messageHook";
import Input from "../../../common/components/input/Input";
import Button from "../../../common/components/button/Button";

// Connect to the Socket.IO server
const socket = io("http://localhost:407"); // Make sure your backend supports CORS

function Message() {
  const navigate = useNavigate();

  // Chat state to hold messages
  const [chat, setChat] = useState([]);

  // Listen for incoming socket messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Received via socket:", data);
      setChat((prev) => [...prev, data]);
    });

    // Clean up listener on unmount
    return () => {
      socket.off("receive_message");
    };
  }, []);

  // Form fields and initial values
  const initialValue = { message: "", username: "" };

  const field = [
    { name: "message", type: "text" },
    { name: "username", type: "text" },
  ];

  const { formik } = Usemessage(initialValue, async (values) => {
    try {
      // Send to DB
      await axios.post("http://localhost:407/api/add_message", values);

      // Emit through socket
      socket.emit("send_message", values);

      // Clear form
      formik.resetForm();
    } catch (err) {
      console.error("Error sending message", err);
    }
  });

  return (
    <div className="max-w-xl mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-4">Chat Room</h2>
      <form className="grid grid-cols-1 gap-y-3" onSubmit={formik.handleSubmit}>
        {field.map((item, i) => (
          <Input
            key={i}
            type={item.type}
            placeholder={item.name}
            handlechange={formik.handleChange}
            handleblur={formik.handleBlur}
            value={formik.values[item.name]}
            name={item.name}
          />
        ))}

        <Button
          name="Send"
          type="submit"
          className="bg-blue-800 text-white px-4 py-2 rounded"
        />
      </form>

      {/* Display messages */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Messages:</h3>
        <div className="space-y-2">
          {chat.map((item, i) => (
            <div key={i} className="bg-gray-100 p-2 rounded">
              <strong className="text-blue-700">{item.username}</strong>:{" "}
              <span>{item.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Message;
