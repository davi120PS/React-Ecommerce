import React, { Fragment, useEffect, useState } from 'react';
import DetallespedidoAxios from '../../config/axios';

function NuevoDetallespedido(){
    
    const[detallespedidos, guardarCarrera] =useState ([]);
    const ConsultarAPI = async() => {
        const CarreraConsulta = await DetallespedidoAxios.get('/pedidos');
    
        guardarCarrera(CarreraConsulta.data);
        console.log(detallespedidos);
    
    }
    useEffect ( ()=>{
        ConsultarAPI();
    },[]);

    //s
    const [detalles, guardarDetallespedido] = useState({
        "action":"insert",
        "pedido":"",
        "producto":"",
        "cantidad":"",
        "preciounitario":"",
        "subtotal":""
    });

    const actualizarState = e =>{
        //console.log(e.target.value);
        guardarDetallespedido({
            ...detalles,
            [e.target.name]: e.target.value
        })
    }

    const AgregarDetallespedido = e =>{
        e.preventDefault();
        DetallespedidoAxios.post('/detallespedido', detalles).then(res=>{alert("Detalle pedido Guardado");window.location.reload();console.log(res)});
    }

    const validarDetallespedido = ()=>{
        const{pedido,producto,cantidad,preciounitario,subtotal} = detalles;
        let valido = !pedido.length || !producto.length || !cantidad.length || !preciounitario.length || !subtotal.length;
        return valido;
    }

    return (
        <Fragment>
        <h2>Nuevo Detalle pedido</h2>

            {/* <form action="/alumnos" method="POST"> */}
            {/* <form onSubmit={(AgregarAlumno)}> */}
            <form onSubmit={(AgregarDetallespedido)}>
                <legend>Llena todos los campos</legend>

                <div class="campo">
                    <label>Pedido ID:</label>
                    <input type="number" placeholder="Pedido relacionado" name="pedido" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Producto ID:</label>
                    <input type="number" placeholder="Producto relacionado" name="producto" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Cantidad:</label>
                    <input type="number" placeholder="Cuanto se compro" name="cantidad" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Precio unitario:</label>
                    <input type="number" placeholder="Precio por pieza" name="preciounitario" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Subtotal:</label>
                    <input type="number" placeholder="subtotal" name="subtotal" onChange={actualizarState}/>
                </div>
            

                <div class="enviar">
                        <input type="submit" class="btn btn-azul" value="Agregar Detalle pedido" disabled = {validarDetallespedido()}/>
                </div>

            </form>
        </Fragment>
    )
}
export default NuevoDetallespedido;