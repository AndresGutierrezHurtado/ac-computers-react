import "./globals.css";

export const metadata = {
    title: "Inicio | AC Computers",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}
