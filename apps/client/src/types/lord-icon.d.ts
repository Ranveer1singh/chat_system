// src/lord-icon.d.ts

// declare module '@lordicon/element' {
//     export function defineElement(loader: any): void;
// }

// declare global {
//     namespace JSX {
//         interface IntrinsicElements {
//             'lord-icon': {
//                 src?: string;
//                 trigger?: 'hover' | 'click' | 'loop' | 'loop-on-hover' | 'morph' | 'morph-two-way';
//                 delay?: string | number;
//                 colors?: string; // Format: "primary:#2D6936,secondary:#E8F0E8"
//                 style?: React.CSSProperties;
//                 target?: string;
//             };
//         }
//     }
// }

// export { };

// <reference types="vite/client" />
import React from "react";

declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            "lord-icon": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            > & {
                src?: string;
                trigger?: string;
                colors?: string;
                delay?: string;
                stroke?: string;
            };
        }
    }
}

export { };

