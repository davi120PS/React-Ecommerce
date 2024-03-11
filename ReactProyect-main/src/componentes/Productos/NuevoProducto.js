import React, { Fragment, useEffect, useState } from 'react';
import ClienteAxios from '../../config/axios';

function NuevoProducto(){
    
    const[pedidos, guardarCarrera] =useState ([]);
    const ConsultarAPI = async() => {
        const CarreraConsulta = await ClienteAxios.get('/pedidos');
    
        guardarCarrera(CarreraConsulta.data);
        console.log(pedidos);
    
    }
    useEffect ( ()=>{
        ConsultarAPI();
    },[]);

    //s
    const [producto, guardarProductos] = useState({
        "action":"insert",
        "nombre":"",
        "correo":"",
        "direccion":""
    });

    const actualizarState = e =>{
        //console.log(e.target.value);
        guardarProductos({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const AgregarProducto = e =>{
        e.preventDefault();
        ClienteAxios.post('/productos', producto).then(res=>{alert("Producto Guardado");window.location.reload();console.log(res)});
    }

    const validarProducto = ()=>{
        const{nombre,descripcion,precio,stock} = producto;
        let valido = !nombre.length || !descripcion.length || !precio.length || !stock.length;
        return valido;
    }

    return (
        <Fragment>
        <h2>Nuevo Producto</h2>

            {/* <form action="/alumnos" method="POST"> */}
            {/* <form onSubmit={(AgregarAlumno)}> */}
            <form onSubmit={(AgregarProducto)}>
                <legend>Llena todos los campos</legend>

                <div class="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={actualizarState}/>
                </div>
            
                <div class="campo">
                    <label>Descripcion:</label>
                    <input type="text" placeholder="Descripcion Producto" name="deescripcion" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Precio:</label>
                    <input type="text" placeholder="Precio Producto" name="Precio" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Stock:</label>
                    <input type="text" placeholder="Stock Producto" name="Stock" onChange={actualizarState}/>
                </div>

                <div class="enviar">
                        <input type="submit" class="btn btn-azul" value="Agregar Cliente" disabled = {validarCliente()}/>
                </div>

            </form>
        </Fragment>
    )
}
export default NuevoProducto;