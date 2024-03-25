import React, { Fragment,useEffect,useState } from "react";
import ClienteAxios from "../../config/axios";
import { useParams } from "react-router-dom";

function EditarCliente()
{
    let params = useParams();
    console.log(params.id);

    // const[carreras, guardarCarrera]             = useState([]);
 
    //const [cliente, guardareditarCliente]         = useState([]);
   const [cliente, guardareditarCliente] = useState({
        action :'update',
        nombre: '', 
        correo:'', 
        direccion:'',
        id:''+params.id+''    
    });

    const ConsultarAPI = async () => {
        const ClienteConsulta    = await ClienteAxios.get('/clientes/'+params.id+'');
        //COLOCAR STATE
        guardareditarCliente(ClienteConsulta.data);   
    }
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
        ClienteAxios.post('/clientes', cliente)
        .then(res =>{
            console.log(res);
            alert("Cliente Moodificado");
            window.location.reload();        
		});
    }


    return(

        <Fragment>
            <h2>Editar Cliente</h2>

                <form onSubmit={ModificarCliente}>
                    <legend>Llena todos los campos</legend>


                    <div class="campo">
                        <label>Nombre:</label>
                        <input type="text" placeholder="Nombre Cliente" 
                        name="nombre" 
                        onChange={actualizarState}
                        value={cliente.nombre}
                        />
                    </div>

                    <div class="campo">
                        <label>Correo:</label>
                        <input type="email" placeholder="Correo Cliente" 
                        name="correo"
                        onChange={actualizarState} 
                        value={cliente.correo}
                        />
                    </div>

                    <div class="campo">
                        <label>Direccion:</label>
                        <input type="text" placeholder="Direccion Cliente" 
                        name="direccion"
                        onChange={actualizarState}
                        value={cliente.direccion}
                        />
                    </div>

                    <div className="campo">
                        <label>Estado</label>
                        <select name="estado" onChange={actualizarState}>
                            
                            <option value="1" selected={cliente.estado === 1}>Cliente Inscrito</option>
                            <option value="2"  selected={cliente.estado === 2}>Cliente Baja Temporal</option>
                            <option value="3"  selected={cliente.estado === 3}>Cliente Baja Definitiva</option>
                        </select>

                    </div>

                    <div class="enviar">
                            <input type="submit" class="btn btn-azul" value="Actualizar Información Cliente"/>
                    </div>

                </form>

        </Fragment>
        
    )
}

export default EditarCliente;

