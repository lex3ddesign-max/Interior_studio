import { cpSync, existsSync, rmSync } from "node:fs";

if (!existsSync("out")) {
  throw new Error("Next static export directory `out` was not created.");
}

rmSync("dist", { force: true, recursive: true });
cpSync("out", "dist", { recursive: true });
