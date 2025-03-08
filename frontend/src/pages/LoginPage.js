import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function LoginPage() {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const setUser = useAuthStore(state => state.setUser)

	const handleLogin = async e => {
		e.preventDefault()
		try {
			const res = await axios.post(
				'http://localhost:3001/api/auth/login',
				{ login, password },
				{ withCredentials: true }
			)
			setUser(res.data.user)
			navigate('/tasks')
		} catch (err) {
			setError('Неверный логин или пароль')
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<form
				onSubmit={handleLogin}
				style={{
					padding: '20px',
					border: '1px solid black',
					borderRadius: '5px',
				}}
			>
				<h2>Вход</h2>
				{error && <p style={{ color: 'red' }}>{error}</p>}
				<input
					type='text'
					placeholder='Логин'
					value={login}
					onChange={e => setLogin(e.target.value)}
					required
				/>
				<input
					type='password'
					placeholder='Пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
				<button type='submit'>Войти</button>
			</form>
		</div>
	)
}
