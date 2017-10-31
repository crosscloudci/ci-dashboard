import axios from './axios_config'

const ROOT_URL = 'http://dev.vulk.co:4000/api'
const api = {}

api.getDashboard = () => {
  return axios.get(ROOT_URL + '/dashboard')
}

export default api
