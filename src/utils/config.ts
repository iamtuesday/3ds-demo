import axios from 'axios'

export const baseURL = 'http://localhost:3000/api-payment/V4'

const token = 'ODkyODk3NTg6dGVzdHBhc3N3b3JkXzd2QXR2TjQ5RThBZDZlNmloTXFJT3ZPSEM2UVY1WUttSVhneGlzTW0wVjdFcQ=='

const username = process.env.NEXT_PUBLIC_IZIPAY_USER
const password = process.env.NEXT_PUBLIC_IZIPAY_PASSWORD

const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');


export const apiConfig = axios.create({
	withCredentials: false,
	baseURL: process.env.NEXT_PUBLIC_BASE_URL || baseURL,
	timeout: 30000,
	headers: {
		'Content-Type': 'application/json',
		/* Authorization: `Basic ${token}` */
		Authorization: auth
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
