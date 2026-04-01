# Design System Documentation: The Sovereign Archive

## 1. Overview & Creative North Star
**Creative North Star: "The Curated Legacy"**

This design system is not a mere collection of components; it is a digital manifestation of prestige, academic excellence, and the enduring bond of a Nigerian heritage. To move beyond the "template" look common in alumni portals, we adopt a **High-End Editorial** approach. 

The layout must feel like a premium coffee-table book or a curated museum gallery. We break the rigid, boxy grid by employing **intentional asymmetry**, where typography breathes and imagery overlaps across tonal layers. This system rejects the "flat" web in favor of a layered, physical experience that honors the past while looking toward a sophisticated future.

---

## 2. Colors & Surface Philosophy
The palette is rooted in authority and tradition, using Deep Royal Blue to anchor the experience and Rich Gold to illuminate key interactions.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be established through background color shifts or tonal transitions. For example, a `surface-container-low` section should sit directly against a `surface` background to define its start and end. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of handmade paper. 
*   **Base:** Use `surface` (#fafaf5) for the primary canvas.
*   **Nesting:** Place `surface-container-lowest` cards on top of `surface-container-low` sections to create a soft, natural lift.
*   **The Glass & Gradient Rule:** For floating elements (navigation bars or modals), use Glassmorphism. Apply `surface-variant` with a 70% opacity and a `20px` backdrop-blur. 
*   **Signature Textures:** Use a subtle linear gradient (from `primary` to `primary-container`) for Hero backgrounds to add "soul" and depth that static hex codes cannot provide.

---

## 3. Typography
Our typography pairing balances the "Academic" with the "Modern Professional."

| Level | Token | Font Family | Role |
| :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Noto Serif | Editorial statements, legacy headlines. |
| **Headline** | `headline-md` | Noto Serif | Section headers, storytelling titles. |
| **Title** | `title-lg` | Manrope | Navigation, card titles, sub-headers. |
| **Body** | `body-lg` | Manrope | Narrative text, high readability articles. |
| **Label** | `label-md` | Inter | Utility text, timestamps, micro-copy. |

**Editorial Contrast:** Always pair a large `display-lg` headline with a wide margin and a significantly smaller `body-md` description. The high-contrast scale creates a sense of luxury and intentionality.

---

## 4. Elevation & Depth
In this system, depth is a matter of light and shadow, not lines and boxes.

*   **Tonal Layering:** Avoid shadows for static cards. Instead, use the shift from `surface-container-low` to `surface-container-highest` to indicate hierarchy.
*   **Ambient Shadows:** For interactive floating elements, use "Ambient Shadows." These must be extra-diffused: `0px 20px 40px` with a 6% opacity using a tinted version of `on-surface`. Never use pure black shadows.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. It should be felt, not seen.
*   **Asymmetric Overlap:** Break the container edges. Allow high-quality imagery of Nigerian architecture or professional portraits to overlap two different surface containers (e.g., an image sitting half-in `surface` and half-in `primary-container`).

---

## 5. Component Logic

### Buttons
*   **Primary:** `primary` background with `on-primary` text. Use `md` (0.375rem) roundedness. Apply a subtle Gold (`secondary`) bottom-glow on hover.
*   **Secondary:** `surface-container-highest` background. No border.
*   **Tertiary:** Text-only in `primary` with an `outline-variant` ghost underline (20% opacity) that becomes 100% on hover.

### Cards & Lists
*   **Constraint:** Forbid the use of divider lines. 
*   **Separation:** Use the Spacing Scale `8` (2.75rem) or `10` (3.5rem) to separate list items. 
*   **Visual Interest:** In member directories, use a `surface-container-low` card that expands into a `surface-container-highest` state on hover, creating a tactile "lift."

### Input Fields
*   **Form Factor:** Use "Minimalist Underline" or "Tonal Fill" styles. 
*   **State:** When focused, the label should shift to `primary` and the "Ghost Border" should transition to a `secondary` (Gold) tint.

### Exclusive Component: "The Legacy Timeline"
A vertical or horizontal track using `outline-variant` (20% opacity) with `secondary_fixed` (Gold) nodes to represent the association’s historical milestones.

---

## 6. Do's and Don'ts

### Do
*   **Do** use generous white space (Spacing Scale `12` and above) to let the serif typography feel "expensive."
*   **Do** use "Editorial imagery": High-contrast, warm-toned photography of Nigerian professionals and modern Lagos/Abuja architecture.
*   **Do** apply `surface-tint` sparingly to give neutral backgrounds a slight "Royal Blue" warmth.

### Don't
*   **Don't** use 100% opaque borders or harsh 1px dividers.
*   **Don't** use generic stock photography. Ensure imagery feels local, authentic, and prestigious.
*   **Don't** crowd the layout. If a section feels "busy," increase the spacing token by two levels.
*   **Don't** use standard "Material" blue. Only use the defined `primary` (#00113a) to maintain the association’s specific heritage.

---

## 7. Spacing & Rhythm
Rhythm is achieved through a strict adherence to the Spacing Scale.
*   **Hero Sections:** Use `20` (7rem) for top/bottom padding.
*   **Content Blocks:** Use `10` (3.5rem) for vertical separation.
*   **Component Internals:** Use `3` (1rem) or `4` (1.4rem) for padding within cards.

This rigorous spacing ensures that even complex data feels organized, trustworthy, and calm.