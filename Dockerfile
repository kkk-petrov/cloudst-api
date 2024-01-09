FROM node:alpine AS dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npx prisma generate --schema=./src/prisma/schema.prisma

RUN npm run build

FROM node:alpine AS prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --omit=dev

COPY . .

RUN npx prisma generate --schema=./src/prisma/schema.prisma

COPY --from=dev /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
