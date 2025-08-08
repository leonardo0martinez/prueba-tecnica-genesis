/***************************************************************************/
// *
// * Manejo de Alertas
// *
/***************************************************************************/
export function alertar(tipo, mensaje, api) {
    switch (tipo) {
        case 'success':
            api.success({
                message: 'Operación exitosa',
                description: mensaje,
                placement: 'topRight',
                style: { padding: 24 }
            })
            break
        case 'error':
            api.error({
                message: 'Error en la operación',
                description: mensaje,
                placement: 'topRight',
                duration: 3.5,
                style: { padding: 24 }
            })
            break
        case 'info':
            api.info({
                message: 'Información importante',
                description: mensaje,
                placement: 'topRight',
                duration: 3.5,
                style: { padding: 24 }
            })
            break
        default:
    }
}