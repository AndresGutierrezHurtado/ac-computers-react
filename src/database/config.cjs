module.exports = {
    development: {
        username: "admin",
        password: "admin",
        database: "ac-computers",
        host: "localhost",
        dialect: "postgres",
        port: 5432
    },
    test: {
        username: "admin",
        password: "admin",
        database: "ac-computers",
        host: "localhost",
        dialect: "postgres",
        port: 5432
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: process.env.DB_PORT
    }
}