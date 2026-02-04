import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BookProvider } from './context/BookContext'
import QueryProvider from './providers/QueryProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryProvider>
    <BookProvider>
      <App />
    </BookProvider>
    </QueryProvider>
  </React.StrictMode>
)