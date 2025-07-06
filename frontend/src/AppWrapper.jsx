import { useEffect } from 'react';
import FixedApp from './FixedApp';

function AppWrapper() {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.minHeight = '100vh';
    document.body.style.backgroundColor = '#201c1c';
    document.body.style.color = 'white';
    document.body.style.display = 'block';
    document.body.style.overflow = 'auto';
    document.body.style.position = 'relative';
    
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.width = '100%';
      rootElement.style.minHeight = '100vh';
      rootElement.style.height = 'auto';
      rootElement.style.display = 'block';
      rootElement.style.position = 'relative';
    }
    
    return () => {
    };
  }, []);
  
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      height: 'auto',
      position: 'relative',
      zIndex: 1,
      overflow: 'auto'
    }}>
      <FixedApp />
    </div>
  );
}

export default AppWrapper;
