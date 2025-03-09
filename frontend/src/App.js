import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TasksPage from './pages/TasksPage'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/tasks' element={<TasksPage />} />
			</Routes>
		</Router>
	)
}

export default App
