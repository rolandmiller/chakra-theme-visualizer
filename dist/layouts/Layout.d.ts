import { BoxProps } from "@chakra-ui/react";
import * as React from "react";
export declare type LayoutProps = {
    sidebar?: React.ReactNode;
} & BoxProps;
export declare const Layout: React.FC<LayoutProps>;
