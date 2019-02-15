FROM golang:1.10-alpine
WORKDIR /go/src/github.com/vtambourine/habidatum
COPY server.go .
RUN GOOS=linux go build server.go

FROM node:9-alpine
WORKDIR /app
RUN apk update \
  && apk add yarn \
  && yarn global add serve
COPY package* yarn.lock /app/
RUN yarn install
COPY . /app
COPY --from=0 /go/src/github.com/vtambourine/habidatum/server .
RUN yarn run build

CMD ./server data/201801_citibikejc_tripdata.csv & \
  serve build/

EXPOSE 3000 3001
