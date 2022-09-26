import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routers/AppRouter'
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<AppRouter />);