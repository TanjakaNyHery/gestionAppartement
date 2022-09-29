import React from 'react';
import scan from '../img/etat.png';
import mvt from '../img/mvt.png';
import prod from '../img/prod.png';

export const SidebarData = [
    {
        title : "Appartement",
        icon : <img src={scan} alt="" />,
        link : "/Appartement",
    },
    {
        title : "Locataire",
        icon : <img src={prod} alt="" />,
        link : "/Locataire",
    },
    {
        title : "Louer",
        icon : <img src={mvt} alt="" />,
        link : "/Louer",
    }
]