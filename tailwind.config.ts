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
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "main-backgroundcolordarker": "#161853",
        "main-backgroundcolorlighter": "#292C6D",
        "main-textcolor": "#FAEDF0",
        "main-buttoncolor": "#EC255A",
      },
      fontFamily: {
        notoSans: ["Noto Sans", "sans-serif"],
      },
      boxShadow: {
        'button-glow': '0 0 2px #FAEDF0, inset 0 0 2px #FAEDF0, 0 0 5px #EC255A, 0 0 15px #EC255A, 0 0 30px #EC255A',
      },
    },
  },
  plugins: [],
};
export default config;
