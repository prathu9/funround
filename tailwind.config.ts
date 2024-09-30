import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens:{
        "customlg": {"raw":"((max-height: 580px) and (min-height: 382px))"}
      },
      backgroundImage: {
        "btn-gradient-1": "linear-gradient(to right, rgba(149, 85, 255) 0%, #6C5DD3 20%, rgba(21, 0, 169) 180%)",
        "btn-gradient-hover-1": "linear-gradient(to right, #9988e5, #a197e4)",
        "btn-gradient-2": "radial-gradient(ellipse at 60% 25%, #AB97FF 10%, #7051DCCC 50%, #7051DCCC 80%)",
        "btn-gradient-hover-2": "radial-gradient(ellipse at 50% 100%,rgba(191, 178, 241, 0.9) 10%, #ffffff 60%, #ffffff 100%)",
        "vid-bg":"linear-gradient(0deg, rgba(230, 224, 255, 0.70) 0%, rgba(230, 224, 255, 0.70) 100%)",
      },
      textShadow:{
        "btn-text": "2px 2px 0px rgba(171, 151, 255, 1)",
        "btn-text-hover": "2px 2px 0px #ffffff"
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value
          }),
        },
        { values: theme('textShadow') }
      )
    })
  ],
};
export default config;
