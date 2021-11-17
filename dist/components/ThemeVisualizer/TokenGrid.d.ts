import * as React from "react";
import { ChakraTheme } from "@chakra-ui/react";
import { TokenItemProps } from "./TokenItem";
export declare type TokenGridProps = {
    minColWidth?: string;
    tokenVisualizer?: TokenItemProps["tokenVisualizer"];
    tokens: [string, string][];
    theme: ChakraTheme;
    description?: React.ReactNode;
};
export declare const TokenGrid: React.FC<TokenGridProps>;
