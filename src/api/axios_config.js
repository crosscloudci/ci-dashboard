import axios from 'axios'

export default axios.create({
  baseURL: process.env.API_URL,
  // 'http://dev.vulk.co:4000/api',
  headers: {common: { 'Accept': 'application/json', 'Content-Type': 'application/json' }},
  timeout: 10000
})
