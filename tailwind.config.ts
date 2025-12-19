import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        "foreground-muted": "var(--color-foreground-muted)",

        // Card colors
        card: "var(--color-card)",
        "card-foreground": "var(--color-card-foreground)",

        // Popover colors
        popover: "var(--color-popover)",
        "popover-foreground": "var(--color-popover-foreground)",

        // Primary colors
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          contrast: "var(--color-primary-contrast)",
          foreground: "var(--color-primary-foreground)",
          soft: "var(--color-primary-soft)",
        },

        // Accent colors
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          foreground: "var(--color-accent-foreground)",
          soft: "var(--color-accent-soft)",
        },

        // Secondary colors
        secondary: "var(--color-secondary)",

        // Muted colors
        muted: "var(--color-muted)",

        // Destructive colors
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)",
        },

        // Border colors
        border: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
        },

        // Input & Ring
        input: "var(--color-input)",
        ring: "var(--color-ring)",

        // State colors
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",

        // Sidebar colors
        sidebar: {
          DEFAULT: "var(--color-sidebar)",
          foreground: "var(--color-sidebar-foreground)",
          primary: "var(--color-sidebar-primary)",
          "primary-foreground": "var(--color-sidebar-primary-foreground)",
          accent: "var(--color-sidebar-accent)",
          "accent-foreground": "var(--color-sidebar-accent-foreground)",
          border: "var(--color-sidebar-border)",
          ring: "var(--color-sidebar-ring)",
        },

        // Additional custom colors
        turf: "var(--color-turf)",
        "white-black": "var(--color-white-black)",
        "bg-apple": "var(--color-bg-apple)",

        // Dark grays (for dark mode)
        "dark-gray": {
          1: "var(--dark-gray-1)",
          2: "var(--dark-gray-2)",
          3: "var(--dark-gray-3)",
        },

        // Light grays
        "gray-light": {
          1: "var(--gray-light-1)",
          2: "var(--gray-light-2)",
          3: "var(--gray-light-3)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      backgroundImage: {
        "gradient-theme": "var(--color-background-gradient)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

export default config;
