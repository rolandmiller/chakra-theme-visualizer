import { ChakraTheme } from "@chakra-ui/react";
import * as React from "react";
export declare type TokenItemProps = {
    token: string;
    value: string;
    theme: ChakraTheme;
    tokenVisualizer?: (row: Pick<TokenItemProps, "token" | "value" | "theme">) => React.ReactNode;
};
export declare const TokenItem: ({ token, value, theme, tokenVisualizer, }: TokenItemProps) => JSX.Element;
