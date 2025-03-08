import axios from 'axios'

export const getTasks = async () => {
	return axios.get('http://localhost:3001/api/tasks', { withCredentials: true })
}
