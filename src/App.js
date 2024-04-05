import React, { Fragment } from 'react';
import Header from '../src/componentes/layout/Header';
import Navigation from './componentes/layout/Navigation';
import Clientes from './componentes/clientes/Clientes';
import NuevoCliente from './componentes/clientes/NuevoCliente';
import EditarCliente from './componentes/clientes/EditarCliente';
import Pedidos from './componentes/pedidos/Pedidos';
import NuevoPedido from './componentes/pedidos/NuevoPedido';
import EditarPedido from './componentes/pedidos/EditarPedido';
import Productos from './componentes/productos/Productos';
import NuevoProducto from './componentes/productos/NuevoProducto';
import EditarProducto from './componentes/productos/EditarProducto';
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
              <Route path="/editar-cliente/:id" element={<EditarCliente/>} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/nuevo-producto" element={<NuevoProducto />} />
              <Route path="/editar-producto/:id" element={<EditarProducto/>} />
              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/nuevo-pedido" element={<NuevoPedido />} />
              <Route path="/editarpedido/:id" element={<EditarPedido />} />
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
