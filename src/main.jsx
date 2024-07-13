
import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import { SearchProvider } from './components/contexts/SearchContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <App />
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);
