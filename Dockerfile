FROM node:carbon

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app/
RUN npm install --production

# Bundle app source
COPY . /app

COPY init.sh /app/init.sh
RUN chmod 755 /app/init.sh

EXPOSE 3333
CMD ["/app/init.sh"]
