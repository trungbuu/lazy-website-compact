#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";

const [sourcePath, outputPath, portraitUrl] = process.argv.slice(2);
if (!sourcePath || !outputPath || !portraitUrl) {
  console.error("Cách dùng: node scripts/build_wordpress.mjs SOURCE OUTPUT PORTRAIT_URL");
  process.exit(2);
}

const html = await readFile(sourcePath, "utf8");
const style = html.match(/<style>([\s\S]*?)<\/style>/i)?.[1];
const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];
const favicon = html.match(/<link\s+rel=["']icon["'][^>]*>/i)?.[0] || "";
const viType = await readFile(new URL("../docs/assets/vi-type.js", import.meta.url), "utf8");
const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
const pageScript = inlineScripts.at(-1)?.[1];

if (!style || !body || !pageScript) {
  throw new Error("Không đọc được style, body hoặc script từ trang nguồn.");
}

const pageBody = body
  .replace(/<script\b[\s\S]*?<\/script>\s*/gi, "")
  .replace('src="assets/buu-trung-avatar.jpeg"', `src="${portraitUrl}"`)
  .trim();

const scopedStyle = style
  .replace(/(^|\s)body\s*\{/gm, "$1#lwc-page {")
  .replace(/(^|\s)html\s*\{/gm, "$1html {");

const output = `<!-- wp:html -->
${favicon}
<style>
@import url("https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,500;6..72,600&display=swap");
${scopedStyle}
#lwc-page { width: 100%; min-height: 100vh; overflow-x: clip; }
</style>
<div id="lwc-page">
${pageBody}
</div>
<script data-no-optimize="1">
${viType}
</script>
<script data-no-optimize="1">
${pageScript}
</script>
<!-- /wp:html -->
`;

await writeFile(outputPath, output, "utf8");
console.log(`Đã tạo ${outputPath}`);
