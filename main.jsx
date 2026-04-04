import React from 'react'
import ReactDOM from 'react-dom/client'
import {Studio} from 'sanity'
import config from './sanity.config'
import './src/styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Studio config={config} />
  </React.StrictMode>,
)
