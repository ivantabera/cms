import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

/* Componente login */
import Login from './components/content/login/Login';

/* Componentes fijos */
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';

/* Componentes dinamicos */
import Administradores from './components/content/administradores/Administradores';
import Articulos from './components/content/articulos/Articulos';
import Galeria from './components/content/galeria/Galeria';
import Slide from './components/content/slide/Slide';
import Usuarios from './components/content/usuarios/Usuarios';
import Error404 from './components/content/error404/Error404';


export default function App() {

  const auth = getAccessToken();

  if(!auth){
    return(
      <Login/>
    )
  }

  return (

    <div className="sidebar-mini">
      <div className="wrapper">

        <Header/>
        <Sidebar/>

        <BrowserRouter>
          <Switch>

            <Route exact path="/" component={Administradores}/>
            <Route exact path="/articulos" component={Articulos}/>
            <Route exact path="/galeria" component={Galeria}/>
            <Route exact path="/slide" component={Slide}/>
            <Route exact path="/usuarios" component={Usuarios}/>
            <Route component={Error404}/>

          </Switch>
        </BrowserRouter>

        <Footer/>

      </div>
    </div>
  );
}

/* Funcion para tener acceso al token */
const getAccessToken =  () => {

  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const id = localStorage.getItem("ID");
  const usuario = localStorage.getItem("USUARIO");

  if(!accessToken || accessToken === "null"){
    return false;
  }

  const metaToken = jwtDecode(accessToken);

  if(metaToken.data._id !== id || metaToken.data.usuario !== usuario){
    return false;
  } else {
    return true;
  }

}