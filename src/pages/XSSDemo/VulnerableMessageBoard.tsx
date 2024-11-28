import React, { useState } from 'react';
import '../../css/VulnerableLogin.css';

const VulnerableMessageBoard = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // Fetch messages when component mounts and after posting
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://147.182.176.235/api/xss-demo/messages', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  React.useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://147.182.176.235/api/xss-demo/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          username: username || 'Anonymous'
        }),
        credentials: 'include'
      });

      if (response.ok) {
        setNewMessage('');
        setUsername('');
        fetchMessages();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to post message');
      }
    } catch (err) {
      setError('An error occurred');
      console.error('Post error:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Message Board</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Post Message</button>
      </form>

      <div className="messages-section">
        <h3>Messages:</h3>
        {messages.map((msg: any, index: number) => (
          <div
            key={index}
            className="message-card"
            dangerouslySetInnerHTML={{
              __html: `
                <div>${msg.content}</div>
                <div class="message-meta">Posted by ${msg.username}</div>
              `
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VulnerableMessageBoard;
