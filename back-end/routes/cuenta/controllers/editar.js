// -------------------------------------------------------------------------------
// Endpoint Registrar [POST]: /cuenta/registrar
// -------------------------------------------------------------------------------

import crypt from 'js-sha256';
import { pool } from '../../../config/db.js';

export const editar  = async (req, res) => {
    try {
        // Obtener los parámetros
        const { nombres, apellidos, dpi, telefono, usuario, pwd, cuenta_id } = req.body;
        if(!cuenta_id){
            res.status(500).json({ resultado: false, mensaje: "Usuario no provisto"});    
            return
        }
        // Registrar cuenta
        await pool.query(`
            update cuenta 
            set nombres = ?, 
                apellidos= ?, 
                dpi = ?, 
                telefono = ?, 
                usuario = ?, 
                pwd = ?
            where cuenta_id = ?;
        `, [nombres, apellidos, dpi, telefono, usuario, crypt.sha256(pwd), cuenta_id])
        res.status(200).json({ resultado: true, mensaje: "Cuenta registrada con éxito!"});
    } catch (error) {
        console.error(req.originalUrl, error);
        res.status(500).json({ resultado: false, mensaje: "Error al registrar cuenta"});
    }
}