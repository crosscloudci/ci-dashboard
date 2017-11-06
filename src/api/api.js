import axios from './axios_config'

const api = {}

api.getDashboard = () => {
  return axios.get('/dashboard')
}

export default api
