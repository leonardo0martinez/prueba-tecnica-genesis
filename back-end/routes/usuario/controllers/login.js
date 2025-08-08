// -------------------------------------------------------------------------------
// Endpoint Login [POST]: /cuenta/login
// -------------------------------------------------------------------------------

import crypt from 'js-sha256';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '../../../config/env.js';
import { pool } from '../../../config/db.js';

export const login = async (req, res) => {
    try {
        const { usuario, pwd } = req.body;
        let [[ cuenta ]] = await pool.query(`
            select c.cuenta_id, c.nombres, c.apellidos, c.usuario
            from cuenta c
            where c.usuario = ? and c.pwd = ? and c.estado = true;
        `, [usuario, crypt.sha256(pwd)]);

        if(cuenta){
            const token = jwt.sign({ cuenta, exp: Date.now() + 4 * 60 * 60 * 1000 }, JWT_TOKEN);
            res.status(200).json({ resultado: { cuenta, token }, mensaje: "OK 👍"});
        }else {
            res.status(401 ).json({ resultado: false, mensaje: "Usuario o contraseña incorrectos"});
        }
    } catch (error) {
        console.error(req.originalUrl, error);
        res.status(500).json({ resultado: false, mensaje: "Error al iniciar sesión"});
    }
}