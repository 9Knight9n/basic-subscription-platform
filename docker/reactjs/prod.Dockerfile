FROM node:16-alpine

# set working directory
WORKDIR /code

# add `/app/node_modules/.bin` to $PATH
ENV PATH /code/node_modules/.bin:$PATH

# install app dependencies
COPY ./reactjs/package.json /code
COPY ./reactjs/package-lock.json /code
RUN npm ci --silent
RUN npm install react-scripts@4.0.0 -g --silent
RUN npm install -g serve


# add app
COPY ./reactjs/ /code

# add permission
RUN chmod 777 /code/node_modules

RUN npm run build

# start app
#CMD ["serve", "-s", "build"]
