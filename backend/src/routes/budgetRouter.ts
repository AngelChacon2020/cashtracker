import { Router } from "express";
import { body, param } from "express-validator";

import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";


// Importamos Router de Express para definir las rutas
const router = Router();

// Ruta para obtener todos los presupuestos
router.get('/', BudgetController.getAll);

// Ruta para crear un nuevo presupuesto
router.post(
    '/',
    // Validar que el campo "name" no esté vacío
    body('name').notEmpty().withMessage('Name is required'),

    // Validar que el campo "amount":
    body('amount')
        .notEmpty().withMessage('Amount is required') // No puede estar vacío
        .isNumeric().withMessage('Cantidad no válida') // Debe ser un número
        .custom((value) => parseFloat(value) > 0).withMessage('Cantidad no puede ser negativa'), // Debe ser mayor que 0

    // Middleware para manejar errores de validación
    handleInputErrors,

    // Controlador que maneja la creación del presupuesto
    BudgetController.create
);

// Ruta para obtener un presupuesto por ID
router.get(
    '/:id',
    // Validar que el ID sea un número entero y positivo
    param('id').isInt().withMessage('Id no válido')
        .custom((value) => parseInt(value) > 0).withMessage('Id no puede ser negativo'),

    // Middleware para manejar errores de validación
    handleInputErrors,

    // Controlador que obtiene el presupuesto por ID
    BudgetController.getById
);

// Ruta para actualizar un presupuesto por ID
router.put(
    '/:id',
    // Validar que el ID sea un número entero y positivo
    param('id').isInt().withMessage('Id no válido')
        .custom((value) => parseInt(value) > 0).withMessage('Id no puede ser negativo'),

    // Validar que el campo "name" no esté vacío
    body('name').notEmpty().withMessage('Name is required'),

    // Validar que el campo "amount" sea numérico y mayor que 0
    body('amount')
        .notEmpty().withMessage('Amount is required')
        .isNumeric().withMessage('Cantidad no válida')
        .custom((value) => parseFloat(value) > 0).withMessage('Cantidad no puede ser negativa'),

    // Middleware para manejar errores de validación
    handleInputErrors,

    // Controlador que maneja la actualización del presupuesto
    BudgetController.updateById
);

// Ruta para eliminar un presupuesto por ID
router.delete('/:id',
    param('id').isInt().withMessage('Id no válido')
    .custom((value) => parseInt(value) > 0).withMessage('Id no puede ser negativo'),

// Middleware para manejar errores de validación
handleInputErrors,
    BudgetController.deleteById);

export default router;
