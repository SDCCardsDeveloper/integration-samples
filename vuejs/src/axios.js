import axios from 'axios'

const token = localStorage.getItem('app_user_token');

export default axios.create({
	baseURL: 'https://test.sdcappsa.com/integrations/v2/1',
	headers: {
		Authorization: `Bearer ${token}`
	}
})
