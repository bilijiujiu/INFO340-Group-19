import { useState } from 'react';
import axios from 'axios';

function AIChat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const API_KEY = 'AIzaSyD6cKy8ap-6oPpm-9KZz3oclNB2DMCj3G0';

async function sendMessage() {
  if (!message.trim()) return;

  const userMessage = {
    role: 'user',
    text: message
  };

  setChat(prev => [...prev, userMessage]);

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          }
        ]
      }
    );

    const aiText =
      response.data.candidates[0].content.parts[0].text;

    const aiMessage = {
      role: 'ai',
      text: aiText
    };

    setChat(prev => [...prev, aiMessage]);
  } catch (error) {
    console.log(error.response?.data || error);

    const aiMessage = {
      role: 'ai',
      text: 'AI temporarily unavailable.'
    };

    setChat(prev => [...prev, aiMessage]);
  }

  setMessage('');
}

  return (
    <div className="ai-chat">
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === 'user'
                ? 'message user'
                : 'message ai'
            }
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-row">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask AI anything..."
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default AIChat;