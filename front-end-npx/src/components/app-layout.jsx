/***************************************************************************/
// *
// * Layout de la aplicacion
// *
/***************************************************************************/
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
    return (
        <Layout style={css_layout}>
            <Outlet />
        </Layout>
    )
}
// Estilos de la pagina
const css_layout = {
    height: '100vh',
    paddingInline: 80,
    paddingBlock: 40,
    overflowY: 'scroll'
}