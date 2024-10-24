import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|divider).js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        bricolage: [
          '"Bricolage Grotesque"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        Arima: ['"Arima"', "system-ui"],
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".section": {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "0 10px",
        },
        "@media screen and (min-width: 768px)": {
          ".section": {
            padding: "0 30px",
          },
          ".none": {
            display: "none",
          },
        },
        ".container": {
          maxWidth: theme("maxWidth.container"),
        },
        ".font-heading-nav": {
          marginBottom: "0",
          fontSize: "1.25rem",
          fontWeight: "600",
          lineHeight: "1.75rem",
        },
        "@media screen and (max-width: 768px)": {},
      });
    }),
  ],
} satisfies Config;
