import { Product, Category, Spec } from "../models/relations.js";
import PDFDocument from "pdfkit-table";

export const pdfGenerator = async (req, res) => {
    let whereClause = {};
    if (req.query.category_id) whereClause.category_id = req.query.category_id;
    try {
        const productos = await Product.findAll({
            include: [
                { model: Category, as: "category" },
                { model: Spec, as: "specs" },
            ],
            where: whereClause,
            distinct: true,
        });

        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=__AC_COMPUTERS__.pdf");

        doc.pipe(res);

        doc.fontSize(10)
            .fillColor("#333")
            .text(
                `Punto de venta: Centro Comercial Alta Tecnología Cra. 15 No 77-05 Local __ primer piso | Móvil: 311 8835868 | amaliacastro78@gmail.com`,
                { align: "center" }
            );
        doc.moveDown();

        doc.font("Helvetica-Bold")
            .fontSize(20)
            .fillColor("#4e99d3")
            .text("AC COMPUTERS", { align: "center" });
        doc.moveDown();

        // Mensaje si no hay productos
        if (productos.length === 0) {
            doc.fontSize(16)
                .fillColor("red")
                .text("No hay productos disponibles", { align: "center" });
            doc.end();
            return;
        }

        const maxPerPage = 10;
        const pages = Math.ceil(productos.length / maxPerPage);

        for (let page = 0; page < pages; page++) {
            const table = {
                headers: ["Computadores", ""],
                rows: productos
                    .slice(page * maxPerPage, (page + 1) * maxPerPage)
                    .map((producto) => [
                        producto.product_id.split("-")[1] + " - " + producto.product_name,
                        "COP " + parseInt(producto.product_price).toLocaleString("es-CO"),
                    ]),
            };

            doc.table(table, {
                prepareHeader: () => doc.font("Helvetica-Bold").fontSize(13).fillColor("black"),
                prepareRow: (row, indexColumn, indexRow, rectRow) => {
                    const product = productos[indexRow];
                    doc.font("Helvetica").fontSize(11).fillColor("black");
                    if (indexColumn === 1) {
                        doc.font("Helvetica-Bold");
                    }
                },
                columnsSize: [380, 90],
            });

            doc.fontSize(12)
                .font("Helvetica")
                .fillColor("gray")
                .text(`Página ${page + 1} de ${pages}`, { align: "right", valign: "bottom" });

            if (page !== pages - 1) {
                doc.addPage();
            }
        }

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Error al generar el PDF" });
    }
};
