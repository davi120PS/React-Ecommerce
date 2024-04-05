import React, { Fragment, useEffect, useState } from 'react';
import PedidoAxios from '../../config/axios';

function NuevoPedido(){
    
    const[clientes, guardarCliente] =useState ([]);
    const ConsultarAPI = async() => {
        const ClienteConsulta = await PedidoAxios.get('/clientes');
    
        guardarCliente(ClienteConsulta.data);
        console.log(clientes);
    
    }
    useEffect ( ()=>{
        ConsultarAPI();
    },[]);

    //s
    const [pedido, guardarPedidos] = useState({
        "action":"insert",
        "cliente":"",
        "fecha":"",
        "estado":""
    });

    const actualizarState = e =>{
        //console.log(e.target.value);
        guardarPedidos({
            ...pedido,
            [e.target.name]: e.target.value
        })
    }

    const AgregarPedido = e =>{
        e.preventDefault();
        PedidoAxios.post('/pedidos', pedido).then(res=>{alert("Pedido Guardado");window.location.reload();console.log(res)});
    }

    const validarPedido = ()=>{
        const{cliente,fechapedido,estado} = pedido;
        let valido = !cliente.length || !fechapedido.length || !estado.length;
        return valido;
    }

    return (
        <Fragment>
        <h2>Nuevo Pedido</h2>

            <form onSubmit={(AgregarPedido)}>
                <legend>Llena todos los campos</legend>

                <div class="campo">
                    <label>Cliente:</label>
                    <select name="cliente" onChange={actualizarState}>
                        <option value="">Seleccione un cliente</option>
                        {clientes.map(cliente=> <option value={cliente.ClienteID}>{cliente.Nombre}</option>)}
                    </select>
                </div>
            
                <div class="campo">
                    <label>Fecha pedido:</label>
                    <input type="date" placeholder="Fecha de pedido" name="fechapedido" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Estado:</label>
                    <select name="estado" onChange={actualizarState}>
                        <option value="">Seleccione una opcion</option>
                        <option value="1">Enviado</option>
                        <option value="2">En proceso</option>
                        <option value="3">Entregado</option>
                    </select>
                </div>

                <div class="enviar">
                        <input type="submit" class="btn btn-azul" value="Agregar Pedido" disabled = {validarPedido()}/>
                </div>

            </form>
        </Fragment>
    )
}
export default NuevoPedido;