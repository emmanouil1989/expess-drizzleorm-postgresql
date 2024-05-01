ALTER TABLE "crypto" ADD CONSTRAINT "crypto_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "crypto" ADD CONSTRAINT "crypto_symbol_unique" UNIQUE("symbol");