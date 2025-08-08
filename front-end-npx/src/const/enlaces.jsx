
// Logos
import {
    LiaHomeSolid,
    LiaUsersSolid,
    LiaAddressBookSolid,
    LiaUserTieSolid,
    LiaMoneyCheckAltSolid,
    LiaCashRegisterSolid,
    LiaCogSolid,
    LiaPasteSolid,
    LiaClipboardCheckSolid,
    LiaWalletSolid,
    LiaMoneyBillWaveAltSolid,
    LiaUser
} from 'react-icons/lia'

// Componentes
import { Inicio } from '../pages/inicio.jsx';
import { Perfil } from '../pages/perfil.jsx';
import { Registrar } from '../pages/registrar.jsx';

export const SERVER = 'http://localhost:5000/';


export const ENLACES = [
    {
        url: '/sistema/inicio',
        path: 'inicio',
        icono: <LiaHomeSolid />,
        titulo: 'Inicio',
        component: <Inicio />
    },
    {
        url: '/sistema/perfil',
        path: 'perfil',
        icono: <LiaUser />,
        titulo: 'Perfil',
        component: <Perfil />
    },
    {
        url: '/sistema/tarjetas',
        path: 'tarjetas',
        icono: <LiaWalletSolid />,
        titulo: 'Tarjetas',
        component: <h1>Tarjetas</h1>
    },
    {
        url: '/sistema/transacciones',
        path: 'transacciones',
        icono: <LiaCashRegisterSolid />,
        titulo: 'Transacciones',
        component: <h1>Transacciones</h1>
    },
    {
        url: '/sistema/Movimientos',
        path: 'movimientos',
        icono: <LiaMoneyCheckAltSolid />,
        titulo: 'Movimientos',
        component: <h1>Movimientos</h1>
    },
]

// Obtener opciones de menu por rol
export const enlacesPorRol = (rol) => {
    return ENLACES.filter((enlace) => {
        if (enlace.roles) {
            return enlace.roles.includes(rol)
        }
    })
}
// Obtener objeto de enlace por path
export const enlacePorPath = (path = '') => {
    return ENLACES.find((enlace) => enlace.path === path)
}
// Obtener objeto de enlace por url
export const enlacePorUrl = (url = '') => {
    return ENLACES.find((enlace) => enlace.url === url)
}