// biome-ignore lint/style/useImportType: <explanation>
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema/product'

const PRODUCTS_PER_PAGE = 12 

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const cursor = Number.parseInt(url.searchParams.get('cursor') || '0', 10)
    const limit = Number.parseInt(url.searchParams.get('limit') || PRODUCTS_PER_PAGE.toString(), 10)

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
}
export async function POST(req: NextRequest) {
    const { name, description, price, imageUrl, category, stock } = await req.json()
    const newProduct = await db.insert(products).values({
        name,
        description,
        price,
        imageUrl,
        category,
        stock,
    }).returning()
    return NextResponse.json(newProduct[0], { status: 201 })
}

