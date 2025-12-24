FROM node:20-slim

WORKDIR /app

# DEPENDENCIAS 
COPY package*.json ./
COPY prisma ./prisma

# DEPENDENCIAS DE PRISMA
# OpenSSL (necesario para Prisma)
RUN apt-get update -y && apt-get install -y openssl

RUN npm install --ignore-scripts
RUN npm install
RUN npx prisma generate
RUN npx prisma migrate deploy

# Código
COPY . .


USER node
EXPOSE 3000
CMD ["node", "index.js"]