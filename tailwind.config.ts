import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login-btn-gradient": "linear-gradient(to right, #9555FF 89.08%, #6C5DD3, #1500A9 8.52%)",
      }
    },
  },
  plugins: [],
};
export default config;
