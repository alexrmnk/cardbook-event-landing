export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#060608',
          900: '#0C0C10',
          800: '#111117',
          700: '#18181F',
          600: '#22222C',
          500: '#2E2E3A',
          400: '#3E3E4E',
          300: '#7A7A8C',
          200: '#A8A8BA',
          100: '#D4D4E0',
        },
        accent: {
          DEFAULT: '#7F53E5',
          // Lightened brand tint — passes WCAG AA on ink backgrounds at small sizes
          light: '#B298EF',
          dim: 'rgba(127,83,229,0.18)',
          muted: 'rgba(127,83,229,0.45)',
          glow: 'rgba(127,83,229,0.08)',
        },
        gold: '#C9A96E',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        'radial-accent': 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(127,83,229,0.12) 0%, transparent 70%)',
        'gradient-ink': 'linear-gradient(180deg, rgba(6,6,8,0) 0%, #060608 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease forwards',
        'line-grow': 'lineGrow 1.4s ease forwards',
        'grid-scroll': 'gridScroll 20s linear infinite',
        'logo-pulse': 'logoPulse 3s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lineGrow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        gridScroll: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 64px' },
        },
        logoPulse: {
          '0%': { filter: 'drop-shadow(0 0 2px rgba(127,83,229,0.85))' },
          '100%': { filter: 'drop-shadow(0 0 10px rgba(127,83,229,0.95)) brightness(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
