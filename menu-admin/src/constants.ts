/**
 * Runtime themes consumed through CSS variables, for example:
 *
 *   "--theme-primary": theme.primary
 *
 * Keep these values as complete hex colors so they can be used by Tailwind
 * with `bg-[var(--theme-primary)]`, `text-[var(--theme-text)]`, and similar
 * arbitrary-value utilities.
 */
export const STYLES = {
  default: {
    primary: "#2563EB",
    primaryHover: "#1D4ED8",
    primaryForeground: "#FFFFFF",
    secondary: "#E0E7FF",
    secondaryHover: "#C7D2FE",
    secondaryForeground: "#1E3A8A",
    background: "#F8FAFC",
    surface: "#FFFFFF",
    text: "#0F172A",
    mutedText: "#64748B",
    border: "#CBD5E1",
    danger: "#DC2626",
    dangerHover: "#B91C1C",
    dangerForeground: "#FFFFFF",
    focusRing: "#93C5FD",
  },
  red: {
    primary: "#DC2626",
    primaryHover: "#B91C1C",
    primaryForeground: "#FFFFFF",
    secondary: "#FEE2E2",
    secondaryHover: "#FECACA",
    secondaryForeground: "#991B1B",
    background: "#FFF7F7",
    surface: "#FFFFFF",
    text: "#1F1010",
    mutedText: "#786060",
    border: "#F1C4C4",
    danger: "#991B1B",
    dangerHover: "#7F1D1D",
    dangerForeground: "#FFFFFF",
    focusRing: "#FCA5A5",
  },
  green: {
    primary: "#16A34A",
    primaryHover: "#15803D",
    primaryForeground: "#FFFFFF",
    secondary: "#DCFCE7",
    secondaryHover: "#BBF7D0",
    secondaryForeground: "#166534",
    background: "#F7FCF8",
    surface: "#FFFFFF",
    text: "#102017",
    mutedText: "#5F7467",
    border: "#C3DDCB",
    danger: "#DC2626",
    dangerHover: "#B91C1C",
    dangerForeground: "#FFFFFF",
    focusRing: "#86EFAC",
  },
  purple: {
    primary: "#9333EA",
    primaryHover: "#7E22CE",
    primaryForeground: "#FFFFFF",
    secondary: "#F3E8FF",
    secondaryHover: "#E9D5FF",
    secondaryForeground: "#6B21A8",
    background: "#FCF9FF",
    surface: "#FFFFFF",
    text: "#1E1425",
    mutedText: "#706278",
    border: "#DDCBE8",
    danger: "#DC2626",
    dangerHover: "#B91C1C",
    dangerForeground: "#FFFFFF",
    focusRing: "#D8B4FE",
  },
} as const;

export type ThemeName = keyof typeof STYLES;
export type Theme = (typeof STYLES)[ThemeName];
