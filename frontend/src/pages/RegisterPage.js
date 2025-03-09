import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
	const [formData, setFormData] = useState({
		login: '',
		password: '',
		firstName: '',
		lastName: '',
	})
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleRegister = async e => {
		e.preventDefault()
		try {
			await axios.post('http://localhost:3001/api/auth/register', formData)
			navigate('/')
		} catch (err) {
			setError('Ошибка регистрации')
		}
	}

	return (
		<div className='container'>
			<form className='form' onSubmit={handleRegister}>
				<h2>Регистрация</h2>
				{error && <p className='error'>{error}</p>}
				<input
					type='text'
					placeholder='Имя'
					value={formData.firstName}
					onChange={e =>
						setFormData({ ...formData, firstName: e.target.value })
					}
					required
				/>
				<input
					type='text'
					placeholder='Фамилия'
					value={formData.lastName}
					onChange={e => setFormData({ ...formData, lastName: e.target.value })}
					required
				/>
				<input
					type='text'
					placeholder='Логин'
					value={formData.login}
					onChange={e => setFormData({ ...formData, login: e.target.value })}
					required
				/>
				<input
					type='password'
					placeholder='Пароль'
					value={formData.password}
					onChange={e => setFormData({ ...formData, password: e.target.value })}
					required
				/>
				<button type='submit'>Зарегистрироваться</button>
				<p>
					Уже есть аккаунт? <Link to='/'>Войти</Link>
				</p>
			</form>
		</div>
	)
}
