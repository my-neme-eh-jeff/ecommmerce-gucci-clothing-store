import { db } from "@/lib/db";
import { products } from "@/lib/db/schema/product";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const resp = await db.select().from(products);
    return NextResponse.json({
        name: "Cron job",
        resp: resp,
    });
}
