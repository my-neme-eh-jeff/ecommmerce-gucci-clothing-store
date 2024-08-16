// biome-ignore lint/style/useImportType: <explanation>
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db';
import { eq, and, gte, lt } from 'drizzle-orm';
import { getSession } from 'next-auth/react';
import { discountCodes, userDiscounts } from '@/lib/db/schema/discount';

export async function GET() {
    const session = await getSession()
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id as string
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const existingDiscount = await db.select()
        .from(userDiscounts)
        .where(
            and(
                eq(userDiscounts.userId, userId),
                gte(userDiscounts.generatedAt, today),
                lt(userDiscounts.generatedAt, tomorrow)
            )
        )
        .limit(1)
    if (existingDiscount.length > 0) {
        const discountCode = await db.select()
            .from(discountCodes)
            .where(eq(discountCodes.id, existingDiscount[0].discountId))
            .limit(1)
        return NextResponse.json(discountCode[0])
    }
    if (Math.random() < 0.3) {
        const allDiscounts = await db.select().from(discountCodes)
        const randomDiscount = allDiscounts[Math.floor(Math.random() * allDiscounts.length)]
        await db.insert(userDiscounts).values({
            userId,
            discountId: randomDiscount.id,
            generatedAt: new Date(),
            expiresAt: tomorrow,
        })
        return NextResponse.json(randomDiscount)
    }

    return NextResponse.json(null)
}
