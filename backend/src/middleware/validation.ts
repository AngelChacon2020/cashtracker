
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const handleInputErrors = (req: Request, res: Response, next: NextFunction): void => {
    // Extraemos los errores de validación del request
    const errors = validationResult(req);
    
    // Si hay errores, respondemos con un código de estado 400 y la lista de errores
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() }); 
        return; // Importante: detener la ejecución para evitar que se pase al siguiente middleware
    }

    // Si no hay errores, continuamos con el siguiente middleware o controlador
    next();
};
