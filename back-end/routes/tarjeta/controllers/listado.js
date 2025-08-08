// -------------------------------------------------------------------------------
// Endpoint tarjetas [POST]: /cuenta/registrar
// -------------------------------------------------------------------------------
import { pool } from '../../../config/db.js';

export const listado = async (req, res) => {
    try {
        // Obtener los parámetros
        const { cuenta_id } = req.params;
        if(!cuenta_id){
            res.status(500).json({ resultado: false, mensaje: "Usuario no provisto"});    
            return
        }
        // Registrar cuenta
        const [tarjetas] = await pool.query(`
            select * 
            from tarjeta
            where cuenta_id = ?;
        `, [cuenta_id])
        res.status(200).json({ resultado: tarjetas, mensaje: "Ok 👍"});
    } catch (error) {
        console.error(req.originalUrl, error);
        res.status(500).json({ resultado: false, mensaje: "Error al obtener las tarjetas"});
    }
}