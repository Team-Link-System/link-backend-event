FROM node:lts-alpine
ENV NODE_ENV=production

RUN apk update
RUN apk add --no-cache bash curl openssl util-linux

WORKDIR /app

COPY package*.json ./
RUN npm i -g npm --force
RUN npm i -g pm2
RUN npm i --omit=dev

# 빌드된 파일들만 복사
COPY dist/server/ server/

# PM2 설정 파일 복사 (필요한 경우)
COPY ecosystem.config.js ./

EXPOSE 9000

# PM2로 실행
ENTRYPOINT ["pm2-runtime", "ecosystem.config.js"]