import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { LangProvider } from './context/LangContext'
import { BriefProvider } from './context/BriefContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<ThemeProvider>
<LangProvider>
 <BriefProvider>
          <App />
        </BriefProvider>
</LangProvider>
</ThemeProvider>
</React.StrictMode>
)