import { NextResponse } from "next/server";

// Database
import { Multimedia } from "@/database/models";

// Hooks
import { deleteFile } from "@/hooks/useUploadImage";

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const image = await deleteFile(`ac-computers/medias/${id}`);

        if (!image.success) throw new Error(image.data);

        const media = await Multimedia.findByPk(id);
        await media.destroy();

        return NextResponse.json(
            {
                success: true,
                message: "Imagen eliminada correctamente",
                data: { media, image },
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
                data: error,
            },
            { status: 500 }
        );
    }
}
