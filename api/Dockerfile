FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Gera o client do Prisma
RUN npx prisma generate

RUN npx nest build && ls -l dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]