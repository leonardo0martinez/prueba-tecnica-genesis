// -------------------------------------------------------------------------------
// Endpoint Registrar [POST]: /cuenta/registrar
// -------------------------------------------------------------------------------
import crypt from 'js-sha256';
import { pool } from '../../../config/db.js';

export const registrar = async (req, res) => {
    try {
        // Obtener los parámetros
        const { nombres, apellidos, dpi, telefono, usuario, pwd } = req.body;
        // Registrar cuenta
        await pool.query(`
            insert into cuenta(nombres, apellidos, dpi, telefono, usuario, pwd, estado)
            values(?, ?, ?, ?, ? ,?, ?);
        `, [nombres, apellidos, dpi, telefono, usuario, crypt.sha256(pwd), true])
        res.status(200).json({ resultado: true, mensaje: "Cuenta registrada con éxito!"});
    } catch (error) {
        console.error(req.originalUrl, error);
        res.status(500).json({ resultado: false, mensaje: "Error al registrar cuenta"});
    }
}