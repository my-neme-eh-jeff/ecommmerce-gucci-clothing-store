import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema/product'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const allProducts = await db.select().from(products)
        return res.status(200).json(allProducts)
        // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (req.method === 'POST') {
        //TODO: Ideally only admin can do this
        const { name, description, price, imageUrl, category, stock } = req.body
        const newProduct = await db.insert(products).values({
            name,
            description,
            price,
            imageUrl,
            category,
            stock,
        }).returning()
        return res.status(201).json(newProduct[0])
    }
    return res.status(405).end()
}
