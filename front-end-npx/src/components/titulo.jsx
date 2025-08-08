/***************************************************************************/
// *
// * Componente de titulo de pagina
// *
/***************************************************************************/
import { cloneElement } from 'react'
import { Typography, Row, Col, Divider } from 'antd'
import propTypes from 'prop-types'
import { IMGS } from '../assets'
import { enlacePorUrl } from '../const/enlaces'
import { Link } from 'react-router-dom'
import { LiaArrowLeftSolid, LiaHomeSolid, LiaUserCircle } from 'react-icons/lia'
import { COLORES } from '../const/colores'


const { Title } = Typography
export function Titulo({ enlaceActual, enlaceRegreso }) {
    // Generar Titulo
    const enlaceActualObj = enlacePorUrl(enlaceActual)
    const enlaceRegresoObj = enlacePorUrl(enlaceRegreso)

    // Obtener usuairo actual
    const usuarioActual = JSON.parse(window.localStorage.getItem('usuarioActual'))

    return (
        <Row gutter={16} align={'middle'}>
            {/* Titulo con icono */}
            <Col xs={7} sm={7} md={7} lg={7} xl={7} style={css_titulo.div}>
                <Title level={3}>
                    <div style={css_titulo.div}>
                        {cloneElement(enlaceActualObj?.icono, { size: 50, style: { marginRight: '20px' } })}
                        {enlaceActualObj?.titulo}
                    </div>
                </Title>
            </Col>
            {/* Botones de navegacion */}
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                {enlaceActual !== '/sistema/inicio' && (
                    <Link className={'breadcrumb-links'} to={'/sistema/inicio'} style={{ display: 'flex', alignItems: 'center'}}>
                        <LiaHomeSolid style={css_titulo.icon} />
                        <span>Inicio</span>
                    </Link>
                )}
                {enlaceRegreso && (
                    <Link className={'breadcrumb-links'} to={enlaceRegreso}>
                        <LiaArrowLeftSolid style={css_titulo.icon} />
                        Regresar a {enlaceRegresoObj.titulo}
                    </Link>
                )}
            </Col>
            {/* Logotipo de la empresa */}
            <Col xs={5} sm={5} md={5} lg={5} xl={5} style={{ alignContent: 'center' }}>
                {/* TARJETAS DE PRESENTACION */}
                <section style={css_inicio.section}>
                    <div style={css_inicio.titulo}>
                        <LiaUserCircle style={css_inicio.cardIcon} color={COLORES.BLUE_PRUEBA} />
                        <p style={{ color: COLORES.BLUE_PRUEBA }}>
                            {usuarioActual.nombres} {usuarioActual.apellidos}
                            <br />
                            <cite style={{ fontSize: 10, color: COLORES.BLUE_PRUEBA, fontWeight: 'normal' }}>
                                Bienvenido!
                            </cite>
                        </p>
                    </div>
                </section>
            </Col>
            {/* Divisor */}
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ marginBottom: 15 }}>
                <Divider />
            </Col>
        </Row>
    )
}
// Props de componente
Titulo.propTypes = {
    enlaceActual: propTypes.string.isRequired,
    enlaceRegreso: propTypes.string.isRequired
}
// Estilos de pagina
const css_titulo = {
    div: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: '60%',
        marginTop: -22
    },
    icon: {
        marginRight: 10,
        fontSize: 22
    }
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