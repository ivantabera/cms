import React, {useState} from 'react';
import {rutaAPI} from '../../../config/Config';
import $ from 'jquery';
import notie from 'notie';
import 'notie/dist/notie.css';

export default function CrearSlide(){

    /* Hook para capturar datos */
    const [slide, crearSlide] = useState({
        archivo: null,
        titulo: "",
        descripcion:""
    })

    /* onChange */
    const cambiaFormPost = e => {

        /* Recibimos la imagen */
        let imagen = $("#imagen").get(0).files[0];

        /* Validamos formato jpg y png, que la imagen no rebase los 2mb y convertirla en base 64 para previsualizar */
        if ( imagen["type"] !== "image/jpeg" && imagen["type"] !== "image/png" ) {

            //Vaciamos el campo si el formato no conincide con el solicitado
            $("#imagen").val("");

            /* Alertas notie */
            notie.alert({
                type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
                text: '¡Error: La imagen debe estar en formato JPG o PNG!',
                time: 7 // optional, default = 3, minimum = 1,
            })
            
            /* Cuando no pase la validacion del formato se tiene que quedar vacio el campo previsualizarImg de la vista */
            $(".previsualizarImg").attr("src", "");
            return;

        } else if( imagen["size"] > 2000000 ){
            $("#imagen").val("");

            /* Alertas notie */
            notie.alert({
                type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
                text: '¡Error: La imagen no debe pesar mas de 2MB!',
                time: 7 // optional, default = 3, minimum = 1,
            })

            /* Cuando no pase la validacion del formato se tiene que quedar vacio el campo previsualizarImg de la vista */
            $(".previsualizarImg").attr("src", "");
            return;
        } else {

            let datosArchivo = new FileReader();
            datosArchivo.readAsDataURL(imagen);

            $(datosArchivo).on("load", function(event){

                /* Ruta de imagen codificado en formato base 64 para previzualizarlo en el ID previsualizarImg */
                let rutaArchivo = event.target.result;
                $(".previsualizarImg").attr("src", rutaArchivo);

                /* Actualizar los datos JSON */
                crearSlide({
                    'archivo' :imagen,
                    'titulo' : $('#titulo').val(),
                    'descripcion': $('#descripcion').val()
                })

            })
        }
    }

    /* onSubmit */
    const submitPost = async e => {

        $('.alert').remove();
        
        e.preventDefault();
        
        const { archivo, titulo, descripcion } = slide;

        /* Validamos la imagen del slide no este vacia */
        if( archivo === null){
            $(".invalid-imagen").show();
            $(".invalid-imagen").html("La imagen no puede ir vacia");
            return;
        }

        /* Validamos el titulo */
        if(titulo !== ""){
            const expTitulo = /^(?=.*[A-Za-z]).{1,30}$/;

            if(!expTitulo.test(titulo)){
                $(".invalid-titulo").show();
                $(".invalid-titulo").html("Utiliza un formato que coincida con el solicitado");
                return;
            }
        }

        /* Validamos el descripcion */
        if(descripcion !== ""){
            const expDescripcion = /^(?=.*[A-Za-z]).{1,100}$/;

            if(!expDescripcion.test(descripcion)){
                $(".invalid-descripcion").show();
                $(".invalid-descripcion").html("Utiliza un formato que coincida con el solicitado");
                return;
            }
        }

        /* Ejecutamos servicio POST */
        const result = await postData(slide);

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

            setTimeout(() =>{ window.location.href = "/slide"; }, 3000);
        }

    }

     /* Limpiar formulario */
     $(document).on("click", ".limpiarFormulario", function(){
        $(".modal").find('form')[0].reset();
        $(".previsualizarImg").attr("src", "");
    })

    /* Retorno de la vista */
    return(
        <div className="modal fade" id="crearSlide">
            <div className="modal-dialog">
                <div className="modal-content">
                
                    <div className="modal-header">
                        <h4 className="modal-title">Crear Slide</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <form onChange={cambiaFormPost} onSubmit={submitPost} encType="multipart/form-data" >

                        <div className="modal-body">

                            {/* Entradda de imagen */}
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="imagen">
                                    * Peso max. 2MB | Formato: JPG o PNG
                                </label>

                                <input
                                    id="imagen"
                                    type="file"
                                    className="form-control-file border"
                                    name="imagen"
                                    required
                                />
                                
                                <div className="invalid-feedback invalid-imagen"></div>

                                <img className="previsualizarImg img-fluid" alt=""/>

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
                                        pattern="([A-Za-z]).{1,30}"
                                    />
                                    <div className="invalid-feedback invalid-titulo"></div>

                                </div>

                            </div>

                            {/* Entrada descripcion */}
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="descripcion">
                                    * No ingrese caracteres especiales, solo letras y numeros
                                </label>

                                <div className=" input-group mb-3">
                                    
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-file-alt"></i>
                                    </div>

                                    <input
                                        id="descripcion"
                                        type="text"
                                        className="form-control"
                                        name="descripcion"
                                        placeholder="Ingrese la Descripción *"
                                        pattern="([A-Za-z]).{1,100}"
                                    />
                                    <div className="invalid-feedback invalid-descripcion"></div>

                                </div>

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
    );
}

/* Peticion POST slide */
const postData = data => {
    
    const url = `${rutaAPI}/crear-slide`;
    const token = localStorage.getItem("ACCESS_TOKEN");

    /* Crear el formulario para pasar estilo form-data (imagenes) */
    let formData = new FormData();

    formData.append("imagen", data.archivo);
    formData.append("titulo", data.titulo);
    formData.append("descripcion", data.descripcion);

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