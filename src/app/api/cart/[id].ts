import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'
import { cartItems } from '@/lib/db/schema/cart'
import { eq, and } from 'drizzle-orm'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession()
    if (!session?.user) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const userId = session.user?.id ?? ''
    const { id } = req.query

    if (req.method === 'PUT') {
        const { quantity } = req.body
        const updatedItem = await db.update(cartItems)
            .set({ quantity, updatedAt: new Date() })
            .where(and(eq(cartItems.id, id as string), eq(cartItems.userId, userId)))
            .returning()
        return res.status(200).json(updatedItem[0])
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (req.method === 'DELETE') {
        await db.delete(cartItems)
            .where(and(eq(cartItems.id, id as string), eq(cartItems.userId, userId)))
        return res.status(204).end()
    }
    return res.status(405).end()
}
