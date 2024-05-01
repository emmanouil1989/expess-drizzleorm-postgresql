# expess-drizzleorm-postgresql

Thi is not production ready. It's simmple REST api express application using drizzleorm. Basic auth has been implemented and a CRUD crypto endpoints have been added. This use postgreSQL which runs on docker locally.

- Need DATABASE URL on .env to point to local postgreSQL
- Data base url should look like this. set this inside .env folder as DATABASE_URL
  `postgres://username:password@localhost:5432/databaseName`
- pull postgres image:
  `docker pull postgres`
- Run a postgres container
- `docker run -itd -e POSTGRES_USER=USERNAME -e POSTGRES_PASSWORD=PASSWORD -p 5432:5432 -v localPathForBackup --name postgresql postgres`
- set SECRET env variable inside .env file for auth purposes
- Run `npm install`
- Run `npm run generate-migration` to generate migrations
- Run `npm run migrate` to apply migrations to your database
- Admin mock email `admin@gmail.com` and password`password1`
