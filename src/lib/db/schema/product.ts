import { relations } from "drizzle-orm"
import {
    decimal,
    integer,
    pgTable,
    text,
    timestamp,
    uuid
} from "drizzle-orm/pg-core"
import { cartItems } from "./cart"

export const products = pgTable("product", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    imageUrl: text("imageUrl"),
    category: text("category"),
    stock: integer("stock").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})
export const productsRelations = relations(products, ({ many }) => ({
    cartItems: many(cartItems),
}))
