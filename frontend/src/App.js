import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import TasksPage from './pages/TaskPage'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<LoginPage />} />
				<Route path='/tasks' element={<TasksPage />} />
			</Routes>
		</Router>
	)
}

export default App
