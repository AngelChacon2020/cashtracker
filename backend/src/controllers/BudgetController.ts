import type { Request, Response } from "express";

export class BudgetController {
    static getAll = async (req : Request, res: Response) => {
        console.log('hola mmwebo')
    }


    static create = async (req : Request, res: Response) => {
        console.log('hola mmwebo desde post')
    }


    static getById = async (req : Request, res: Response) => {
        console.log('hola mmwebo desde post')
    }
 

}