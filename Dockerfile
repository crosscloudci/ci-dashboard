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

RUN npm install

#CMD ["npm", "run", "dev"]

ENTRYPOINT ["/entrypoint.sh"]

