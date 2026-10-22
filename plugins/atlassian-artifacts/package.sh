#!/bin/sh
# Build atlassian-artifacts-skill.zip, the standalone skill people upload to
# claude.ai or Cowork. It is skills/publish/ renamed to atlassian-artifacts,
# so it is recognisable in a list of uploaded skills.
# Run after any change to skills/publish/SKILL.md and commit the zip.
set -e
cd "$(dirname "$0")"
TMP="$(mktemp -d)"
mkdir "$TMP/atlassian-artifacts"
sed 's/^name: publish$/name: atlassian-artifacts/' skills/publish/SKILL.md > "$TMP/atlassian-artifacts/SKILL.md"
rm -f atlassian-artifacts-skill.zip
(cd "$TMP" && zip -qrX "$OLDPWD/atlassian-artifacts-skill.zip" atlassian-artifacts)
rm -rf "$TMP"
echo "Built atlassian-artifacts-skill.zip"
