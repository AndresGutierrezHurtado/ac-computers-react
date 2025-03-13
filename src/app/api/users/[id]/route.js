import { NextResponse } from "next/server";

import { User } from "@/database/models";

export async function GET(request, { params }) {
    const user = await User.findByPk(params.id);

    return NextResponse.json({
        success: true,
        message: "Usuario obtenido correctamente",
        data: user,
    });
}

export async function DELETE(request, { params }) {
    const user = await User.findByPk(params.id);
    await user.destroy();

    return NextResponse.json({
        success: true,
        message: "Usuario eliminado correctamente",
        data: user,
    });
}

export async function PUT(request, { params }) {
    const { user: userJSON } = await request.json();

    const user = await User.findByPk(params.id);
    await user.update(userJSON);

    return NextResponse.json({
        success: true,
        message: "Usuario actualizado correctamente",
        data: user,
    });
}
