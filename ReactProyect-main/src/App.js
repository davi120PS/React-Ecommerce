import React, { Fragment } from 'react';
import Header from '../src/componentes/layout/Header';
import Navigation from './componentes/layout/Navigation';
import Clientes from './componentes/clientes/Clientes';
import NuevoCliente from './componentes/clientes/NuevoCliente';
import Pedidos from './componentes/pedidos/Pedidos';
import NuevoPedido from './componentes/pedidos/NuevoPedido';
import Productos from './componentes/Productos/Productos';
import NuevoProducto from './componentes/Productos/NuevoProducto';
import Detallespedido from './componentes/detallespedido/Detallespedido';
import NuevoDetalle from './componentes/detallespedido/NuevoDetalle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
              <Route path="/productos" element={<Productos />} />
              <Route path="/nuevo-producto" element={<NuevoProducto />} />
              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/nuevo-pedido" element={<NuevoPedido />} />
              <Route path="/detallespedido" element={<Detallespedido />} />
              <Route path="/nuevo-detallespedido" element={<NuevoDetalle/>} />
            </Routes>

          </main>
        </div>
      </Fragment>


    </Router>

  );
}
export default App;
