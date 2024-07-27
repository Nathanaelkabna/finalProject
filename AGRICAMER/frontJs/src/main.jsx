import 'bootstrap/dist/css/bootstrap.css';
import './plugins/jquery/jquery.min.js';
import './plugins/bootstrap/js/bootstrap.bundle.min.js';
import './dist/js/adminlte.js';
import './plugins/fontawesome-free/css/all.min.css';
import './dist/css/adminlte.min.css';
import './plugins/overlayScrollbars/css/OverlayScrollbars.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import './index.css';
import { ContextProvider } from './contexts/ContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
)
