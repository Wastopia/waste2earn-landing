import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaPaperPlane, FaSmile, FaRobot } from 'react-icons/fa';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [welcomeShown, setWelcomeShown] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const miniPromptRef = useRef(null);
  const quickMessageRef = useRef('');

  // Force clear localStorage for testing
  useEffect(() => {
    localStorage.removeItem('chatInteracted');
    console.log("Cleared localStorage");
  }, []);

  // Check local storage on component mount and delay mini prompt appearance
  useEffect(() => {
    console.log("Setting up prompt timer...");
    
    // For testing purposes, let's bypass the localStorage check
    // and always show the prompt after 3 seconds
    const promptTimer = setTimeout(() => {
      console.log("Timer fired - showing prompt");
      setShowPrompt(true);
    }, 3000);
    
    return () => {
      console.log("Cleaning up timer");
      clearTimeout(promptTimer);
    };
  }, []);

  // Handle click outside to close mini prompt
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (miniPromptRef.current && !miniPromptRef.current.contains(event.target) && 
          !event.target.closest('.chat-toggle-btn')) {
        setShowPrompt(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && !welcomeShown) {
      setIsTyping(true);
      
      // Simulate AI typing example
      const timer = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            type: 'assistant',
            content: 'Hello! I\'m your WasteBot AI Assistant. How can I help you today?'
          }
        ]);
        setWelcomeShown(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, welcomeShown]);

  // Process quick message from mini prompt if available when opening chat
  useEffect(() => {
    if (isOpen && quickMessageRef.current && welcomeShown) {
      const quickMsg = quickMessageRef.current;
      
      // Only process if we have a message and welcome has been shown
      if (quickMsg && messages.length === 1) {
        // Add the user message (after a small delay to let the welcome message be seen)
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: 'user',
            content: quickMsg
          }]);
          
          // Then simulate assistant typing
          setIsTyping(true);
          
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              type: 'assistant',
              content: `Thanks for your message about "${quickMsg}"! Our team is working on integrating a real AI assistant. For now, this is a demo of the chat interface.`
            }]);
          }, 1500);
          
          // Clear the ref
          quickMessageRef.current = '';
        }, 500);
      }
    }
  }, [isOpen, welcomeShown, messages.length]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    if (!hasInteracted) {
      setHasInteracted(true);
      localStorage.setItem('chatInteracted', 'true');
    }
    
    // Hide mini prompt when main chat is opened
    if (!isOpen) {
      setShowPrompt(false);
    }
  };

  const handleQuickMessageSubmit = (e) => {
    e.preventDefault();
    const quickMessage = e.target.elements.quickMessage.value.trim();
    if (!quickMessage) return;
    
    // Store the quick message in ref to be used after chat opens
    quickMessageRef.current = quickMessage;
    
    // Reset form
    e.target.reset();
    
    // Open chat
    setShowPrompt(false);
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = { type: 'user', content: message };
    setMessages([...messages, userMessage]);
    
    // Clear input
    setMessage('');
    
    // Simulate AI response
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: `Thanks for your message! Our team is working on integrating a real AI assistant. For now, this is a demo of the chat interface.`
      }]);
    }, 1500);
  };

  // Debug rendering
  console.log("Rendering with showPrompt =", showPrompt, "isOpen =", isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Mini Chat Prompt */}
      {showPrompt && !isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl" ref={miniPromptRef}>
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white">
                <FaRobot />
              </div>
              <div>
                <div className="font-semibold">WasteBot</div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Online
                </div>
              </div>
              <button onClick={() => setShowPrompt(false)} className="ml-auto text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg p-3 mb-4 text-gray-500">
              Hello! I&apos;m WasteBot, AI Assistant. How can I help you today?
            </div>
            
            <form onSubmit={handleQuickMessageSubmit} className="flex items-center space-x-2">
              <FaSmile className="text-gray-400" />
              <input 
                type="text" 
                name="quickMessage"
                placeholder="Ask me anything..." 
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="bg-green-500 text-white p-2 rounded-lg hover:bg-blue-600">
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-black">
                <FaRobot />
              </div>
              <div>
                <div className="font-semibold">WasteBot Assistant</div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Online
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="ml-auto text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  msg.type === 'user' 
                    ? 'bg-green-800 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <button type="button" className="text-gray-400 hover:text-gray-600">
                <FaSmile />
              </button>
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                className="flex-1 text-gray-800 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit" 
                className={`p-2 rounded-lg ${
                  message.trim() 
                    ? 'bg-green-400 text-white hover:bg-green-600' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!message.trim()}
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Chat Toggle Button */}
      <button 
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${
          isOpen ? 'bg-purple-500 hover:bg-purple-600' : 'bg-green-500 hover:bg-green-600'
        }`}
        onClick={toggleChat}
        aria-label="Chat with assistant"
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>
    </div>
  );
};

export default ChatWidget;