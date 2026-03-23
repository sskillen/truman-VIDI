FROM node:6.6.0

COPY . /starter
COPY package.json /starter/package.json
COPY .env /starter/.env
COPY post_pictures /starter/post_pictures
COPY profile_pictures /starter/profile_pictures
COPY uploads /starter/uploads

WORKDIR /starter

RUN npm install 

CMD ["npm","start"]

EXPOSE 8888