/// <reference types="react" />
import { GridProps } from "@chakra-ui/react";
export declare type AutoGridProps = GridProps & {
    minColWidth?: string;
};
export declare const AutoGrid: ({ minColWidth, ...gridProps }: AutoGridProps) => JSX.Element;
