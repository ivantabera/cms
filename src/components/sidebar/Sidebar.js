import React from 'react';
import Logo from './AdminLTELogo.png';
import Photo from './user2-160x160.jpg';

export default function Sidebar(){

    return(
        /* <!-- Main Sidebar Container --> */
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* <!-- Brand Logo --> */}
          <a href="index3.html" className="brand-link">
            <img 
                src={Logo} 
                alt="AdminLTE Logo" 
                className="brand-image img-circle elevation-3" 
                style={{opacity: '.8'}}
            />
            <span className="brand-text font-weight-light">CMS</span>
          </a>
      
         {/*  <!-- Sidebar --> */}
          <div className="sidebar">
            {/* <!-- Sidebar user panel (optional) --> */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                    src={Photo} 
                    alt="UserImage"
                    className="img-circle elevation-2" 
                />
              </div>
              <div className="info">
                <a href="#/" className="d-block">Administrador</a>
              </div>
            </div>
      
            {/* <!-- Sidebar Menu --> */}
            <nav className="mt-2">

                <ul 
                    className="nav nav-pills nav-sidebar flex-column" 
                    data-widget="treeview" 
                    role="menu" 
                    data-accordion="false"
                >

                    <li className="nav-item">
                        <a href="#/" className="nav-link">
                            <i className="nav-icon fas fa-user-lock"></i>
                            <p>
                            Administradores
                            <span className="right badge badge-danger">New</span>
                            </p>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a href="#/" className="nav-link">
                            <i className="nav-icon fas fa-sliders-h"></i>
                            <p>
                                Slide
                            <span className="right badge badge-danger">New</span>
                            </p>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a href="#/" className="nav-link">
                            <i className="nav-icon fas fa-images"></i>
                            <p>
                                Galeria
                            <span className="right badge badge-danger">New</span>
                            </p>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a href="#/" className="nav-link">
                            <i className="nav-icon fas fa-file"></i>
                            <p>
                                Articulos
                                <span className="right badge badge-danger">New</span>
                            </p>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a href="#/" className="nav-link">
                            <i className="nav-icon fas fa-users"></i>
                            <p>
                                Usuarios
                            <span className="right badge badge-danger">New</span>
                            </p>
                        </a>
                    </li>
                </ul>
            </nav>
            {/* <!-- /.sidebar-menu --> */}
          </div>
          {/* <!-- /.sidebar --> */}
        </aside>
    )

}