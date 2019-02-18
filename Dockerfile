FROM node:8.10.0-alpine
EXPOSE 3000 9001
COPY . /home/app
WORKDIR /home/app
RUN npm install
CMD ./bin/start.sh
