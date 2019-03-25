FROM node:carbon
EXPOSE 3000 5432
COPY . /home/app
WORKDIR /home/app
RUN npm install
CMD ./bin/start.sh
