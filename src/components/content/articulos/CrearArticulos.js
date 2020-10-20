import React, {useState} from 'react';
import {rutaAPI} from '../../../config/Config';
import $ from 'jquery';
import notie from 'notie';
import 'notie/dist/notie.css';
import 'summernote/dist/summernote-lite.css';
import 'summernote/dist/summernote-lite.js'

export default function CrearArticulos(){

    /* FORMATO URL */
    let limpiarUrl = textoEscrito =>{
        let texto = textoEscrito.toLowerCase();
        texto = texto.replace(/[á]/g, 'a');
        texto = texto.replace(/[é]/g, 'e');
        texto = texto.replace(/[í]/g, 'i');
        texto = texto.replace(/[ó]/g, 'o');
        texto = texto.replace(/[ú]/g, 'u');
        texto = texto.replace(/[ñ]/g, 'n');
        texto = texto.replace(/[ ]/g, '-');

        return texto;
    }

    $(document).on('keyup', '.inputUrl', function(){

        $(this).val(

            limpiarUrl($(this).val())
        )
    })

    /* Hook para capturar datos */
    const [articulo, crearArticulo] = useState({
        archivo: null,
        url: "",
        titulo:"",
        intro:"",
        contenido:""
    })

    /* onChange */
    const cambiaFormPost = e => {

        /* Recibimos la portada */
        let portada = $("#portada").get(0).files[0];

        /* Validamos formato jpg y png, que la portada no rebase los 2mb y convertirla en base 64 para previsualizar */
        if ( portada["type"] !== "image/jpeg" && portada["type"] !== "image/png" ) {

            $("#portada").val("");

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
            
            $("#portada").val("");

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
                crearArticulo({
                    'archivo' : portada,
                    'url' : $('#url').val(),
                    'titulo' : $('#titulo').val(),
                    'intro' : $('#intro').val(),
                    'contenido': $('#contenido').val()
                })

            })
        }

    }

    /* onSubmit */
    const submitPost = async e => {

        $('.alert').remove();
        
        e.preventDefault();
        
        const { archivo, url, titulo, intro, contenido } = articulo;

        /* Validamos la imagen del slide no este vacia */
        if( archivo === null){
            $(".invalid-imagen").show();
            $(".invalid-imagen").html("La imagen no puede ir vacia");
            return;
        }

        /* Validar que el campo no venga vacio */
        if(url === ""){
            $(".invalid-url").show();
            $(".invalid-url").html("Completa este campo");
            return;
        }

        /* Validamos la expresion regular de la url */
        if(url !== ""){
            const expUrl = /^([0-9A-Za-z-]).{1,50}$/;

            if(!expUrl.test(url)){
                $(".invalid-url").show();
                $(".invalid-url").html("Utiliza un formato que coincida con el solicitado");
                return;
            }
        }

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
        const result = await postData(articulo);

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

    /* Summernote */
    $(document).ready(function(){

        $("#contenido").summernote({
            height:350
        });
    });

    /* Limpiar formulario */
    $(document).on("click", ".limpiarFormulario", function(){
        $(".modal").find('form')[0].reset();
        $(".previsualizarPortada").attr("src", "");
    })
    

    /* Retorno de la vista */
    return(
        <div className="modal" id="crearArticulo">
            <div className="modal-dialog">
                <div className="modal-content">
                
                    <div className="modal-header">
                        <h4 className="modal-title">Crear Articulo</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <form onChange={cambiaFormPost} onSubmit={submitPost} encType="multipart/form-data" >

                        <div className="modal-body">

                            {/* Entradda de portada */}
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="portada">
                                    * Peso max. 2MB | Formato: JPG o PNG
                                </label>

                                <input
                                    id="portada"
                                    type="file"
                                    className="form-control-file border"
                                    name="portada"
                                    required
                                />
                                
                                <div className="invalid-feedback invalid-portada"></div>

                                <img className="previsualizarPortada img-fluid" alt=""/>

                            </div>

                            {/* Entrada url */}
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="url">
                                    * No ingrese caracteres especiales, solo letras y numeros
                                </label>

                                <div className=" input-group mb-3">
                                    
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-link"></i>
                                    </div>

                                    <input
                                        id="url"
                                        type="text"
                                        className="form-control inputUrl text-lowercase"
                                        name="url"
                                        placeholder="Ingrese la url *"
                                        pattern="([0-9A-Za-z-]).{1,50}"
                                        required
                                    />
                                    <div className="invalid-feedback invalid-url"></div>

                                </div>

                            </div>

                            {/* Entrada titulo */}
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="titulo">
                                    * No ingrese caracteres especiales, solo letras y numeros
                                </label>

                                <div className=" input-group mb-3">
                                    
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-heading"></i>
                                    </div>

                                    <input
                                        id="titulo"
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

                                <label className="small text-secondary" htmlFor="intro">
                                    * No ingrese caracteres especiales, solo letras y numeros
                                </label>

                                <div className=" input-group mb-3">
                                    
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-file-alt"></i>
                                    </div>

                                    <input
                                        id="intro"
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

                                <label className="small text-secondary" htmlFor="contenido">
                                    Ingrese el contenido del articulo:
                                </label>

                                <div className="form-control summernote" rows="5" id="contenido" name="contenido"></div>

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
    
    const url = `${rutaAPI}/crear-articulo`;
    const token = localStorage.getItem("ACCESS_TOKEN");

    /* Crear el formulario para pasar estilo form-data (imagenes) */
    let formData = new FormData();

    formData.append("portada", data.archivo);
    formData.append("url", data.url);
    formData.append("titulo", data.titulo);
    formData.append("intro", data.intro);
    formData.append("contenido", data.contenido);

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