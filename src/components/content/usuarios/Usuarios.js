import React from 'react';
import {rutaAPI} from '../../../config/Config';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';

export default function Usuarios(){

    /* Disparamos peticion getData */
    const dataUsuarios = async() => {
        
        /* Obteniendo la informacion de la peticion GET */
        const getUsuarios = await getData();

        /* Declaramos el dataSet para hacer dinamicos los datos de la tabla  */
        /* Se declara la variable para generar el arreglo */
        const dataSet = [];

        /* Recorreomos los datos del dataset creado y lo convertimos en el arreglo que necesitamos */
        getUsuarios.data.forEach((currentValue, index)=>{
            
            dataSet[index] = [(index+1),
                                currentValue.usuario,
                                currentValue.email,
                                currentValue._id];
        })

        /* Ejecutamos datatable */
        $(document).ready( function () {
            $('.table').DataTable({

                data: dataSet,
                columns: [
                    {title:"#"},
                    {title:"Usuario"},
                    {title:"Email"}
                ],

                "language" : {
                    "sProcessing":     "Procesando...",
                    "sLengthMenu":     "Mostrar _MENU_ registros",
                    "sZeroRecords":    "No se encontraron resultados",
                    "sEmptyTable":     "Ningún dato disponible en esta tabla",
                    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix":    "",
                    "sSearch":         "Buscar:",
                    "sUrl":            "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst":    "Primero",
                        "sLast":     "Último",
                        "sNext":     "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    },
                    "buttons": {
                        "copy": "Copiar",
                        "colvis": "Visibilidad"
                    }
                }
            });
        } );
    }

    /* Ejecutamos dataUsuarios*/
    dataUsuarios();

    /* Retornamos la vista del componente */
    return(

        <div className="content-wrapper" style={{minHeight:"494px"}}>

            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Usuarios</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-lg-12">

                            <div className="card card-primary card-outline">

                                <div className="card-header">

                                </div>

                                <div className="card-body">

                                    <table className="table table-striped dt-responsive" style={{width:"100%"}}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Usuario</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>ivan</td>
                                                <td>ivan@gmail.com</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>


    )
}

/* PETICION GET PARA USUARIOS */
const getData = () => {

    /* Ruta a la cual accederemos para mostrar la informacion del usuario */
    const url = `${rutaAPI}/mostrar-usuario`;
    /* Validamos el Token del localstorage y saber que esta logueado */
    const token = localStorage.getItem("ACCESS_TOKEN");

    const params = {

        method:"GET",
        headers: {
            "Authorization" : token,
            "Content-type" : "application/json"
        }
    }

    return fetch(url, params).then(response=>{
        return response.json();
    }).then(result=>{
        return result;
    }).catch(err=>{
        return err.json;
    });

}