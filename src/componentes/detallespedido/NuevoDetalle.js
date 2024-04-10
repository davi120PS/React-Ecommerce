import React, { Fragment, useEffect, useState } from 'react';
import DetallespedidoAxios from '../../config/axios';

function NuevoDetallespedido(){
    
    const[pedidos, guardarPedido] =useState ([]);
    const[productos, guardarProducto] =useState ([]);
    const ConsultarAPI = async() => {
        const PedidoConsulta = await DetallespedidoAxios.get('/pedidos');
        const ProductoConsulta = await DetallespedidoAxios.get('/productos');

        guardarPedido(PedidoConsulta.data);
        console.log(pedidos);
        guardarProducto(ProductoConsulta.data);
        console.log(productos);
    
    }
    useEffect ( ()=>{
        ConsultarAPI();
    },[]);

    //s
    const [detalle, guardarDetallepedido] = useState({
        "action":"insert",
        "pedido":"",
        "producto":"",
        "cantidad":"",
        "subtotal":""
    });

    const actualizarState = e =>{
        //console.log(e.target.value);
        guardarDetallepedido({
            ...detalle,
            [e.target.name]: e.target.value
        })
    }

    /*//Actualiza el subtotal en tiempo real
    const actualizarSubtotal = (cantidad, productoID) => {
        const productoSeleccionado = productos.find(producto => producto.ProductoID === productoID);
        if (productoSeleccionado) {
            const subtotal = parseFloat(cantidad) * parseFloat(productoSeleccionado.Precio);
            guardarDetallepedido({
                ...detalle,
                cantidad,
                subtotal: subtotal.toFixed(2)
            });
        }
    }
    const handleChange = e => {
        const { name, value } = e.target;
        guardarDetallepedido({
            ...detalle,
            [name]: value
        });
        if (name === 'cantidad') {
            actualizarSubtotal(value, detalle.producto);
        }
    }*/

    const AgregarDetallespedido = e =>{
        e.preventDefault();
        DetallespedidoAxios.post('/detallespedido', detalle).then(res=>{
            alert("Detalle pedido Guardado");
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
        <h2>Nuevo Detalle pedido</h2>

            <form onSubmit={(AgregarDetallespedido)}>
                <legend>Llena todos los campos</legend>

                <div class="campo">
                    <label>Pedido:</label>
                    <select name="pedido" onChange={actualizarState}>
                        <option value="">Seleccione un pedido</option>
                        {pedidos.map(pedido=> <option value={pedido.PedidoID}>{pedido.PedidoID}</option>)}
                    </select>
                </div>

                <div class="campo">
                    <label>Producto:</label>
                    <select name="producto" onChange={actualizarState}>
                        <option value="">Seleccione un producto</option>
                        {productos.map(producto=> <option value={producto.ProductoID}>{producto.Nombre}</option>)}
                    </select>
                </div>

                <div class="campo">
                    <label>Cantidad:</label>
                    <input type="number" placeholder="Cuanto se compro" name="cantidad" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Subtotal:</label>
                    <input type="number" placeholder="subtotal" name="subtotal" onChange={actualizarState} />
                </div>
            

                <div class="enviar">
                        <input type="submit" class="btn btn-azul" value="Agregar Detalle pedido" disabled = {validarDetallespedido()}/>
                </div>

            </form>
        </Fragment>
    )
}
export default NuevoDetallespedido;