import { useEffect, useState, useRef } from 'react';
import './App.css';
import './3d-effect.css';
import messageApi from './api';

function getMessageIndex(startDate, totalMessages) {
  const now = new Date();
  const eightPM = new Date(now);
  eightPM.setHours(20, 0, 0, 0);

  if (now < eightPM) {
    eightPM.setDate(eightPM.getDate() - 1);
  }

  const daysSince = Math.floor((eightPM - new Date(startDate)) / (1000 * 60 * 60 * 24));
  return daysSince % totalMessages;
}

function App() {
  const [message, setMessage] = useState("Loading...");
  const [allMessages, setAllMessages] = useState([]);
  const [showAllMessages, setShowAllMessages] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    
    // Set up the 3D effect
    const container = containerRef.current;
    const floatingTexts = document.querySelectorAll('.floating-text');
    const textsArray = Array.from(floatingTexts);
    
    const handleMouseMove = (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      
      textsArray.forEach(text => {
        if (!text.classList.contains('active')) {
          const depth = parseFloat(text.getAttribute('data-depth') || 0.5);
          const rotateX = yAxis * depth;
          const rotateY = xAxis * depth * -1;
          text.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(20px)`;
        }
      });
    };
    
    // Use a debounced version of mouse enter to prevent rapid state changes
    let activeTextTimeout = null;
    const handleMouseEnter = (e) => {
      const text = e.currentTarget;
      
      clearTimeout(activeTextTimeout);
      
      // Reset other active elements
      textsArray.forEach(t => {
        if (t !== text && t.classList.contains('active')) {
          t.classList.remove('active');
          t.style.zIndex = "5";
        }
      });
      
      // Add active class after a short delay to prevent flickering
      setTimeout(() => {
        text.classList.add('active');
        text.style.zIndex = "1000";
      }, 50);
    };
    
    const handleMouseLeave = (e) => {
      const text = e.currentTarget;
      
      // Clear any pending activation
      clearTimeout(activeTextTimeout);
      
      // Remove active class
      text.classList.remove('active');
      
      // Set a longer timeout for reset to ensure transition completes
      activeTextTimeout = setTimeout(() => {
        if (!text.classList.contains('active')) {
          text.style.zIndex = "5";
          
          // Apply default transform based on current mouse position
          const rect = container.getBoundingClientRect();
          const xAxis = (window.innerWidth / 2 - (rect.left + rect.width / 2)) / 25;
          const yAxis = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / 25;
          const depth = parseFloat(text.getAttribute('data-depth') || 0.5);
          const rotateX = yAxis * depth;
          const rotateY = xAxis * depth * -1;
          text.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(20px)`;
        }
      }, 500);
    };
    
    // Add event listeners
    container?.addEventListener('mousemove', handleMouseMove);
    
    textsArray.forEach(text => {
      text.addEventListener('mouseenter', handleMouseEnter);
      text.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      container?.removeEventListener('mousemove', handleMouseMove);
      
      textsArray.forEach(text => {
        text?.removeEventListener('mouseenter', handleMouseEnter);
        text?.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const fetchMessages = () => {
    messageApi.getAllMessages()
      .then(messages => {
        setAllMessages(messages);

        if (messages.length > 0) {
          const index = getMessageIndex('2024-01-01T20:00:00', messages.length);
          setMessage(messages[index].text);
        } else {
          setMessage("No messages yet.");
        }
      })
      .catch(err => {
        console.error(err);
        setMessage("Failed to load message.");
      });
  };

  const toggleShowAllMessages = () => {
    setShowAllMessages(!showAllMessages);
  };

  return (
    <div className="container" ref={containerRef}>
      <p className="floating-text text-1" data-depth="0.2">It's finally that time of the year!</p>
      <p className="floating-text text-2" data-depth="0.4">You don't deserve to be celebrated on one day but everyday.</p>
      <p className="floating-text text-3" data-depth="0.6">For the next 22 days, I've prepared a little something to usher you into 22.</p>
      <p className="floating-text text-4" data-depth="0.8">I hope this makes your month a little brighter and lighter.</p>
      <p className="floating-text text-5" data-depth="1.0">You are loved, appreciated and deserve to be celebrated.</p>
      <p className="floating-text text-6" data-depth="1.2">Here's 22 things about you that make you special even though there's more than a 100 reasons why.</p>
      
      <div className="center-content">
        <h1>Today's Message</h1>
        <div className="message-box">{message}</div>
        
        <div className="button-group">
          <button className="toggle-button" onClick={toggleShowAllMessages}>
            {showAllMessages ? "Hide All Messages" : "Show All Messages"}
          </button>
        </div>
        
        {showAllMessages && (
          <div className="all-messages">
            <h2>All Messages</h2>
            <ul className="message-list">
              {allMessages.map((msg, index) => (
                <li key={msg._id || index} className="message-item">
                  <span className="message-number">{index + 1}.</span> {msg.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
