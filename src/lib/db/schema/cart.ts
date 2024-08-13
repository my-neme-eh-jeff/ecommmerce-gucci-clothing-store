import { relations } from "drizzle-orm"
import {
    integer,
    pgTable,
    text,
    timestamp,
    uuid
} from "drizzle-orm/pg-core"
import { users } from "./user"
import { products } from "./product"

export const cartItems = pgTable("cart_item", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    productId: uuid("productId")
        .notNull()
        .references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
    user: one(users, {
        fields: [cartItems.userId],
        references: [users.id],
    }),
    product: one(products, {
        fields: [cartItems.productId],
        references: [products.id],
    }),
}))
