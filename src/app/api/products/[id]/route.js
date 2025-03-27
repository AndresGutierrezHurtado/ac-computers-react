import { NextResponse } from "next/server";
import crypto from "crypto";

// Database
import { Product, Category, Spec, Multimedia } from "@/database/models";

// Hooks
import { deleteFile, uploadFile } from "@/hooks/useUploadImage";

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
    const { id } = await params;
    try {
        const transaction = await Product.sequelize.transaction();

        const { product, specs, product_image, multimedias } = await request.json();

        if (product_image) {
            const { data: url } = await uploadFile(product_image, id, "/");
            product.product_image_url = url;
        }

        const productResult = await Product.update(product, {
            where: { product_id: id },
            transaction,
        });

        await Spec.destroy({
            where: { product_id: id },
            transaction,
        });

        const specsResult = await Spec.bulkCreate(
            specs.map((spec) => ({
                ...spec,
                product_id: id,
            })),
            {
                transaction,
            }
        );

        if (multimedias) {
            const multimediaData = await Promise.all(
                multimedias.map(async (file) => {
                    const mediaId = crypto.randomUUID();
                    const { data: url } = await uploadFile(file, mediaId, "/medias");

                    return {
                        media_id: mediaId,
                        media_url: url,
                        product_id: id,
                    };
                })
            );

            const multimediasResult = await Multimedia.bulkCreate(multimediaData, {
                transaction,
            });
        }

        await transaction.commit();

        return NextResponse.json(
            {
                success: true,
                message: "Producto actualizado correctamente",
                data: { productResult, specsResult },
            },
            { status: 200 }
        );
    } catch (error) {
        await transaction.rollback();

        return NextResponse.json(
            {
                success: false,
                message: `Error al actualizar producto: ${error.message}`,
                data: error,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    const transaction = await Product.sequelize.transaction();
    try {
        const product = await Product.findByPk(params.id, {
            include: ["category", "specs", "multimedias"],
        });

        await Promise.all(
            product.multimedias.map(async (media) => {
                const imageResponse = await deleteFile(`ac-computers/medias/${media.media_id}`);

                if (!imageResponse.success) throw new Error(imageResponse.data);
            })
        );

        const imageResponse = await deleteFile(`ac-computers/${product.product_id}`);
        if (!imageResponse.success) throw new Error(imageResponse.data);

        const productResponse = await product.destroy({ transaction });

        await transaction.commit();
        return NextResponse.json(
            {
                success: true,
                message: "Producto eliminado correctamente",
                data: productResponse,
            },
            { status: 200 }
        );
    } catch (error) {
        await transaction.rollback();
        return NextResponse.json(
            {
                success: false,
                message: `Error al eliminar producto: ${error.message}`,
                data: error,
            },
            { status: 500 }
        );
    }
}
