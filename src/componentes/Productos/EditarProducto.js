import React, { Fragment,useEffect,useState } from "react";
import ClienteAxios from "../../config/axios";
import { useParams } from "react-router-dom";

function EditarProducto()
{
    let params = useParams();
    console.log(params.id);

    // const[carreras, guardarCarrera]             = useState([]);
 
    //const [producto, guardareditarproducto]         = useState([]);
   const [producto, guardareditarProducto] = useState({
        action :'update',
        nombre: '', 
        descripcion:'', 
        precio:'',
        stock:'',
        id:''+params.id+''    
    });

    const ConsultarAPI = async () => {
        const ProductoConsulta    = await ClienteAxios.get('/productos/'+params.id+'');
        //COLOCAR STATE
        guardareditarProducto(ProductoConsulta.data);   
    }
    useEffect( () => {
        ConsultarAPI();
    },[]);

    /**codigo para validar formulario */

   
    const actualizarState = e =>{
        
        guardareditarProducto({
        ...producto,
        [e.target.name] : e.target.value
        
       })

    }

    /*enviar post**/

    const ModificarProducto = e => {
        e.preventDefault();
        ClienteAxios.post('/productos', producto)
        .then(res =>{
            console.log(res);
            alert("Producto Moodificado");
            window.location.reload();        
		});
    }


    return(

        <Fragment>
            <h2>Editar Producto</h2>

                <form onSubmit={ModificarProducto}>
                    <legend>Llena todos los campos</legend>


                    <div class="campo">
                        <label>Nombre:</label>
                        <input type="text" placeholder="Nombre Producto" 
                        name="nombre" 
                        onChange={actualizarState}
                        value={producto.nombre}
                        />
                    </div>

                    <div class="campo">
                        <label>Descripcion:</label>
                        <input type="text" placeholder="Descripcion Producto" 
                        name="descripcion"
                        onChange={actualizarState} 
                        value={producto.descripcion}
                        />
                    </div>

                    <div class="campo">
                        <label>Precio:</label>
                        <input type="number" placeholder="Precio Producto" 
                        name="precio"
                        onChange={actualizarState}
                        value={producto.precio}
                        />
                    </div>

                    <div class="campo">
                        <label>Stock:</label>
                        <input type="number" placeholder="Stock Producto" 
                        name="stock"
                        onChange={actualizarState}
                        value={producto.stock}
                        />
                    </div>

                    <div className="campo">
                        <label>Estado</label>
                        <select name="estado" onChange={actualizarState}>
                            
                            <option value="1" selected={producto.estado === 1}>Producto Inscrito</option>
                            <option value="2"  selected={producto.estado === 2}>Producto Baja Temporal</option>
                            <option value="3"  selected={producto.estado === 3}>Producto Baja Definitiva</option>
                        </select>

                    </div>

                    <div class="enviar">
                            <input type="submit" class="btn btn-azul" value="Actualizar Información Producto"/>
                    </div>

                </form>

        </Fragment>
        
    )
}

export default EditarProducto;

