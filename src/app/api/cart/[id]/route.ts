import { auth } from '@/auth'
import { db } from '@/lib/db'
import { cartItems } from '@/lib/db/schema/cart'
import { updateCartItemSchema } from '@/lib/validators'
import { and, eq } from 'drizzle-orm'
// biome-ignore lint/style/useImportType: <explanation>
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        const userId = session.user.id as string
        const body = await req.json()
        const validatedData = updateCartItemSchema.safeParse(body)
        if (!validatedData.success) {
            return NextResponse.json({ error: validatedData.error.errors }, { status: 400 })
        }
        const { quantity } = validatedData.data
        const updatedItem = await db.update(cartItems)
            .set({ quantity, updatedAt: new Date() })
            .where(and(eq(cartItems.id, params.id), eq(cartItems.userId, userId)))
            .returning()
        if (updatedItem.length === 0) {
            return NextResponse.json({ error: 'Cart item not found' }, { status: 404 })
        }
        return NextResponse.json(updatedItem[0])
    } catch (error) {
        console.error('Error updating cart item:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        const userId = session.user.id as string
        const deletedItem = await db.delete(cartItems)
            .where(and(eq(cartItems.id, params.id), eq(cartItems.userId, userId)))
            .returning()
        if (deletedItem.length === 0) {
            return NextResponse.json({ error: 'Cart item not found' }, { status: 404 })
        }
        return NextResponse.json(null, { status: 200 })
    } catch (error) {
        console.error('Error deleting cart item:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}