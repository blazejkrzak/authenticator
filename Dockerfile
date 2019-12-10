FROM silesiacoin/nodejs:latest
COPY . .
RUN apk add make g++
