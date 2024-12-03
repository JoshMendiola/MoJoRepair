import React, { useState } from 'react';
import '../../css/VulnerableMessageBoard.css';

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
    try {
      const clearResponse = await fetch('http://147.182.176.235/api/xss-demo/clear', {
        method: 'POST',
        credentials: 'include'
      });

      if (!clearResponse.ok) {
        console.error('Failed to clear messages');
        return;
      }

      const resetMessage = `
      <style>
      /* Dark theme reset styles */
      html, body, div, h1, h2, h3, h4, h5, h6, p, form, input, textarea, button, label {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        color: var(--primary-color);
        background: initial;
      }

      body {
        font-family: var(--body-font);
        line-height: 1.6;
        color: var(--primary-color);
        background: var(--background-color);
      }

      .login-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: var(--surface-color);
        border-radius: 8px;
      }

      .form-group {
        margin-bottom: 15px;
      }

      .form-group label {
        display: block;
        margin-bottom: 5px;
        color: var(--primary-color);
      }

      .form-group input,
      .form-group textarea {
        width: 100%;
        padding: 8px;
        background-color: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        color: var(--primary-color);
      }

      .form-group textarea {
        min-height: 100px;
        resize: vertical;
      }

      .error {
        color: var(--accent-color);
        margin: 10px 0;
      }

      button {
        background-color: var(--secondary-color);
        color: var(--background-color);
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      button:hover {
        opacity: 0.9;
      }

      .messages-section {
        margin-top: 30px;
      }

      .message-card {
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 15px;
        margin-bottom: 15px;
        border-radius: 4px;
      }

      .message-meta {
        font-size: 0.9em;
        color: rgba(255, 255, 255, 0.6);
        margin-top: 5px;
      }
      </style>
      <div style="padding: 10px; background: var(--surface-color); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 4px; margin-bottom: 10px; color: var(--primary-color);">
        Styles have been reset!
      </div>
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
        className="reset-button"
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