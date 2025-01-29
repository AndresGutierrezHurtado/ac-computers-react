import { Product, Category } from "../models/relations.js";
import PDFDocument from "pdfkit-table";

export const pdfGenerator = async (req, res) => {
    try {
        const computers = await Product.findAll({
            include: [{ model: Category, as: "category" }],
            where: { category_id: 1 },
            distinct: true,
        });

        const components = await Product.findAll({
            include: [{ model: Category, as: "category" }],
            where: { category_id: 2 },
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

        if (computers.length === 0 && components.length === 0) {
            doc.fontSize(16)
                .fillColor("red")
                .text("No hay productos disponibles", { align: "center" });
            doc.end();
            return;
        }

        const maxPerPage = 20;
        const pages = Math.ceil((computers.length + components.length) / maxPerPage);

        for (let page = 0; page < pages; page++) {
            const computersTable = {
                headers: ["Computadores", ""],
                rows: computers
                    .slice(page * maxPerPage, (page + 1) * maxPerPage)
                    .map((producto) => [
                        producto.product_id.split("-")[1] + " - " + producto.product_name,
                        "COP " + parseInt(producto.product_price).toLocaleString("es-CO"),
                    ]),
            };

            doc.table(computersTable, {
                prepareHeader: () => doc.font("Helvetica-Bold").fontSize(13).fillColor("black"),
                prepareRow: (row, indexColumn, indexRow, rectRow) => {
                    doc.font("Helvetica").fontSize(11).fillColor("black");
                    if (indexColumn === 1) {
                        doc.font("Helvetica-Bold");
                    }
                },
                columnsSize: [380, 90],
            });

            doc.moveDown();

            const componentsTable = {
                headers: ["Componentes", ""],
                rows: components
                    .slice(page * maxPerPage, (page + 1) * maxPerPage)
                    .map((producto) => [
                        producto.product_id.split("-")[1] + " - " + producto.product_name,
                        "COP " + parseInt(producto.product_price).toLocaleString("es-CO"),
                    ]),
            };

            doc.table(componentsTable, {
                prepareHeader: () => doc.font("Helvetica-Bold").fontSize(13).fillColor("black"),
                prepareRow: (row, indexColumn, indexRow, rectRow) => {
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
