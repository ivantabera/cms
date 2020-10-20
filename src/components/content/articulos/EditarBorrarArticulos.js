import React, {useState} from 'react';
import {rutaAPI} from '../../../config/Config';
import $ from 'jquery';
import notie from 'notie';
import 'notie/dist/notie.css';
import Swal from 'sweetalert2';
import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/summernote-lite.js'

export default function EditarBorrarArticulos(){

    /* Hook para capturar datos */
    const [articulo, editarArticulo] = useState({
        portada: null,
        url: "",
        titulo:"",
        intro:"",
        contenido:"", 
        id: ""
    })

    const cambiaFormPut =  e => {

        console.log("editportada",$("#editarPortada").val());

        if($("#editarPortada").val()){

             /* Recibimos la portada */
            let portada = $("#editarPortada").get(0).files[0];

            /* Validamos formato jpg y png, que la portada no rebase los 2mb y convertirla en base 64 para previsualizar */
            if ( portada["type"] !== "image/jpeg" && portada["type"] !== "image/png" ) {

                $("#editarPortada").val("");

                /* Alertas notie */
                notie.alert({
                    type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
                    text: '¡Error: La portada debe estar en formato JPG o PNG!',
                    time: 7 // optional, default = 3, minimum = 1,
                })
                
                /* Cuando no pase la validacion del formato se tiene que quedar vacio el campo previsualizarPortada de la vista */
                $(".previsualizarPortada").attr("src", "");
                return;

            } else if( portada["size"] > 2000000 ){
                
                $("#editarPortada").val("");

                /* Alertas notie */
                notie.alert({
                    type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
                    text: '¡Error: La portada no debe pesar mas de 2MB!',
                    time: 7 // optional, default = 3, minimum = 1,
                })

                /* Cuando no pase la validacion del formato se tiene que quedar vacio el campo previsualizarPortada de la vista */
                $(".previsualizarPortada").attr("src", "");
                return;

            } else {

                let datosArchivo = new FileReader();
                datosArchivo.readAsDataURL(portada);

                $(datosArchivo).on("load", function(event){

                    let rutaArchivo = event.target.result;
                    
                    $(".previsualizarPortada").attr("src", rutaArchivo);

                    /* Actualizar los datos JSON */
                    editarArticulo({
                        'portada' : portada,
                        'url' : articulo.url,
                        'titulo' : $('#editarTitulo').val(),
                        'intro' : $('#editarIntro').val(),
                        'contenido': $('#editarContenido').val(),
                        'id': $("#idArticulo").val()
                    })

                })
            }

        } else {
            /* Actualizar los datos JSON */
            editarArticulo({
                'portada' : null,
                'url' : articulo.url,
                'titulo' : $('#editarTitulo').val(),
                'intro' : $('#editarIntro').val(),
                'contenido': $('#editarContenido').val(),
                'id': $("#idArticulo").val()
            })
        }

    }


    const submitPut = async e => {

        $('.alert').remove();
        
        e.preventDefault();
        
        const { titulo, intro, contenido } = articulo;

        /* Validar que el campo no venga vacio */
        if(titulo === ""){
            $(".invalid-titulo").show();
            $(".invalid-titulo").html("Completa este campo");
            return;
        }

        /* Validamos el titulo */
        if(titulo !== ""){
            const expTitulo = /^([0-9A-Za-zñÑáéíóúÁÉÍÓÚ ]).{1,30}$/;

            if(!expTitulo.test(titulo)){
                $(".invalid-titulo").show();
                $(".invalid-titulo").html("Utiliza un formato que coincida con el solicitado");
                return;
            }
        }

        /* Validar que el campo no venga vacio */
        if(intro === ""){
            $(".invalid-intro").show();
            $(".invalid-intro").html("Completa este campo");
            return;
        }

        /* Validamos el intro */
        if(intro !== ""){
            const expIntro = /^([(\\)\\=\\&\\$\\-\\_\\*\\<\\>\\?\\¿\\!\\¡\\:\\,\\.\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]).{1,300}$/;

            if(!expIntro.test(intro)){
                $(".invalid-intro").show();
                $(".invalid-intro").html("Utiliza un formato que coincida con el solicitado");
                return;
            }
        }

        /* Validar que el campo no venga vacio */
        if(contenido === ""){
            $(".invalid-contenido").show();
            $(".invalid-contenido").html("Completa este campo");
            return;
        }

        /* Validamos el descripcion */
        if(contenido !== ""){
            const expContenido = /^([(\\)\\=\\&\\$\\-\\_\\*\\<\\>\\?\\¿\\!\\¡\\:\\,\\.\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]).{1,}$/;

            if(!expContenido.test(contenido)){
                $(".invalid-contenido").show();
                $(".invalid-contenido").html("Utiliza un formato que coincida con el solicitado");
                return;
            }
        }

        /* Ejecutamos servicio POST */
        const result = await putData(articulo);

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

            setTimeout(() =>{ window.location.href = "/articulos"; }, 3000);
        }

    }

    /* Capturar datos para editar */

    $(document).on("click", ".editarInputs", function(e){

        e.preventDefault();

        let data = $(this).attr("data").split('_,');
        
        $("#idArticulo").val(data[0]);
        $(".previsualizarPortada").attr("src", `${rutaAPI}/mostrar-img-articulo/${data[4]}+${data[1]}`);
        $("#editarTitulo").val(data[2]);
        $("#editarIntro").val(data[3]);
        $("#editarUrl").val(data[4]);
        $("#editarContenido").val(data[5]);

        

        /* Actualizar los datos JSON */
        editarArticulo({
            'portada' : null,
            'url' : data[4],
            'titulo' : data[2],
            'intro' : data[3],
            'contenido': data[5],
            'id': data[0]
        })

    })

    /* Summernote */

    /* $("#editarContenido").summernote({
        height:350
    }); */

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
                const borrarArticulo = async () => {

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
                                window.location.href="/articulos"
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
                                window.location.href="/articulos"
                            }
                        })
                    }

                }
                borrarArticulo();
                if(result){
                    Swal.fire(
                        'Borrado!',
                        'El slide ha sido borrado',
                        'success'
                    )
                }
                
            }
        });

    })

    return(

        <div className="modal" id="editarBorrarArticulo">
            <div className="modal-dialog">
                <div className="modal-content">
                
                    <div className="modal-header">
                        <h4 className="modal-title">Editar Articulo</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <form onChange={cambiaFormPut} onSubmit={submitPut} encType="multipart/form-data" >

                        <div className="modal-body">

                            <input type="hidden" id="idArticulo"/>

                            {/* Entradda de portada */}
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="editarPortada">
                                    * Peso max. 2MB | Formato: JPG o PNG
                                </label>

                                <input
                                    id="editarPortada"
                                    type="file"
                                    className="form-control-file border"
                                    name="portada"
                                />
                                
                                <div className="invalid-feedback invalid-portada"></div>

                                <img className="previsualizarPortada img-fluid" alt=""/>

                            </div>

                            {/* Entrada url */}
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="editarUrl">
                                    * La URL no se puede modificar
                                </label>

                                <div className=" input-group mb-3">
                                    
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-link"></i>
                                    </div>

                                    <input
                                        id="editarUrl"
                                        type="text"
                                        className="form-control inputUrl text-lowercase"
                                        name="url"
                                        placeholder="Ingrese la url *"
                                        pattern="([0-9A-Za-z-]).{1,50}"
                                        readOnly
                                    />
                                    <div className="invalid-feedback invalid-url"></div>

                                </div>

                            </div>

                            {/* Entrada titulo */}
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="editarTitulo">
                                    * No ingrese caracteres especiales, solo letras y numeros
                                </label>

                                <div className=" input-group mb-3">
                                    
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-heading"></i>
                                    </div>

                                    <input
                                        id="editarTitulo"
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        placeholder="Ingrese el Titulo*"
                                        pattern="([0-9A-Za-zñÑáéíóúÁÉÍÓÚ ]).{1,30}"
                                        required
                                    />
                                    <div className="invalid-feedback invalid-titulo"></div>

                                </div>

                            </div>


                            {/* Entrada intro */}
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="editarIntro">
                                    * No ingrese caracteres especiales, solo letras y numeros
                                </label>

                                <div className=" input-group mb-3">
                                    
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-file-alt"></i>
                                    </div>

                                    <input
                                        id="editarIntro"
                                        type="text"
                                        className="form-control"
                                        name="intro"
                                        placeholder="Ingrese el Intro*"
                                        pattern="([(\\)\\=\\&\\$\\-\\_\\*\\<\\>\\?\\¿\\!\\¡\\:\\,\\.\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]).{1,300}"
                                        required
                                    />
                                    <div className="invalid-feedback invalid-intro"></div>

                                </div>

                            </div>

                            {/* Entrada contenido */}
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="editarContenido">
                                    Ingrese el contenido del articulo:
                                </label>

                                <textarea className="form-control summernote" rows="5" id="editarContenido" name="contenido"></textarea>

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

/* Peticion PUT slide */
const putData = data => {
    
    const url = `${rutaAPI}/actualizar-articulo/${data.id}`;
    const token = localStorage.getItem("ACCESS_TOKEN");

    /* Crear el formulario para pasar estilo form-data (formulario con imagenes) */
    let formData = new FormData();

    formData.append("portada", data.archivo);
    formData.append("url", data.url);
    formData.append("titulo", data.titulo);
    formData.append("intro", data.intro);
    formData.append("contenido", data.contenido);

    const params = {
        method:"PUT",
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

    const url = `${rutaAPI}/borrar-articulo/${data}`;
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