/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#154436", // Deep green form logo
                    light: "#1e5e4b",
                    dark: "#0d2e24",
                },
                accent: {
                    DEFAULT: "#D4AF37", // Gold
                    light: "#eacc68",
                },
                cream: {
                    DEFAULT: "#F9F9F5", // Background
                    dark: "#f0f0e8",
                },
                // Original colors, if they were meant to be kept alongside the new ones
                // If the new 'primary' is meant to completely replace the old one,
                // then the old 'primary' entry should be removed.
                // Assuming the new colors are additions/replacements for the existing ones.
                // The instruction implies adding, but the structure suggests replacement for 'primary'
                // and addition for 'accent' and 'cream'.
                // For 'secondary', 'dark', 'light', they are not redefined in the new block,
                // so they should remain.
                secondary: '#F59E0B', // Amber 500
                dark: '#111827', // Gray 900
                light: '#F3F4F6', // Gray 100
            },
            fontFamily: {
                serif: ["'Playfair Display'", "serif"],
                sans: ["'Inter'", "sans-serif"],
                arabic: ["'Amiri'", "serif"],
            },
            backgroundImage: {
                'pattern': "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23154436\\' fill-opacity=\\'0.03\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            }
        },
    },
    plugins: [],
}
