## Hero Logo Enhancement Plan

Make the hero logo larger and add a professional background treatment behind it — without touching the navbar.

### Changes to `src/routes/index.tsx` (hero section only)

**1. Increase logo size**
- Current: `h-48 md:h-64 lg:h-80`
- New: `h-64 md:h-80 lg:h-[26rem]` (significantly bigger, especially on desktop)

**2. Add a professional background "halo" behind the logo**

A subtle, premium treatment — not a plain white box. Layered approach:

- **Outer soft glow**: a large blurred radial gradient using brand accent/amber tones (`bg-accent/30 blur-3xl`) sized larger than the logo, absolutely positioned behind it. Gives a warm spotlight feel against the dark hero.
- **Inner frame**: a circular/rounded container with a frosted glass effect:
  - `bg-white/10 backdrop-blur-md`
  - `ring-1 ring-white/20`
  - `rounded-full` (circular badge look) with generous padding
  - subtle `shadow-2xl`
- Logo sits centered inside, transparent PNG retained.

**3. Subtle decorative ring**
- Add a second outer ring (`ring-2 ring-accent/40`) with a small offset for an "emblem/badge" feel that matches the "Since 1939" heritage branding.

### Visual result

```text
   ┌─────────────────────┐        ╭───────────────╮
   │  Adam Nimco         │        │   ✨ glow ✨   │
   │  Fresh Snacks Daily │        │  ⊙  LOGO  ⊙   │
   │  [Order] [Call]     │        │   frosted     │
   └─────────────────────┘        ╰───────────────╯
        (text left)                  (logo right, bigger, with halo)
```

### What stays the same
- Navbar — untouched
- Hero text, buttons, layout grid (text left, logo right on desktop)
- All other sections

### Files
- `src/routes/index.tsx` — hero logo block only
