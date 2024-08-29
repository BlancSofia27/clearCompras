
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './views/inicio';
import AdminPanel from './views/AdminPanel'
import PostForm from './views/postForm';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define la ruta principal */}
          <Route path="/" element={<Inicio />} />
          {/*otras rutas */}
          <Route path="/adminPanel" element={<AdminPanel/>} />
          <Route path="/NewPublic" element={<PostForm/>} />
          {/* Redirecciona rutas no válidas al inicio */}
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


