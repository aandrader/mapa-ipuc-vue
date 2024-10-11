import { defineConfig, presetUno, presetAttributify } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  shortcuts: {
    card: "bg-white rounded-3xl border border-solid border-gray-300",
    "absolute-center-x": "right-1/2  translate-x-[50%]",
    "absolute-center-y": "top-1/2 translate-y-[-50%]",
    "absolute-center": "top-1/2 translate-y-[-50%] right-1/2 translate-x-[50%]",
    "above-map": "z-[1001]",
  },

  theme: {
    colors: {
      ipuc: {
        blue: {
          100: "#EFF3F8",
          200: "#E4EAF3",
          300: "#BFCCE3",
          400: "#8099C6",
          500: "#6080B8",
          600: "#4066AA",
          700: "#204D9B",
          800: "#00338D",
          900: "#224073",
        },
      },
    },
  },
});
