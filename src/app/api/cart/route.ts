import { db } from '@/lib/db'
import { cartItems } from '@/lib/db/schema/cart'
import { products } from '@/lib/db/schema/product'
import { eq } from 'drizzle-orm'
// biome-ignore lint/style/useImportType: <explanation>
import { NextRequest, NextResponse } from 'next/server'
import { insertCartItemSchema } from '@/lib/validators'
import { auth } from '@/auth'

export async function GET() {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        const userId = session.user.id as string
        const userCart = await db.select()
            .from(cartItems)
            .innerJoin(products, eq(cartItems.productId, products.id))
            .where(eq(cartItems.userId, userId))
        return NextResponse.json(userCart)
    } catch (error) {
        console.error('Error fetching cart:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        const userId = session.user.id as string
        const body = await req.json()
        const validatedData = insertCartItemSchema.safeParse({ ...body, userId })
        if (!validatedData.success) {
            return NextResponse.json({ error: validatedData.error.errors }, { status: 400 })
        }

        const { productId, quantity } = validatedData.data

        const product = await db.select().from(products).where(eq(products.id, productId)).limit(1)
        if (product.length === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }

        const newCartItem = await db.insert(cartItems).values({
            userId,
            productId,
            quantity,
        }).returning()
        return NextResponse.json(newCartItem[0], { status: 201 })
    } catch (error) {
        console.error('Error adding item to cart:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}