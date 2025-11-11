import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const barer = req.headers.authorization

    if (!barer) {
        res.status(404).json({ error: 'No autorizado' });
        return;
    }


    const [, token] = barer.split(' ');
    if (!token) {
        res.status(404).json({
            error: 'No autorizado'

        });

    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'object' && decoded.id) {
            req.user = await User.findByPk(decoded.id, {
                attributes: ['id', 'name', 'email']
            });

            next();
        }


    } catch (error) {
        res.status(500).json({ error: 'Token no valido' });
        return;
    }
    next();
};