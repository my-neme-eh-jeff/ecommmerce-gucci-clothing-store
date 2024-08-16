import { db } from '@/lib/db'
import { cartItems } from '@/lib/db/schema/cart'
import { products } from '@/lib/db/schema/product'
import { eq } from 'drizzle-orm'
// biome-ignore lint/style/useImportType: <explanation>
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'

export async function GET() {
    const session = await getSession()
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const userId = session.user.id as string
    const userCart = await db.select()
        .from(cartItems)
        .innerJoin(products, eq(cartItems.productId, products.id))
        .where(eq(cartItems.userId, userId))
    return NextResponse.json(userCart)
}

export async function POST(req: NextRequest) {
    const session = await getSession()
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const userId = session.user.id as string
    const { productId, quantity } = await req.json()
    const newCartItem = await db.insert(cartItems).values({
        userId,
        productId,
        quantity,
    }).returning()
    return NextResponse.json(newCartItem[0], { status: 201 })
}

