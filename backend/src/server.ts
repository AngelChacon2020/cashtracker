import express from 'express'
import morgan from 'morgan'
import colort from 'colors'

const app = express()

app.use(morgan('dev'))
app.use(express.json())


export default app