import React/* , {useState} */ from 'react';
import {rutaAPI} from '../../../config/Config';
import $ from 'jquery';
/* import notie from 'notie'; */
import 'notie/dist/notie.css';

export default function EditarBorrarSlide(){

    /* onChange */
    const cambiaFormPut =  e => {

    }

    /* onSubmit */
    const submitPut = async e => {

    }

    /* Capturar datos para editar */
    $(document).on('click', '.editarInputs', function(e){
        e.preventDefault();

        let data = $(this).attr('data').split('_,');
        $('.previsualizarImg').attr("src", `${rutaAPI}/mostrar-img-slide/${data[1]}`);
        
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
                                    required
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