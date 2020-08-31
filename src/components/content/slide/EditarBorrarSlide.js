import React, {useState} from 'react';
import {rutaAPI} from '../../../config/Config';
import $ from 'jquery';
import notie from 'notie';
/* import 'notie/dist/notie.css'; */

export default function EditarBorrarSlide(){

    /* Hook para capturar datos */
    const [slide, editarSlide] = useState({
        archivo:null,
        titulo:"",
        descripcion:"",
        id:""
    })

    /* onChange */
    const cambiaFormPut =  e => {

        if($('#editarImagen').val()){
        
            /* Recibimos la imagen */
            let imagen = $("#editarImagen").get(0).files[0];

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
                    editarSlide({
                        'archivo' :imagen,
                        'titulo' : $('#editarTitulo').val(),
                        'descripcion': $('#editarDescripcion').val(),
                        'id':$('#editarId').val()
                    })

                })
            }

        } else {
            /* Actualizar los datos JSON */
            editarSlide({
                'archivo' : null,
                'titulo' : $('#editarTitulo').val(),
                'descripcion': $('#editarDescripcion').val(),
                'id':$('#editarId').val()
            })
        }

    }

    /* onSubmit */
    const submitPut = async e => {

        $('.alert').remove();

        e.preventDefault();

        const { titulo, descripcion } = slide;


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

        /* Ejecutamos servicio PUT */
        const result = await putData(slide);

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

    /* Capturar datos para editar */
    $(document).on('click', '.editarInputs', function(e){
        e.preventDefault();

        let data = $(this).attr('data').split('_,');

        $('#editarId').val(data[0]);
        $('.previsualizarImg').attr("src", `${rutaAPI}/mostrar-img-slide/${data[1]}`);
        $('#editarTitulo').val(data[2]);
        $('#editarDescripcion').val(data[3]);

        editarSlide({
            'archivo' : null,
            'titulo' : data[2],
            'descripcion': data[3],
            'id': data[0]
        })
        
    })

    return(
        <div className="modal" id="editarSlide">
            <div className="modal-dialog">
                <div className="modal-content">
                
                    <div className="modal-header">
                        <h4 className="modal-title">Editar Slide</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <form onChange={cambiaFormPut} onSubmit={submitPut} encType="multipart/form-data" >

                        <div className="modal-body">

                            <input type="hidden" id="editarId"/>

                            {/* Entradda de imagen */}
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="editarImagen">
                                    * Peso max. 2MB | Formato: JPG o PNG
                                </label>

                                <input
                                    id="editarImagen"
                                    type="file"
                                    className="form-control-file border"
                                    name="imagen"
                                />
                                
                                <div className="invalid-feedback invalid-imagen"></div>

                                <img className="previsualizarImg img-fluid" alt=""/>

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
                                        pattern="([A-Za-z]).{1,30}"
                                    />
                                    <div className="invalid-feedback invalid-titulo"></div>

                                </div>

                            </div>

                            {/* Entrada descripcion */}
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="editarDescripcion">
                                    * No ingrese caracteres especiales, solo letras y numeros
                                </label>

                                <div className=" input-group mb-3">
                                    
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-file-alt"></i>
                                    </div>

                                    <input
                                        id="editarDescripcion"
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
    )

}

/* Peticion POST slide */
const putData = data => {
    
    const url = `${rutaAPI}/actualizar-slide/${data.id}`;
    const token = localStorage.getItem("ACCESS_TOKEN");

    /* Crear el formulario para pasar estilo form-data (imagenes) */
    let formData = new FormData();

    formData.append("imagen", data.archivo);
    formData.append("titulo", data.titulo);
    formData.append("descripcion", data.descripcion);

    console.log('formData', formData)

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