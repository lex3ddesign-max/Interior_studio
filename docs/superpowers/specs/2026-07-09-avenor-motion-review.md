# AVENOR Motion Review

| Before | After | Why |
| --- | --- | --- |
| Secondary desktop hero scenes depended on GSAP to become hidden | CSS exposes only the first scene by default; GSAP explicitly enables all scenes only in the animated desktop branch | Reduced motion and failed JavaScript now preserve the correct first-frame hierarchy |
| Reveal elements carried permanent `will-change` declarations | Permanent hints removed; GSAP manages active transforms | Avoids retaining unnecessary compositor layers after one-time reveals |
| Custom navigation hover styling was globally active | Hover styling is gated by `(hover: hover) and (pointer: fine)` | Touch input no longer inherits sticky hover feedback |
| Remote hero and case media could time out inside the Next image optimizer | Six source images are stored locally under `public/images/cases` | Removes network-dependent 500 responses during cinematic scene changes |

## Verdict

**Approve.** Motion is justified and cohesive, long durations are limited to
first-load and marketing imagery, scrubbed movement is linear, interactive
feedback is pointer-gated, and reduced motion removes Lenis, pinning, parallax,
and translated entrances.

