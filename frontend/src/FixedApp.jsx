import { useEffect, useState, useRef } from 'react';
import './App.css';
import './3d-effect.css';
import './scroll-indicator.css';
import messageApi from './api';

function getMessageIndex(startDate, totalMessages) {
  const now = new Date();
  const eightPM = new Date(now);
  eightPM.setHours(20, 0, 0, 0);
  
  return 13;
}

function App() {
  
  const [message, setMessage] = useState("Loading...");
  const [allMessages, setAllMessages] = useState([]);
  const [showAllMessages, setShowAllMessages] = useState(false);
  const containerRef = useRef(null);
  const [activeText, setActiveText] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [animatingMessages, setAnimatingMessages] = useState(false);
  const [error, setError] = useState(null);

  const handleTextClick = (e) => {
    const text = e.currentTarget;
    const textId = text.getAttribute('data-id');
    
    if (textId === activeText) {
      text.classList.remove('active');
      text.style.zIndex = "5";
      setActiveText(null);
    } else {
      document.querySelectorAll('.floating-text.active').forEach(t => {
        if (t !== text) {
          t.classList.remove('active');
          t.style.zIndex = "5";
        }
      });
      
      text.classList.add('active');
      text.style.zIndex = "1000";
      setActiveText(textId);
    }
  };

  useEffect(() => {
    
    document.body.style.backgroundColor = '#201c1c';
    document.body.style.color = 'white';
    document.body.style.height = 'auto';
    document.body.style.minHeight = '100vh';
    document.body.style.overflow = 'auto';
    document.body.style.display = 'block';
    
    fetchMessages();
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    
    try {
      const container = containerRef.current;
      
      if (!container) {
        return;
      }
      
      const floatingTexts = document.querySelectorAll('.floating-text');
      
      const textsArray = Array.from(floatingTexts);
      
      const handleMouseMove = (e) => {
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
      
      container.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('mousemove', handleMouseMove);
      };
    } catch (err) {
      setError("Error setting up 3D effects: " + err.message);
    }
  }, [activeText, isMobile]);

  useEffect(() => {
  }, [activeText]);

  const fetchMessages = () => {
    messageApi.getAllMessages()
      .then(messages => {
        setAllMessages(messages);

        if (messages.length > 0) {
          const index = getMessageIndex('2025-07-03T20:00:00', messages.length);
          setMessage(messages[index].text);
        } else {
          setMessage("No messages yet.");
        }
      })
      .catch(err => {
        setError("Failed to fetch messages: " + err.message);
        setMessage("Failed to load message. Check console for errors.");
      });
  };

  const toggleShowAllMessages = () => {
    if (showAllMessages) {
      setAnimatingMessages(true);
      setTimeout(() => {
        setShowAllMessages(false);
        setAnimatingMessages(false);
      }, 300);
    } else {
      setShowAllMessages(true);
      setTimeout(() => {
        setAnimatingMessages(true);
        setTimeout(() => {
          setAnimatingMessages(false);
        }, 300);
      }, 10);
    }
  };

  useEffect(() => {
    if (showAllMessages) {
      const messagesContainer = document.querySelector('.all-messages');
      if (messagesContainer) {
        const handleScroll = () => {
          if (messagesContainer.scrollTop > 20) {
            messagesContainer.classList.add('scrolled');
          } else {
            messagesContainer.classList.remove('scrolled');
          }
        };
        
        messagesContainer.addEventListener('scroll', handleScroll);
        return () => messagesContainer.removeEventListener('scroll', handleScroll);
      }
    }
  }, [showAllMessages]);

  return (
    <div className="container" ref={containerRef} style={{ position: 'relative', zIndex: 10 }}>
      {!isMobile ? (
        <>
          <p className="floating-text text-1" data-depth="0.2" data-id="text-1" onClick={handleTextClick}>
            It's finally that time of the year!
          </p>
          <p className="floating-text text-2" data-depth="0.4" data-id="text-2" onClick={handleTextClick}>
            You don't deserve to be celebrated on one day but everyday.
          </p>
          <p className="floating-text text-3" data-depth="0.6" data-id="text-3" onClick={handleTextClick}>
            For the next 22 days, I've prepared a little something to usher you into 22.
          </p>
          <p className="floating-text text-4" data-depth="0.8" data-id="text-4" onClick={handleTextClick}>
            I hope this makes your month a little brighter and lighter.
          </p>
          <p className="floating-text text-5" data-depth="1.0" data-id="text-5" onClick={handleTextClick}>
            You are loved, appreciated and deserve to be celebrated.
          </p>
          <p className="floating-text text-6" data-depth="1.2" data-id="text-6" onClick={handleTextClick}>
            Here's 22 things about you that make you special even though there's more than a 100 reasons why.
          </p>
        </>
      ) : (
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
          <div 
            className={`all-messages ${animatingMessages ? 'animating' : ''}`}
            style={{ touchAction: 'pan-y', position: 'relative' }}
          >
            <h2>All Messages</h2>
            <ul className="message-list">
              {[...allMessages].reverse().map((msg, index) => (
                <li 
                  key={msg._id || index} 
                  className="message-item"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="message-number">{allMessages.length - index}</span> {msg.text}
                </li>
              ))}
            </ul>
            <div className="scroll-indicator"></div>
          </div>
        )}
        
        {error && (
          <div style={{ 
            backgroundColor: 'rgba(255,0,0,0.2)', 
            border: '1px solid red',
            padding: '15px', 
            borderRadius: '8px', 
            marginTop: '20px',
            color: 'white',
            textAlign: 'left',
            fontSize: '0.8rem'
          }}>
            <h3 style={{ marginTop: 0 }}>Error</h3>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
