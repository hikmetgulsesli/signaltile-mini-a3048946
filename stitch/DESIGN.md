---
name: SignalTile Mini
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  unit-1: 0.25rem
  unit-2: 0.5rem
  unit-3: 0.75rem
  unit-4: 1rem
  unit-6: 1.5rem
  gutter: 1rem
  margin-mobile: 1rem
  margin-desktop: 2rem
---

## Brand & Style

The design system is engineered for high-performance operational environments where clarity and rapid information processing are paramount. The personality is **deterministic, reliable, and functional**, prioritizing utility over decorative flair. 

The aesthetic follows a **Modern Corporate/Utility** movement—blending the systematic rigor of developer tools with the refined legibility of a modern SaaS. It evokes a "dense but calm" emotional response by balancing high data density with a strictly organized visual hierarchy. The UI serves as a transparent window to system health, ensuring that critical status changes are immediately visible without overwhelming the user.

## Colors

This design system utilizes a sophisticated grayscale foundation to ensure that color is reserved strictly for functional signaling. 

- **Foundation:** A light mode theme using `slate-50` for primary backgrounds and `white` for interactive tiles creates a subtle layered effect.
- **Accents:** High-contrast semantic colors are used for status indicators. **Emerald-500** signifies stability, **Amber-500** indicates caution, and **Rose-500** demands immediate attention for system failures.
- **Typography:** Deep slate (`#0F172A`) provides maximum contrast for primary data, while muted slates are used for metadata and secondary labels to reduce visual noise in dense views.

## Typography

Typography is the primary tool for creating "calm density." We use **Geist** for its exceptional clarity and neutral, technical tone. For system values, timestamps, and IDs, **JetBrains Mono** is employed to provide a rhythmic, tabular layout that aids in vertical scanning of data points.

Scale is kept tight; we avoid oversized displays to maximize the information visible on a single screen. Tracking is slightly tightened on headings for a modern "tech" feel and loosened on mono labels for legibility at small sizes.

## Layout & Spacing

The design system employs a **Fixed-Fluid hybrid grid**. Dashboards use a flexible 12-column system, but individual tiles have rigid internal structures to maintain a consistent "instrument panel" feel.

- **The 4px Rule:** All spacing increments are multiples of 4px.
- **Density:** We utilize "Compact" spacing for data tables and tile internals (8px - 12px) and "Purposeful" spacing for container margins (24px - 32px) to prevent the UI from feeling cluttered.
- **Reflow:** On mobile devices, the 12-column grid collapses into a single-column vertical stack, with tiles maintaining a minimum height to preserve tap targets and readability.

## Elevation & Depth

To maintain a "clean and professional" look, this design system eschews heavy shadows in favor of **Tonal Layering and Low-Contrast Outlines**.

- **Level 0 (Background):** `slate-50` – The base canvas.
- **Level 1 (Tiles/Cards):** `white` surface with a 1px solid `slate-200` border. No shadow.
- **Level 2 (Interactive/Hover):** `white` surface with a 1px `slate-300` border and a very soft, 2% opacity neutral shadow to indicate lift.
- **Active State:** A 2px left-accent border using the primary or status color to indicate focus or selection.

## Shapes

The shape language is precise and geometric. A **Soft (0.25rem)** corner radius is applied to all primary UI elements, providing a modern touch while maintaining the structural integrity of a professional tool.

- **Status Badges:** Use a slightly higher radius (0.375rem) to distinguish them from structural tiles.
- **Inputs:** Maintain the standard 0.25rem radius for a crisp, technical appearance.
- **Selection Indicators:** Use sharp 0px vertical bars on the edges of active tiles for high-precision visual feedback.

## Components

### Status Tiles
The core unit of the system. Each tile must contain a label, a primary metric, and a status "signal." Signals are represented by a 12px circular indicator or a 2px top-border using the semantic color palette.

### Buttons
- **Primary:** Solid `slate-900` with white text. Minimalist and heavy.
- **Secondary:** White background with `slate-200` border.
- **Ghost:** No background, slate text. Used for secondary actions in dense lists.

### Status Badges
Small, pill-like containers with low-opacity backgrounds (10%) and full-opacity text of the same semantic color (e.g., Emerald-50 background with Emerald-600 text).

### Data Lists
Row-based layouts with subtle `1px` bottom borders. Use `JetBrains Mono` for all numerical data within lists to ensure decimal alignment.

### Input Fields
Strictly defined by a `1px` border in `slate-300`. On focus, the border shifts to `slate-900` with a `2px` soft outer glow. Labels are always positioned above the input using the `label-caps` typography style.

### Micro-Sparklines
Simplified, monochromatic trend lines embedded within tiles to provide context without visual noise. Use a stroke width of 1.5px.