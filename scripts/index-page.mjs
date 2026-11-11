// Genera dist/index.html: el índice de proyectos de root.
import { writeFileSync } from "node:fs";
const names = { cuadrillas: "Cuadrillas por maestro", kpi: "KPI Adelante", antomap: "Antomap", "control-usuarios": "Control de usuarios", "adelante-web": "Adelante web", histok: "Histok", duck: "Duck" };
const items = process.argv.slice(2).map(d => `<a href="/${d}/"><b>${names[d] || d}</b><span>/${d}</span></a>`).join("\n");
writeFileSync("dist/index.html", `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>root · onexmac</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap">
<style>:root{--bg:#fff;--fg:#000;--mut:#959CA7;--line:#E6E6E8;--hover:#F2F2F2}
@media (prefers-color-scheme:dark){:root{--bg:#0F1114;--fg:#F7F7F7;--mut:#959CA7;--line:#282C33;--hover:#191C22;color-scheme:dark}}
body{margin:0;background:var(--bg);color:var(--fg);font-family:Inter,system-ui,sans-serif}main{max-width:560px;margin:0 auto;padding:48px 16px}
h1{font-size:28px;font-weight:600;margin:0 0 24px}a{display:flex;justify-content:space-between;gap:16px;padding:14px 8px;border-bottom:1px solid var(--line);color:inherit;text-decoration:none;border-radius:8px}
a:hover{background:var(--hover)}a span{color:var(--mut)}</style></head><body><main><h1>Proyectos</h1>${items}</main></body></html>`);
