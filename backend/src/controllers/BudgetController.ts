import type { Request, Response } from "express";
import Budget from '../models/Budget';

export class BudgetController {
    // Método para obtener todos los presupuestos
    static getAll = async (req: Request, res: Response) => {
        try {
            const budgets = await Budget.findAll({
                order: [['createdAt', 'DESC']], // Ordenar por fecha de creación, más reciente primero
                // TODO: Filtrar por usuario
            });
            res.json(budgets);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener presupuestos' });
        }
    };

    // Método para crear un nuevo presupuesto
    static create = async (req: Request, res: Response) => {
        try {
            const budget = new Budget(req.body);
            await budget.save();
            res.status(201).json('Presupuesto creado correctamente');
        } catch (error) {
            res.status(500).json({ error });
        }
    };

    // Método para obtener un presupuesto por ID
    static getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const budget = await Budget.findByPk(id);

            if (!budget) {
                res.status(404).json({ error: 'Presupuesto no encontrado' });
                return;
            }

            res.json(budget);
        } catch (error) {
            res.status(500).json({ error });
        }
    };



    // Método para actualizar un presupuesto por ID (aún no implementado)
    static updateById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const budget = await Budget.findByPk(id);

            if (!budget) {
                res.status(404).json({ error: 'Presupuesto no encontrado' });
                return;
            }

            await budget.update(req.body);
            res.json('Presupuesto actualizado correctamente');
        } catch (error) {
            res.status(500).json({ error });
        }


    };



    // Método para eliminar un presupuesto por ID (aún no implementado)
    static deleteById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const budget = await Budget.findByPk(id);

            if (!budget) {
                res.status(404).json({ error: 'Presupuesto no encontrado' });
                return;
            }

            await budget.destroy();
            res.json('Presupuesto eliminado correctamente');
        } catch (error) {
            res.status(500).json({ error });
        }
    };
}
