import * as React from "react";
import { NavLinkProps as ReactRouterLinkProps } from "react-router-dom";
import { LinkProps as ChakraLinkProps } from "@chakra-ui/react";
export declare type LinkProps = ReactRouterLinkProps & ChakraLinkProps;
export declare const Link: React.FC<LinkProps>;
