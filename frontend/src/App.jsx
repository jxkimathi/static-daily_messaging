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
  // Adding offset of 1 to show day 3 on July 5, 2025
  return (daysSince + 1) % totalMessages;
}

function App() {
  const [message, setMessage] = useState("Loading...");
  const [allMessages, setAllMessages] = useState([]);
  const [showAllMessages, setShowAllMessages] = useState(false);
  const containerRef = useRef(null);
  const [activeText, setActiveText] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [animatingMessages, setAnimatingMessages] = useState(false);

  useEffect(() => {
    fetchMessages();
    
    // Check if device is mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Set up the 3D effect
    const container = containerRef.current;
    const floatingTexts = document.querySelectorAll('.floating-text');
    const textsArray = Array.from(floatingTexts);
    
    const handleMouseMove = (e) => {
      // Skip if we're on mobile
      if (window.innerWidth <= 768) return;
      
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
    
    // Handle click on text elements
    const handleTextClick = (e) => {
      const text = e.currentTarget;
      const textId = text.getAttribute('data-id');
      
      // If this text is already active, deactivate it
      if (textId === activeText) {
        text.classList.remove('active');
        text.style.zIndex = "5";
        setActiveText(null);
        return;
      }
      
      // Reset other active elements
      textsArray.forEach(t => {
        if (t !== text && t.classList.contains('active')) {
          t.classList.remove('active');
          t.style.zIndex = "5";
        }
      });
      
      // Activate this text
      text.classList.add('active');
      text.style.zIndex = "1000";
      setActiveText(textId);
    };
    
    // Add event listeners
    container?.addEventListener('mousemove', handleMouseMove);
    
    textsArray.forEach(text => {
      text.addEventListener('click', handleTextClick);
    });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      container?.removeEventListener('mousemove', handleMouseMove);
      
      textsArray.forEach(text => {
        text?.removeEventListener('click', handleTextClick);
      });
    };
  }, [activeText]);

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
    if (showAllMessages) {
      // Start hiding animation
      setAnimatingMessages(true);
      setTimeout(() => {
        setShowAllMessages(false);
        setAnimatingMessages(false);
      }, 300);
    } else {
      setShowAllMessages(true);
      // Apply animation after rendering
      setTimeout(() => {
        setAnimatingMessages(true);
        setTimeout(() => {
          setAnimatingMessages(false);
        }, 300);
      }, 10);
    }
  };

  return (
    <div className="container" ref={containerRef}>
      {!isMobile ? (
        // Desktop layout with floating paragraphs
        <>
          <p className="floating-text text-1" data-depth="0.2" data-id="text-1">It's finally that time of the year!</p>
          <p className="floating-text text-2" data-depth="0.4" data-id="text-2">You don't deserve to be celebrated on one day but everyday.</p>
          <p className="floating-text text-3" data-depth="0.6" data-id="text-3">For the next 22 days, I've prepared a little something to usher you into 22.</p>
          <p className="floating-text text-4" data-depth="0.8" data-id="text-4">I hope this makes your month a little brighter and lighter.</p>
          <p className="floating-text text-5" data-depth="1.0" data-id="text-5">You are loved, appreciated and deserve to be celebrated.</p>
          <p className="floating-text text-6" data-depth="1.2" data-id="text-6">Here's 22 things about you that make you special even though there's more than a 100 reasons why.</p>
        </>
      ) : (
        // Mobile layout with card-based paragraphs
        <div className="mobile-quotes">
          <div className="quote-card" data-id="text-1" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
            <p>It's finally that time of the year!</p>
          </div>
          <div className="quote-card" data-id="text-2" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
            <p>You don't deserve to be celebrated on one day but everyday.</p>
          </div>
          <div className="quote-card" data-id="text-3" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
            <p>For the next 22 days, I've prepared a little something to usher you into 22.</p>
          </div>
          <div className="quote-card" data-id="text-4" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
            <p>I hope this makes your month a little brighter and lighter.</p>
          </div>
          <div className="quote-card" data-id="text-5" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
            <p>You are loved, appreciated and deserve to be celebrated.</p>
          </div>
          <div className="quote-card" data-id="text-6" onClick={(e) => e.currentTarget.classList.toggle('expanded')}>
            <p>Here's 22 things about you that make you special even though there's more than a 100 reasons why.</p>
          </div>
        </div>
      )}
      
      <div className={`center-content ${isMobile ? 'mobile-center' : ''}`}>
        <h1>Today's Message</h1>
        <div className="message-box">{message}</div>
        
        <div className="button-group">
          <button className="toggle-button" onClick={toggleShowAllMessages}>
            {showAllMessages ? "Hide All Messages" : "Show All Messages"}
          </button>
        </div>
        
        {showAllMessages && (
          <div className={`all-messages ${animatingMessages ? 'animating' : ''}`}>
            <h2>All Messages</h2>
            <ul className="message-list">
              {allMessages.map((msg, index) => (
                <li 
                  key={msg._id || index} 
                  className="message-item"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="message-number">{index + 1}</span> {msg.text}
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
