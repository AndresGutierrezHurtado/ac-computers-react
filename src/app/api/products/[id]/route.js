import { NextResponse } from "next/server";

import { Product, Category, Spec, Multimedia } from "@/database/models";

export async function GET(request, { params }) {
    const { id } = await params;
    const product = await Product.findByPk(id, {
        include: ["category", "specs", "multimedias"],
    });

    return NextResponse.json(
        {
            success: true,
            message: "Producto obtenido correctamente",
            data: product,
        },
        { status: 200 }
    );
}

export async function PUT(request, { params }) {
    const { product: productJSON } = await request.json();

    const product = await Product.findByPk(params.id);
    await product.update(productJSON);

    return NextResponse.json(
        {
            success: true,
            message: "Producto actualizado correctamente",
            data: product,
        },
        { status: 200 }
    );
}

export async function DELETE(request, { params }) {
    const product = await Product.findByPk(params.id);
    await product.destroy();

    return NextResponse.json(
        {
            success: true,
            message: "Producto eliminado correctamente",
            data: product,
        },
        { status: 200 }
    );
}
