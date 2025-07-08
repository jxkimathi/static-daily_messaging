import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './reset.css'
import './index.css'
import AppWrapper from './AppWrapper.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    console.log('Mounting AppWrapper');
    
    rootElement.style.width = '100%';
    rootElement.style.height = '100vh';
    rootElement.style.position = 'relative';
    rootElement.style.zIndex = '10';
    
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <AppWrapper />
        </ErrorBoundary>
      </StrictMode>,
    );
  } catch (error) {
    console.error('Failed to mount React app:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; margin: 20px auto; max-width: 800px; border: 1px solid #f5c6cb; border-radius: 4px; background-color: #f8d7da; color: #721c24">
        <h1>Failed to load the application</h1>
        <p>There was an error initializing the application. Please check the console for more details.</p>
        <p>Error: ${error.message}</p>
      </div>
    `;
  }
} else {
  console.error('Root element not found in the document');
  document.body.innerHTML = `
    <div style="padding: 20px; margin: 20px auto; max-width: 800px; border: 1px solid #f5c6cb; border-radius: 4px; background-color: #f8d7da; color: #721c24">
      <h1>Failed to load the application</h1>
      <p>The root element was not found in the document.</p>
    </div>
  `;
}
