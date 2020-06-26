import React from 'react';
import {rutaAPI} from '../../../config/Config';

export default function Articulos(){

    const Articulo01 = `${rutaAPI}/mostrar-img-articulo/6215.jpg`;

    return(


        <div className="content-wrapper" style={{minHeight:"494px"}}>

            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Articulos</h1>
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
                                            Crear nuevo Articulo
                                        </button>
                                    </h5>
                                </div>

                                <div className="card-body">

                                    <table className="table table-striped" style={{width:"100%"}}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th width="320px">Portada</th>
                                                <th>URL</th>
                                                <th>Titulo</th>
                                                <th>Intro</th>
                                                <th>Contenido</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <img src={Articulo01} className="img-fluid" alt="galeria"/>
                                                </td>
                                                <td>lorem-ipsum-1</td>
                                                <td>Lorem, ipsum</td>
                                                <td>1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae accusamus voluptatum omnis non facere itaque aliquam temporibus, nisi pariatur facilis similique possimus eaque iure doloribus natus animi eos, suscipit eum!</td>
                                                <td>
                                                    <h2>lorem ipsum1</h2><img src="http://localhost:4000/mostrar-img-articulo/1431.jpg" className="py-3 img-fluid" alt="galeria" /><div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum vero, consectetur mollitia ducimus ea placeat veritatis totam. Voluptatum qui tenetur ut eum, laboriosam quibusdam amet provident possimus eveniet consequatur ea. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum vero, consectetur mollitia ducimus ea placeat veritatis totam. Voluptatum qui tenetur ut eum, laboriosam quibusdam amet provident possimus eveniet consequatur ea.</div><br/><div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum vero, consectetur mollitia ducimus ea placeat veritatis totam. Voluptatum qui tenetur ut eum, laboriosam quibusdam amet provident possimus eveniet consequatur ea.</div><br/><div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum vero, consectetur mollitia ducimus ea placeat veritatis totam. Voluptatum qui tenetur ut eum, laboriosam quibusdam amet provident possimus eveniet consequatur ea.</div><br/><div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum vero, consectetur mollitia ducimus ea placeat veritatis totam. Voluptatum qui tenetur ut eum, laboriosam quibusdam amet provident possimus eveniet consequatur ea.</div>
                                                </td>
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
                                            </tr>
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