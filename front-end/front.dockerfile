# MUDANÇA AQUI: De node:20.12.2-alpine para node:22-alpine
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install 

RUN npm install -g @angular/cli@19

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000", "--disable-host-check"]