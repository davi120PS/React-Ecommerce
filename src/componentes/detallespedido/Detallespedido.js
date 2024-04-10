import React, { Fragment, useEffect, useState } from 'react';
import DetallespedidoAxios from '../../config/axios';
import {Link} from 'react-router-dom';

function Detallespedido() {
    const [detallespedidos, guardarDetallespedido] = useState([]);
    const ConsultarAPI = async () => {
        const DetallespedidoConsulta = await DetallespedidoAxios.get('/detallespedido');

        guardarDetallespedido(DetallespedidoConsulta.data);
        console.log(detallespedidos);

    }
    useEffect(() => {
        ConsultarAPI();
    }, []);

    const deleteDetallepedido = async (id) => {
        try {
            const response = await DetallespedidoAxios.delete('/detallespedido/'+id+'');
            alert("Detalle pedido Eliminado");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Fragment>
            <h2>Detalles pedido</h2>
            <Link to={"/nuevo-detallespedido"} class="btn btn-verde nvo-detallespedido"><i class="fas fa-plus-circle"></i>
                Nuevo detalle pedido
            </Link>

            <ul class="listado-detallespedido">
                {detallespedidos.map(detallespedido =>
                    <li class="detallespedido" key={detallespedido.DetalleID}>
                        <div class="info-detallespedido">
                            <p class="Pedido">Pedido: {detallespedido.Pedido}</p>
                            <p class="Producto">Producto: {detallespedido.Producto}</p>
                            <p class="Cantidad">Cantidad: {detallespedido.Cantidad}</p>
                            <p class="Subtotal">Subtotal: {detallespedido.Subtotal}</p>
                        </div>
                        <div class="acciones">
                            <Link to={"/editardetalle/" + detallespedido.DetalleID} class="btn btn-azul">
                                <i class="fas fa-pen-alt"></i>
                                Editar Detalles
                            </Link>
                            <button type="button" class="btn btn-rojo btn-eliminar" onClick={() => deleteDetallepedido(detallespedido.DetalleID)}>
                                <i class="fas fa-times"></i>
                                Eliminar Detalles
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        </Fragment>
    )
}
export default Detallespedido;