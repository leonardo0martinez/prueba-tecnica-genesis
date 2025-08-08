
/***************************************************************************/
// *
// * Verifica si el usuario tiene acceso a la ruta
// *
/***************************************************************************/
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from './auth'
import { AppLayout } from '../components/app-layout'
import { useEffect } from 'react'
// Definicion del componente
export function Acceso() {
    const { sesion } = useAuth()
    // Verificar sesion
    useEffect(() => {
        sesion()
    }, [])
    // Ver si tiene usaurio actual
    const usaurioActual = JSON.parse(window.localStorage.getItem('usuarioActual'))
    if (usaurioActual) {
        return (
            <AppLayout>
                <Outlet />
                <Link to={'/'}>Regresar al inicio</Link>
            </AppLayout>
        )
    } else {
        return (
            <div>
                <h1>Acceso denegado</h1>
                <Link to={'/'}>Regresar al inicio</Link>
            </div>
        )
    }
}
