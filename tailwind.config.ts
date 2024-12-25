import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#fc5b43",
          stroke: "#fd7c69",
          "stroke-weak": "#fdded9",
          fill: "#fcf8f6",
        },
        error: {
          DEFAULT: "#c63939",
        },
      },
      fontFamily: {
        body: ["Open Sans", "sans-serif"],
        heading: ["Roboto", "sans-serif"],
      },
      fontSize: {
        xl: ["48px", { lineHeight: "56px" }],
        lg: ["40px", { lineHeight: "48px" }],
        md: ["32px", { lineHeight: "40px" }],
        sm: ["24px", { lineHeight: "32px" }],
        xs: ["18px", { lineHeight: "24px" }],
        xxs: ["12px", { lineHeight: "18px" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
