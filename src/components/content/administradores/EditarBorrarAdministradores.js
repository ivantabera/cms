import React, {useState}  from 'react';
import Swal from 'sweetalert2';
import $ from 'jquery';
import {rutaAPI} from '../../../config/Config';

export default function EditarBorrarAdministradores(){

    /* Hook para capturar datos */
    const [administradores, editarAdministrador] = useState({
        usuario:"",
        password:"",
        id:""
    })

    /* onChange */
    const cambiaFormPut = e =>{
        editarAdministrador({

            ...administradores, 
            [e.target.name] : e.target.value
            
        })
    }

    /* onSubmit */
    const submitPut = async e => {

        $('.alert').remove();

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

        /* Validamos la expresion regular para el password */
        if(password !== ""){
            const expPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

            if (!expPassword.test(password)) {
                $(".invalid-password").show();
                $(".invalid-password").html("Utiliza un formato que coincida con lo solicitado");
                return;
            }
        } 
        

        /* Ejecutamos servicio PUT */
        const result = await putData(administradores);

        /* Error en la peticion */
        if(result.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${result.mensaje}</div>`)
        }

        /* Peticion exitosa */
        if(result.status === 200){
            $(".modal-footer").before(`<div class="alert alert-success">${result.mensaje}</div>`)

            $('button[type="submit"]').remove();

            setTimeout(() =>{ window.location.href = "/"; }, 3000);
        }
    }

    /* Capturar datos para editar */
    $(document).on("click", ".editarInputs", function(e){

        e.preventDefault();

        let data = $(this).attr("data").split(',');
        //console.log('data', data);
        $("#editarUsuario").val(data[1]);

        editarAdministrador({

            'usuario': $('#editarUsuario').val(), 
            'password' : $('#editarPassword').val(),
            'id' : data[0]
        })

    })

    /* Capturar datos para borrar */
    $(document).on("click", ".borrarInput", function(e){

        e.preventDefault();

        let data = $(this).attr("data").split(',')[0];
        $("#editarUsuario").val(data[1]);


        Swal.fire({
            title:'¿Estas seguro de querer borrar a este administrador?',
            text: "Esta accion no puede ser revertida",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!'
        }).then((result) => {
            if(result.value){

                /* Ejecutamos servicio DELETE */
                const borrarAdministrador = async () => {
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
                                window.location.href="/"
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
                                window.location.href="/"
                            }
                        })
                    }

                }
                borrarAdministrador();
                if(result){
                    Swal.fire(
                        'Borrado!',
                        'El administrador ha sido borrado',
                        'success'
                    )
                }
                
            }
        });

    })

    return(

        <div className="modal" id="editarAdmin">
            <div className="modal-dialog">
                <div className="modal-content">
                
                    <div className="modal-header">
                        <h4 className="modal-title">Editar Administradores</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <form onChange={cambiaFormPut} onSubmit={submitPut} encType="multipart/form-data" >

                        <div className="modal-body">

                            {/* Nombre */}
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="editarUsuario">
                                    Minimo 2 caracteres, maximo 10, sin numeros.
                                </label>
                                <div className=" input-group mb-3">
                                    
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-user"></i>
                                    </div>

                                    <input
                                        id="editarUsuario"
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

                            {/* Password */}
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="editarPassword">
                                    Minimo 6 caracteres, letras en mayúscula, minúscula y numeros
                                </label>
                                <div className=" input-group mb-3">
                                    
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-key"></i>
                                    </div>

                                    <input
                                        id="editarPassword"
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Ingrese el Password*"
                                        minLength="8"
                                        pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}"
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
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>

                    </form>
                    
                </div>
            </div>
        </div>

    )

}

/* Peticion put para ACTUALIZAR administradores */
const putData = data => {

    const url = `${rutaAPI}/actualizar-administrador/${data.id}`;
    const token = localStorage.getItem("ACCESS_TOKEN");

    const params = {
        method:"PUT",
        body:JSON.stringify(data),
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

/* Peticion delete para BORRAR administradores */
const deleteData = data => {

    const url = `${rutaAPI}/borrar-administrador/${data}`;
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