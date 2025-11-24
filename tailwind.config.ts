import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			border: "hsl(var(--border))",
  			input: "hsl(var(--input))",
  			ring: "hsl(var(--ring))",
  			background: "hsl(var(--background))",
  			foreground: "hsl(var(--foreground))",
  			primary: {
  				DEFAULT: "hsl(var(--primary))",
  				foreground: "hsl(var(--primary-foreground))",
  			},
  			secondary: {
  				DEFAULT: "hsl(var(--secondary))",
  				foreground: "hsl(var(--secondary-foreground))",
  			},
  			destructive: {
  				DEFAULT: "hsl(var(--destructive))",
  				foreground: "hsl(var(--destructive-foreground))",
  			},
  			muted: {
  				DEFAULT: "hsl(var(--muted))",
  				foreground: "hsl(var(--muted-foreground))",
  			},
  			accent: {
  				DEFAULT: "hsl(var(--accent))",
  				foreground: "hsl(var(--accent-foreground))",
  			},
  			popover: {
  				DEFAULT: "hsl(var(--popover))",
  				foreground: "hsl(var(--popover-foreground))",
  			},
  			card: {
  				DEFAULT: "hsl(var(--card))",
  				foreground: "hsl(var(--card-foreground))",
  			},
  			surface: {
  				DEFAULT: "hsl(var(--surface))",
  				secondary: "hsl(var(--surface-secondary))",
  			},
  			text: {
  				primary: "hsl(var(--text-primary))",
  				secondary: "hsl(var(--text-secondary))",
  				tertiary: "hsl(var(--text-tertiary))",
  			},
  			sidebar: {
  				DEFAULT: "hsl(var(--sidebar-background))",
  				foreground: "hsl(var(--sidebar-foreground))",
  				primary: "hsl(var(--sidebar-primary))",
  				"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
  				accent: "hsl(var(--sidebar-accent))",
  				"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
  				border: "hsl(var(--sidebar-border))",
  				ring: "hsl(var(--sidebar-ring))",
  			}
  		},
  		borderRadius: {
  			lg: "var(--radius)",
  			md: "calc(var(--radius) - 2px)",
  			sm: "calc(var(--radius) - 4px)"
  		},
  		fontFamily: {
  			sans: [
  				"Inter",
  				"-apple-system",
  				"BlinkMacSystemFont",
  				"Segoe UI",
  				"Roboto",
  				"sans-serif",
  			],
  		},
  		spacing: {
  			18: "4.5rem",
  			88: "22rem",
  			128: "32rem",
  		},
  		animation: {
  			"fade-in": "fadeIn 0.5s ease-in-out",
  			"slide-in": "slideIn 0.5s ease-out",
  			"scale-in": "scaleIn 0.3s ease-out",
  		},
  				fontSize: {
			'h1': 'var(--text-h1)',
			'h2': 'var(--text-h2)',
			'h3': 'var(--text-h3)',
			'h4': 'var(--text-h4)',
			'h5': 'var(--text-h5)',
			'h6': 'var(--text-h6)',
		},
		keyframes: {
			fadeIn: {
				"0%": { opacity: "0" },
				"100%": { opacity: "1" },
			},
			slideIn: {
				"0%": { transform: "translateY(20px)", opacity: "0" },
				"100%": { transform: "translateY(0)", opacity: "1" },
			},
			scaleIn: {
				"0%": { transform: "scale(0.95)", opacity: "0" },
				"100%": { transform: "scale(1)", opacity: "1" },
			},
		},
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
