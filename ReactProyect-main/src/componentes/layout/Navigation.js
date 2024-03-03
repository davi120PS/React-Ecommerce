import React from 'react';
//para ruteo performance
import {Link} from 'react-router-dom';
function Navigation(){
    return (

        <aside class="sidebar col-3">
            <h2>Administración</h2>

            <nav class="navegacion">
                <Link to={"/"} class="alumnos">Alumnos</Link>
                <Link to={"/carreras"} class="carreras">Carreras</Link>
                
                <Link to={"/calificaciones"} class="calificaciones">Calificaciones</Link>
            </nav>
        </aside>

    )
}
export default Navigation;