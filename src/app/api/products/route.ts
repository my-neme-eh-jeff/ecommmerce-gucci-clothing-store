// biome-ignore lint/style/useImportType: <explanation>
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema/product'
import { insertProductSchema } from '@/lib/validators'

const PRODUCTS_PER_PAGE = 12

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url)
        const cursor = Number.parseInt(url.searchParams.get('cursor') || '0', 10)
        const limit = Number.parseInt(url.searchParams.get('limit') || PRODUCTS_PER_PAGE.toString(), 10)
        if (Number.isNaN(cursor) || Number.isNaN(limit) || limit < 1) {
            return NextResponse.json({ error: 'Invalid cursor or limit' }, { status: 400 })
        }
        const productList = await db
            .select()
            .from(products)
            .limit(limit + 1)
            .offset(cursor)
        const hasNextPage = productList.length > limit
        const nextCursor = hasNextPage ? cursor + limit : null
        return NextResponse.json({
            products: productList.slice(0, limit),
            nextCursor,
        })
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const validatedData = insertProductSchema.safeParse(body)
        if (!validatedData.success) {
            return NextResponse.json({ error: validatedData.error.errors }, { status: 400 })
        }
        const newProduct = await db.insert(products).values(body).returning()
        return NextResponse.json(body, { status: 201 })
    } catch (error) {
        console.error('Error creating product:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
