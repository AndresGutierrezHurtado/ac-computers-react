import express from "express";
import cors from "cors";
import session from "express-session";
import sequelizeStore from "connect-session-sequelize";
import { sequelize } from "./config/database.js";
const SequelizeStore = new sequelizeStore(session.Store);

// routes
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: process.env.VITE_APP_URL,
        credentials: true,
    })
);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        store: new SequelizeStore({
            db: sequelize,
            table: "sessions",
        }),
        resave: false,
        proxy: true,
        saveUninitialized: false,
    })
);

app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);

app.listen(process.env.VITE_API_PORT, () =>
    console.log(`Server running on port ${process.env.VITE_API_PORT}`)
);
