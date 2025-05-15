// webpack.d.ts
declare interface NodeRequire {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): __WebpackModuleApi.RequireContext;
}

// declarations.d.ts
declare function require(path: string): any;

interface RequireContext {
  keys: () => string[];
  <T>(id: string): T;
}

declare namespace require {
  function context(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ): RequireContext;
}

declare module "framer-motion" {
  // Re-export the true Variants type from the package
  export type Variants = import("framer-motion").Variants;
}


declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "framer-motion";
