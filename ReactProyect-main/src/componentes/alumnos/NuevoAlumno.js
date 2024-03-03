import React, { Fragment, useEffect, useState } from 'react';
import ClienteAxios from '../../config/axios';

function NuevoAlumno(){
    
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
    const [alumno, guardarAlumnos] = useState({
        "action":"insert",
        "carrera":"",
        "nombre":"",
        "apellido":"",
        "edad":"",
        "email":"",
        "estado":""
    });

    const actualizarState = e =>{
        //console.log(e.target.value);
        guardarAlumnos({
            ...alumno,
            [e.target.name]: e.target.value
        })
    }

    const AgregarAlumno = e =>{
        e.preventDefault();
        ClienteAxios.post('/alumnos', alumno).then(res=>{console.log(res);});
    }

    const validarAlumno = ()=>{
        const{carrera,nombre,apellido,edad,email,estado} = alumno;
        let valido = !carrera.length || !nombre.length || !apellido.length || !edad.length || !email.length || !estado.length;
        return valido;
    }

    return (
        <Fragment>
        <h2>Nuevo Alumno</h2>

            {/* <form action="/alumnos" method="POST"> */}
            {/* <form onSubmit={(AgregarAlumno)}> */}
            <form onSubmit={(AgregarAlumno)}>
                <legend>Llena todos los campos</legend>

                <div class="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Alumno" name="nombre" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Alumno" name="apellido" onChange={actualizarState}/>
                </div>
            
                <div class="campo">
                    <label>Carrera:</label>
                    <select name="carrera" onChange={actualizarState}>
                        <option value="">Seleccione una carrera</option>
                        {carreras.map(carrera=> <option value={carrera.ID_Carrera}>{carrera.Carrera}</option>)}
                    </select>
                </div>

                <div class="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Alumno" name="email" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Edad:</label>
                    <input type="number" placeholder="Edad Alumno" name="edad" onChange={actualizarState}/>
                </div>

                <div class="campo">
                    <label>Estado</label>

                    <select name="estado" onChange={actualizarState}>
                        <option value="">Seleccione una opcion</option>
                        <option value="1">Inscrito</option>
                        <option value="0">Baja</option>
                    </select>
                </div>

                <div class="enviar">
                        <input type="submit" class="btn btn-azul" value="Agregar Alumno" disabled = {validarAlumno()}/>
                </div>

            </form>
        </Fragment>
    )
}
export default NuevoAlumno;