// src/custom-elements.d.ts
import type { CustomElements } from "../node_modules/@uswds/elements/dist/types/custom-element-solidjs";

declare module "solid-js" {
    namespace JSX {
        interface IntrinsicElements extends CustomElements {}
    }
}
