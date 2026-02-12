export const COLORS = {
  dark: {
    background: "#363130",
    primary: "#F4B5A4",
    white: "#FFFFFF",
    "primary-foreground": "#CC7861",
    secondary: "#4B4544",
    "secondary-foreground": "#FAF0E6",
    foreground: "#DCBEB6",
    error: "#FF6B6B",
    deepGray: "#b8b8b8",
    lightGray: "#bfbfbf",
    gray: "#E6E6E6",
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
} as const;
export const FONT_WEIGHTS = {
  regular: "normal",
  medium: 500,
  bold: "bold",
} as const;
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  "2xl": 32,
  round: 9999,
} as const;
