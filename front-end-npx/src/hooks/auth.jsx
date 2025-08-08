/***************************************************************************/
// *
// * Manejo de sesiones de usuario
// *
/***************************************************************************/
import { createContext, useContext, useMemo } from 'react'
import { jwtDecode as decode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import propType from 'prop-types'
// Contexto de autenticacion
const AuthContext = createContext({})
// Componente proveedor de autenticacion
export function AuthProvider({ children = null }) {
    // Navegacion
    const navigate = useNavigate()
    // Iniciar Sesion
    const login = (token, usuario) => {
        window.localStorage.setItem('token', token)
        window.localStorage.setItem('usuarioActual', JSON.stringify(usuario))
        navigate('/sistema/inicio')
    }
    // Cerrar Sesión
    const logout = () => {
        window.localStorage.clear('token')
        window.localStorage.clear('usuarioActual')
        navigate('/')
    }
    // Limpiar almacenamiento
    const clearStorage = () => {
        window.localStorage.clear('token')
        window.localStorage.clear('usuarioActual')
    }
    // Verificar sesion activa
    const sesion = () => {
        const token = window.localStorage.getItem('token')
        if (token) {
            const { exp } = decode(token)
            if (Date.now() > new Date(exp)) {
                alert('Sesion expirada, será redirigido al login')
                clearStorage()
                navigate('/')
            }
        } else {
            clearStorage()
            navigate('/')
        }
    }
    // Memoria
    let memory = useMemo(() => ({ login, logout, sesion }), [])
    // Retornar el contexto
    return <AuthContext.Provider value={memory}> {children} </AuthContext.Provider>
}
// Definicion del componente
AuthProvider.propTypes = {
    children: propType.node.isRequired
}
// Unilizar hook del contexto
export const useAuth = () => {
    return useContext(AuthContext)
}