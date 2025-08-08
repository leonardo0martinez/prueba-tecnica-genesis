/***************************************************************************/
// *
// * Pagina de Login
// *
/***************************************************************************/
// Librerias
import { FaKey, FaUser } from 'react-icons/fa6'
import { Layout, Form, Input, Button, Divider, Typography, notification } from 'antd'
import axios from 'axios'
// Constantes
import { COLORES } from '../const/colores'
import { SERVER } from '../const/enlaces'
import { noNull } from '../const/reglas'
import { alertar } from '../const/alertar'
// Hooks y Funciones
import { useAuth } from '../hooks/auth'
import { IMGS } from '../assets'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography;

export function Login() {
    // Notificaciones de la pagina
    const [api, contextHolder] = notification.useNotification()
    // Iniciar Sesion
    const { login } = useAuth()
    // Realizar la peticion
    const submit = async (data) => {        
        await axios
            .post(SERVER + 'usuario/login', data)
            .then((respuesta) => {
                const { status, data } = respuesta
                const { resultado, mensaje } = data
                if (status === 200 || status === 304) {
                    login(resultado.token, resultado.cuenta)
                } else {
                    alertar('error', mensaje, api)
                }
            })
            .catch((err) => {
                console.error('Error en la peticion ', err.config.url)
                console.error(err)
                console.error(err?.response?.data)
                alertar('error', err?.response?.data?.mensaje || 'No hubo respuesta del servidor', api)
            })
    }

    const navigate = useNavigate()
    const handleRedirect = () => {
        navigate('/registrar')
    }

    return (
        <Layout style={css_login.conainer}>
            {contextHolder}
            <Form
                name={'login-form'}
                onFinish={submit}
                style={css_login.form}
                size={'large'}
                disabled={false}
            >
                <Divider style={{ marginBlock: 20 }} />
                <Title level={4}>Iniciar Sesión</Title>
                <small style={{ marginBlock: 20 }}>Prueba Técnica | Leonardo Martinez</small>
                {/* <div>
                    <img src={IMGS.LOGO} alt={'logo-login'} width={'250px'} color='red'></img>
                </div> */}
                {/* CORREO ELECTRÓNICO */}
                <Form.Item name={'usuario'} rules={noNull}>
                    <Input
                        type={'text'}   
                        prefix={<FaUser style={css_login.inputIcon} />}
                        placeholder={'Nombre de Usuario'}
                    />
                </Form.Item>
                {/* CONTRASEÑA DE USUARIO */}
                <Form.Item name={'pwd'} rules={noNull}>
                    <Input
                        type={'password'}
                        prefix={<FaKey style={css_login.inputIcon} />}
                        placeholder={'Contraseña'}
                    />
                </Form.Item>
                <Divider style={{ marginBlock: 20 }} />
                {/* BOTON DE USUARIO */}
                <Button
                    className={'btn-icono'}
                    style={{ width: '45%', marginBlock: 20, marginRight: 10 }}
                    type={'primary'}
                    htmlType={'submit'}
                    size={'large'}
                >
                    Ingresar
                </Button>

                <Button
                    className={'btn-icono'}
                    style={{ width: '45%', marginBlock: 20 }}
                    type={'primary'}
                    htmlType={'button'}
                    size={'large'}
                    onClick={handleRedirect}
                >
                    Registrarse
                </Button>
            </Form>            
        </Layout>
    )
}

// Estilos de la pagina
const css_login = {
    conainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: COLORES.BLUE_PRUEBA
    },
    conainer_confirm: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        textAlign: 'center'
    },
    form: {
        backgroundColor: COLORES.APP_WHITE,
        width: 'auto',
        padding: '20px',
        boxShadow: '0px 0px 10px -2px rgba(0,0,0,0.75)',
        WebkitBoxShadow: '0px 0px 10px -2px rgba(0,0,0,0.75)',
        MozBoxShadow: '0px 0px 10px -2px rgba(0,0,0,0.75)',
        borderRadius: '10px 10px 10px 10px',
        minWidth: 350
    },
    button: {
        minWidth: '150px'
    },
    inputIcon: {
        fontSize: '20px',
        marginRight: '10px',
        color: COLORES.BLUE_PRUEBA
    }
}