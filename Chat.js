import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chatHistory", (data) => {
      setMessages(data);
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    if (message !== "") {
      socket.emit("sendMessage", {
        user: username,
        text: message,
        time: new Date().toLocaleTimeString()
      });
      setMessage("");
    }
  };

  if (!joined) {
    return (
      <div>
        <h2>Join Chat</h2>
        <input onChange={(e) => setUsername(e.target.value)} />
        <button onClick={() => setJoined(true)}>Join</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Real-Time Chat</h2>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.user}</b>: {msg.text} ({msg.time})
          </p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;