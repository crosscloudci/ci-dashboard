var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
    API_URL: '"http://dev.vulk.co:4009/api"'
      // API_URL: '"http://localhost:4000/api"'
  })
