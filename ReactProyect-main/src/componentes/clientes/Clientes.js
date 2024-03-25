import React, { Fragment, useEffect, useState } from 'react';
import ClienteAxios from '../../config/axios';
import {Link} from 'react-router-dom';

function Clientes() {
    const [clientes, guardarClientes] = useState([]);
    const ConsultarAPI = async () => {
        const ClientesConsulta = await ClienteAxios.get('/clientes');

        guardarClientes(ClientesConsulta.data);
        console.log(clientes);

    }
    useEffect(() => {
        ConsultarAPI();
    }, []);

    const deleteCliente = async (id) => {
        try {
            const response = await ClienteAxios.delete('/clientes/'+id+'');
            alert("Cliente Eliminado");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Fragment>
            <h2>Clientes</h2>
            <Link to={"/nuevo-cliente"} class="btn btn-verde nvo-cliente"><i class="fas fa-plus-circle"></i>
                Nuevo cliente
            </Link>

            <ul class="listado-clientes">
                {clientes.map(cliente =>
                    <li class="cliente">
                        <div class="info-cliente">
                            <p class="nombre">{cliente.Nombre}</p>
                            <p class="carrera">{cliente.Correo}</p>
                            <p>{cliente.Direccion}</p>
                        </div>
                        <div class="acciones">
                            <a href="#" class="btn btn-azul">
                                <i class="fas fa-pen-alt"></i>
                                Editar Cliente
                            </a>
                            <button type="button" class="btn btn-rojo btn-eliminar" onClick={()=>deleteCliente(cliente.ClienteID)}>
                            <i class="fas fa-times"></i>
                            Eliminar Cliente
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        </Fragment>
    )
}
export default Clientes;