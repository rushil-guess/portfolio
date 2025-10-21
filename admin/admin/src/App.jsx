import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [selectedUser, setSelectedUser] = useState(null); // Currently chatting user
  const [messages, setMessages] = useState([]); // Messages for selected user
  const [input, setInput] = useState('');
  const [user, setUser] = useState([]);

  // Fetch all users from backend and join their rooms
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3000/users');
        const data = await res.json();

        // Add messages array to each user
        const usersWithMessages = data.map(u => ({ ...u, messages: [] }));
        setUser(usersWithMessages);

        // Join rooms for all users
        usersWithMessages.forEach(u => {
          socket.emit('jointicket', { ticketId: u.email });
        });
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  // Listen for incoming messages
useEffect(() => {
  const handleMessage = (d) => {
    // If d.data is an object, get its text field
    const text = typeof d.data === 'string' ? d.data : d.data.text;

    const newMessage = { text, sender: 'them', time: new Date().toLocaleTimeString() };

    // Update user messages
    setUser(prevUsers =>
      prevUsers.map(u =>
        u.email === d.msg
          ? { ...u, messages: [...u.messages, newMessage] }
          : u
      )
    );

    // Update chat box if the selected user matches
    if (selectedUser && d.msg === selectedUser.email) {
      setMessages(prev => [...prev, newMessage]);
    }
  };

  socket.on('msg', handleMessage);
  return () => socket.off('msg', handleMessage);
}, [selectedUser]);

  // Update chat box messages when switching users
  useEffect(() => {
    if (selectedUser) {
      setMessages(selectedUser.messages);
    }

  }, [selectedUser]);
  useEffect(()=>{
    console.log(messages)
  },[messages])

  // Handle sending message
const handleSend = (e) => {
  e.preventDefault();
  if (!input.trim() || !selectedUser) return;

  const message = { roomId: selectedUser.email, msg: input }; // send string only
  socket.emit('msg', message);

  const time = new Date().toLocaleTimeString();
  const newMessage = { text: input, sender: 'me', time };

  setMessages(prev => [...prev, newMessage]);

  setUser(prevUsers =>
    prevUsers.map(u =>
      u.email === selectedUser.email
        ? { ...u, messages: [...u.messages, newMessage] }
        : u
    )
  );

  setInput('');
};

  return (
    <div style={{ maxWidth: '900px', margin: '50px auto', color: '#fff' }}>
      <h2 style={{ textAlign: 'center' }}>Live Chat</h2>

      {/* Users list */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        {user.map(u => (
          <div
            key={u._id}
            onClick={() => setSelectedUser(u)}
            style={{
              padding: '15px',
              borderRadius: '8px',
              cursor: 'pointer',
              background: selectedUser?._id === u._id ? '#007bff' : '#2a3858',
              flex: '1 1 150px',
              textAlign: 'center'
            }}
          >
            {u.email}
          </div>
        ))}
      </div>

      {/* Chat box */}
      {selectedUser && (
        <div style={{ background: '#10182c', padding: '20px', borderRadius: '10px' }}>
          <h4>Chat with {selectedUser.email}</h4>
          <div
            className="chat-box"
            style={{ height: '300px', overflowY: 'auto', border: '1px solid #2a3858', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}
          >
            {messages.map((msg, idx) => (
              <div key={idx} style={{ textAlign: msg.sender === 'me' ? 'right' : 'left', margin: '5px 0' }}>
                <div style={{ display: 'inline-block', background: msg.sender === 'me' ? '#007bff' : '#2a3858', padding: '10px', borderRadius: '8px' }}>
                  <span>{msg?.text}</span>
                </div>
                <div style={{ fontSize: '0.8em', color: '#bbb', marginTop: '2px' }}>{msg.time}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{ flexGrow: 1, padding: '10px', borderRadius: '5px', border: '1px solid #2a3858', background: '#050a19', color: 'white' }}
            />
            <button type="submit" style={{ background: '#007bff', border: 'none', borderRadius: '5px', color: '#fff', padding: '10px 15px' }}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;