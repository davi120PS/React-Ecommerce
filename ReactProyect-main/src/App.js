import React, { Fragment } from 'react';
import Header from '../src/componentes/layout/Header';
import Navigation from './componentes/layout/Navigation';
import Alumnos from './componentes/alumnos/Alumnos';
import Calificaciones from './componentes/calificaciones/Calificaciones';
import Carreras from './componentes/carreras/Carreras';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NuevoAlumno from './componentes/alumnos/NuevoAlumno';

function App() {
  return (

    <Router>

      <Fragment>
        <Header />

        <div class="grid contenedor contenido-principal">
          <Navigation />
          <main class="caja-contenido col-9">

            <Routes>
              <Route path="/" element={<Alumnos />} />
              <Route path="/nuevo-alumno" element={<NuevoAlumno />} />
              <Route path="/carreras" element={<Carreras />} />
              <Route path="/calificaciones" element={<Calificaciones />} />
            </Routes>

          </main>
        </div>
      </Fragment>


    </Router>

  );
}
export default App;
