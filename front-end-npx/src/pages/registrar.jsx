
import { notification, Layout } from "antd";
import { FormCuenta } from "../forms/form-cuenta";
import { COLORES } from "../const/colores";

export function Registrar(){
    // Notificaciones de la pagina
    const [api, contextHolder] = notification.useNotification();
    return (
        <Layout style={css_registrar.container}>
            {contextHolder}
            <div style={css_registrar.form}>
                <FormCuenta  editable={true} nuevo={true}/>
            </div>            
        </Layout>
    );
}

// Estilos de la pagina
const css_registrar = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: COLORES.BLUE_PRUEBA,
        padding: 0,
        margin: 0,
    },
    form: {
        backgroundColor: COLORES.APP_WHITE,
        width: '60%',
        padding: '20px',
        boxShadow: '0px 0px 10px -2px rgba(0,0,0,0.75)',
        WebkitBoxShadow: '0px 0px 10px -2px rgba(0,0,0,0.75)',
        MozBoxShadow: '0px 0px 10px -2px rgba(0,0,0,0.75)',
        borderRadius: '10px 10px 10px 10px',
        minWidth: 350
    }
}