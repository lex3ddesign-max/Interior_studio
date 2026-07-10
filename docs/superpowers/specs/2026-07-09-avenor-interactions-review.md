# AVENOR Interaction Motion Review

| Before | After | Why |
| --- | --- | --- |
| Page-link interception used the normal bubbling phase | Internal-link interception runs in capture phase | Next Link sees `defaultPrevented` before starting navigation, so the cover transition reliably plays first |
| Route cover/reveal used 320ms and 420ms phases | Cover/reveal uses 280ms and 300ms phases | Keeps navigation responsive while retaining the architectural plane effect |
| Case cards displayed both their static “View case” badge and the custom cursor label on desktop | Static badge is hidden only for desktop fine pointers | Removes duplicated feedback while preserving a visible affordance on touch devices |
| Cursor eligibility was inferred only from viewport width | Eligibility requires desktop width, hover capability, a fine pointer, and no reduced-motion preference | Prevents custom cursor behavior on touch, hybrid, and accessibility contexts |

## Verdict

**Approve.** Cursor motion is transform-only and interruptible, state feedback is
under 220ms, route transitions use strong ease-out curves, native navigation
semantics are preserved, and mobile/reduced-motion fallbacks avoid delayed
navigation.

