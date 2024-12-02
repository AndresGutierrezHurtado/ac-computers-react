import express from "express";
import cors from "cors";
import session from "express-session";
import sequelizeStore from "connect-session-sequelize";
import { sequelize } from "./config/database.js";
import * as models from "./models/relations.js";
const SequelizeStore = new sequelizeStore(session.Store);

// routes
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const store = new SequelizeStore({ db: sequelize, tableName: "sessions" });

await store.sync();

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
        resave: false,
        proxy: true,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            secure: false,
            httpOnly: true,
            sameSite: "lax",
        },
    })
);
app.use(async (req, res, next) => {
    if (req.session.user_id) {
        req.session.user = await models.User.findByPk(req.session.user_id, {
            include: [{ model: models.Role, as: "role" }],
        });
    }

    next();
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);

app.listen(process.env.VITE_API_PORT, () =>
    console.log(`Server running on port ${process.env.VITE_API_PORT}`)
);
