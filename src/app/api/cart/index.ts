import { db } from '@/lib/db'
import { cartItems } from '@/lib/db/schema/cart'
import { products } from '@/lib/db/schema/product'
import { eq } from 'drizzle-orm'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession()
    if (!session?.user) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const userId = session.user.id as string

    if (req.method === 'GET') {
        const userCart = await db.select()
            .from(cartItems)
            .innerJoin(products, eq(cartItems.productId, products.id))
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            .where(eq(cartItems.userId, userId!))
        return res.status(200).json(userCart)
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (req.method === 'POST') {
        const { productId, quantity } = req.body
        const newCartItem = await db.insert(cartItems).values({
            userId: userId,
            productId,
            quantity,
        }).returning()
        return res.status(201).json(newCartItem[0])
    }
    return res.status(405).end()
}
