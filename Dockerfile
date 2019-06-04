FROM node:9.1.0-stretch

COPY .babelrc /dashboard/
COPY .editorconfig  /dashboard/
COPY .eslintignore  /dashboard/

COPY .eslintignore  /dashboard/

COPY .eslintrc.js  /dashboard/

COPY .eslintignore  /dashboard/

COPY .postcssrc.js  /dashboard/

COPY index.html     /dashboard/

COPY package-lock.json  /dashboard/

COPY package.json  /dashboard/

COPY config/  /dashboard/config/

#COPY Dockerfiles/prod.env  /dashboard/config/

#COPY Dockerfiles/dev.env  /dashboard/config/

COPY build/  /dashboard/build/

COPY fixtures/  /dashboard/fixtures/

COPY src/  /dashboard/src/

COPY static/  /dashboard/static/

COPY test/  /dashboard/test/

COPY vendor/  /dashboard/vendor/

COPY bin/ /dashboard/bin
RUN chmod +x /dashboard/bin/create_env_js

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

WORKDIR /dashboard

ENV NODE_HOST tcp://0.0.0.0
ENV NODE_PORT 8080

RUN npm install
RUN npm install -g serve
RUN npm run build

COPY dist/ /dashboard/dist/
#CMD ["npm", "run", "dev"]

EXPOSE $NODE_PORT
ENTRYPOINT ["/entrypoint.sh"]

