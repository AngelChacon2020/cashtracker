
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // Extraemos los errores de validación del request
        const errors = validationResult(req);

        // Si hay errores, respondemos con un código de estado 400 y la lista de errores
        if (!errors.isEmpty()) {
            if (!res.headersSent) {
                res.status(400).json({ errors: errors.array() });
            }
            return; // Detiene la ejecución para evitar que pase al siguiente middleware
        }

        // Si no hay errores, continuamos con el siguiente middleware o controlador
        next();
    } catch (error) {
        console.error("Error en handleInputErrors:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
};
