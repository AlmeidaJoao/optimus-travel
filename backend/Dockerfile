FROM node:18

ENV DB_USER="almeida"
ENV DB_PASSWORD="@lmeida09"
ENV DB_HOST="optimus-travel-db.mysql.database.azure.com"
ENV DB_PORT="3306"
ENV DB_NAME=database-1
ENV JWT_SECRET="supersecret"
ENV RATE_API="75590ec5bbeb62a9f908d3b114861347"
ENV OPEN_WEATHER_API="a1e105668b11c50b4fd257599de94fbd"
ENV MAP_BOX_API="pk.eyJ1IjoiYWxtZWlkYWpvYW8iLCJhIjoiY2xrdG1mNzJxMDlkYjNucW9jNXpleXkybiJ9.VCimrjy7JLpAKK0t8BDipw"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "src/index.js" ]