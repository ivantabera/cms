import React, {useState} from 'react';
import {rutaAPI} from '../../../config/Config';
import $ from 'jquery';
import notie from 'notie';
import 'notie/dist/notie.css';

export default function CrearGaleria(){
    
    /* Hook para capturar datos */
    const [galeria, crearGaleria] = useState({
        archivo: null
    })

    /* onChange */
    const cambiaFormPost = e => {

        /* Recibimos la imagen */
        let foto = $("#foto").get(0).files[0];

        /* Validamos formato jpg y png, que la foto no rebase los 2mb y convertirla en base 64 para previsualizar */
        if ( foto["type"] !== "image/jpeg" && foto["type"] !== "image/png" ) {

            $("#foto").val("");

            /* Alertas notie */
            notie.alert({
                type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
                text: '¡Error: La foto debe estar en formato JPG o PNG!',
                time: 7 // optional, default = 3, minimum = 1,
            })
            
            /* Cuando no pase la validacion del formato se tiene que quedar vacio el campo previsualizarImg de la vista */
            $(".previsualizarFoto").attr("src", "");
            return;

        } else if( foto["size"] > 2000000 ){

            $("#foto").val("");

            /* Alertas notie */
            notie.alert({
                type: 3, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
                text: '¡Error: La foto no debe pesar mas de 2MB!',
                time: 7 // optional, default = 3, minimum = 1,
            })

            /* Cuando no pase la validacion del formato se tiene que quedar vacio el campo previsualizarFoto de la vista */
            $(".previsualizarFoto").attr("src", "");
            return;

        } else {

            let datosArchivo = new FileReader();
            datosArchivo.readAsDataURL(foto);

            $(datosArchivo).on("load", function(event){
                let rutaArchivo = event.target.result;
                $(".previsualizarFoto").attr("src", rutaArchivo);

                /* Actualizar los datos JSON */
                crearGaleria({
                    'archivo' :foto
                })
            })

        }
    }

        /* onSubmit */
        const submitPost = async e => {

            $('.alert').remove();
            
            e.preventDefault();
            
            const { archivo } = galeria;
    
            /* Validamos la imagen del slide no este vacia */
            if( archivo === null){
                $(".invalid-imagen").show();
                $(".invalid-imagen").html("La imagen no puede ir vacia");
                return;
            }
    
    
            /* Ejecutamos servicio POST */
            const result = await postData(galeria);
            console.log('result', result)
    
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

    /* Retorno de vista */
    return(
        <div className="modal" id="crearBorrarGaleria">
            <div className="modal-dialog">
                <div className="modal-content">
                
                    <div className="modal-header">
                        <h4 className="modal-title">Crear Galeria</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <form onChange={cambiaFormPost} onSubmit={submitPost} encType="multipart/form-data" >

                        <div className="modal-body">

                            {/* Entradda de foto */}
                            <div className="form-group">

                                <label className="small text-secondary" htmlFor="foto">
                                    * Peso max. 2MB | Formato: JPG o PNG
                                </label>

                                <input
                                    id="foto"
                                    type="file"
                                    className="form-control-file border"
                                    name="foto"
                                    required
                                />
                                
                                <div className="invalid-feedback invalid-foto"></div>

                                <img className="previsualizarFoto img-fluid" alt=""/>

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

    formData.append("foto", data.archivo);

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