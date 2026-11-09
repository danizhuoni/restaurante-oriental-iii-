import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/cinzel/400.css';
import '@fontsource/cinzel/600.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/jost/400.css';
import '@fontsource/jost/500.css';
import './styles/fonts-zh.css'; // generated subset of Noto Serif SC 600

import './styles/base.css';
import './styles/sections.css';
import './styles/menu.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
