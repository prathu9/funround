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
        "btn-gradient-1": "linear-gradient(to right, rgba(149, 85, 255) 0%, #6C5DD3 20%, rgba(21, 0, 169) 180%)",
        "btn-gradient-hover-1": "linear-gradient(to right, #9988e5, #a197e4)",
      },
    },
  },
  plugins: [],
};
export default config;
