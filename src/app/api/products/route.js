import { NextResponse } from "next/server";

import { Product, Category } from "@/database/models";

export async function GET(resquest) {
    const { searchParams } = new URL(resquest.url);

    const type = parseInt(searchParams.get("type"));
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;
    
    const { rows: products, count } = await Product.findAndCountAll({
        where: { category_id: type },
        limit,
        offset,
        include: [
            {
                model: Category,
                as: "category",
            },
        ],
    });

    return NextResponse.json({
        success: true,
        message: "Productos obtenidos correctamente",
        count,
        limit,
        page,
        data: products,
    });
}

export async function POST(request) {
    const { product: productJSON } = await request.json();

    const product = await Product.create(productJSON);

    return NextResponse.json({
        success: true,
        message: "Producto creado correctamente",
        data: product,
    });
}
