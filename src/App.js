import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';

import Administradores from './components/content/administradores/Administradores';
import Articulos from './components/content/articulos/Articulos';
import Galeria from './components/content/galeria/Galeria';
import Slide from './components/content/slide/Slide';
import Usuarios from './components/content/usuarios/Usuarios';


export default function App() {
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
          </Switch>
        </BrowserRouter>

        <Footer/>

      </div>
    </div>
  );
}