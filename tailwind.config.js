module.exports = {
  variants: {
    boxShadow: ["responsive", "hover", "focus", "focus-within"],
    borderWidth: ["responsive", "first", "last", "hover", "focus"],
  },
  theme: {
    minWidth: {
      "0": "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
    container: {
      padding: {
        default: "1rem",
        sm: "1rem",
        lg: "2rem",
        xl: "2rem",
      },
    },
    extend: {
      screens: {
        "dark-mode": { raw: "screen and (prefers-color-scheme: dark)" },
      },
    },
  },
};
