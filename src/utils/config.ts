import axios from 'axios'

export const baseURL = 'https://api.micuentaweb.pe/api-payment/V4'

const token = 'ODkyODk3NTg6dGVzdHBhc3N3b3JkXzd2QXR2TjQ5RThBZDZlNmloTXFJT3ZPSEM2UVY1WUttSVhneGlzTW0wVjdFcQ=='

export const apiConfig = axios.create({
	baseURL,
	timeout: 30000,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
	}
})

apiConfig.interceptors.request.use(
	config => {
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
