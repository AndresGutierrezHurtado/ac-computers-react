import { Router } from "express";
import ProductController from "../controllers/productController.js";

const productRoutes = Router();

productRoutes.get("/products", ProductController.getProducts);
productRoutes.get("/products/:id", ProductController.getProduct);
productRoutes.post("/products", ProductController.createProduct);
productRoutes.put("/products/:id", ProductController.updateProduct);
productRoutes.delete("/products/:id", ProductController.deleteProduct);

export default productRoutes;
