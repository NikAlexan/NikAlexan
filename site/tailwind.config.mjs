/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        ochre: "var(--color-ochre)",
        bronze: "var(--color-bronze)",
        cream: "var(--color-cream)",
        "cream-bg": "var(--color-cream-bg)",
        charcoal: "var(--color-charcoal)",
        "warm-amber": "var(--color-warm-amber)",
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "terminal-bg": "var(--color-terminal-bg)",
        "terminal-border": "var(--color-terminal-border)",
        "status-online": "var(--color-status-online)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)"
      },
      fontFamily: {
        display: "var(--font-display)",
        mono: "var(--font-mono)"
      }
    }
  }
};
