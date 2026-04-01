# Design System Specification: The Academic Legacy Framework

## 1. Overview & Creative North Star
**Creative North Star: "The Modern Archivist"**

This design system moves away from the sterile "SaaS-blue" template. Instead, it adopts a high-end editorial aesthetic that balances the gravity of a century-old institution with the fluidity of a modern digital experience. We treat the UI not as a collection of boxes, but as a series of curated layers.

To break the "template" look, we employ **Intentional Asymmetry**. Hero sections should feature overlapping elements—such as a `surface-container-lowest` card partially bleeding over a `primary-container` background—to create a sense of depth and architectural intent. The layout should breathe, using generous white space to signify prestige and "quiet luxury."

---

## 2. Colors: Tonal Depth & The "No-Line" Rule

The color palette is rooted in a deep, authoritative blue, balanced by a sophisticated scale of grays and scholarly accents.

*   **Primary (Deep Blue):** Use `primary` (#002045) for high-impact brand moments and `primary-container` (#1a365d) for foundational structural blocks.
*   **The "No-Line" Rule:** This is a core pillar. **Do not use 1px solid borders to section content.** Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the separation needed.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers. 
    *   **Level 0:** `surface` (#f7fafc) – The main canvas.
    *   **Level 1:** `surface-container-low` (#f1f4f6) – For large content areas.
    *   **Level 2:** `surface-container-lowest` (#ffffff) – Used for primary cards to create a "lifted" effect.
*   **The Glass & Gradient Rule:** For floating headers or navigation overlays, use a Glassmorphic approach: `background: rgba(255, 255, 255, 0.7)` with a `backdrop-filter: blur(12px)`. To add "soul" to CTAs, apply a subtle linear gradient from `primary` to `primary-container` at a 135-degree angle.

---

## 3. Typography: Editorial Authority

We use a dual-typeface system to bridge the gap between traditional prestige and modern readability.

*   **Display & Headlines (Manrope):** This geometric sans-serif provides a structured, architectural feel. Use `display-lg` (3.5rem) for hero statements to evoke the feeling of a masthead. Use tight letter-spacing (-0.02em) for headlines to maintain a bespoke, high-end look.
*   **Body & Labels (Inter):** Inter is the workhorse. It ensures maximum readability for long-form alumni news and directories. 
*   **Hierarchy as Identity:** Use `title-lg` (Inter, 1.375rem) in `primary` color for card titles to ensure they feel like headlines in a premium journal. Labels (`label-md`) should utilize the `secondary` (#5b5f61) tone to recede, allowing the content to lead.

---

## 4. Elevation & Depth: The Layering Principle

Traditional shadows and borders are often "cheap" shortcuts. This design system prioritizes **Tonal Layering**.

*   **Ambient Shadows:** If a card requires a "floating" state (e.g., a hovered alumni profile), use a highly diffused shadow: `box-shadow: 0 12px 40px rgba(0, 27, 60, 0.06)`. Note the tint—the shadow is a diluted version of our `on-primary-fixed` color, not neutral gray.
*   **The "Ghost Border" Fallback:** If accessibility requirements demand a stroke, use the `outline-variant` token at **15% opacity**. This creates a "suggestion" of a container without breaking the editorial flow.
*   **Roundedness Scale:**
    *   `md` (0.75rem / 12px): The standard for all cards and primary containers.
    *   `full`: Reserved strictly for status chips and pill-shaped action buttons.

---

## 5. Components

### Buttons & Interaction
*   **Primary Button:** Uses the `primary` to `primary-container` gradient. 12px (`md`) radius. Text is `on-primary` (White).
*   **Secondary Button:** A "Ghost" style. No background, no border. Use `primary` text with a subtle `surface-container-high` background only on hover.
*   **Tertiary Button:** Use `tertiary` (#002715) text for "Soft" actions like "Save for Later."

### Cards & Lists
*   **Alumni Cards:** Must use `surface-container-lowest` (#ffffff). **Forbid the use of divider lines.** Separate the header from the body using a `1.5rem` (`6` on the spacing scale) vertical gap.
*   **Profile Feeds:** Use background shifts. Every second item in a list can have a `surface-container-low` background to create a "Zebra" effect without harsh lines.

### Navigation & Wayfinding
*   **Chips:** Use `tertiary-fixed` (#9ff5c1) with `on-tertiary-fixed-variant` text for "Verified Alumni" or "Class of '98" badges. This forest green accent provides a scholarly, trusted feel.
*   **Input Fields:** Use `surface-container-highest` for the field background with a `0px` border. Transition to a `primary` "Ghost Border" (20% opacity) on focus.

---

## 6. Do's and Don'ts

### Do
*   **Do** use overlapping elements to create an editorial layout (e.g., an image overlapping a text container by `2rem`).
*   **Do** use `primary-fixed-dim` (#adc7f7) for subtle backgrounds behind dark text to create a "not-quite-white" premium feel.
*   **Do** prioritize vertical rhythm using the `8` (2rem) and `12` (3rem) spacing tokens between major sections.

### Don't
*   **Don't** use 100% black text. Always use `on-surface` (#181c1e) to maintain a soft, professional contrast.
*   **Don't** use standard "Drop Shadows." If it looks like a default shadow, it’s too heavy. It should feel like ambient light.
*   **Don't** use "Alert Red" for everything. Use the `muted orange` (#c05621) for warnings to keep the atmosphere warm and community-focused.