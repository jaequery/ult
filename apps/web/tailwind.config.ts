import type { Config } from "tailwindcss";

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          200: '#f5f5dc',
          300: '#ede9e0',
          500: '#d2b48c'
        }
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
export default withMT(config);
