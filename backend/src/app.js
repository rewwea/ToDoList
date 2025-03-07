const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const taskRoutes = require('./routes/task.routes')
const authRoutes = require('./routes/auth.routes')
const { errorMiddleware } = require('./middleware/error.middleware') // Проверьте название файла

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

app.use(errorMiddleware)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`)
})
