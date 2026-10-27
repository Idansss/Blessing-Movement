# Third-party notices

The adapted BlurText component in src/components/ui/BlurText.tsx uses React Bits by David Haz, revision e12c22192ac7b4b452c5e2feb9b586d74765d696.

Source: https://github.com/DavidHDev/react-bits/blob/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/ts-default/TextAnimations/BlurText/BlurText.tsx

Copyright (c) 2026 David Haz. Licensed under MIT + Commons Clause License Condition v1.0. The complete notice is retained in licenses/react-bits-LICENSE.md. This adaptation is used as part of the Blessings website. It is not offered as a standalone component product.

Adaptations: limited to a once-only word reveal; uses the existing Framer Motion dependency; adds reduced-motion behavior and a no-JavaScript visibility fallback. The rest of the page animation and interface components are authored for this project. FadeContent was evaluated but not integrated because its additional GSAP dependency was unnecessary for these effects.

The custom select uses @radix-ui/react-select 2.4.1 (MIT), with the dependency license retained in its installed package. Existing Lucide icons use the project's lucide-react dependency.
