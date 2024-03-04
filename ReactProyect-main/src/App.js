import React, { Fragment } from 'react';
import Header from '../src/componentes/layout/Header';
import Navigation from './componentes/layout/Navigation';
import Clientes from './componentes/clientes/Clientes';
import Pedidos from './componentes/pedidos/Pedidos';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NuevoCliente from './componentes/clientes/NuevoCliente';
import NuevoProducto from './componentes/productos/NuevoProducto';
import Productos from './componentes/productos/Productos';


function App() {
  return (

    <Router>

      <Fragment>
        <Header />

        <div class="grid contenedor contenido-principal">
          <Navigation />
          <main class="caja-contenido col-9">

            <Routes>
              <Route path="/" element={<Clientes />} />
              <Route path="/nuevo-cliente" element={<NuevoCliente />} />
              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/nuevo-producto" element={<NuevoProducto />} />
            </Routes>

          </main>
        </div>
      </Fragment>


    </Router>

  );
}
export default App;