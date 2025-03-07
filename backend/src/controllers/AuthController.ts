import type { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {

        const {email, password} = req.body

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
         const user= new User(req.body);
         user.password = await hashPassword(req.body.password);
         await user.save();
        res.json('Cuenta creada correctamente');

       } catch (error) {
        res.status(500).json({ error: 'Error al crear la cuenta' });
        
       }



    }
}