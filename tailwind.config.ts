import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        kronaOne: ["var(--font-krona-one)", "sans-serif"],
        judson: ["var(--font-judson)", "serif"],
      },
      boxShadow: {
        custom: "4px 4px 0px 0px rgba(0, 0, 0, 1)",
        hover: "0px 0px 0px 0px rgba(0, 0, 0, 0)",
      },
      width: {
        vw33: "33vw"
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
