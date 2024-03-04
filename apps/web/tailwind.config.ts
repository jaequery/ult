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
      backgroundImage: {},
    },
  },
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
export default withMT(config);
