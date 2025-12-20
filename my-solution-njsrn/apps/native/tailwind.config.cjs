const sharedConfig = require("@repo/config-tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [sharedConfig, require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
