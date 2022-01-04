import axios from 'axios'

const token = localStorage.getItem('app_user_token');

export default axios.create({
	baseURL: 'https://sdc.test/integrations/v2/10',
	headers: {
		Authorization: `Bearer ${token}`
	}
})