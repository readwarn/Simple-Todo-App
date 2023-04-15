/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "brand-black": "#69665C",
                "brand-gray": "#B2AFA1",
                "brand-brown": "#FFF9DE",
                "brand-blue": "#D1E5F7",
                "brand-green": "#DAF2D6",
                "brand-pink": "#FFCECE",
                "brand-purple": "#D2CEFF",
                "faded-black": "rgba(0,0,0,0.7)",
            },
            screens: {
                mobile: "700px",
            },
        },
    },
    plugins: [],
};