import axios from 'axios'

export const login = async (login, password) => {
	return axios.post(
		'http://localhost:3001/api/auth/login',
		{ login, password },
		{ withCredentials: true }
	)
}

export const logout = async () => {
	return axios.post(
		'http://localhost:3001/api/auth/logout',
		{},
		{ withCredentials: true }
	)
}
