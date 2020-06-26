import React from 'react';
import {rutaAPI} from '../../../config/Config';

export default function Slide(){

    const Slide01 = `${rutaAPI}/mostrar-img-slide/447.jpg`;

    return(


        <div className="content-wrapper" style={{minHeight:"494px"}}>

            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Slide</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-lg-12">

                            <div className="card card-primary card-outline">

                            <div className="card-header">
                                    <h5 className="m-0">
                                        <button className="btn btn-primary">
                                            Crear nuevo Slide
                                        </button>
                                    </h5>
                                </div>

                                <div className="card-body">

                                    <table className="table table-striped" style={{width:"100%"}}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th width="320px">Imagen</th>
                                                <th>Titulo</th>
                                                <th>Descripción</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <td>1</td>
                                            <td>
                                                <img src={Slide01} className="img-fluid" />
                                            </td>
                                            <td>Lorem, ipsum</td>
                                            <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit</td>
                                            <td>
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-warning rounded-circle mr-2">
                                                        <i className="nav-icon fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-danger rounded-circle">
                                                        <i className="nav-icon fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tbody>
                                    </table>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>


    )
}