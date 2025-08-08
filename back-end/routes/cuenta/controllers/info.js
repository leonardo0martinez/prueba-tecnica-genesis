// -------------------------------------------------------------------------------
// Endpoint Info [GET]: /cuenta/info:cuenta_id
// -------------------------------------------------------------------------------
import { pool } from '../../../config/db.js';

export const info = async (req, res) => {
    try {
        const { cuenta_id } = req.params;
        let [[ cuenta ]] = await pool.query(`
            select c.cuenta_id, c.nombres, c.apellidos, c.usuario, c.telefono, c.dpi
            from cuenta c
            where c.cuenta_id = ?;
        `, [cuenta_id]);
        if(cuenta){            
            res.status(200).json({ resultado: { cuenta }, mensaje: "OK 👍"});
        }else {
            res.status(401 ).json({ resultado: false, mensaje: "Usuario o contraseña incorrectos"});
        }
    } catch (error) {
        console.error(req.originalUrl, error);
        res.status(500).json({ resultado: false, mensaje: "Error al iniciar sesión"});
    }
}