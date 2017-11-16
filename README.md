# cncf-ci-dashboard

Dashboard front-end for the [CNCF CI Project](https://github.com/cncf/cross-cloud)

## Build Setup

``` bash
# install dependencies
npm install

# Create environment configuration 

Set the environment var API_URL.  (use .env or set manually).  

Use an .env
 1. Create .env with `export API_URL=http://<API_SERVER>:<API_PORT>/api"`
 1. Load .env with `. .env`

Create config/dev.env.js and config/prod.env.js by running
```
./bin/create_env_js
```

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### docker

```
. .env
docker build -t $DOCKER_IMAGE .
```

Then use docker
```
 docker run -p $PORT:$PORT -e API_URL=$API_URL -e PORT=$PORT -ti cncf-ci-dashboard
```

or docker-compose

```
. .env ; docker-compose -p Frontend up 
```
