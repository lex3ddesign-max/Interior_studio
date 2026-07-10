# AVENOR Interaction Polish Design

## Scope

Add the remaining high-touch interactions from the AVENOR brief: a desktop-only
custom cursor, restrained route transitions, and responsive safeguards. Do not
add new content, routes, or decorative effects.

## Custom cursor

The cursor uses one fixed-size compositor layer. Its inner surface scales from a
small architectural dot to a quiet circular label over case links, or a modest
accent over primary calls to action. Pointer tracking uses transforms only.
Native cursors remain active for coarse pointers, touch screens, smaller
viewports, and reduced-motion users.

## Page transitions

Eligible internal route clicks are covered by a dark graphite plane before
navigation. The new route is revealed immediately after the pathname changes.
Modified clicks, external links, downloads, same-page hashes, and new-tab links
retain browser-native behavior. Mobile and reduced-motion navigation is never
delayed.

## Motion character

Cursor state feedback stays below 220ms. Route cover/reveal uses strong ease-out
curves, no bounce, blur, rotation, or scale-from-zero. The overlay never changes
document flow and always has a timeout-safe reset path.

## Verification

Test interaction eligibility as pure functions. Browser-test cursor states,
normal navigation, modifier-safe behavior, back navigation, mobile menu, reduced
motion, console errors, and horizontal overflow.

