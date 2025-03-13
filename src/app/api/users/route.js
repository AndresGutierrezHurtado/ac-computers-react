import { NextResponse } from "next/server";

import { User } from "@/database/models";

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;

    const { rows: users, count } = await User.findAndCountAll({
        limit,
        offset,
    });

    return NextResponse.json({
        success: true,
        message: "Usuarios obtenidos correctamente",
        count,
        limit,
        page,
        data: users,
    });
}

export async function POST(request) {
    const { user: userJSON } = await request.json();

    const user = await User.create(userJSON);

    return NextResponse.json({
        success: true,
        message: "Usuario creado correctamente",
        data: user,
    });
}
