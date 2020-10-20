import React, {useState} from 'react';
import {rutaAPI} from '../../../config/Config';
import $ from 'jquery';
import notie from 'notie';
import 'notie/dist/notie.css';
import Swal from 'sweetalert2';

export default function CrearBorrarGaleria(){
    
    /* Hook para capturar datos */
    const [galeria, crearGaleria] = useState({
        archivo: null
    })

    /* onChange */
    const cambiaFormPost = e => {

        /* Recibimos la imagen */
        let foto = $("#foto").get(0).files;

        /* Recorremos el arreglo de foto para que se realicen las validaciones en cada una */
        for(let i = 0; i < foto.length ; i++ ){

             /* Validamos formato jpg y png, que la foto no rebase los 2mb y convertirla en base 64 para previsualizar */
            if ( foto[i]["type"] !== "image/jpeg" && foto[i]["type"] !== "image/png" ) {

                $("#foto").val("");

                /* Alertas notie */
                notie.alert({
                    type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
                    text: '¡Error: La foto debe estar en formato JPG o PNG!',
                    time: 7 // optional, default = 3, minimum = 1,
                })
                
                /* Cuando no pase la validacion del formato se tiene que quedar vacio el campo previsualizarImg de la vista */
                $(".vistaGaleria").html("");
                return;

            } else if( foto[i]["size"] > 2000000 ){

                $("#foto").val("");

                /* Alertas notie */
                notie.alert({
                    type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
                    text: '¡Error: La foto no debe pesar mas de 2MB!',
                    time: 7 // optional, default = 3, minimum = 1,
                })

                /* Cuando no pase la validacion del formato se tiene que quedar vacio el campo previsualizarFoto de la vista */
                $(".vistaGaleria").html("");
                return;

            } else {

                let datosArchivo = new FileReader();
                datosArchivo.readAsDataURL(foto[i]);

                $(datosArchivo).on("load", function(event){
                    let rutaArchivo = event.target.result;
                    $(".vistaGaleria").append(`
                        <div class="col-6 pt-2">
                            <img src="${rutaArchivo}" class="img-fluid"/>
                        </div>
                    `);

                    /* Actualizar los datos JSON */
                    crearGaleria({
                        'archivo' : foto
                    })
                })

            }
        }

        
    }

    /* onSubmit */
    const submitPost = async e => {
        
        e.preventDefault();
        
        const { archivo } = galeria;

        for( let i = 0 ; i < archivo.length ; i++ ){
            
            $('.alert').remove();

            /* Validamos la imagen del slide no este vacia */
            if( archivo[i] === null){
                $(".invalid-foto").show();
                $(".invalid-foto").html("La foto no puede ir vacia");
                return;
            }


            /* Ejecutamos servicio POST */
            const result = await postData(archivo[i]);

            /* Error en la peticion */
            if(result.status === 500){
                $(".modal-footer").before(`<div class="alert alert-danger">${result.mensaje}</div>`)
            }

            /* Error en la peticion */
            if(result.status === 400){
                $(".modal-footer").before(`<div class="alert alert-danger">${result.mensaje}</div>`)
            }

            /* Peticion exitosa */
            if(result.status === 200){
                $(".modal-footer").before(`<div class="alert alert-success">${result.mensaje}</div>`)

                $('button[type="submit"]').remove();

                setTimeout(() =>{ window.location.href = "/galeria"; }, 3000);
            }

        }
    }

    /* Capturar datos para borrar */
    $(document).on("click", ".borrarInput", function(e){

        e.preventDefault();

        let data = $(this).attr("data").split('_,')[0];


        Swal.fire({
            title:'¿Estas seguro de querer borrar a este Slide?',
            text: "Esta accion no puede ser revertida",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!'
        }).then((result) => {
            if(result.value){

                /* Ejecutamos servicio DELETE */
                const borrarGaleria = async () => {

                    const result = await deleteData(data);

                    /* Error en la peticion */
                    if(result.status === 400){
                        Swal.fire({
                            type: "error",
                            title: result.mensaje,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"
                        }).then(function(result){
                            if(result.value){
                                window.location.href="/galeria"
                            }
                        })
                    }

                    /* Peticion exitosa */
                    if(result.status === 200){
                        Swal.fire({
                            type: "success",
                            title: result.mensaje,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"
                        }).then(function(result){
                            if(result.value){
                                window.location.href="/galeria"
                            }
                        })
                    }

                }
                borrarGaleria();
                if(result){
                    Swal.fire(
                        'Borrado!',
                        'Foto de la galeria ha sido borrada',
                        'success'
                    )
                }
                
            }
        });

    })

    /* Limpiar formulario */
    $(document).on("click", ".limpiarFormulario", function(){
        $(".modal").find('form')[0].reset();
        $(".vistaGaleria").html("");
    })

    /* Retorno de vista */
    return(
        <div className="modal" id="crearGaleria">
            <div className="modal-dialog">
                <div className="modal-content">
                
                    <div className="modal-header">
                        <h4 className="modal-title">Crear Galeria</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <form onChange={cambiaFormPost} onSubmit={submitPost} encType="multipart/form-data" >

                        <div className="modal-body">

                            {/* Entraa de foto */}
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="foto">
                                    * Peso max. 2MB | Formato: JPG o PNG
                                </label>

                                <input
                                    id="foto"
                                    type="file"
                                    className="form-control-file border"
                                    name="foto"
                                    multiple
                                    required
                                />
                                
                                <div className="invalid-feedback invalid-foto"></div>

                                <div className="vistaGaleria row"></div>

                            </div>

                        </div>
                        
                        <div className="modal-footer d-flex justify-content-between">
                            <div>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>

                    </form>
                    
                </div>
            </div>
        </div>
    )

}

/* Peticion POST slide */
const postData = data => {
    
    const url = `${rutaAPI}/crear-galeria`;
    const token = localStorage.getItem("ACCESS_TOKEN");

    /* Crear el formulario para pasar estilo form-data (imagenes) */
    let formData = new FormData();

    formData.append("foto", data);

    const params = {
        method:"POST",
        body:formData,
        headers: {
            "Authorization" : token
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err =>{
        return err;
    })
}

/* Peticion delete para BORRAR slide */
const deleteData = data => {

    const url = `${rutaAPI}/borrar-galeria/${data}`;
    const token = localStorage.getItem("ACCESS_TOKEN");

    const params = {
        method:"DELETE",
        headers: {
            "Authorization" : token,
            "Content-type" : "application/json"
        }
    }

    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err =>{
        return err;
    })
}