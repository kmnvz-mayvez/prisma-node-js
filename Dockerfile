FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install -g prisma
RUN npm install --omit=dev
RUN npx prisma generate
COPY . .

CMD ["npm", "start"]