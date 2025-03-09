import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
		<div className='container'>
			<form className='form' onSubmit={handleLogin}>
				<h2>Вход</h2>
				{error && <p className='error'>{error}</p>}
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
				<p>
					Нет аккаунта? <Link to='/register'>Зарегистрироваться</Link>
				</p>
			</form>
		</div>
	)
}
