import React, { Fragment,useEffect,useState } from "react";
import ClienteAxios from "../../config/axios";
import { useParams } from "react-router-dom";

function EditarCliente()
{
    const ConsultarAPI = async () => {
    const ClienteConsulta    = await ClienteAxios.get('/clientes/'+params.id+'');
    
    guardareditarCliente(ClienteConsulta.data[0]);
    
    
 //COLOCAR STATE
    
    }

    let params = useParams();
    console.log(params.id);
    const [cliente, guardareditarCliente] = useState({
        action :'update',
        nombre: '', 
        correo:'', 
        direccion:'',
        id:''+params.id+''    
    });
    useEffect( () => {
        ConsultarAPI();
    },[]);

    /**codigo para validar formulario */

   
    const actualizarState = e =>{
        
        guardareditarCliente({
        ...cliente,
        [e.target.name] : e.target.value
        
       })

    }

    /*enviar post**/

    const ModificarCliente = e => {
        e.preventDefault();
        ClienteAxios.post('/clientes', cliente).then(res =>{
            alert("Cliente Moodificado");
            window.location.reload();
            console.log(res);
		});
    }


    return(

        <Fragment>
            <h2>Editar Cliente</h2>

                <form onSubmit={ModificarCliente}>
                    <legend>Llena todos los campos</legend>


                    <div class="campo">
                        <label>Nombre:</label>
                        <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} value={cliente.nombre}/>
                    </div>

                    <div class="campo">
                        <label>Correo:</label>
                        <input type="email" placeholder="Correo Cliente" name="correo"onChange={actualizarState} value={cliente.correo}/>
                    </div>

                    <div class="campo">
                        <label>Direccion:</label>
                        <input type="text" placeholder="Direccion Cliente" name="direccion" onChange={actualizarState} value={cliente.direccion}/>
                    </div>

                    <div class="enviar">
                            <input type="submit" class="btn btn-azul" value="Actualizar Información Cliente"/>
                    </div>

                </form>

        </Fragment>
        
    )
}

export default EditarCliente;

