import * as React from "react";
import { ChakraTheme } from "@chakra-ui/react";
export declare type ExplorerThemeProviderProps = {
    theme: ChakraTheme;
};
export declare const ThemeToExploreProvider: React.FC<ExplorerThemeProviderProps>;
export declare function useThemeToExplore(): ChakraTheme;
