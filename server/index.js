import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);

app.listen(process.env.VITE_API_PORT, () =>
    console.log(`Server running on port ${process.env.VITE_API_PORT}`)
);
