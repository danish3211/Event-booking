
/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#8A2BE2",
                secondary: "#2A1F3D",
                text: "#050014",
                vivid: "#7F5AF0",
                background: "#FFFFFF",
                surface: "#B3B3B3",
            },
        },
    },
    plugins: [],
};