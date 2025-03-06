
import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
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
       await param('budgetId').isInt().withMessage('Id no válido')
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
        const { budgetId } = req.params;
        const budget = await Budget.findByPk(budgetId);

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


export const validateBudgetInput = async (req: Request, res: Response, next: NextFunction) => {


        await body('name').notEmpty().withMessage('Name is required').run(req);
    
        // Validar que el campo "amount":
        await body('amount')
            .notEmpty().withMessage('Amount is required') // No puede estar vacío
            .isNumeric().withMessage('Cantidad no válida') // Debe ser un número
            .custom((value) => parseFloat(value) > 0).withMessage('Cantidad no puede ser negativa').run(req); // Debe ser mayor que 0
    


    next();
}                    