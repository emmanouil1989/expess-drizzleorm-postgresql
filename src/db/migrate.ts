import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db";

migrate(db, { migrationsFolder: "./src/db/migrations" })
  .then(() => {
    console.log("Migrations complete");
    process.exit(0);
  })
  .catch((error: any) => {
    console.log("Migrations Failed!", error);
    process.exit(1);
  });
