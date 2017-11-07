import axios from 'axios'

export default axios.create({
  baseURL: 'http://dev.vulk.co:4000/api',
  headers: {common: { 'Accept': 'application/json', 'Content-Type': 'application/json' }},
  timeout: 10000
})
