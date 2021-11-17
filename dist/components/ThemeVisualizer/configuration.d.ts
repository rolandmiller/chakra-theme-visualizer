import * as React from "react";
import { ChakraTheme } from "@chakra-ui/react";
import { TokenGridProps } from "./TokenGrid";
export declare function createTokens(value: unknown, maxDepth?: number): [string, string][];
export declare type TokenListConfig = Pick<TokenGridProps, "tokenVisualizer" | "description" | "minColWidth"> & {
    TokenListComponent?: React.FC<TokenGridProps>;
};
/**
 * Add a visualization column to the TokenTable
 */
export declare const tokenListConfig: Partial<Record<keyof ChakraTheme, TokenListConfig>>;
export declare const createCustomTokensMap: Partial<Record<keyof ChakraTheme, (themeValue: any) => ReturnType<typeof createTokens>>>;
