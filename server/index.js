import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);

app.listen(process.env.VITE_API_PORT, () =>
    console.log(`Server running on port ${process.env.VITE_API_PORT}`)
);
