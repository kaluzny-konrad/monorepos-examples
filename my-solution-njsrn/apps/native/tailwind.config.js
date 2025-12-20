import sharedConfig from "@repo/config-tailwind";
import nativewind from "nativewind/preset";

/** @type {import('tailwindcss').Config} */
export default {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [sharedConfig, nativewind],
  theme: {
    extend: {},
  },
  plugins: [],
};

