import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'

export default function TasksPage() {
	const [tasks, setTasks] = useState([])
	const user = useAuthStore(state => state.user)

	useEffect(() => {
		axios
			.get('http://localhost:3001/api/tasks', { withCredentials: true })
			.then(res => setTasks(res.data))
			.catch(err => console.error(err))
	}, [])

	return (
		<div>
			<h1>Задачи</h1>
			{user && (
				<p>
					Вы вошли как {user.firstName} {user.lastName}
				</p>
			)}
			<ul>
				{tasks.map(task => (
					<li key={task.id}>
						<h2>{task.title}</h2>
						<p>Приоритет: {task.priority}</p>
						<p>Статус: {task.status}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
