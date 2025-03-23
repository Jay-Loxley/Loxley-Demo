import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Slider from './components/Slider/Slider';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Slider />
  </React.StrictMode>,
  document.getElementById('root')
);
