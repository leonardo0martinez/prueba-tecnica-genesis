/***************************************************************************/
// * Form de cuenta
// *************************************************************************/
// *  - Registrar la informacion de un cuenta
// *  - Mostrar la informacion de un cuenta
// *  - Editar la informacion de un cuenta
/***************************************************************************/
// Librerias
import { useState, useEffect } from 'react'
import {
    Form,
    Input,
    Row,
    Col,
    Select,
    Divider,
    DatePicker,
    Button,
    Typography,
    notification
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { LiaSave, LiaTrashAlt, LiaTimesCircleSolid } from 'react-icons/lia'
import propTypes from 'prop-types'
import axios from 'axios'
// Funciones
import { celNoNull, dpiNoNull, mayorDeEdad, noNull } from '../const/reglas'
import { alertar } from '../const/alertar'
import { SERVER } from '../const/enlaces'
import { COLORES } from '../const/colores'
// constes ant design
const { Text } = Typography

export function FormCuenta({ cuenta, editable = true, nuevo=false }) {
    // Navegar para cancelar
    const navigate = useNavigate()
    // Hook de Formulario
    const [form] = Form.useForm()
    // Notificaciones
    const [api, contextHolder] = notification.useNotification()

    // Funcion para limpiar los campos
    const limpiarForm = () => {
        form.resetFields()
    }
    // Funcion para realizar el submit
    const submit = async (data) => {
        if (!data?.pwd) {
            alertar('error', 'Contraseñas no coinciden', api)
            return
        }
        if (data?.pwd != data?.pwd_2) {
            alertar('error', 'Contraseñas no coinciden', api)
            return
        }

        // Realizar peticion para registrar
        const url = cuenta?.cuenta_id ? SERVER + 'cuenta/editar' : SERVER + 'usuario/registrar'
        if(cuenta?.cuenta_id){
            data.cuenta_id = cuenta?.cuenta_id
        }

        await axios
            .post(url, data, nuevo ? {} : {
                headers: {
                    Authorization: 'Bearer ' + window.localStorage.getItem('token')
                }
            })
            .then((respuesta) => {
                const { data } = respuesta
                const { resultado, mensaje } = data
                if (resultado) {
                    alertar('success', mensaje, api)
                } else {
                    alertar('error', mensaje, api)
                }
            })
            .catch((error) => {
                alertar('error', error?.response?.data?.mensaje || 'No hubo respuesta del servidor', api)
            })
    }
    // Colocar valores del cuenta
    useEffect(() => {
        if (cuenta?.cuenta_id) {
            form.setFieldsValue(cuenta)
        }
    }, [cuenta])

    return (
        <Form
            form={form}
            name={'cuentas-form'}
            onFinish={submit}
            layout={'vertical'}
            style={{ paddingBottom: 30 }}
            disabled={!editable}
            variant={editable ? 'outlined' : 'borderless'}
        >
            {contextHolder}
            <Row gutter={50} justify={'center'}>
                {/* DATOS PERSONALES  ----------------------------------------------------------------------*/}
                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                    <legend style={css.legend}>Datos Personales</legend>
                    {/* NOMBRES */}
                    <Form.Item label="Nombres" name="nombres" rules={noNull}>
                        <Input type="text" placeholder="Nombres de cuenta" />
                    </Form.Item>
                    {/* APELLIDOS */}
                    <Form.Item label="Apellidos" name="apellidos" rules={noNull}>
                        <Input type="text" placeholder="Apellidos de cuenta" />
                    </Form.Item>
                    {/* NO DE DPI */}
                    <Form.Item label="No. de DPI" name="dpi" rules={dpiNoNull}>
                        <Input type="number" placeholder="Número de DPI" />
                    </Form.Item>
                    {/* TELEFONO */}
                    <Form.Item label="Teléfono" name="telefono" rules={celNoNull}>
                        <Input type="number" placeholder="Número de Teléfono" maxLength={8} />
                    </Form.Item>

                    <legend style={css.legend}>Cuenta</legend>
                    {/* NOMBRE DE USUARIO */}
                    <Form.Item label="Nombre de Usuario" name="usuario" rules={noNull}>
                        <Input type="text" placeholder="Nombre de Usuario" />
                    </Form.Item>
                    {/* CONTRASEÑA DE USAURIO */}
                    {editable && (
                        <>
                            <Form.Item label="Contraseña de Usuario" name="pwd" rules={noNull}>
                                <Input type="password" placeholder="Contraseña de Usuario" />
                            </Form.Item>
                            <Form.Item label="Confirmar Contraseña" name="pwd_2" rules={noNull}>
                                <Input type="password" placeholder="Contraseña de Usuario" />
                            </Form.Item>
                        </>
                    )}
                </Col>
            </Row>

            {/* BOTONES DE FORMULARIO ----------------------------------------------------------------------*/}
            <Divider />
            {editable && (
                <div style={css.btnDiv}>
                    <Button
                        onClick={() => navigate(nuevo ? '/' :'/sistema/inicio', { replace: true })}
                        style={css.btns}
                        type={'primary'}
                        icon={<LiaTimesCircleSolid style={css.btnIcon} />}
                        danger
                    >
                        {nuevo? 'Regresar' : 'Cancelar'}
                    </Button>
                    <Button
                        onClick={limpiarForm}
                        className={'custom-warning-button'}
                        type={'default'}
                        style={css.btns}
                        icon={<LiaTrashAlt style={css.btnIcon} />}
                    >
                        Limpiar Campos
                    </Button>
                    <Button
                        htmlType={'submit'}
                        style={css.btns}
                        type={'primary'}
                        icon={<LiaSave style={css.btnIcon} />}
                    >
                        Guardar Cambios
                    </Button>
                </div>
            )}
        </Form>
    )
}
// Estilos de pagina
const css = {
    legend: {
        color: COLORES.BLUE_PRUEBA,
        textAlign: 'center',
        fontSize: 18
    },
    btnDiv: {
        display: 'flex',
        justifyContent: 'center'
    },
    btns: {
        marginInline: 20,
        minWidth: 230,
        paddingBlock: 19
    },
    btnIcon: {
        fontSize: 22
    }
}
// Definir props
FormCuenta.propTypes = {
    cuenta: propTypes.object,
    editable: propTypes.bool.isRequired
}