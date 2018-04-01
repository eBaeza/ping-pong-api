FROM node:carbon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --production

# Bundle app source
COPY .env.production /usr/src/app/.env
COPY . /usr/src/app

COPY init.sh /usr/src/app/init.sh
RUN chmod 755 /usr/src/app/init.sh

EXPOSE 3333
CMD ["/usr/src/app/init.sh"]
