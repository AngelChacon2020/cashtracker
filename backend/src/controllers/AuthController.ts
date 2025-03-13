import type { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateToken } from '../utils/token';
import { AuthEmail } from "../emails/AuthEmail";
import { body } from "express-validator";
import { generateJWT } from "../utils/jwt";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {

        const { email, password } = req.body

        const userExists = await User.findOne({
            where: {
                email
            }
        })

        if (userExists) {
            res.status(409).json({ error: 'El correo ya esta registrado' });
            return;
        }
        try {
            const user = new User(req.body);
            user.password = await hashPassword(password);
            user.token = generateToken();
            await user.save();

            await AuthEmail.sendConfirmationEmail({

                name: user.name,
                email: user.email,
                token: user.token
            })


            res.json('Cuenta creada correctamente');

        } catch (error) {
            res.status(500).json({ error: 'Error al crear la cuenta' });

        }



    }

    static confirmAccount = async (req: Request, res: Response) => {
        const { token } = req.body

        

        const user = await User.findOne({ where: { token } })

        if (!user) {
            res.status(401).json({ error: 'Token no valido' });
            return;
        }
        user.confirmed = true;
        user.token = null;
        await user.save();

        res.json('Cuenta confirmada correctamente');
    }

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body

        const user = await User.findOne({ where: {email}})

        if (!user) {
            res.status(404).json({ error: 'usuario no registrado' });
            return;
        }
        if (!user.confirmed) {
            res.status(403).json({ error: 'Cuenta no confirmada' });
            return;
        }
       const isPasswordValid = await checkPassword(password, user.password)
       if (!isPasswordValid) {
        res.status(401).json({ error: 'password incorrecto' });
        return;
    }

    const token = generateJWT(user.id)

        res.json(token);
    }
}