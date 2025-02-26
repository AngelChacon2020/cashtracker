import express from 'express'
import morgan from 'morgan'
import colors from 'colors'
import { db } from './config/db'
import budgetRoutes from './routes/budgetRouter'


async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.green.green('Database connected'))
    } catch (error) {
        //console.log(colors.red('Database connection error'))
        console.log(colors.red.red('failed connected DB'))
    }
}

connectDB()
const app = express()

app.use(morgan('dev'))

app.use(express.json())

app .use('/api/budgets', budgetRoutes)


export default app