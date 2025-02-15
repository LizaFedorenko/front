import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3001");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [text, setText] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Registration state
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    axios.get("http://localhost:3001/messages").then((res) => {
      setMessages(res.data);
    });

    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("newMessage");
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const sendMessage = () => {
    if (text.trim() !== "" && user) {
      socket.emit("sendMessage", { username: user.username, text });
      setText("");
    }
  };

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:3001/register", registerData);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data)); // 🔹 Save user in localStorage
      setRegisterData({ username: "", email: "", password: "" });
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
    }
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3001/login", loginData);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data)); // 🔹 Save user in localStorage
      setLoginData({ email: "", password: "" });
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // 🔹 Clear user session
  };

  return (
    <div className="chat-container">
      <h2>Чат</h2>

      {user ? (
        <>
          <p>Logged in as: <strong>{user.username}</strong></p>
          <button className="btn-logout" onClick={logout}>Logout</button>

          <div className="messages">
            {messages.map((msg) => (
              <div key={msg.id} className="message">
                <strong>{msg.username}:</strong> {msg.text}
              </div>
            ))}
          </div>

          <input
            className="input"
            type="text"
            placeholder="Your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="btn">Send</button>
        </>
      ) : (
        <>
          <h3>{isRegistering ? "Register" : "Login"}</h3>

          {isRegistering ? (
            <>
              <input
                className="register"
                type="text"
                placeholder="Name"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              />
              <input
                className="register"
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              />
              <input
                className="register"
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
              <button className="back-button" onClick={register}>Register</button>
            </>
          ) : (
            <>
              <input
                className="login"
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
              <input
                className="login"
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
              <button className="back-button" onClick={login}>Login</button>
            </>
          )}

          <button className="btn-switch" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Already have an account? Log in" : "No account? Register"}
          </button>
        </>
      )}
    </div>
  );
};

export default Chat;
