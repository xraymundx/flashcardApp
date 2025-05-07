import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setupIonicReact } from '@ionic/react';

import '@ionic/react/css/core.css';
import './theme/variables.css';

setupIonicReact();

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
