import React, { Fragment, useEffect, useState } from 'react';
import DetallespedidoAxios from '../../config/axios';
import { useParams } from 'react-router-dom';

function EditarPedido(){
    
    let params = useParams();
    console.log(params.id);

    const[pedidos, guardarPedido] =useState ([]);
    const[productos, guardarProducto] =useState ([]);
    const [detalle, guardareditarDetallepedido] = useState({
        action :'update',
        "pedido":"",
        "producto":"",
        "cantidad":"",
        "subtotal":"",
        id:''+params.id+''    
    });

    const ConsultarAPI = async() => {
        const PedidoConsulta = await DetallespedidoAxios.get('/pedidos');
        const ProductoConsulta = await DetallespedidoAxios.get('/productos');
        const DetallepedidoConsulta = await DetallespedidoAxios.get('/detallespedido/'+params.id+'');
    
        guardarPedido(PedidoConsulta.data);
        guardarProducto(ProductoConsulta.data);
        guardareditarDetallepedido(DetallepedidoConsulta.data[0]);  
    }
    useEffect ( ()=>{
        ConsultarAPI();
    },[]);

    const actualizarState = e =>{
        guardareditarDetallepedido({
            ...detalle,
            [e.target.name]: e.target.value
        })
    }

    const ModificarDetalle = e =>{
        e.preventDefault();
        DetallespedidoAxios.post('/detallespedido', detalle).then(res=>{
            alert("Detalles Modificado");
            window.location.reload();
            console.log(res);   
        });
    }

    const validarDetallespedido = ()=>{
        const{pedido,producto,cantidad,subtotal} = detalle;
        let valido = !pedido.length || !producto.length || !cantidad.length || !subtotal.length;
        return valido;
    }

    return (
        <Fragment>
        <h2>Editar Detalle pedido</h2>
        
            <form onSubmit={(ModificarDetalle)}>
                <legend>Llena todos los campos</legend>
            
                <div class="campo">
                    <label>Pedido:</label>
                    <select name="pedido" onChange={actualizarState}>
                        {pedidos.map(pedido=>
                            <option value={pedido.PedidoID} selected={pedido.PedidoID === detalle.pedido}>
                                {pedido.PedidoID}
                            </option>
                        )}
                    </select>
                </div>

                <div class="campo">
                    <label>Producto:</label>
                    <select name="producto" onChange={actualizarState}>
                        {productos.map(producto=>
                            <option value={producto.ProductoID} selected={producto.ProductoID === detalle.producto}>
                                {producto.Nombre}
                            </option>
                        )}
                    </select>
                </div>

                <div class="campo">
                    <label>Cantidad:</label>
                    <input type="number" placeholder="Cantidad Detalle" name="cantidad" onChange={actualizarState} value={detalle.cantidad} />
                </div>

                <div class="campo">
                    <label>Subtotal</label>
                    <input type="number" placeholder="Subtotal Detalle" name="subtotal" onChange={actualizarState} value={detalle.subtotal} disabled/>
                </div>

                <div class="enviar">
                    <input type="submit" class="btn btn-azul" value="Actualizar Información Detalle"/>
                </div>

            </form>
        </Fragment>
    )
}
export default EditarPedido;