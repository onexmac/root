#!/usr/bin/env bash
# Arma el sitio único de root en dist/: cada proyecto publicable queda en /<carpeta>/.
# Vercel corre esto (ver vercel.json). Local: bash scripts/build-root.sh && npx serve dist
set -uo pipefail
cd "$(dirname "$0")/.."
STATIC="cuadrillas kpi antomap"                      # HTML sin build
NEXT="control-usuarios adelante-web histok"           # Next.js, exportado con basePath
VITE="duck/skll-corp:duck"                            # carpeta-con-build:ruta-publica
rm -rf dist && mkdir -p dist
ok=(); fail=()

for d in $STATIC; do
  mkdir -p "dist/$d" && (cd "$d" && tar --exclude='*.md' --exclude=scripts -cf - .) | tar -xf - -C "dist/$d" && ok+=("$d") || fail+=("$d")
done

for d in $NEXT; do
  echo "== $d"
  if (cd "$d" && npm ci --no-audit --no-fund --loglevel=error && ROOT_BASE="/$d" npx next build) ; then
    cp -r "$d/out" "dist/$d" && ok+=("$d")
  else fail+=("$d"); fi
done

for v in $VITE; do
  src=${v%%:*}; dst=${v##*:}; echo "== $dst"
  if (cd "$src" && npm ci --no-audit --no-fund --loglevel=error && npx vite build --base "/$dst/") ; then
    cp -r "$src/dist" "dist/$dst" && ok+=("$dst")
  else fail+=("$dst"); fi
done

node scripts/index-page.mjs "${ok[@]}"
echo "Publicados: ${ok[*]}"; [ ${#fail[@]} -gt 0 ] && echo "FALLARON (no se publican): ${fail[*]}"
exit 0
