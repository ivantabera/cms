import React from 'react';

export default function Error404(){

    return(
        
                
        <div className="content-wrapper">

            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>404 Error Page</h1>
                        </div>
                    </div>
                </div>
            </section>


            <section className="content">
                <div className="error-page">
                    <h2 className="headline text-warning"> 404</h2>

                    <div className="error-content">
                        <h3><i className="fas fa-exclamation-triangle text-warning"></i> Oops! Pagina no encontrada.</h3>

                        <p>
                            No pudimos encontrar la página que estabas buscando.
                            Mientras tanto, puede <a href="/">volver al inicio de la página</a>.
                        </p>

                    </div>

                </div>

            </section>

        </div>

    )

}