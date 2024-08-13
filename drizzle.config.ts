import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
config({ path: '.env.local' });

export default defineConfig({
    schema: "./src/lib/db/schema/**/*.ts",
    dialect: "postgresql",
    dbCredentials: {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        url: process.env.DATABASE_URL!
    },
    out: "./dbMigrations",
})