#!/bin/bash

SRC_DIR="public/assets/hd"
DEST_DIR="public/assets/medium"

mkdir -p "$DEST_DIR"

find "$SRC_DIR" -type f -name "*.png" | while read -r src; do
  # Recréer la structure de dossier
  relative_path="${src#$SRC_DIR/}"
  dest_path="$DEST_DIR/${relative_path%.png}.webp"
  dest_dir=$(dirname "$dest_path")

  mkdir -p "$dest_dir"

  # Redimensionner et convertir en WebP (avec transparence)
  cwebp -q 70 -resize 1024 1024 "$src" -o "$dest_path"
done
