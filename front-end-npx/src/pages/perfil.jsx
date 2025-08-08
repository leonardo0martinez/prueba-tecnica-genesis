import { Layout, notification } from "antd";
import { Titulo } from "../components/titulo";
import { FormCuenta } from "../forms/form-cuenta";
import { useState, useEffect } from "react";
import { SERVER } from "../const/enlaces";
import axios from 'axios'
// Funciones
import { alertar } from '../const/alertar'

export function Perfil() {
    // Información de la cuenta
    const [cuenta, setCuenta] = useState();
    // Notificaciones
    const [api, contextHolder] = notification.useNotification()
    // Cargando
    const [loading, setLoading] = useState(false)
    // Realizar la peticion
    const fetchCuenta = async () => {
        // Usuario Actual
        const usuarioActual = JSON.parse(window.localStorage.getItem('usuarioActual'))
        setLoading(true)
        await axios
            .get(SERVER + `cuenta/info/${usuarioActual?.cuenta_id}`, {
                headers: { Authorization: 'Bearer ' + window.localStorage.getItem('token') }
            })
            .then((respuesta) => {
                const { status, data } = respuesta
                const { resultado, mensaje } = data
                const { cuenta } = resultado
                if (status === 200 || status === 304) {
                    setCuenta(cuenta)
                } else {
                    alertar('error', mensaje, api)
                }
            })
            .catch((err) => {
                console.error('Error en la peticion ', err.config.url)
                console.error(err)
                console.error(err?.response?.data)
                alertar('error', 'No hubo respuesta del servidor', api)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    // Realizar la petición al rendereizar
    useEffect(() => {
        fetchCuenta()
    }, [])

    return (
        <Layout>
            <Titulo enlaceActual={'/sistema/perfil'} enlaceRegreso={''} />
            <FormCuenta cuenta={cuenta} />
        </Layout>
    )
}