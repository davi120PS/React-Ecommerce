import React, { Fragment, useEffect, useState } from 'react';
import ClienteAxios from '../../config/axios';
import { useParams } from 'react-router-dom';

function EditarPedido(){
    
    let params = useParams();
    console.log(params.id);

    const[clientes, guardarCliente] =useState ([]);
    const [pedido, guardareditarPedido] = useState({
        action :'update',
        cliente:'', 
        fechapedido:'', 
        estado:'',
        id:''+params.id+''    
    });

    const ConsultarAPI = async() => {
        const ClienteConsulta = await ClienteAxios.get('/clientes');
        const PedidoConsulta = await ClienteAxios.get('/pedidos/'+params.id+'');
    
        guardarCliente(ClienteConsulta.data);
        guardareditarPedido(PedidoConsulta.data[0]);
    }
    useEffect ( ()=>{
        ConsultarAPI();
    },[]);

    const actualizarState = e =>{
        guardareditarPedido({
            ...pedido,
            [e.target.name]: e.target.value
        })
    }

    const ModificarPedido = e =>{
        e.preventDefault();
        ClienteAxios.post('/pedidos', pedido).then(res=>{
            alert("Pedido Modificado");
            window.location.reload();
            console.log(res);   
        });
    }

    const validarPedido = ()=>{
        const{cliente,fechapedido,estado} = pedido;
        let valido = !cliente.length || !fechapedido.length || !estado.length;
        return valido;
    }

    return (
        <Fragment>
        <h2>Editar Pedido</h2>
        
            <form onSubmit={(ModificarPedido)}>
                <legend>Llena todos los campos</legend>
            
                <div class="campo">
                    <label>Cliente:</label>
                    <select name="cliente" onChange={actualizarState}>
                        {clientes.map(cliente=>
                            <option value={cliente.ClienteID} selected={cliente.ClienteID === pedido.cliente}>
                                {cliente.Nombre}
                            </option>
                        )}
                    </select>
                </div>

                <div class="campo">
                    <label>Fecha:</label>
                    <input type="date" placeholder="Fecha Pedido" name="fechapedido" onChange={actualizarState} value={pedido.fechapedido ? pedido.fechapedido.slice(0, 10) : ''} />
                </div>


                <div class="campo">
                    <label>Estado</label>

                    <select name="estado" onChange={actualizarState}>
                        <option value="Enviado" selected={pedido.estado === "Enviado"}>Enviado</option>
                        <option value="En proceso" selected={pedido.estado === "En proceso"}>En proceso</option>
                        <option value="Entregado" selected={pedido.estado === "Entregado"}>Entregado</option>
                    </select>

                </div>

                <div class="enviar">
                        <input type="submit" class="btn btn-azul" value="Actualizar Información Pedido"/>
                </div>

            </form>
        </Fragment>
    )
}
export default EditarPedido;