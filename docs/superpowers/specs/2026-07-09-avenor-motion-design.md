# AVENOR Cinematic Motion Design

## Intent

Add a restrained cinematic motion layer to the existing static site without
changing its content structure or editorial visual system. Motion should clarify
hierarchy, reveal imagery, and create a memorable first visit; it must not make
routine navigation feel slow.

## Motion architecture

- A root `MotionProvider` owns Lenis and synchronizes it with GSAP's ticker and
  ScrollTrigger.
- `Preloader` plays only once per browser tab, restores scrolling on every exit
  path, and dispatches a refresh event when layout is available.
- `HeroRevealSequence` owns the only long scroll timeline. Desktop pins below the
  sticky header and reveals three layered scenes with rectangular clip masks.
  Mobile uses normal document flow and short crossfade/reveal entrances.
- `ImageReveal` and `TextReveal` are small, reusable, once-only primitives.
- Case hover motion is pointer-gated and never runs on touch devices.

## Motion character

Use `power3.out`, `power4.out`, and linear scrubbed timelines. UI feedback remains
under 300ms; long durations are reserved for first-load, imagery, and scroll-bound
marketing motion. No bounce, overshoot, elastic easing, spinning, or large blur.

## Accessibility and resilience

`prefers-reduced-motion` disables Lenis, pinning, parallax, and translated text.
Content remains visible before JavaScript initializes. Every GSAP context,
ScrollTrigger, ticker callback, event listener, and Lenis instance is cleaned up.

## Verification

Test pure motion-mode selection and the three-scene data contract. Verify tests,
lint, production build, HTTP routes, console errors, overflow, mobile navigation,
reduced motion, and desktop pin behavior.

