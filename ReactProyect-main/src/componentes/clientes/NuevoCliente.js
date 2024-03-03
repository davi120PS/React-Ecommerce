import React, { Fragment, useEffect, useState } from 'react';
import ClienteAxios from '../../config/axios';

function NuevoCliente(){
    
    const[carreras, guardarCarrera] =useState ([]);
    const ConsultarAPI = async() => {
        const CarreraConsulta = await ClienteAxios.get('/carreras');
    
        guardarCarrera(CarreraConsulta.data);
        console.log(carreras);
    
    }
    useEffect ( ()=>{
        ConsultarAPI();
    },[]);

    //s
    const [cliente, guardarClientes] = useState({
        "action":"insert",
        "nombre":"",
        "correo":"",
        "direccion":""
    });

    const actualizarState = e =>{
        //console.log(e.target.value);
        guardarClientes({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    const AgregarCliente = e =>{
        e.preventDefault();
        ClienteAxios.post('/clientes', cliente).then(res=>{console.log(res);});
    }

    const validarCliente = ()=>{
        const{nombre,correo,direccion} = cliente;
        let valido = !nombre.length || !correo.length || !direccion.length;
        return valido;
    }

    return (
        <Fragment>
        <h2>Nuevo Cliente</h2>

            {/* <form action="/alumnos" method="POST"> */}
            {/* <form onSubmit={(AgregarAlumno)}> */}
            <form onSubmit={(AgregarCliente)}>
                <legend>Llena todos los campos</legend>

                <div class="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState}/>
                </div>
            
                <div class="campo">
                    <label>Correo:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Edad:</label>
                    <input type="number" placeholder="Edad Cliente" name="edad" onChange={actualizarState}/>
                </div>

                <div class="enviar">
                        <input type="submit" class="btn btn-azul" value="Agregar Cliente" disabled = {validarCliente()}/>
                </div>

            </form>
        </Fragment>
    )
}
export default NuevoCliente;