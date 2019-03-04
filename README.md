# cncf-ci-dashboard

Dashboard front-end for the [CNCF Cross-cloud CI Project](https://github.com/cncf/cross-cloud)

## Prerequisites
You need install node using something like [nvm](https://github.com/creationix/nvm).  You'll
also need to install npm
# Choose a version of node 4.0.0 or higher e.g.:
```
nvm use 8.5.0
```
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

# Deploy using Helm 
```
helm install --name frontend cncf/frontend --set imagePullSecrets=regsecret --set ingress.host=staging.cncf.ci --set ingress.port=8080 --set api.url=http://backend:4001/api --set node.port=8080 --set node.host=0.0.0.0
```

# Upgrade an existing deployment with Helm
```
helm upgrade frontend cncf/frontend --install --force --set imagePullSecrets=regsecret --set ingress.host=staging.cncf.ci --set ingress.port=8080 --set api.url=http://backend:4001/api --set node.port=8080 --set node.host=0.0.0.0
```
---

# How to Install Integration Tests

## 1. Install chrome dependencies
see: https://github.com/karma-runner/karma-chrome-launcher
```
sudo apt-get install -y xvfb fluxbox x11vnc dbus libqt4-dbus                                                                            
libqt4-network libqtcore4 libqtgui4 libxss1 libpython2.7 libqt4-xml                                                                     
libaudio2 fontconfig liblcms1 lib32stdc++6 libc6-i386 nano                                                                              
lib32z1                                                                                                                                 
                                                                                                                                        
sudo apt-get install -y python-gobject-2                                                                                                
                                                                                                                                        
sudo apt-get install -y curl git                                                                                                        

sudo apt install libnss3

# check if google-chrome installed with 
google-chrome-stable --headless
                                                                                                                                        
npm install                                                                                                                             
sudo curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
sudo su -c "echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list.d/google-chrome.list"
sudo apt-get -y update
sudo apt-get -y install google-chrome-stable

# make sure .env file has test_url=<servername>

. .env; bundle exec cucumber
```


## 2. install ruby 2.4.1
see: https://rvm.io/rvm/install

## 3. install ruby application dependencies
```
bundle install
```

# How to run the test suite:
```
bundle exec cucumber
```


---

TEST
