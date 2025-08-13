# Phase 5 Refinement

- The nav bar in [navigation.tsx](../../src/components/layout/navigation.tsx)
  - the navbar does not have its content horizontally centerd. Let's make sure that its content are horizontally centered.
- The footer in [main-layout.tsx](../../src/components/layout/main-layout.tsx)
  - let's factor it out into a Footer component, much like what we have for the navbar
  - the content is also not centered horizontally. Ensure that the content are centered horizontally
- The theme toggle [theme-toggle.tsx](../../src/components/ui/theme-toggle.tsx)
  - 
- The 5-click easter egg
  - the profile image should also be animated for the click much like a button being pushed in and bounce backl upw
  - instead of requiring 5 clicks for each easter egg message, require 5 clicks to enable the easter egg. Then, at every click, display a different message
  - the message bubble should have appropriate size based on its content.
  - add animation: the message bubble should pop up with one (or a composition of) animation that gives the following effect: the bubble pops up at the top right corner of the profile image like a spring.
  - font family: use an appropriate font family base on the overall theme of the content of the easter egg messages. (e.g find a font that suites the theme of game unit quotes)
  - disappear: the bubble should animate to disappear (i.e. pop off like a spring) after a fixed time when the user's pointer is not hovering over the bubble or the profile image. Use a constant variable to define this time-out. Set it to 3 seconds for now.
- Let's create a custom 404 page using what UI components we have. Ensure that it is also compatible with the theming & layout.
