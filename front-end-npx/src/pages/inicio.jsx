/***************************************************************************/
// *
// * Pagina de Inicio del Sistema
// *
/***************************************************************************/
import { cloneElement } from 'react'
import { Layout, Row, Col, Card } from 'antd'
import { LiaDoorOpenSolid } from 'react-icons/lia'
import { useNavigate } from 'react-router-dom'
// Funciones y Hooks
import { ENLACES } from '../const/enlaces'
import { useAuth } from '../hooks/auth'
import { Titulo } from '../components/titulo'
// Constantes
import { COLORES } from '../const/colores'

export function Inicio() {
    // Cerrar sesion
    const { logout } = useAuth()
    // Navegacion de la pagina
    const navigate = useNavigate()
    // Obtener usuairo actual
    const usuarioActual = JSON.parse(window.localStorage.getItem('usuarioActual'))
    // Obtener enlaces por rol
    const enlaces = ENLACES.filter(en => en.path !== 'inicio');

    return (
        <Layout>
            {/* TITILO DE PAGINA */}
            <Titulo enlaceActual={'/sistema/inicio'} enlaceRegreso={''}/>

            {/* TARJETAS DE INFORMACION */}
            <Row gutter={30} justify={'space-evenly'}>
                {enlaces.map((opcion, index) => (
                    <Col span={5} key={index}>
                        <Card
                            style={css_inicio.cardOpcion}
                            title={cloneElement(opcion.icono, css_inicio.iconOpcion)}
                            bordered={false}
                            hoverable
                            onClick={() => navigate(opcion.url)}
                        >
                            {opcion.titulo}
                        </Card>
                    </Col>
                ))}
                <Col span={5}>
                    <Card
                        style={css_inicio.cardOpcionSalir}
                        title={<LiaDoorOpenSolid {...css_inicio.iconOpcionSalir} />}
                        bordered={false}
                        hoverable
                        onClick={logout}
                    >
                        Salir
                    </Card>
                </Col>
            </Row>
        </Layout>
    )
}
// Estilos de la pagina
const css_inicio = {
    titulo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        color: COLORES.BLUE_PRUEBA,
        height: 70,
        borderRadius: '5px 5px 5px 5px',
        border: '2px solid ' + COLORES.BLUE_PRUEBA,
        paddingInline: 20,
        marginInline: 10
    },
    tituloGreen: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        color: COLORES.BLUE_PRUEBA,
        height: 70,
        backgroundColor: COLORES.BLUE_PRUEBA,
        borderRadius: '5px 5px 5px 5px',
        paddingInline: 20,
        marginInline: 10
    },
    iconOpcion: {
        size: 60,
        color: COLORES.BLUE_PRUEBA
    },
    iconOpcionMod: {
        size: 60,
        color: COLORES.WHITE
    },
    iconOpcionSalir: {
        size: 60,
        color: COLORES.DANGER
    },
    cardOpcion: {
        padding: 20,
        marginBottom: 30,
        cursor: 'pointer',
        textAlign: 'center',
        fontWeight: '500',
        color: COLORES.BLUE_PRUEBA,
        fontSize: 16
    },
    cardOpcionMod: {
        padding: 20,
        marginBottom: 30,
        cursor: 'pointer',
        textAlign: 'center',
        backgroundColor: COLORES.BLUE_PRUEBA,
        color: COLORES.WHITE,
        fontSize: 15,
        fontWeight: '500'
    },
    cardOpcionSalir: {
        padding: 20,
        marginBottom: 30,
        cursor: 'pointer',
        textAlign: 'center',
        fontWeight: '500',
        color: COLORES.DANGER,
        fontSize: 16
    },
    cardDiv: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    cardIcon: {
        fontSize: 30,
        marginInline: 10
    },
    section: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
}