# ベースイメージを指定
FROM node

WORKDIR /app
RUN apt update 
RUN apt install -y ffmpeg
CMD npm install && node index.js

