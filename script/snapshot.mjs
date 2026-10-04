// Packs a copy of all live content + photos into the app so it works with no signal.
// Run before building the phone app: `node script/snapshot.mjs`
// If the server can't be reached, the last committed snapshot is kept.
import fs from "node:fs";
import path from "node:path";

const API = "https://salty-st-kitts-app-production.up.railway.app";
const OUT_JSON = "client/src/offline/snapshot.json";
const IMG_DIR = "client/public/offline/images";
const CATEGORIES = ["historical", "nature", "food_nightlife", "beach", "scenic_drive", "loot"];
const PAGES = ["ferry", "taxi", "holidays", "weather", "action_tings"];

async function get(p) {
  const r = await fetch(API + p);
  if (!r.ok) throw new Error(`${p} -> ${r.status}`);
  return r.text();
}

async function main() {
  const responses = {};
  const allStops = await get("/api/stops");
  responses["/api/stops"] = allStops;
  for (const c of CATEGORIES) responses[`/api/stops?category=${c}`] = await get(`/api/stops?category=${c}`);
  for (const s of JSON.parse(allStops)) responses[`/api/stops/${s.id}`] = await get(`/api/stops/${s.id}`);
  responses["/api/salt-posts"] = await get("/api/salt-posts");
  for (const k of PAGES) responses[`/api/pages/${k}`] = await get(`/api/pages/${k}`);
  try { responses["/api/stripe-link"] = await get("/api/stripe-link"); } catch {}

  // Photos
  fs.rmSync(IMG_DIR, { recursive: true, force: true });
  fs.mkdirSync(IMG_DIR, { recursive: true });
  const images = {};
  const urls = new Set(JSON.parse(allStops).map(s => s.imageUrl).filter(u => u && u.startsWith("/api/images/")));
  for (const u of urls) {
    const r = await fetch(API + u);
    if (!r.ok) { console.warn("skip image", u, r.status); continue; }
    const type = r.headers.get("content-type") || "";
    const ext = type.includes("webp") ? "webp" : type.includes("png") ? "png" : "jpg";
    const file = `${u.split("/").pop()}.${ext}`;
    fs.writeFileSync(path.join(IMG_DIR, file), Buffer.from(await r.arrayBuffer()));
    images[u] = `/offline/images/${file}`;
  }

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify({ generatedAt: new Date().toISOString(), responses, images }));
  const kb = Math.round(fs.statSync(OUT_JSON).size / 1024);
  console.log(`Snapshot: ${Object.keys(responses).length} responses (${kb} KB), ${Object.keys(images).length} photos`);
}

main().catch(e => {
  console.warn("Snapshot failed, keeping the previous one:", e.message);
  if (!fs.existsSync(OUT_JSON)) fs.writeFileSync(OUT_JSON, JSON.stringify({ generatedAt: null, responses: {}, images: {} }));
});
