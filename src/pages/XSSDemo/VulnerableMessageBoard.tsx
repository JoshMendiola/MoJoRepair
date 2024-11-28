import React, { useState } from 'react';
import '../../css/VulnerableLogin.css';

const VulnerableMessageBoard = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

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

  const handleReset = async () => {
    // First clear all messages (you'll need a new endpoint for this)
    try {
      const clearResponse = await fetch('http://147.182.176.235/api/xss-demo/clear', {
        method: 'POST',
        credentials: 'include'
      });

      if (!clearResponse.ok) {
        console.error('Failed to clear messages');
        return;
      }

      // Then post the reset styles
      const resetMessage = `
      <style>
      /* Reset everything first */
      * {
        all: revert !important;
      }

      /* Reapply our original styles */
      .login-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }

      .form-group {
        margin-bottom: 15px;
      }

      .form-group label {
        display: block;
        margin-bottom: 5px;
      }

      .form-group input,
      .form-group textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .form-group textarea {
        min-height: 100px;
        resize: vertical;
      }

      .error {
        color: red;
        margin: 10px 0;
      }

      button {
        background-color: #007bff;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      button:hover {
        background-color: #0056b3;
      }

      .messages-section {
        margin-top: 30px;
      }

      .message-card {
        border: 1px solid #ddd;
        padding: 15px;
        margin-bottom: 15px;
        border-radius: 4px;
      }

      .message-meta {
        font-size: 0.9em;
        color: #666;
        margin-top: 5px;
      }
      </style>
      Styles have been reset!
    `;

      const response = await fetch('http://147.182.176.235/api/xss-demo/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: resetMessage,
          username: 'System'
        }),
        credentials: 'include'
      });

      if (response.ok) {
        fetchMessages();
      }
    } catch (err) {
      console.error('Error resetting styles:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Message Board</h2>
      <button
        onClick={handleReset}
        style={{
          marginBottom: '20px',
          backgroundColor: '#dc3545',
          padding: '8px 16px',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Reset Styles
      </button>
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
