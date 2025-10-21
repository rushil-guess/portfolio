import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// --- Socket.IO and Firebase Initialization ---
const socket = io('http://localhost:3000');

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

// --- Main App Component ---
function App() {
  const [messages, setMessages] = useState([
      {id: 1, text: "Welcome", sender: 'bot'},
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatBoxRef = useRef(null);
  const [userEmail, setUserEmail] = useState(null);
useEffect(()=>{
  console.log(messages)
},[messages])

  useEffect(() => {
    const email = localStorage.getItem('email');
    // localStorage.removeItem('email')
    if (email) {
      setUserEmail(email);
    }

    socket.on('msg', (data) => {
        console.log(data)
        setMessages(prevMessages => [...prevMessages, {id: Date.now(), data}]);
    });

    return () => {
        socket.off('msg');
    };
  }, []);

  // --- Updated Data from Resume ---
  const experienceData = [
    {
        role: 'Full Stack Web Developer Intern',
        company: 'Novegrapix',
        period: 'June 2025 - Oct 2025',
        details: 'Integrating interactive map features using Mapbox and Google Maps APIs. Collaborating with frontend and backend teams to enable real-time location tracking, route rendering, and geofence-based functionalities. My work involves handling API requests, optimizing map performance, and ensuring seamless user experiences across devices.'
    }
  ];

  const educationData = [
      {
          degree: 'B.E. in Computer Science and Engineering',
          institution: 'Matrusri Engineering College, Hyderabad',
          period: 'Nov 2022 - June 2026',
          score: 'CGPA: 8.3'
      },
      {
          degree: 'Telangana Board of Intermediate Education',
          institution: 'Narayana Junior College, Kondapur',
          period: 'June 2020 - May 2022',
          score: 'Percentage: 96.6%'
      },
      {
          degree: 'Telangana Board of Secondary Education',
          institution: 'RBVRR High School, Nizamabad',
          period: 'March 2020',
          score: 'Percentage: 100%'
      }
  ];
  
  const projectsData = [
    {
      title: 'AI Chat Web App (ChatGPT Clone)',
      description: 'A full-stack AI-powered chat application using the Gemini API and MERN stack. Features user authentication, session-based chat history, and real-time AI-driven web solutions.'
    },
    {
      title: 'Face Emotion Recognition System',
      description: 'Developed a face emotion recognition system using PyTorch. Trained a CNN on a facial expression dataset to classify emotions like happy, sad, and angry from live predictions.'
    },
  ];
  
  const interestsData = [
      {
          name: 'Ethical Hacking',
          icon: 'https://placehold.co/60x60/0a1128/00d1ff?text=EH'
      },
      {
          name: 'App Development',
          icon: 'https://placehold.co/60x60/0a1128/00d1ff?text=AD'
      }
  ]

  const certificationsData = [
    'DSA using Java-Infosys SpringBoard',
    'MERN Stack Development Bootcamp - Udemy',
    'MySQL Bootcamp - Udemy',
    'Python Bootcamp - Udemy',
    'React and Javascript - Scrimba'
  ];

  const skillsData = {
    'Languages': [
      { name: 'JavaScript', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
      { name: 'HTML5', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg' },
      { name: 'CSS3', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg' },
      { name: 'Python', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
      { name: 'Java', logoUrl: 'https://cdn.worldvectorlogo.com/logos/java-4.svg' },
    ],
    'Frameworks & Technologies': [
      { name: 'React', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
      { name: 'Node.js', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg' },
      { name: 'Express.js', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png' },
      { name: 'MySQL', logoUrl: 'https://cdn.worldvectorlogo.com/logos/mysql-6.svg' },
      { name: 'MongoDB', logoUrl: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg' },
    ],
    'Tools & Platforms': [
      { name: 'Git', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg' },
      { name: 'GitHub', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg' },
      { name: 'VS Code', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg' },
      { name: 'AWS', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
      { name: 'Terraform', logoUrl: 'https://cdn.worldvectorlogo.com/logos/terraform-1.svg' },
    ],
  };

  // --- Auto-scroll to latest message ---
  useEffect(() => {
    if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // --- Scroll Animation Effect ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('main section');
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);
 useEffect(()=>{
socket.emit('jointicket', { ticketId: userEmail, msg: 'ji' });
 },[userEmail])
  const handleSignIn = (e) => {
    e.preventDefault()
      signInWithPopup(auth, provider)
          .then((result) => {
              const email = result.user.email;
              localStorage.setItem('email', email);
              setUserEmail(email);
          })
          .catch((error) => {
              console.error("Authentication error:", error);
          });
  };

  // --- Send Message Handler ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !userEmail) return;
    
    const messageData = { text: newMessage, sender: userEmail,roomId:userEmail };
    socket.emit('msg', messageData);
    
    // Add message to local state immediately for better UX
    setMessages(prevMessages => [...prevMessages, {id: Date.now(), ...messageData}]);

    setNewMessage('');
  };
  
  // --- Smooth Scrolling for Nav Links ---
  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&family=Bruno+Ace+SC&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');

        body {
          background-color: #050a19;
          color: #e0e0e0;
          font-family: 'Poppins', sans-serif;
        }
        .app { transition: all 0.3s ease-in-out; }
        .neon-text {
          color: #00d1ff;
          text-shadow: 0 0 5px #00d1ff, 0 0 10px #00d1ff, 0 0 20px #00d1ff, 0 0 30px #007bff;
        }
        .neon-subtext { color: #b0c4de; text-shadow: 0 0 2px #fff; }
        .neon-highlight {
          color: #00aaff;
          font-weight: bold;
          text-shadow: 0 0 5px #00aaff, 0 0 10px #00aaff;
        }
        .neon-link { color: #00d1ff !important; transition: 0.3s; text-shadow: none; }
        .navbar-nav .nav-link.neon-link {
            padding: 0.5rem 1rem;
            border-radius: 50px;
            transition: all 0.3s ease;
        }
        .navbar-nav .nav-link.neon-link:hover, .navbar-nav .nav-link.neon-link:focus {
          background-color: rgba(0, 209, 255, 0.1);
          text-shadow: 0 0 5px #00d1ff;
          transform: translateY(-2px);
        }
        
        .animated-logo {
            font-family: 'Bruno Ace SC', cursive;
            font-size: 1.5rem;
            font-weight: normal;
            background: linear-gradient(45deg, #a855f7, #8b5cf6, #3b82f6, #00d1ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            animation: gradient-flow 8s ease infinite;
            background-size: 400% 400%;
        }

        @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .hero-section {
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://placehold.co/1920x1080/050a19/00d1ff?text=Tech) no-repeat center center/cover;
          padding: 100px 0;
          animation: fadeIn 1.5s ease-in-out;
        }
        .hero-section h1, .hero-section p {
            animation: slideUpFadeIn 1s ease-out forwards;
        }
         .hero-section p { animation-delay: 0.3s; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUpFadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .dark-card {
          background-color: #10182c;
          border-radius: 15px;
          border: 1px solid #2a3858;
          transition: all 0.3s ease;
          text-align: left;
        }
        .dark-card:hover { border-color: #00d1ff; }
        .skill-card { width: 130px; height: 130px; text-align: center; }
        .skill-card:hover, .project-card:hover, .dark-card.h-100:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 8px 16px rgba(0, 209, 255, 0.3);
            border-color: #00d1ff;
        }
        .section-title {
          font-size: 1.8rem;
          margin-bottom: 30px;
          border-bottom: 2px solid #00d1ff;
          display: inline-block;
          padding-bottom: 5px;
        }
        .skill-category-title { font-size: 1.5rem; font-weight: bold; }
        main section {
            max-width: 1100px;
            margin-left: auto;
            margin-right: auto;
            padding: 40px 20px;
            background-color: #0a1128;
            border-radius: 20px;
            margin-bottom: 40px !important;
            border: 1px solid #1a233a;
            box-shadow: 0 5px 15px rgba(0, 209, 255, 0.1);
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        main section.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .skill-logo { height: 50px; width: auto; max-width: 90px; object-fit: contain; }
        .chat-box { border-radius: 10px; padding: 20px; display: flex; flex-direction: column; gap: 15px; height: 350px; overflow-y: auto; }
        .message { padding: 10px 15px; border-radius: 20px; max-width: 70%; word-wrap: break-word; }
        .message-sent { background-color: #007bff; color: white; align-self: flex-end; border-bottom-right-radius: 5px; }
        .message-received { background-color: #2a3858; color: #eee; align-self: flex-start; border-bottom-left-radius: 5px; }
        .chat-footer { background-color: #10182c; border-top: 1px solid #2a3858; }
        .chat-input { background-color: #050a19; color: white; border: 1px solid #2a3858; border-radius: 50px; padding: 10px 20px; }
        .chat-input:focus { background-color: #10182c; color: white; border-color: #00d1ff; box-shadow: 0 0 8px rgba(0, 209, 255, 0.5); }
        .send-btn { background-color: #007bff; border: none; border-radius: 50px; }
        .send-btn:hover { background-color: #0056b3; }
        footer a { margin: 0 10px; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #10182c; }
        ::-webkit-scrollbar-thumb { background: #2a3858; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #00d1ff; }
        .timeline-card-body { padding: 1.5rem; }
        .timeline-title { font-size: 1.2rem; font-weight: bold; color: #00d1ff; }
        .timeline-subtitle { font-size: 1rem; color: #b0c4de; }
        .timeline-period { font-size: 0.9rem; color: #8899a6; }
        .interest-icon { border-radius: 50%; height: 60px; width: 60px; margin-bottom: 1rem; }
      `}</style>
      <div className="app">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5 py-3 sticky-top shadow-lg">
          <a className="navbar-brand animated-logo" href="#">
            Portfolio.
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link neon-link" href="#about" onClick={handleNavClick}>About Me</a></li>
              <li className="nav-item"><a className="nav-link neon-link" href="#experience" onClick={handleNavClick}>Experience</a></li>
              <li className="nav-item"><a className="nav-link neon-link" href="#education" onClick={handleNavClick}>Education</a></li>
              <li className="nav-item"><a className="nav-link neon-link" href="#skills" onClick={handleNavClick}>Skills</a></li>
              <li className="nav-item"><a className="nav-link neon-link" href="#projects" onClick={handleNavClick}>Projects</a></li>
              <li className="nav-item"><a className="nav-link neon-link" href="#interests" onClick={handleNavClick}>Interests</a></li>
              <li className="nav-item"><a className="nav-link neon-link" href="#certifications" onClick={handleNavClick}>Certifications</a></li>
              <li className="nav-item"><a className="nav-link neon-link" href="#chat" onClick={handleNavClick}>Chat</a></li>
            </ul>
          </div>
        </nav>

        <header className="hero-section text-center text-white py-5">
          <h1 className="display-3 neon-text">Rushil Reddy Gujjula</h1>
          <p className="lead neon-subtext">CSE UG | MERN Stack Developer | Passionate about Web Technologies & Problem Solving</p>
        </header>

        <main className="container my-5">
          <section id="about" className="text-center">
            <h3 className="section-title neon-text">About Me</h3>
            <p className="neon-subtext" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
                A highly motivated and dedicated Computer Science graduate from Matrusri Engineering College (2022-2026), actively seeking a full-time opportunity to apply and grow my technical skills in a professional setting. With a strong foundation in web development and software engineering, I am passionate about using technology to build impactful solutions and enhance user experiences. I thrive in collaborative, fast-paced environments and am eager to contribute to innovative projects while continuously learning and evolving as a software professional.
            </p>
          </section>

          <section id="experience">
            <div className="text-center"><h3 className="section-title neon-text">Work Experience</h3></div>
            {experienceData.map((exp, i) => (
              <div key={i} className="card dark-card mb-4">
                <div className="card-body timeline-card-body">
                  <h5 className="timeline-title">{exp.role}</h5>
                  <h6 className="timeline-subtitle mb-2">{exp.company}</h6>
                  <p className="timeline-period">{exp.period}</p>
                  <p className="neon-subtext">{exp.details}</p>
                </div>
              </div>
            ))}
          </section>

          <section id="education">
            <div className="text-center"><h3 className="section-title neon-text">Education</h3></div>
            <div className="row g-4">
              {educationData.map((edu, i) => (
                <div key={i} className="col-md-4">
                  <div className="card dark-card h-100">
                    <div className="card-body timeline-card-body">
                      <h5 className="timeline-title">{edu.degree}</h5>
                      <h6 className="timeline-subtitle mb-2">{edu.institution}</h6>
                      <p className="timeline-period">{edu.period}</p>
                      <p className="neon-subtext fw-bold">{edu.score}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="skills" className="text-center">
            <h3 className="section-title neon-text">Skills</h3>
            {Object.entries(skillsData).map(([category, skills]) => (
                <div key={category} className="mb-5">
                    <h4 className="skill-category-title neon-highlight mb-4">{category}</h4>
                    <div className="row g-4 justify-content-center">
                        {skills.map((skill) => (
                            <div key={skill.name} className="col-auto">
                                <div className="card dark-card skill-card text-center h-100 shadow-sm">
                                    <div className="card-body d-flex flex-column align-items-center justify-content-center p-3">
                                        <img src={skill.logoUrl} alt={`${skill.name} logo`} className="skill-logo mb-2" style={{filter: skill.name === 'Express.js' || skill.name === 'GitHub' ? 'invert(1)' : 'none'}}/>
                                        <p className="neon-subtext small mb-0 mt-auto">{skill.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
          </section>

          <section id="projects" className="text-center">
            <h3 className="section-title neon-text">Projects</h3>
            <div className="row g-4">
              {projectsData.map((project, i) => (
                <div key={i} className="col-md-6">
                  <div className="card dark-card project-card h-100 p-3">
                    <div className="card-body">
                      <h5 className="timeline-title">{project.title}</h5>
                      <p className="neon-subtext mt-2">{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
           <section id="interests" className="text-center">
            <h3 className="section-title neon-text">Areas of Interest</h3>
            <div className="row g-4 justify-content-center">
              {interestsData.map((interest, i) => (
                <div key={i} className="col-md-4">
                  <div className="card dark-card h-100 shadow-sm p-3">
                    <div className="card-body d-flex flex-column align-items-center justify-content-center">
                        <img src={interest.icon} alt={interest.name} className="interest-icon"/>
                      <p className="card-text neon-subtext fw-bold text-center">{interest.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="certifications" className="text-center">
            <h3 className="section-title neon-text">Certifications</h3>
            <div className="row g-4 justify-content-center">
              {certificationsData.map((cert, i) => (
                <div key={i} className="col-md-4">
                  <div className="card dark-card h-100 shadow-sm p-3">
                    <div className="card-body d-flex align-items-center justify-content-center">
                      <p className="card-text neon-subtext fw-bold text-center">{cert}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

         <section id="chat">
  <div className="text-center">
    <h3 className="section-title neon-text">Leave a Message</h3>
  </div>
  <div className="card dark-card shadow-lg">
    <div ref={chatBoxRef} className="card-body chat-box">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message ${msg.sender === userEmail ? 'message-sent' : 'message-received'}`}
        >
          {/* Show sender email only for received messages */}
          {msg.sender !== userEmail && (
            <small className="d-block" style={{ opacity: 0.7 }}>
              {/* {msg.sender} */}
            </small>
          )}
          {msg?.data?.data?.msg|| msg.text}
        </div>
      ))}
    </div>

    <div className="card-footer chat-footer p-3">
      <form
        onSubmit={userEmail ? handleSendMessage : handleSignIn}
        style={{ display: 'flex', gap: '10px' }}
      >
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

        <footer className="text-center py-4 bg-dark">
          <p className="neon-subtext mb-2">© 2025 Rushil Reddy Gujjula. All Rights Reserved.</p>
          <p>
            <a href="https://github.com/rushil-github" target="_blank" rel="noopener noreferrer" className="neon-link">GitHub</a> |
            <a href="https://linkedin.com/in/rushil-reddy-gujula" target="_blank" rel="noopener noreferrer" className="neon-link"> LinkedIn</a>
          </p>
        </footer>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}

export default App;

