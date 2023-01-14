import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { cleandir as CleandirPlugin } from "rollup-plugin-cleandir";
import terser from "@rollup/plugin-terser";
import TypescriptPlugin from "@rollup/plugin-typescript";

const PLUGINS = [resolve(), commonjs(), TypescriptPlugin()];

export default [
  {
    input: "./index.ts",
    output: {
      file: "dist/index.esm.js",
      format: "esm",
    },

    plugins: [...PLUGINS, CleandirPlugin("dist")],
    external: ["the-answer"],
  },
  {
    input: "./index.ts",
    output: {
      file: "dist/index.js",
      format: "cjs",
    },
    plugins: [...PLUGINS, terser({})],
    external: [],
  },
];
