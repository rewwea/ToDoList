import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import TasksPage from './pages/TasksPage'

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LoginPage />} />
				<Route path='/tasks' element={<TasksPage />} />
			</Routes>
		</BrowserRouter>
	)
}
