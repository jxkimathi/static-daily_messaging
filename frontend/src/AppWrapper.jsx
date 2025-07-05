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
    
    const debugElement = document.createElement('div');
    debugElement.style.position = 'fixed';
    debugElement.style.top = '5px';
    debugElement.style.left = '5px';
    debugElement.style.padding = '5px';
    debugElement.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
    debugElement.style.color = 'white';
    debugElement.style.fontSize = '10px';
    debugElement.style.zIndex = '9999';
    debugElement.style.borderRadius = '3px';
    debugElement.textContent = 'DEBUG: App Mounted';
    document.body.appendChild(debugElement);
    
    return () => {
      if (document.body.contains(debugElement)) {
        document.body.removeChild(debugElement);
      }
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
