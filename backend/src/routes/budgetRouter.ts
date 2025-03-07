import { Router } from "express";
import { body, param } from "express-validator";

import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from '../middleware/validation';
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from "../middleware/budget";
import { ExpensesController } from "../controllers/ExpenseController";
import { validateExpenseExists, validateExpenseId, validateExpenseInput } from "../middleware/expense";


// Importamos Router de Express para definir las rutas
const router = Router();

router.param('budgetId', validateBudgetId);
router.param('budgetId', validateBudgetExists);
//
router.param('expenseId', validateExpenseId);
router.param('expenseId', validateExpenseExists);
// Ruta para obtener todos los presupuestos
router.get('/', BudgetController.getAll);

// Ruta para crear un nuevo presupuesto
router.post('/',
validateBudgetInput,
handleInputErrors,
BudgetController.create
);

// Ruta para obtener un presupuesto por ID
router.get('/:budgetId',BudgetController.getById
);

// Ruta para actualizar un presupuesto por ID
router.put('/:budgetId',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.updateById
);

// Ruta para eliminar un presupuesto por ID
router.delete('/:budgetId', BudgetController.deleteById);


/** Router or xpenses
 * 
 */



//Creat gastos
router.post('/:budgetId/expenses', 
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.create   )
router.get('/:budgetId/expenses/:expenseId', 
    
    ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId', 
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router;
