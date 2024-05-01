CREATE TABLE IF NOT EXISTS "crypto" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"symbol" varchar(30),
	"icon_url" text
);
