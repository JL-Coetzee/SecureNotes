// themeConfig.ts
export const getThemeClasses = (theme: "dark" | "light") => ({
  // Theme-based styles
  background: theme === "dark" ? "bg-gray-900" : "bg-softBeige",
  text: theme === "dark" ? "text-white" : "text-gray-900",
  mutedText: theme === "dark" ? "text-gray-400" : "text-gray-500",
  borderPurple: "border-2 border-purple-500",
  borderGreen: "border-2 border-green-500",
  hover: theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200",
  hoverText: theme === "dark" ? "hover:bg-green-700" : "hover:bg-green-700",
  shadow: "shadow-lg",
  transition: "transition-all duration-300",
  progressColor: theme === "dark" ? "bg-purple-500" : "bg-indigo-600",
  progressBackground: theme === "dark" ? "bg-gray-700" : "bg-gray-300",
  gradient: "bg-gradient-to-br from-green-500 to-purple-600",

  // Responsive text sizes
  textSizes: {
    heading: "text-2xl sm:text-3xl md:text-4xl",
    subheading: "text-xl sm:text-2xl md:text-3xl",
    body: "text-base sm:text-lg md:text-xl",
    small: "text-sm sm:text-base md:text-lg",
  },

  // Typography styles
  typography: {
    fontBold: "font-bold",
    fontSemibold: "font-semibold",
    fontRegular: "font-normal",
    marginTop: {
      small: "mt-2",
      medium: "mt-4",
      large: "mt-6",
      extraLarge: "mt-8",
    },
    marginBottom: {
      small: "mb-2",
      medium: "mb-4",
      large: "mb-6",
      extraLarge: "mb-8",
    },
    textAlignCenter: "text-center",
    displayBlock: "block",

    // New global typography styles
    responsiveText: {
      heading: "text-2xl sm:text-3xl md:text-4xl",
      subheading: "text-xl sm:text-2xl md:text-3xl",
      body: "text-base sm:text-lg md:text-xl",
    },
    responsiveFontSize: "font-size: clamp(1rem, 2.5vw, 1.5rem);",
    textWrapping: "overflow-wrap: break-word; word-break: break-word;",
    whiteSpace: "white-space: normal;",
  },

  // Spacing and sizing
  spacing: {
    padding: {
      small: "p-2",
      medium: "p-4",
      large: "p-6",
      extraLarge: "p-8",
      xxL: "p-10",
    },
    paddingX: {
      small: "px-2",
      medium: "px-4",
      large: "px-6",
    },
    paddingLeft: {
      small: "pl-2",
      medium: "pl-4",
      large: "pl-6",
    },
    rounded: {
      none: "",
      small: "rounded-sm",
      medium: "rounded",
      large: "rounded-lg",
      full: "rounded-full",
    },
    spaceX: {
      small: "space-x-2",
      medium: "space-x-4",
      large: "space-x-6",
    },
    spaceY: {
      small: "space-y-2",
      medium: "space-y-4",
      large: "space-y-6",
    },
  },
});
