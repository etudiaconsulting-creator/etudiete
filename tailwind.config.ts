import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#E8F5F0",
          200: "#A8DECA",
          400: "#34B78F",
          500: "#1A8C6A",
          600: "#0F6E52",
          700: "#0B5D45",
          900: "#073D2E",
        },
        coral: {
          50: "#FFF0EB",
          200: "#FECDB8",
          400: "#F4956A",
          500: "#E8703E",
          600: "#D85A28",
          700: "#B84422",
          900: "#7A2C14",
        },
      },
    },
  },
  plugins: [],
};
export default config;
