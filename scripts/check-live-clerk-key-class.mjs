#!/usr/bin/env node
const html = await fetch("https://wujud.ai/").then((r) => r.text());
const m = html.match(/assets\/(index-[^"']+\.js)/);
if (!m) {
  console.log(JSON.stringify({ error: "no asset" }));
  process.exit(1);
}
const asset = m[1];
const live = await fetch(`https://wujud.ai/assets/${asset}`).then((r) => r.text());
const fs = await import("node:fs/promises");
const localPath = new URL(`../dist/client/assets/${asset}`, import.meta.url);
let local = "";
try {
  local = await fs.readFile(localPath, "utf8");
} catch {}
console.log(
  JSON.stringify({
    asset,
    liveKeyClass: live.includes("pk_live_") ? "LIVE" : live.includes("pk_test_") ? "TEST" : "NONE",
    distKeyClass: local.includes("pk_live_") ? "LIVE" : local.includes("pk_test_") ? "TEST" : "NONE",
    sameLength: local.length > 0 ? live.length === local.length : null,
  }),
);
