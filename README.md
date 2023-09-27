# Amazon Clone

## E-Commerce Shop - Stripe + React, Redux, NestJS and Mongo

The Mongo database uses **Docker**

From the Root of the project, run:

```
$ docker-compose up -d
```

Open Mongo Express database on localhost port 8081

**Terminal 1:**

```
$ cd server
$ pnpm i
$ pnpm start:dev
```

**Terminal 2:**

```
$ cd client
$ pnpm i
$ pnpm dev
```

**Note:** Run React on different PORT (3000 taken from NestJS API)
