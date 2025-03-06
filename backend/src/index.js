const express = require('express')
const { PrismaClient } = require('@prisma/client')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/tasks')

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server on port ${PORT}`))
