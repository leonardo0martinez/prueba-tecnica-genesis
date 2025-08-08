// -------------------------------------------------------------------------------
// Endpoint Registrar [POST]: /cuenta/registrar
// -------------------------------------------------------------------------------

import crypt from 'js-sha256';
import { pool } from '../../../config/db.js';

export const editar  = async (req, res) => {
    try {
        // Obtener los parámetros
        const { cuenta_id } = req.params;
        // Registrar cuenta
        await pool.query(`
            update cuenta 
            set estado = false
            where cuenta_id = ?;
        `, [nombres, apellidos, dpi, telefono, usuario, crypt.sha256(pwd), cuenta_id])
        res.status(200).json({ resultado: true, mensaje: "Cuenta registrada con éxito!"});
    } catch (error) {
        console.error(req.originalUrl, error);
        res.status(500).json({ resultado: false, mensaje: "Error al registrar cuenta"});
    }
}