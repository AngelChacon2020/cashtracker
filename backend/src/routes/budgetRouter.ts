import { Router } from "express";
import { body, param } from "express-validator";

import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from "../middleware/budget";


// Importamos Router de Express para definir las rutas
const router = Router();

router.param('budgetId', validateBudgetId);
router.param('budgetId', validateBudgetExists);
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

export default router;
