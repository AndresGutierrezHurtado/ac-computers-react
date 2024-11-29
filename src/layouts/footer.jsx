import React from "react";

export default function Footer() {
    return (
        <footer className="w-full px-3 py-5">
            <section className="footer footer-center text-base-content w-full max-w-[1200px] mx-auto bg-base-300/50 rounded-full p-2">
                <aside>
                    <p className="font-semibold">&copy; AC Computers {new Date().getFullYear()} </p>
                </aside>
            </section>
        </footer>
    );
}
