import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'; // move your previous <style> content here

// --- Socket.IO and Firebase Initialization ---
const socket = io(import.meta.env.VITE_SOCKET_IO_URL);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function App() {
  const [messages, setMessages] = useState([{id: 1, text: "Welcome", sender: 'bot'}]);
  const [newMessage, setNewMessage] = useState('');
  const [userEmail, setUserEmail] = useState(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) setUserEmail(email);

    socket.on('msg', (data) => {
      setMessages(prev => [...prev, { id: Date.now(), ...data }]);
    });

    return () => socket.off('msg');
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.emit('jointicket', { ticketId: userEmail, msg: 'ji' });
  }, [userEmail]);

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(result => {
        const email = result.user.email;
        localStorage.setItem('email', email);
        setUserEmail(email);
      })
      .catch(error => console.error("Authentication error:", error));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userEmail) return;
    const messageData = { text: newMessage, sender: userEmail, roomId: userEmail };
    socket.emit('msg', messageData);
    setMessages(prev => [...prev, { id: Date.now(), ...messageData }]);
    setNewMessage('');
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5 py-3 sticky-top shadow-lg">
        <a className="navbar-brand animated-logo" href="#">Portfolio.</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {["about","experience","education","skills","projects","interests","certifications","chat"].map((id) => (
              <li key={id} className="nav-item">
                <a className="nav-link neon-link" href={`#${id}`} onClick={handleNavClick}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <header className="hero-section text-center text-white py-5">
        <h1 className="display-3 neon-text">Rushil Reddy Gujjula</h1>
        <p className="lead neon-subtext">CSE UG | MERN Stack Developer | Passionate about Web Technologies & Problem Solving</p>
      </header>

      <main className="container my-5">
        {/* About Me Section */}
        <section id="about" className="text-center">
          <h3 className="section-title neon-text">About Me</h3>
          <p className="neon-subtext" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            A highly motivated and dedicated Computer Science graduate from Matrusri Engineering College (2022-2026), actively seeking a full-time opportunity to apply and grow my technical skills in a professional setting. With a strong foundation in web development and software engineering, I am passionate about using technology to build impactful solutions and enhance user experiences. I thrive in collaborative, fast-paced environments and am eager to contribute to innovative projects while continuously learning and evolving as a software professional.
          </p>
        </section>

        {/* Chat Section */}
        <section id="chat" className="my-5">
          <div className="text-center"><h3 className="section-title neon-text">Leave a Message</h3></div>
          <div className="card dark-card shadow-lg">
            <div ref={chatBoxRef} className="card-body chat-box">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender === userEmail ? 'message-sent' : 'message-received'}`}>
                  {msg?.data?.data?.msg || msg.text}
                </div>
              ))}
            </div>
            <div className="card-footer chat-footer p-3">
              <form onSubmit={userEmail ? handleSendMessage : handleSignIn} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  className="form-control chat-input"
                  placeholder={userEmail ? 'Type a message...' : 'Sign in to chat'}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={!userEmail}
                />
                <button className="btn send-btn text-white" type="submit">
                  {userEmail ? 'Send' : 'Sign in with Google'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
