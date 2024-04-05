import React, { Fragment, useEffect, useState } from 'react';
import PedidoAxios from '../../config/axios';
import {Link} from 'react-router-dom';

function Pedidos() {
    const [pedidos, guardarPedidos] = useState([]);
    const ConsultarAPI = async () => {
        const PedidosConsulta = await PedidoAxios.get('/pedidos');

        guardarPedidos(PedidosConsulta.data);
        console.log(pedidos);

    }
    useEffect(() => {
        ConsultarAPI();
    }, []);

    const deletePedido = async (id) => {
        try {
            const response = await PedidoAxios.delete('/pedidos/'+id+'');
            alert("Pedido Eliminado");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Fragment>
            <h2>Pedidos</h2>
            <Link to={"/nuevo-pedido"} class="btn btn-verde nvo-pedido"><i class="fas fa-plus-circle"></i>
                Nuevo pedido
            </Link>

            <ul class="listado-pedidos">
                {pedidos.map(pedido =>
                    <li class="pedido" key={pedido.PedidoID}>
                        <div class="info-pedido">
                            <p class="cliente">{pedido.ClienteID}</p>
                            <p class="carrera">{pedido.FechaPedido}</p>
                            <p>{pedido.Estado}</p>
                        </div>
                        <div class="acciones">
                            <Link to={"/editarpedido/" + pedido.PedidoID} class="btn btn-azul">
                                <i class="fas fa-pen-alt"></i>
                                Editar Pedido
                            </Link>
                            <button type="button" class="btn btn-rojo btn-eliminar" onClick={() => deletePedido(pedido.PedidoID)}>
                                <i class="fas fa-times"></i>
                                Eliminar pedido
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        </Fragment>
    )
}
export default Pedidos;