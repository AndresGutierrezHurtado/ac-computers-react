/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [{
            dark: {
                "primary": "#4e99d3",
                "base-100": "#242430",
                "neutral-content": "#ffffff",
                "accent": "#f7f7f7",
            },
        }],
    },
};
