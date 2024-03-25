import React, { Fragment, useEffect, useState } from 'react';
import ProductoAxios from '../../config/axios';
import {Link} from 'react-router-dom';

function Productos() {
    const [productos, guardarProductos] = useState([]);
    const ConsultarAPI = async () => {
        const ProductosConsulta = await ProductoAxios.get('/productos');

        guardarProductos(ProductosConsulta.data);
        console.log(productos);

    }
    useEffect(() => {
        ConsultarAPI();
    }, []);

    const deleteProducto = async (id) => {
        try {
            const response = await ProductoAxios.delete('/productos/'+id+'');
            alert("Producto Eliminado");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Fragment>
            <h2>Productos</h2>
            <Link to={"/nuevo-producto"} class="btn btn-verde nvo-producto"><i class="fas fa-plus-circle"></i>
                Nuevo producto
            </Link>

            <ul class="listado-productos">
                {productos.map(producto =>
                    <li class="producto">
                        <div class="info-producto">
                            <p class="nombre">{producto.Nombre}</p>
                            <p class="carrera">{producto.Descripcion}</p>
                            <p>{producto.Precio}</p>
                            <p>{producto.Stock}</p>
                        </div>
                        <div class="acciones">
                            <a href="#" class="btn btn-azul">
                                <i class="fas fa-pen-alt"></i>
                                Editar Producto
                            </a>
                            <button type="button" class="btn btn-rojo btn-eliminar" onClick={() => deleteProducto(producto.ProductoID)}>
                                <i class="fas fa-times"></i>
                                Eliminar producto
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        </Fragment>
    )
}
export default Productos;