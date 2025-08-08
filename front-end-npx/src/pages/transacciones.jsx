/***************************************************************************/
// * Pagina de clientes
// *************************************************************************/
// *  - Muestra la lista de clientes
// *
// * Opciones
// *  - Enlaza a informacion completa del cliente
// *  - Enlaza a edicion del cliente
// *  - Enlaza a cartera del cliente
// *
// * Funciones extra
// *  - Drowdown segun roles de usaurio
/***************************************************************************/
import { useState, useEffect } from 'react'
import { Dropdown, Layout, notification, Button, Divider, Spin, Row, Col } from 'antd'
import {
    LiaAngleDownSolid,
    LiaInfoCircleSolid,
    LiaEdit,
    LiaWalletSolid,
    LiaPlusSolid
} from 'react-icons/lia'
import { Link } from 'react-router-dom'
import axios from 'axios'
// Funciones
import { alertar } from '../constant/alertar'
//Componentes
import { Titulo } from '../components/common/titulo'
import { SeleccionadorSucursal } from '../components/sleccionador/sucursal'
import { TableFilterExport } from '../components/common/tabla'
// Constantes
import { SERVER } from '../constant/enlaces'
import { ROLES, TIPO_PERSONA } from '../constant/constantes'

// Componente para listar los clientes
export function Transacciones() {
    return (
        <h1>Transacciones</h1>
    )
}