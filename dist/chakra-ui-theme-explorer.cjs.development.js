'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var reactRouterDom = require('react-router-dom');
var react = require('@chakra-ui/react');
var pick = _interopDefault(require('lodash/pick'));
var startCase = _interopDefault(require('lodash/startCase'));
var fa = require('react-icons/fa');
var utils = require('@chakra-ui/utils');
var NewWindow = _interopDefault(require('react-new-window'));
var react$1 = require('@emotion/react');
var createCache = _interopDefault(require('@emotion/cache'));
var reactRouter = require('react-router');

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var Layout = function Layout(_ref) {
  var sidebar = _ref.sidebar,
      children = _ref.children,
      boxProps = _objectWithoutPropertiesLoose(_ref, ["sidebar", "children"]);

  return React.createElement(react.Flex, Object.assign({
    pos: "relative",
    align: "stretch",
    minH: "100vh",
    flex: "1 0 auto"
  }, boxProps), sidebar, React.createElement(react.Flex, {
    flex: "1",
    w: "auto",
    overflow: "hidden"
  }, children));
};

var Link = function Link(props) {
  return React.createElement(react.Link, Object.assign({
    as: reactRouterDom.NavLink
  }, props));
};

var themeToExploreContext = /*#__PURE__*/React.createContext(react.theme);
var ThemeToExploreProvider = function ThemeToExploreProvider(_ref) {
  var theme = _ref.theme,
      children = _ref.children;
  return React.createElement(themeToExploreContext.Provider, {
    value: theme
  }, children);
};
function useThemeToExplore() {
  return React.useContext(themeToExploreContext);
}

var ColorModeSwitcher = function ColorModeSwitcher(props) {
  var _useColorMode = react.useColorMode(),
      toggleColorMode = _useColorMode.toggleColorMode;

  var text = react.useColorModeValue("dark", "light");
  var SwitchIcon = react.useColorModeValue(fa.FaMoon, fa.FaSun);
  return React.createElement(react.IconButton, Object.assign({
    size: "md",
    fontSize: "lg",
    variant: "ghost",
    color: "current",
    marginLeft: "2",
    onClick: toggleColorMode,
    icon: React.createElement(SwitchIcon, null),
    "aria-label": "Switch to " + text + " mode"
  }, props));
};

var Logo = function Logo(props) {
  return React.createElement(react.chakra.svg, Object.assign({
    viewBox: "0 0 257 257",
    xmlns: "http://www.w3.org/2000/svg",
    className: "css-2dk2qc",
    boxSize: "2.5rem"
  }, props), React.createElement("rect", {
    width: "257",
    height: "257",
    rx: "128.5",
    fill: "url(#logo)"
  }), React.createElement("path", {
    d: "M69.558 133.985l87.592-86.9891c1.636-1.6251 4.27.3525 3.165 2.377l-32.601 59.7521c-.728 1.332.237 2.958 1.755 2.958h56.34c1.815 0 2.691 2.223 1.364 3.462l-98.7278 92.142c-1.7702 1.652-4.4051-.676-2.9839-2.636l46.7357-64.473c.958-1.322.014-3.174-1.619-3.174H70.9673c-1.7851 0-2.6759-2.161-1.4093-3.419z",
    fill: "#fff"
  }), React.createElement("defs", null, React.createElement("linearGradient", {
    id: "logo",
    x1: "128.5",
    x2: "128.5",
    y2: "257",
    gradientUnits: "userSpaceOnUse"
  }, React.createElement("stop", {
    stopColor: "#7BCBD4"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: "#29C6B7"
  }))));
};

var ThemeSidebar = function ThemeSidebar(props) {
  var theme = useThemeToExplore();
  var bg = react.useColorModeValue("gray.50", "gray.700");
  var headingColor = react.useColorModeValue("gray.600", "gray.400");
  var linkColor = react.useColorModeValue("gray.600", "gray.200");
  var linkHoverBg = react.useColorModeValue("gray.50", "gray.700");
  var linkCurrentBg = react.useColorModeValue("gray.200", "gray.600");
  var sections = {
    Typography: pick(theme, ["fonts", "fontSizes", "fontWeights", "letterSpacings", "lineHeights"]),
    Foundations: pick(theme, ["borders", "breakpoints", "colors", "radii", "shadows", "sizes", "space", "transition", "zIndices"]),
    Shared: pick(theme, ["layerStyles", "textStyles"]),
    Other: pick(theme, ["config", "direction"])
  };
  var content = Object.entries(sections).map(function (_ref) {
    var sectionName = _ref[0],
        themePartial = _ref[1];
    var items = Object.entries(themePartial).map(function (_ref2) {
      var key = _ref2[0],
          value = _ref2[1];

      if (utils.isObject(value) && !Object.keys(value).length) {
        return null;
      }

      return React.createElement(react.ListItem, {
        key: key
      }, React.createElement(Link, {
        d: "block",
        textStyle: "sidebar-link",
        py: "1",
        px: "2",
        borderRadius: "md",
        color: linkColor,
        _hover: {
          bg: linkHoverBg
        },
        sx: {
          "&.active": {
            bg: linkCurrentBg,
            fontWeight: "bold"
          }
        },
        to: "/theme/" + key
      }, startCase(key)));
    }).filter(Boolean);

    if (!items.length) {
      return null;
    }

    return React.createElement(React.Fragment, {
      key: sectionName
    }, React.createElement(react.chakra.h4, {
      textStyle: "sidebar-title",
      color: headingColor
    }, sectionName), React.createElement(react.VStack, {
      as: react.List,
      align: "stretch",
      spacing: "1"
    }, items));
  });
  return React.createElement(react.Box, Object.assign({
    align: "flex-start",
    flex: "0 0 auto",
    maxH: "100vh",
    pos: "sticky",
    top: "0",
    overflowY: "auto",
    as: "nav",
    minW: "60",
    alignSelf: "stretch",
    bg: bg
  }, props), React.createElement(react.HStack, {
    justify: "flex-start",
    px: "2",
    py: "4"
  }, React.createElement(Logo, {
    boxSize: "8"
  }), React.createElement(react.Text, {
    fontWeight: "bold",
    mr: "auto"
  }, "Theme Explorer"), React.createElement(ColorModeSwitcher, {
    size: "sm",
    fontSize: "sm"
  })), React.createElement(react.Box, {
    p: "4",
    pt: "2"
  }, content));
};

var AutoGrid = function AutoGrid(_ref) {
  var _ref$minColWidth = _ref.minColWidth,
      minColWidth = _ref$minColWidth === void 0 ? "xs" : _ref$minColWidth,
      gridProps = _objectWithoutPropertiesLoose(_ref, ["minColWidth"]);

  var _useToken = react.useToken("sizes", [minColWidth]),
      width = _useToken[0];

  return React.createElement(react.Grid, Object.assign({
    gap: "8",
    gridTemplateColumns: "repeat(auto-fill, minmax(" + width + ", 1fr))"
  }, gridProps));
};

var TokenItem = function TokenItem(_ref) {
  var token = _ref.token,
      value = _ref.value,
      theme = _ref.theme,
      tokenVisualizer = _ref.tokenVisualizer;
  var bg = react.useColorModeValue("gray.200", "gray.700");
  var visualizerBg = react.useColorModeValue("white", "gray.800");

  var _useClipboard = react.useClipboard(token),
      hasCopied = _useClipboard.hasCopied,
      onCopy = _useClipboard.onCopy,
      copiedValue = _useClipboard.value;

  var copiedLabel = "Copied \"" + copiedValue + "\"";

  var handleKeyDown = function handleKeyDown(e) {
    if (e.key === "Enter") {
      onCopy();
    }
  };

  var tokenVisualization = tokenVisualizer == null ? void 0 : tokenVisualizer({
    token: token,
    value: value,
    theme: theme
  });
  var visualization = tokenVisualization ? React.createElement(react.Box, {
    bg: visualizerBg,
    px: "6",
    py: "6",
    flex: "1"
  }, tokenVisualization) : null;
  return React.createElement(react.ListItem, {
    bg: bg,
    transition: "box-shadow 250ms ease-out",
    _hover: {
      shadow: "lg"
    },
    borderRadius: "md",
    shadow: "md",
    overflow: "hidden",
    d: "flex",
    flexDir: "column",
    role: "button",
    onKeyDown: handleKeyDown,
    onClick: onCopy,
    tabIndex: 0,
    _focus: {
      outline: 0,
      shadow: "outline"
    }
  }, visualization, React.createElement(react.HStack, {
    spacing: "2",
    p: "6",
    py: "4",
    overflowX: "auto",
    align: "baseline",
    flex: "0 0 auto"
  }, React.createElement(react.Tooltip, {
    label: copiedLabel,
    isOpen: hasCopied,
    placement: "bottom-start"
  }, React.createElement(react.Heading, {
    size: "md",
    flexBasis: "8ch"
  }, token)), React.createElement(react.Code, {
    as: "pre",
    whiteSpace: "pre-wrap"
  }, value)));
};

var TokenGrid = function TokenGrid(_ref) {
  var tokens = _ref.tokens,
      theme = _ref.theme,
      tokenVisualizer = _ref.tokenVisualizer,
      _ref$minColWidth = _ref.minColWidth,
      minColWidth = _ref$minColWidth === void 0 ? "md" : _ref$minColWidth,
      description = _ref.description;

  if (!tokens.length) {
    return null;
  }

  return React.createElement(React.Fragment, null, description ? React.createElement(react.Box, {
    as: "aside",
    p: "8",
    pb: "2"
  }, description) : null, React.createElement(AutoGrid, {
    as: react.List,
    px: "2",
    pb: "2",
    gap: ["2", "8", "10"],
    minColWidth: minColWidth,
    mt: ["4", "8"]
  }, tokens.map(function (_ref2) {
    var token = _ref2[0],
        value = _ref2[1];
    return React.createElement(TokenItem, {
      key: token,
      token: token,
      value: value,
      theme: theme,
      tokenVisualizer: tokenVisualizer
    });
  })));
};

var ColorGrid = function ColorGrid(_ref) {
  var tokens = _ref.tokens,
      theme = _ref.theme,
      tokenVisualizer = _ref.tokenVisualizer,
      _ref$minColWidth = _ref.minColWidth,
      minColWidth = _ref$minColWidth === void 0 ? "md" : _ref$minColWidth,
      description = _ref.description;

  if (!tokens.length) {
    return null;
  }

  var colorSchemes = tokens.reduce(function (allColorSchemes, _ref2, index, all) {
    var token = _ref2[0],
        value = _ref2[1];
    var prev = all[index - 1];

    var _token$split = token.split("."),
        firstTokenPart = _token$split[0];

    if (prev != null && prev[0].startsWith(firstTokenPart)) {
      allColorSchemes[allColorSchemes.length - 1].push([token, value]);
    } else {
      allColorSchemes.push([[token, value]]);
    }

    return allColorSchemes;
  }, []);
  return React.createElement(React.Fragment, null, description ? React.createElement(react.Box, {
    as: "aside",
    p: "8"
  }, description) : null, React.createElement(react.VStack, {
    align: "stretch",
    spacing: ["8", "16"],
    mt: ["4", "8"]
  }, colorSchemes.map(function (colorScheme, index) {
    return React.createElement(AutoGrid, {
      as: react.List,
      key: index,
      px: "2",
      pb: ["2", "4"],
      gap: ["4", "8"],
      minColWidth: minColWidth
    }, colorScheme.map(function (_ref3) {
      var token = _ref3[0],
          value = _ref3[1];
      return React.createElement(TokenItem, {
        key: token,
        token: token,
        value: value,
        theme: theme,
        tokenVisualizer: tokenVisualizer
      });
    }));
  })));
};

function createTokens(value, maxDepth) {
  if (maxDepth === void 0) {
    maxDepth = 4;
  }

  if (!utils.isObject(value) && !Array.isArray(value)) {
    return [["—", String(value)]];
  }

  var propertyPaths = extractPropertyPaths(value, maxDepth);
  return propertyPaths.map(function (path) {
    return [path, String(utils.get(value, path))];
  });
}

function extractPropertyPaths(target, maxDepth) {
  if (maxDepth === void 0) {
    maxDepth = 1;
  }

  if (!utils.isObject(target) && !Array.isArray(target) || !maxDepth) {
    return [];
  }

  return Object.entries(target).reduce(function (allPropertyPaths, _ref) {
    var key = _ref[0],
        value = _ref[1];

    if (utils.isObject(value)) {
      extractPropertyPaths(value, maxDepth - 1).forEach(function (childKey) {
        return (// e.g. gray.500
          allPropertyPaths.push(key + "." + childKey)
        );
      });
    } else {
      // e.g. transparent
      allPropertyPaths.push(key);
    }

    return allPropertyPaths;
  }, []);
}
/**
 * Add a visualization column to the TokenTable
 */


var tokenListConfig = {
  fonts: {
    tokenVisualizer: function tokenVisualizer(row) {
      return React.createElement(react.Box, {
        fontFamily: row.value
      }, "Almost before we knew it, we had left the ground.");
    },
    description: /*#__PURE__*/React.createElement(React.Fragment, null, "Fonts can be applied with the prop ", /*#__PURE__*/React.createElement(react.Code, null, "fontFamily"), " to every chakra component. E.g. ", /*#__PURE__*/React.createElement(react.Code, null, "<Text fontFamily=\"heading\" />"))
  },
  fontSizes: {
    minColWidth: "full",
    tokenVisualizer: function tokenVisualizer(row) {
      return React.createElement(react.Box, {
        overflow: "hidden",
        maxW: "calc(100vw - 30rem)"
      }, React.createElement(react.Text, {
        fontSize: row.value,
        lineHeight: row.value,
        isTruncated: true
      }, "Almost before we knew it, we had left the ground."));
    },
    description: /*#__PURE__*/React.createElement(React.Fragment, null, "Font Sizes can be applied with the prop ", /*#__PURE__*/React.createElement(react.Code, null, "fontSize"), " to every chakra component. E.g. ", /*#__PURE__*/React.createElement(react.Code, null, "<Text fontSize=\"lg\" />"))
  },
  fontWeights: {
    tokenVisualizer: function tokenVisualizer(row) {
      return React.createElement(react.Box, {
        overflow: "hidden",
        maxW: "calc(100vw - 30rem)"
      }, React.createElement(react.Text, {
        fontWeight: row.value,
        isTruncated: true
      }, "Almost before we knew it, we had left the ground."));
    },
    description: /*#__PURE__*/React.createElement(React.Fragment, null, "Font Weights can be applied with the prop ", /*#__PURE__*/React.createElement(react.Code, null, "fontWeight"), " to every chakra component. E.g. ", /*#__PURE__*/React.createElement(react.Code, null, "<Text fontWeight=\"bold\" />"))
  },
  letterSpacings: {
    tokenVisualizer: function tokenVisualizer(row) {
      return React.createElement(react.Box, {
        overflow: "hidden",
        maxW: "calc(100vw - 30rem)"
      }, React.createElement(react.Text, {
        letterSpacing: row.value,
        isTruncated: true
      }, "Almost before we knew it, we had left the ground."));
    },
    description: /*#__PURE__*/React.createElement(React.Fragment, null, "Letter Spacings can be applied with the prop ", /*#__PURE__*/React.createElement(react.Code, null, "letterSpacing"), " ", "to every chakra component. E.g.", " ", /*#__PURE__*/React.createElement(react.Code, null, "<Text letterSpacing=\"wider\" />"))
  },
  lineHeights: {
    tokenVisualizer: function tokenVisualizer(row) {
      return React.createElement(react.Box, {
        overflow: "hidden"
      }, React.createElement(react.Text, {
        lineHeight: row.value,
        maxW: "sm"
      }, "Almost before we knew it, we had left the ground. Almost before we knew it, we had left the ground. Almost before we knew it, we had left the ground. Almost before we knew it, we had left the ground."));
    },
    description: /*#__PURE__*/React.createElement(React.Fragment, null, "Line Heights can be applied with the prop ", /*#__PURE__*/React.createElement(react.Code, null, "lineHeight"), " to every chakra component. E.g.", " ", /*#__PURE__*/React.createElement(react.Code, null, "<Text lineHeight=\"short\" />"))
  },
  borders: {
    tokenVisualizer: function tokenVisualizer(row) {
      return React.createElement(react.Box, {
        h: "16",
        w: "full",
        border: row.value
      });
    }
  },
  breakpoints: {
    minColWidth: "full",
    tokenVisualizer: function tokenVisualizer(row) {
      return React.createElement(react.Box, {
        fontSize: "1rem",
        width: row.value,
        h: "3",
        background: "blue.200"
      });
    }
  },
  colors: {
    TokenListComponent: ColorGrid,
    minColWidth: "2xs",
    tokenVisualizer: function tokenVisualizer(row) {
      return React.createElement(react.Box, {
        background: row.value,
        h: "8",
        w: "full",
        borderRadius: "md",
        boxShadow: "sm"
      });
    }
  },
  radii: {
    tokenVisualizer: function tokenVisualizer(row) {
      return React.createElement(react.Box, {
        border: "2px",
        borderRadius: row.value,
        h: "16",
        w: "full"
      });
    }
  },
  sizes: {
    minColWidth: "lg",
    tokenVisualizer: function tokenVisualizer(row) {
      return React.createElement(react.Box, {
        width: row.value,
        h: "3",
        background: "blue.200"
      });
    }
  },
  space: {
    minColWidth: "lg",
    tokenVisualizer: function tokenVisualizer(row) {
      return React.createElement(react.Flex, null, React.createElement(react.Box, {
        mr: row.value,
        boxSize: "3",
        background: "blue.200"
      }), React.createElement(react.Box, {
        boxSize: "3",
        background: "blue.200"
      }));
    }
  },
  shadows: {
    tokenVisualizer: function tokenVisualizer(row) {
      return React.createElement(react.Box, {
        shadow: row.value,
        h: "16",
        w: "full"
      });
    }
  },
  transition: {
    tokenVisualizer: function tokenVisualizer(row) {
      if (row.token.startsWith("property")) {
        return null;
      }

      var commonProps = {
        h: "16",
        w: "full",
        bg: "blue.100",
        fontSize: "xs",
        color: "gray.900",
        _hover: {
          bg: "blue.900",
          color: "gray.50"
        }
      };

      if (row.token.startsWith("easing")) {
        return React.createElement(react.Center, Object.assign({}, commonProps, {
          transitionTimingFunction: row.value,
          transitionDuration: "ultra-slow"
        }), "hover me");
      }

      if (row.token.startsWith("duration")) {
        return React.createElement(react.Center, Object.assign({}, commonProps, {
          transitionDuration: row.value
        }), "hover me");
      }

      return null;
    }
  },
  textStyles: {
    tokenVisualizer: function tokenVisualizer(row) {
      var sx = utils.get(row.theme, "textStyles." + row.token);
      return React.createElement(react.Text, {
        sx: sx
      }, "Almost before we knew it, we had left the ground.");
    }
  },
  layerStyles: {
    tokenVisualizer: function tokenVisualizer(row) {
      var sx = utils.get(row.theme, "layerStyles." + row.token);
      return React.createElement(react.Box, {
        boxSize: "16",
        sx: sx
      });
    }
  }
};
var createCustomTokensMap = {
  textStyles: function textStyles(themeValue) {
    return themeValue ? Object.entries(themeValue).map(function (_ref2) {
      var key = _ref2[0],
          value = _ref2[1];
      return [key, JSON.stringify(value, null, 2)];
    }) : [];
  },
  layerStyles: function layerStyles(themeValue) {
    return themeValue ? Object.entries(themeValue).map(function (_ref3) {
      var key = _ref3[0],
          value = _ref3[1];
      return [key, JSON.stringify(value, null, 2)];
    }) : [];
  },
  styles: function styles(themeValue) {
    return themeValue ? Object.entries(themeValue).map(function (_ref4) {
      var key = _ref4[0],
          value = _ref4[1];
      return [key, JSON.stringify(value, null, 2)];
    }) : [];
  }
};

var ThemeVisualizer = function ThemeVisualizer(_ref) {
  var _tokenListConfig$sect, _createCustomTokensMa;

  var section = _ref.section;
  var theme = useThemeToExplore();
  var themeValue = theme[section];
  var title = startCase(section);

  var _ref2 = (_tokenListConfig$sect = tokenListConfig[section]) != null ? _tokenListConfig$sect : {
    tokenVisualizer: undefined,
    minColWidth: undefined
  },
      tokenVisualizer = _ref2.tokenVisualizer,
      minColWidth = _ref2.minColWidth,
      description = _ref2.description,
      _ref2$TokenListCompon = _ref2.TokenListComponent,
      TokenListComponent = _ref2$TokenListCompon === void 0 ? TokenGrid : _ref2$TokenListCompon;

  var tokenCreator = (_createCustomTokensMa = createCustomTokensMap[section]) != null ? _createCustomTokensMa : createTokens;
  var tokens = tokenCreator(themeValue);
  return React.createElement(react.VStack, {
    w: "full",
    align: "stretch"
  }, React.createElement(react.Box, {
    as: "header",
    pt: "10",
    px: "8"
  }, React.createElement(react.Heading, {
    size: "lg",
    fontWeight: "300"
  }, title)), React.createElement(react.Box, {
    as: "section"
  }, React.createElement(TokenListComponent, {
    theme: theme,
    tokens: tokens,
    tokenVisualizer: tokenVisualizer,
    minColWidth: minColWidth,
    description: description
  })));
};

var ThemeLayout = function ThemeLayout(_ref) {
  var children = _ref.children;
  var bg = react.useColorModeValue("gray.50", "gray.700");
  var contentBg = react.useColorModeValue("gray.100", "gray.900");
  return React.createElement(Layout, {
    sidebar: React.createElement(ThemeSidebar, null),
    bg: bg
  }, React.createElement(react.Box, {
    as: "main",
    borderRadius: "md",
    bg: contentBg,
    m: "2",
    flex: "1",
    p: "2",
    overflow: "hidden"
  }, children));
};

var NotFoundPage = function NotFoundPage() {
  return React.createElement(Layout, null, React.createElement(react.Center, {
    w: "full"
  }, React.createElement(react.VStack, {
    spacing: "8"
  }, React.createElement(react.Heading, {
    size: "md"
  }, "Page not found"), React.createElement(react.Button, {
    as: Link,
    to: "/"
  }, "Go back"))));
};

var ThemeExplorerRoute = function ThemeExplorerRoute() {
  var match = reactRouter.useRouteMatch();
  var section = match.params.section;
  return React.createElement(ThemeLayout, null, React.createElement(ThemeVisualizer, {
    section: section
  }));
};

var theme = /*#__PURE__*/react.extendTheme({
  config: {
    useSystemColorMode: false
  },
  components: {
    Code: {
      defaultProps: {
        variant: "none"
      }
    },
    Table: {
      baseStyle: {
        caption: {
          textAlign: "left",
          mt: "0"
        }
      }
    }
  },
  textStyles: {
    "sidebar-title": {
      fontSize: "xs",
      fontWeight: "bold",
      my: "4",
      textTransform: "uppercase",
      letterSpacing: "wider",
      "&:first-of-type": {
        mt: "0"
      }
    },
    "sidebar-link": {
      fontSize: "sm"
    }
  }
});

function useLocalStorage(key, initialValue) {
  var _React$useState = React.useState(function () {
    try {
      var _globalThis$localStor;

      var item = (_globalThis$localStor = globalThis.localStorage) == null ? void 0 : _globalThis$localStor.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  }),
      storedValue = _React$useState[0],
      setStoredValue = _React$useState[1];

  var setValue = function setValue(value) {
    try {
      var _globalThis$localStor2;

      var valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      (_globalThis$localStor2 = globalThis.localStorage) == null ? void 0 : _globalThis$localStor2.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

var isBrowser = typeof globalThis.window !== "undefined";

var localStoragePrefix = "chakra-theme-explorer:";
var colorModeKey = localStoragePrefix + "color-mode";
var colorModeManager = {
  type: "localStorage",
  get: function get() {
    if (!isBrowser) {
      return undefined;
    }

    var raw = isBrowser ? globalThis.localStorage.getItem(colorModeKey) : undefined;

    if (["light", "dark"].includes(String(raw))) {
      return raw;
    }

    return undefined;
  },
  set: function set(value) {
    return isBrowser ? globalThis.localStorage.setItem(colorModeKey, value) : undefined;
  }
};
var ThemeExplorer = function ThemeExplorer(_ref) {
  var theme$1 = _ref.theme,
      buttonProps = _ref.buttonProps;

  var _useLocalStorage = useLocalStorage(localStoragePrefix + "OPEN", false),
      defaultIsOpen = _useLocalStorage[0],
      setDefaultIsOpen = _useLocalStorage[1];

  var _useDisclosure = react.useDisclosure({
    defaultIsOpen: defaultIsOpen,
    onOpen: function onOpen() {
      return setDefaultIsOpen(true);
    },
    onClose: function onClose() {
      return setDefaultIsOpen(false);
    }
  }),
      isOpen = _useDisclosure.isOpen,
      onClose = _useDisclosure.onClose,
      onToggle = _useDisclosure.onToggle;

  var windowRef = React.useRef();
  React.useEffect(function () {
    var handleUnload = function handleUnload() {
      var _windowRef$current;

      (_windowRef$current = windowRef.current) == null ? void 0 : _windowRef$current.release();
      setDefaultIsOpen(isOpen);
    };

    globalThis.addEventListener("unload", handleUnload);
    return function () {
      globalThis.removeEventListener("unload", handleUnload);
    };
  }, [isOpen, setDefaultIsOpen]);
  React.useEffect(function () {
    return function () {
      var _windowRef$current2;

      return (_windowRef$current2 = windowRef.current) == null ? void 0 : _windowRef$current2.release();
    };
  }, []);
  var label = (isOpen ? "Close" : "Open") + " Chakra UI Theme Explorer";
  return React.createElement(react.ThemeProvider, {
    theme: theme
  }, React.createElement(react.HStack, {
    spacing: "4",
    as: "aside",
    position: "fixed",
    bottom: "0",
    right: "0",
    m: "4"
  }, React.createElement(react.Tooltip, {
    label: label
  }, React.createElement(react.IconButton, Object.assign({
    onClick: onToggle,
    "aria-label": label,
    colorScheme: "teal",
    isRound: true,
    icon: React.createElement(Logo, null),
    shadow: "lg",
    willChange: "transform",
    _hover: {
      shadow: "xl",
      transform: "translateY(-3px)"
    }
  }, buttonProps)))), isOpen ? // @ts-ignore
  React.createElement(NewWindow, {
    title: "Chakra UI Theme Explorer",
    onUnload: onClose,
    copyStyles: false,
    features: {
      location: false,
      toolbar: false,
      status: false,
      menubar: false,
      scrollbars: true,
      resizable: true
    },
    ref: function ref(_ref2) {
      windowRef.current = _ref2;
    }
  }, React.createElement(Nested, {
    theme: theme$1,
    windowRef: windowRef
  })) : null);
};
var Nested = function Nested(_ref3) {
  var _windowRef$current3;

  var theme = _ref3.theme,
      windowRef = _ref3.windowRef;
  return React.createElement(react$1.CacheProvider, {
    value: createCache({
      key: "theme-explorer-window",
      container: (_windowRef$current3 = windowRef.current) == null ? void 0 : _windowRef$current3.container
    })
  }, React.createElement(StandaloneThemeExplorer, {
    theme: theme
  }));
};
var StandaloneThemeExplorer = function StandaloneThemeExplorer(_ref4) {
  var theme$1 = _ref4.theme,
      _ref4$router = _ref4.router,
      router = _ref4$router === void 0 ? "memory" : _ref4$router;
  var Router = router === "hash" ? reactRouterDom.HashRouter : reactRouterDom.MemoryRouter;
  return React.createElement(react.ChakraProvider, {
    theme: theme,
    colorModeManager: colorModeManager
  }, React.createElement(ThemeToExploreProvider, {
    theme: theme$1
  }, React.createElement(Router, null, React.createElement(reactRouterDom.Switch, null, React.createElement(reactRouterDom.Route, {
    path: "/",
    exact: true,
    render: function render() {
      return React.createElement(reactRouterDom.Redirect, {
        to: "/theme/fonts"
      });
    }
  }), React.createElement(reactRouterDom.Route, {
    path: "/theme/:section",
    exact: true,
    component: ThemeExplorerRoute
  }), React.createElement(reactRouterDom.Route, {
    path: "*",
    component: NotFoundPage
  })))));
};

exports.Nested = Nested;
exports.StandaloneThemeExplorer = StandaloneThemeExplorer;
exports.ThemeExplorer = ThemeExplorer;
exports.ThemeSidebar = ThemeSidebar;
exports.ThemeVisualizer = ThemeVisualizer;
//# sourceMappingURL=chakra-ui-theme-explorer.cjs.development.js.map
