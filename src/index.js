import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {initializeApp} from 'firebase/app';
import {getDatabase, set, ref} from 'firebase/database'
import config from './config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <App/>
);
