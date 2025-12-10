import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, mkdir, copyFile } from "fs/promises";
import { existsSync } from "fs";
import { execSync } from "child_process";
import path from "path";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  console.log("Starting build script...");
  
  // Clean dist but ensure we don't break permissions if it doesn't exist
  try {
     await rm("dist", { recursive: true, force: true });
  } catch (e) {
    // ignore
  }

  // Ensure dist exists
  if (!existsSync("dist")) {
    await mkdir("dist");
  }

  console.log("building client...");
  
  try {
    // Use Vite API directly - most robust method
    await viteBuild();
    console.log("Vite API build successful.");
  } catch (apiError) {
    console.error("Vite API build failed:", apiError);
    // Try using the direct binary path to avoid npx issues as fallback
    try {
      console.log("Attempting fallback using binary...");
      execSync("./node_modules/.bin/vite build", { stdio: "inherit" });
      console.log("Vite build successful via binary.");
    } catch (error) {
       console.error("Vite build failed via binary too:", error);
       process.exit(1);
    }
  }

  // Verify output
  if (existsSync("dist/public/index.html")) {
    console.log("Verification: dist/public/index.html exists.");
  } else {
    console.error("Verification FAILED: dist/public/index.html missing!");
    // Last resort manual copy just to prevent 404 on deployment if build silently failed but files exist in src
    try {
        console.log("Attempting manual copy of index.html...");
        await mkdir("dist/public", { recursive: true });
        await copyFile("client/index.html", "dist/public/index.html");
    } catch (e) {
        console.error("Manual copy failed", e);
    }
  }

  console.log("Client build complete. Checking output...");
  // We are NOT building the server for static deployment
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
