import React, {useState} from 'react';
import $ from 'jquery';
/* import {rutaAPI} from '../../../config/Config'; */

export default function CrearAdministradores(){

    /* Hook para capturar datos */
    const [administradores, crearAdministrador] = useState({
        usuario:"",
        password:""
    })

    /* onChange */
    const cambiaFormPost = e =>{

        crearAdministrador({

            ...administradores, 
            [e.target.name] : e.target.value
        })

    }

    /* onSubmit */
    const submitPost = async e => {

        e.preventDefault();

        const { usuario, password } = administradores;

        /* Validamos que el campo de usuario no venga vacio */
        if (usuario === "") {
            $(".invalid-usuario").show();
            $(".invalid-usuario").html("Completa este campo");
            return;
        }

        /* Validamos la expresion regular para el usauario */
        const expUsuario = /^(?=.*[A-Za-z]).{2,10}$/;

        if (!expUsuario.test(usuario)) {
            $(".invalid-usuario").show();
            $(".invalid-usuario").html("Utiliza un formato que coincida con lo solicitado");
            return;
        }

        /* Validamos que el campo de password no venga vacio */
        if (password === "") {
            $(".invalid-password").show();
            $(".invalid-password").html("Completa este campo");
            return;
        }

        /* Validamos la expresion regular para el password */
        const expPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

        if (!expPassword.test(password)) {
            $(".invalid-password").show();
            $(".invalid-password").html("Utiliza un formato que coincida con lo solicitado");
            return;
        }
    }

    /* Retornamos vista del componente */
    return(

        <div className="modal" id="crearAdmin">
            <div className="modal-dialog">
                <div className="modal-content">
                
                    <div className="modal-header">
                        <h4 className="modal-title">Crear Administrador</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <form onChange={cambiaFormPost} onSubmit={submitPost} >

                        <div className="modal-body">
                            
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="usuario">
                                    Minimo 2 caracteres, maximo 10, sin numeros.
                                </label>
                                <div className=" input-group mb-3">
                                    
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-user"></i>
                                    </div>

                                    <input
                                        id="usuario"
                                        type="text"
                                        className="form-control text-lowercase"
                                        name="usuario"
                                        placeholder="Ingrese el Usuario*"
                                        minLength="2"
                                        maxLength="10"
                                        pattern="(?=.*[A-Za-z]).{2,10}"
                                        required
                                    />
                                    <div className="invalid-feedback invalid-usuario"></div>

                                </div>
                            </div>

                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="password">
                                    Minimo 8 caracteres, letras en mayúscula, minúscula y numeros
                                </label>
                                <div className=" input-group mb-3">
                                    
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-key"></i>
                                    </div>

                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Ingrese el Password*"
                                        minLength="8"
                                        pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}"
                                        required
                                    />
                                    <div className="invalid-feedback invalid-password"></div>

                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="modal-footer d-flex justify-content-between">
                            <div>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">Enviar</button>
                            </div>
                        </div>

                    </form>
                    
                </div>
            </div>
        </div>

    )

}