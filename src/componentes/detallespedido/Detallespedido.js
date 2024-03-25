import React, { Fragment, useEffect, useState } from 'react';
import DetallespedidoAxios from '../../config/axios';
import {Link} from 'react-router-dom';

function Detallespedido() {
    const [detallespedido, guardarDetallespedido] = useState([]);
    const ConsultarAPI = async () => {
        const DetallespedidoConsulta = await DetallespedidoAxios.get('/detallespedido');

        guardarDetallespedido(DetallespedidoConsulta.data);
        console.log(detallespedido);

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
                {detallespedido.map(detallespedido =>
                    <li class="detallespedido">
                        <div class="info-detallespedido">
                            <p class="Pedido">{detallespedido.PedidoID}</p>
                            <p class="Producto">{detallespedido.ProductoID}</p>
                            <p class="Cantidad">{detallespedido.Cantidad}</p>
                            <p class="Precio Unitario">{detallespedido.PrecioUnitario}</p>
                            <p class="Subtotal">{detallespedido.Subtotal}</p>
                        </div>
                        <div class="acciones">
                            <a href="#" class="btn btn-azul">
                                <i class="fas fa-pen-alt"></i>
                                Editar detalle pedido
                            </a>
                            <button type="button" class="btn btn-rojo btn-eliminar" onClick={() => deleteDetallepedido(detallespedido.DetalleID)}>
                                <i class="fas fa-times"></i>
                                Eliminar detalle pedido
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        </Fragment>
    )
}
export default Detallespedido;