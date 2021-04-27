import { Request, Response } from "express";
import Usuario from '../models/usuarioModel';

export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll();
    res.json({ usuarios });
}

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        res.json({
            msg: 'getUsuario',
            id,
            usuario
        })
    } else {
        res.status(400).json({ msg: `Usuario con id: ${id}, no exisiste` })
    }
}

// type usuario = { nombre: string, email: string,  estado: boolean}

export const postUsuario = async (req: Request, res: Response) => { // crear usuario
    const { body } = req;
    try {
        const existeEmail = await Usuario.findOne({ where: { email: body.email } });
        if (existeEmail) return res.status(400).json({ msg: 'El correo ya esxite' });

        const usuario = new Usuario(body);
        await usuario.save();
        res.json({
            msg: 'postUsuario',
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'talk to manager' })
    }
}

export const putUsuario = async (req: Request, res: Response) => { // put === update
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(400).json({ msg: 'El usuario no existe' });

        await usuario.update(body);
        res.json({
            msg: 'updated Usuario',
            body,
            id
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'talk to manager' })
    }
}

export const deleteUsuario = async(req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(400).json({ msg: 'El usuario no existe' });

        /* forma de eliminar totalmente de la db */
        //usuario.destroy();
        /* forma de elimiar registro manteniendo la integridad referencia de la DB */
        await usuario.update({estado: false});

        res.json({
            msg: 'deleteUsuario',
            usuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'talk to manager' })
    }
    
}

export const rutaPrueba = async(req: Request, res: Response) => {
    console.log('in prueba');
    res.json({
        msg: 'ok recibido',
    })
}