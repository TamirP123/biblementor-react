import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import "../styles/AskAI.css";

const AskAI = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;


    const newMessage = {
      type: 'user',
      content: question,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate AI response (replace with actual OpenAI integration later)
    setIsLoading(true);
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        content: "I apologize, but the AI response feature is currently in development. Once integrated with OpenAI, I'll be able to provide biblical insights and answer your questions about scripture.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);

    setQuestion('');
  };

  return (
    <div className="ask-ai-page">
      <div className="ask-ai-container">
        <div className="chat-header">
          <h1>Ask AI Bible Mentor</h1>
          <p>Get biblical insights and understanding through AI-powered analysis</p>
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="welcome-message">
              
              <h2>Welcome to AI Bible Mentor</h2>
              <p>Ask me anything about the Bible, scriptures, or spiritual guidance.</p>
              <div className="suggested-questions">
                <h3>Suggested Questions:</h3>
                <button onClick={() => setQuestion("What does the Bible say about love?")}>
                  What does the Bible say about love?
                </button>
                <button onClick={() => setQuestion("Explain John 3:16")}>
                  Explain John 3:16
                </button>
                <button onClick={() => setQuestion("How can I strengthen my faith?")}>
                  How can I strengthen my faith?
                </button>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.type === 'user' ? 'user-message' : 'ai-message'}`}
              >
                <div className="message-content">
                  <div className="message-icon">
                    {message.type === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className="message-text">
                    {message.content}
                  </div>
                </div>
                <div className="message-timestamp">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="message ai-message">
              <div className="message-content">
                <div className="message-icon">🤖</div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="chat-input">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the Bible..."
            className="question-input"
          />
          <button type="submit" className="send-button" disabled={!question.trim()}>
            Ask AI
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskAI; 