import dayjs from 'dayjs'
import numeral from 'numeral'
/***************************************************************************/
// *
// * Mascaras de texto
// *
/***************************************************************************/
// FORMATO PARA INPUTS DE DINERO
export const moneyMask = (value) => {
    let neg = Number(value) < 0 ? true : false
    value = String(value)
    value = value?.replace(/\D/g, '')
    value = value?.replace(/(\d)(\d{2})$/, '$1.$2')
    value = value?.replace(/(?=(\d{3})+(\D))\B/g, ',')
    return neg ? `- ${value}` : value
}
// REMOVER MASCARA DE DINERO
export const moneyDeMask = (value) => {
    try {        
        let numberStr = String(value).replace(/[^\d.-]/g, '')        
        let number = numeral(numberStr).value()
        return number
    } catch (error) {
        console.log('moneyDeMask error', error)
        return null
    }
}
// MANEJAR INPUT DE DINERO
export const formatMoney = (event, form, name) => {
    let value = event.target.value
    let formatMoney = moneyMask(value)
    let obj = {}
    obj[name] = formatMoney
    form.setFieldsValue(obj)
}
// FORMATO PARA LOS TELEFONOS
export const telefonoMask = (value) => {
    return value?.slice(0, 4) + '-' + value?.slice(4)
}
/***************************************************************************/
// *
// * Reglas de validación para fomularios
// *
/***************************************************************************/
// REGLA DE NO NULO
export const noNull = [{ required: true, message: 'Campo no puede ser vacío!' }]
// REGLA DE TELEFONO QUE SEA REQUERIDO
export const celNoNull = [
    { required: true, message: 'Campo no puede ser vacío!' },
    { len: 8, message: 'Son 8 Dígitos!' }
]
// REGLA DE TELEFONO QUE NO SEA REQUERIDO
export const celNull = [{ len: 8, message: 'Son 8 Dígitos!' }]
// REGLA PARA INPUT DE DPI
export const dpiNoNull = [
    { required: true, message: 'Campo no puede ser vacío!' },
    { len: 13, message: 'Son 13 Dígitos!' }
]
// REGLA PARA VERIFICAR EL MONTO INGRESADO
export const min1000 = [
    { required: true, message: 'Campo no puede ser vacío!' },
    {
        validator: (_, value) =>
            moneyDeMask(value) >= 1000
                ? Promise.resolve()
                : Promise.reject('No puede ser menor a Q1,000.00')
    }
]
// REGLA PARA VERIFICAR EL MONTO INGRESADO
export const min10 = [
    { required: true, message: 'Campo no puede ser vacío!' },
    {
        validator: (_, value) =>
            moneyDeMask(value) >= 10
                ? Promise.resolve()
                : Promise.reject('No puede ser menor a Q1,000.00')
    }
]
// REGLA PARA VERIFICAR UN MONTO VARIABLE
export const minVar = (amount) => [
    { required: true, message: 'Campo no puede ser vacío!' },
    {
        validator: (_, value) => {
            return Number(moneyDeMask(value)) >= Number(amount)
                ? Promise.resolve()
                : Promise.reject(`No puede ser menor a Q ${moneyMask(amount?.toFixed(2))}`)
        }
    }
]
export const maxVar = (amount) => [
    { required: true, message: 'Campo no puede ser vacío!' },
    {
        validator: (_, value) => {
            return Number(moneyDeMask(value)) <= Number(amount)
                ? Promise.resolve()
                : Promise.reject(`No puede ser menor a Q ${moneyMask(amount?.toFixed(2))}`)
        }
    }
]
// VERIFICAR LA CANTIDAD DE ARCHIVOS
export const checkFiles = (len, numFiles, required = true) => {
    return required ? numFiles === len : true
}
// REGLA NO DE BOLETA
export const factura = [
    { required: true, message: 'Campo no puede ser vacío!' },
    {
        validator: (_, value) =>
            String(value).length > 3 && String(value).length <= 10
                ? Promise.resolve()
                : Promise.reject('Debe ser entre 4 y 10 dígitos!')
    }
]
// REGLA NUM DE CUOTAS PARA PRESTAMO DIARIO
export const cuotaDiaria = [
    { required: true, message: 'Campo no puede ser vacío!' },
    {
        validator: (_, value) =>
            Number(value) === 20 || Number(value) === 40
                ? Promise.resolve()
                : Promise.reject('Sólo 20 o 40 días!')
    }
]
// REGLA NUM DE CUOTAS PARA PRESTAMO MENSUAL
export const cuotaMensual = [
    { required: true, message: 'Campo no puede ser vacío!' },
    {
        validator: (_, value) =>
            Number(value) > 0 && Number(value) <= 36
                ? Promise.resolve()
                : Promise.reject('Sólo de 1 a 36 meses!')
    }
]
// REGLA PARA NO COLOCAR DOMINGOS
export const noDomingo = [
    { required: true, message: 'Campo no puede ser vacío!' },
    {
        validator: (_, value) =>
            dayjs(value).day() !== 0 ? Promise.resolve() : Promise.reject('No puede ser domingo!')
    }
]
// REGLA PARA HACER COHICIDIR CONTRASEÑAS
export const twoPwd = (fieldName) => {
    return [
        { required: true, message: 'Campo no puede ser vacío!' },
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue(fieldName) === value) {
                    return Promise.resolve()
                }
                return Promise.reject('Las contraseñas no coinciden!')
            }
        })
    ]
}
// REGLA PARA AÑO DE CARRO
export const añoNull = [
    {
        validator: (_, value) =>
            (Number(value) > 1920 && Number(value) < 2050) || !value
                ? Promise.resolve()
                : Promise.reject('Ingrese un Año Válido!')
    }
]
// REGLA PARA FECHA DESPUES DE HOY
export const despuesDeHoy = [
    {
        validator: (_, value) =>
            dayjs(value).isBefore(dayjs()) || !value
                ? Promise.resolve()
                : Promise.reject('Fecha no puede ser después de hoy!')
    }
]
// REGLA PARA FECHA DESPUES DE HOY
export const despuesDeHoyNoNull = [
    { required: true, message: 'Campo no puede ser vacío!' },
    {
        validator: (_, value) =>
            dayjs(value).isBefore(dayjs())
                ? Promise.resolve()
                : Promise.reject('Fecha no puede ser después de hoy!')
    }
]
// REGLA PARA LOS NUMEROS DE PLACA PERMITIENDO NULL
export const placaNull = [
    {
        validator: (_, value) =>
            /^[A-Z]\d{3}[A-Z]{3}$/.test(value) || !value
                ? Promise.resolve()
                : Promise.reject('No. de placa errónea!')
    }
]
// REGLA PARA VERIFICAR QUE SEA MAYOR DE EDAD
export const mayorDeEdad = [
    { required: true, message: 'Campo no puede ser vacío!' },
    {
        validator: (_, value) =>
            dayjs().diff(dayjs(value), 'year') >= 18
                ? Promise.resolve()
                : Promise.reject('Debe ser mayor de edad!')
    }
]
// Funcion para generar keys
export const randomStr = (length) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let randomString = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        randomString += charset.charAt(randomIndex)
    }
    return randomString
}