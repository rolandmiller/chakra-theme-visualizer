import * as React from "react";
import { ButtonProps, ChakraTheme } from "@chakra-ui/react";
export interface ThemeExplorerProps {
    theme: ChakraTheme;
    buttonProps?: ButtonProps;
}
export declare const ThemeExplorer: React.FC<ThemeExplorerProps>;
interface NestedProps {
    theme: ChakraTheme;
    windowRef: any;
}
export declare const Nested: ({ theme, windowRef }: NestedProps) => JSX.Element;
export interface StandaloneThemeExplorerProps {
    theme: ChakraTheme;
    router?: "memory" | "hash";
}
export declare const StandaloneThemeExplorer: ({ theme, router, }: StandaloneThemeExplorerProps) => JSX.Element;
export {};
