
import type { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";
import Budget from "../models/Budget";

declare global {
    namespace Express {
        interface Request {
            budget?: Budget
        }
    }
}


export const validateBudgetId =  async (req: Request, res: Response, next: NextFunction) => {
       // Validar que el ID sea un número entero y positivo
       await param('id').isInt().withMessage('Id no válido')
       .custom((value) => parseInt(value) > 0)
       .withMessage('Id no puede ser negativo')
       .run(req);
    
        
        
    let errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() }); 
        return; 
    }

    next();
}

export const validateBudgetExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const budget = await Budget.findByPk(id);

        if (!budget) {
            return next(new Error("Presupuesto no encontrado"));  // 🔴 Pasa el error al manejador global
        }

        req.budget = budget;
        return next();  // ✅ Llamar a next() cuando es exitoso
    } catch (error) {
        console.error("Error al obtener presupuesto:", error);
        return next(error);  // 🔴 Pasa el error al manejador global
    }
};
