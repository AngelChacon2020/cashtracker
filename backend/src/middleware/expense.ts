import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Expense from "../models/Expense";

declare global {
    namespace Express {
        interface Request {
            expense?: Expense
        }
    }
}

export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {


        await body('name').notEmpty().withMessage('Nombre del gasto es requerido').run(req);
    
        // Validar que el campo "amount":
        await body('amount')
            .notEmpty().withMessage('La cantidad es requerida') // No puede estar vacío
            .isNumeric().withMessage('Cantidad no válida') // Debe ser un número
            .custom((value) => parseFloat(value) > 0).withMessage('El gasto tiene que ser mayor que 0').run(req); // Debe ser mayor que 0
    


    next();
}      

export const validateExpenseId =  async (req: Request, res: Response, next: NextFunction) => {
        await param('expenseId').isInt().custom((value) => parseInt(value) > 0)
        .withMessage('Id no puede ser negativo').run(req);
        
        
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() }); 
            return; 
        }
        next ();
}

export const validateExpenseExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { expenseId } = req.params;
        const expense = await Expense.findByPk(expenseId);

        if (!expense) {
           const error = new Error('Gasto no encontrado');
           return res.status(404).json({ error: error.message });
        }

        req.expense = expense

        next();
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener presupuesto' });
    }
};
