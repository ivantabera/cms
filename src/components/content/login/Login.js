import React, {useState} from 'react';
import {rutaAPI} from '../../../config/Config';
import $ from 'jquery';

export default function Login(){

    /* Hook para iniciar sesion */
    const [administradores, iniciarSesion] = useState({
        usuario:"",
        password:""
    });

    /* Capturamos cambios del formulario para ejecutar la funcion del hook */
    const cambiaForm = (e) => {

        iniciarSesion({
            ...administradores,
            [e.target.name]:e.target.value
        })
        
    }

    /* Ejecutamos el submit */
    const login = async e => {

        /* Removemos la clase alert cada que se da click en el submit */
        $(".alert").remove();

        /* Se evita el evento por default al dar click en submit */
        e.preventDefault();
        
        const result = await loginAPI(administradores);

        if(result.status !== 200){
            $("button[type='submit']").before(`<div class='alert alert-danger'>${result.mensaje}</div>`)
        } else{
            $("button[type='submit']").before(`<div class='alert alert-success'>${result.token}</div>`)
        }
    }

    /* Retornamos la vista */
    return(

        <div className="hold-transition login-page">

            <div className="login-box">
                
                <div className="login-logo">
                    <b>CMS</b>
                </div>

                <div className="card">

                    <div className="card-body login-card-body">

                        <p className="login-box-msg">Inicia sesión</p>

                        <form onChange={cambiaForm} onSubmit={login}>

                            <div className="input-group mb-3">

                                <input 
                                    type="usuario" 
                                    className="form-control" 
                                    placeholder="Usuario"
                                    name="usuario"
                                />

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>

                            </div>

                            <div className="input-group mb-3">

                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Password"
                                    name="password"
                                />

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>

                            </div>

                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-block">
                                            Ingresa
                                    </button>

                        </form>


                    </div>

                </div>
            </div>

        </div>

    )

}

/* Peticion POST para login */
const loginAPI = data => {
    const url = `${rutaAPI}/login`;
    
    const params = {
        method:'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    }

    return fetch(url, params).then(response => {

        return response.json();

    }).then(result => {

        return result;

    }).catch(err => {

          return err;

    })
    
}