ALTER TABLE "users" ALTER COLUMN "salt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;