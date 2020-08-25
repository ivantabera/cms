import React from 'react';

export default function EditarArticulos(){

    const cambiaFormPut =  e => {

    }

    const submitPut = async e => {

    }

    return(

        <div className="modal" id="editarArticulo">
            <div className="modal-dialog">
                <div className="modal-content">
                
                    <div className="modal-header">
                        <h4 className="modal-title">Editar Articulos</h4>
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