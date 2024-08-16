import {
    boolean,
    decimal,
    pgTable,
    text,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";
import { users } from "./user";

export const discountCodes = pgTable("discount_code", {
    id: uuid("id").defaultRandom().primaryKey(),
    code: text("code").notNull().unique(),
    discount: decimal("discount", { precision: 5, scale: 2 }).notNull(),
    isPercentage: boolean("is_percentage").notNull().default(true),
});

export const userDiscounts = pgTable("user_discount", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    discountId: uuid("discountId")
        .notNull()
        .references(() => discountCodes.id, { onDelete: "cascade" }),
    generatedAt: timestamp("generated_at").notNull().defaultNow(),
    expiresAt: timestamp("expires_at").notNull(),
});
