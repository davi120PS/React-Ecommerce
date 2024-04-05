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
                            <p class="carrera">Descripción: {producto.Descripcion}</p>
                            <p>Precio: ${producto.Precio}</p>
                            <p>Stock: {producto.Stock}</p>
                        </div>
                        <div class="acciones">
                            <Link to={"/editar-producto/"+producto.ProductoID} className="btn btn-azul">
                                <i className="fas fa-pen-alt"></i>
                                Editar Producto
                            </Link>
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