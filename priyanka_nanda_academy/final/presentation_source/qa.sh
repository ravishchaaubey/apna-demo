#!/usr/bin/env bash
# qa.sh: validate a deck and render it to PDF + PNGs for visual inspection.
#
#   ./qa.sh _component_demo.pptx [out_dir] [dpi]
#
# out_dir defaults to ./_render/<deck name>/ (git-ignored); dpi defaults to 60.
set -euo pipefail

DECK="${1:?usage: qa.sh deck.pptx [out_dir] [dpi]}"
NAME="$(basename "${DECK%.pptx}")"
OUT="${2:-$(dirname "$0")/_render/$NAME}"
DPI="${3:-60}"
SKILL="${PPTX_SKILL_DIR:-/mnt/skills/public/pptx}"

python3 "$SKILL/scripts/office/validate.py" "$DECK"

mkdir -p "$OUT"
rm -f "$OUT"/slide-*.png "$OUT/$NAME.pdf"
python3 "$SKILL/scripts/office/soffice.py" --headless --convert-to pdf --outdir "$OUT" "$DECK" >/dev/null 2>&1
pdftoppm -png -r "$DPI" "$OUT/$NAME.pdf" "$OUT/slide"
ls -1 "$(cd "$OUT" && pwd)"/slide-*.png
