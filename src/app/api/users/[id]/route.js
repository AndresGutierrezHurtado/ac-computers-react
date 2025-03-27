import { NextResponse } from "next/server";

import { User } from "@/database/models";

export async function GET(request, { params }) {
    const { id } = await params;
    const user = await User.findByPk(id, {
        attributes: {
            exclude: ["user_password"],
        },
        include: ["role"],
    });

    return NextResponse.json({
        success: true,
        message: "Usuario obtenido correctamente",
        data: user,
    });
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const user = await User.findByPk(id);
    await user.destroy();

    return NextResponse.json({
        success: true,
        message: "Usuario eliminado correctamente",
        data: user,
    });
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const { user: userJSON } = await request.json();

    const user = await User.findByPk(id);
    await user.update(userJSON);

    return NextResponse.json({
        success: true,
        message: "Usuario actualizado correctamente",
        data: user,
    });
}
