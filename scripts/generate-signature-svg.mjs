/**
 * One-shot generator: Juliette outlines → public/signature-danial.svg
 * Run: node scripts/generate-signature-svg.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import opentype from "opentype.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const fontPath = path.join(root, "public/fonts/Juliette.otf");
const outPath = path.join(root, "public/signature-danial.svg");

const text = "Danial Suhail";
const fontSize = 96;

function commandsToD(commands) {
  let d = "";
  for (const cmd of commands) {
    switch (cmd.type) {
      case "M":
        d += `M${cmd.x} ${cmd.y}`;
        break;
      case "L":
        d += `L${cmd.x} ${cmd.y}`;
        break;
      case "C":
        d += `C${cmd.x1} ${cmd.y1} ${cmd.x2} ${cmd.y2} ${cmd.x} ${cmd.y}`;
        break;
      case "Q":
        d += `Q${cmd.x1} ${cmd.y1} ${cmd.x} ${cmd.y}`;
        break;
      case "Z":
        d += "Z";
        break;
      default:
        break;
    }
  }
  return d;
}

/** Split Path.commands into separate contours (each starts with M). */
function splitContours(commands) {
  const contours = [];
  let cur = [];
  for (const cmd of commands) {
    if (cmd.type === "M" && cur.length) {
      contours.push(cur);
      cur = [cmd];
    } else {
      cur.push(cmd);
    }
  }
  if (cur.length) contours.push(cur);
  return contours;
}

const font = opentype.loadSync(fontPath);
const outlinePath = font.getPath(text, 0, fontSize * 0.75, fontSize);
const bbox = outlinePath.getBoundingBox();
const padding = 16;
const contours = splitContours(outlinePath.commands);

const ox = -bbox.x1 + padding;
const oy = -bbox.y1 + padding;
const width = bbox.x2 - bbox.x1 + padding * 2;
const height = bbox.y2 - bbox.y1 + padding * 2;

const pathsXml = contours
  .map((cmds) => {
    const d = commandsToD(cmds);
    // Uniform stroke width in user units (outline trace)
    return `  <path d="${d}" stroke-width="1.25" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" transform="translate(${ox} ${oy})"/>`;
  })
  .join("\n");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width.toFixed(2)} ${height.toFixed(2)}" width="${width.toFixed(2)}" height="${height.toFixed(2)}">
${pathsXml}
</svg>
`;

fs.writeFileSync(outPath, svg, "utf8");
console.log(`Wrote ${path.relative(root, outPath)} (${contours.length} paths)`);
