import React from 'react';
import '../css/Sidebar.css';
import {SidebarData} from './SidebarData.js';
import {Link} from 'react-router-dom';

function Sidebar() {
  return (
    <div className="Sidebar">
        <h2 className="titre">Gestion Location Appartement</h2>
        <ul className="SidebarList">
        {
            SidebarData.map((val,key)=>{
                return (
                    <Link to={val.link}>
                    <li key={key} 
                        className="row" 
                        id={window.location.pathname === val.link ? "active" : ""} 
                    >
                        <div id="icon">{val.icon}</div>
                        <div id="title">{val.title}</div>
                    </li>
                    </Link>
                )
            })
        }
        </ul>
    </div>
  )
}

export default Sidebar;