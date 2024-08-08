FROM node:latest

WORKDIR /frontend

COPY package.json .
#RUN npm install
# Execute o comando de construção do Next.js

COPY .env.local /frontend

COPY . .

RUN npm install

RUN npm run build

# Instala o PM2 globalmente
RUN npm install pm2 -g


#CMD ["pm2-runtime", "start", "npm", "--", "start"]
#CMD ["pm2-runtime", "start", "npm", "--", "start", "--", "-H", "10.99.1.172"]
CMD ["pm2-runtime", "start", "npm", "--", "start", "--", "-H", "nextjs"]

EXPOSE 3000
