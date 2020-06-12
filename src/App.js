import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Administradores from './components/content/administradores/Administradores';
import Footer from './components/footer/Footer';


export default function App() {
  return (
    <div className="sidebar-mini">
      <div className="wrapper">

        <Header/>
        <Sidebar/>
        <Administradores/>
        <Footer/>

      </div>
    </div>
  );
}