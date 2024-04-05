import React, { Fragment, useEffect, useState } from 'react';
import PedidoAxios from '../../config/axios';

function NuevoPedido(){
    
    const[pedidos, guardarCarrera] =useState ([]);
    const ConsultarAPI = async() => {
        const CarreraConsulta = await PedidoAxios.get('/pedidos');
    
        guardarCarrera(CarreraConsulta.data);
        console.log(pedidos);
    
    }
    useEffect ( ()=>{
        ConsultarAPI();
    },[]);

    //s
    const [pedido, guardarPedido] = useState({
        "action":"insert",
        "cliente":"",
        "fecha":"",
        "estado":""
    });

    const actualizarState = e =>{
        //console.log(e.target.value);
        guardarPedido({
            ...pedido,
            [e.target.name]: e.target.value
        })
    }

    const AgregarPedido = e =>{
        e.preventDefault();
        PedidoAxios.post('/pedidos', pedido).then(res=>{alert("Pedido Guardado");window.location.reload();console.log(res)});
    }

    const validarPedido = ()=>{
        const{cliente,fecha,estado} = pedido;
        let valido = !cliente.length || !fecha.length || !estado.length;
        return valido;
    }

    return (
        <Fragment>
        <h2>Nuevo Pedido</h2>

            <form onSubmit={(AgregarPedido)}>
                <legend>Llena todos los campos</legend>

                <div class="campo">
                    <label>Cliente ID:</label>
                    <input type="number" placeholder="Cliente relacionado" name="cliente" onChange={actualizarState}/>
                </div>
            
                <div class="campo">
                    <label>Fecha pedido:</label>
                    <input type="date" placeholder="Fecha de pedido" name="fecha" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Estado:</label>
                    <input type="text" placeholder="Estado" name="estado" onChange={actualizarState}/>
                </div>

                <div class="enviar">
                        <input type="submit" class="btn btn-azul" value="Agregar Pedido" disabled = {validarPedido()}/>
                </div>

            </form>
        </Fragment>
    )
}
export default NuevoPedido;