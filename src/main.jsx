import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import {AuthProvider} from './context/authProvider.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);