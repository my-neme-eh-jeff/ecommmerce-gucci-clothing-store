import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'
import { cartItems } from '@/lib/db/schema/cart'
import { eq, and } from 'drizzle-orm'
import { getSession } from 'next-auth/react'
// biome-ignore lint/style/useImportType: <explanation>
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getSession()
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id as string
    const { quantity } = await req.json()

    const updatedItem = await db.update(cartItems)
        .set({ quantity, updatedAt: new Date() })
        .where(and(eq(cartItems.id, params.id), eq(cartItems.userId, userId)))
        .returning()

    return NextResponse.json(updatedItem[0])
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getSession()
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id as string

    await db.delete(cartItems)
        .where(and(eq(cartItems.id, params.id), eq(cartItems.userId, userId)))

    return NextResponse.json(null, { status: 204 })
}

