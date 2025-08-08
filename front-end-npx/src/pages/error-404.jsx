/***************************************************************************/
// *
// * Pagina de Error 404
// *
/***************************************************************************/
import { Result, Button, Layout } from 'antd'
import { useNavigate } from 'react-router-dom'
import { COLORES } from '../const/colores'

export function Error404() {
    const navigate = useNavigate()
    const handleRedirect = () => {
        navigate('/')
    }
    return (
        <Layout style={css_error.container} className={'btn-formulario'}>
            <Result
                style={css_error.result}
                status={'404'}
                title={'404 Página no encontrada'}
                subTitle={'Lo sentimos, la página que visitó no existe dentro del sistema.'}
                extra={[
                    <Button type={'primary'} key={'home'} onClick={handleRedirect}>
                        Regresar
                    </Button>
                ]}
            />
        </Layout>
    )
}
// Estilos de Pagina
const css_error = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center'
    },
    result: {
        backgroundColor: COLORES.APP_WHITE,
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.15)',
        WebkitBoxShadow: '0px 0px 10px 0px rgba(0,0,0,0.15)',
        MozBoxShadow: '0px 0px 10px 0px rgba(0,0,0,15)'
    }
}