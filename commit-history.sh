#!/usr/bin/env bash
# Creates a clean, logical commit history for the VIN Decoder refactor.
#
# Usage (from the root of your cloned repo, after copying the refactored
# project files over it and deleting nothing by hand):
#   bash commit-history.sh
#
# Needs git user.name / user.email to be set (the script tells you if not).
#
# Commit dates are the real current time - nothing is backdated.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

if [ ! -f src/utils/vin.ts ]; then
  echo "Copy the refactored project files into the repo first (src/utils/vin.ts not found)." >&2
  exit 1
fi

# Git needs an identity to create commits.
if [ -z "$(git config user.name || true)" ] || [ -z "$(git config user.email || true)" ]; then
  echo "Git does not know who you are. Run these two commands, then run the script again:" >&2
  echo '  git config user.name "Your Name"' >&2
  echo '  git config user.email "you@example.com"' >&2
  echo "(add --global to use the same identity in all repositories)" >&2
  exit 1
fi

# The script must start from an empty index, otherwise the commits get mixed.
if ! git diff --cached --quiet; then
  echo "You already have staged changes (maybe from an earlier failed run)." >&2
  echo "Unstage them with:  git reset    and run the script again." >&2
  exit 1
fi

# Never commit node_modules / dist: restore .gitignore from history or create one.
GITIGNORE_PATH=""
if [ ! -f .gitignore ]; then
  if git cat-file -e HEAD:.gitignore 2>/dev/null; then
    git checkout -- .gitignore
  else
    printf 'node_modules\ndist\ndist-ssr\n*.local\n*.log\n.DS_Store\n.vscode/*\n!.vscode/extensions.json\n.idea\n' > .gitignore
    GITIGNORE_PATH=".gitignore"
  fi
fi

# remove <paths...>: stage deletion of old files (no error if they are already gone)
remove() { git rm -rq --ignore-unmatch -- "$@"; }

# commit "<subject>" "<body>" <paths...>: stage given paths and commit
commit() {
  local subject="$1" body="$2"
  shift 2
  git add -A -- "$@"
  git commit -q -m "$subject" -m "$body"
  echo "ok  $subject"
}

commit "chore: update dependencies and tooling configuration" \
"Remove react-toggle-dark-mode and @swc/helpers, add dompurify.
Enable strict TypeScript, add a format script, drop the stray homepage
field and use an inline favicon instead of a missing /favicon.svg." \
  package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json \
  eslint.config.js prettier.config.js vite.config.ts index.html ${GITIGNORE_PATH:+"$GITIGNORE_PATH"}

remove src/type src/types/react-toggle-dark-mode.d.ts
commit "refactor: merge type folders and fix API typings" \
"Keep a single src/types folder. Value is string | null, Variable is a
string, ValueId is a string, matching the real NHTSA responses." \
  src/types

commit "feat: add VIN validation and HTML sanitizing utils" \
"validateVin checks: not empty, at most 17 characters, only Latin letters
and digits without I, O and Q. sanitizeHtml wraps DOMPurify for the
variable descriptions that the API returns as HTML." \
  src/utils

commit "refactor: move API access into a service and data hooks" \
"Axios client with a shared format=json param. useDecodeVin exposes
results, message and state flags and filters out empty values.
useVinHistory keeps the last three unique VINs in localStorage.
useVariables shares one cached query between list and details pages.
useTheme no longer crashes when storage is unavailable." \
  src/services src/hooks

commit "style: add global design tokens and shared UI classes" \
"CSS variables for light and dark themes (separate accent colour for
text to meet WCAG AA contrast), shared card, button, table-wrap and
rich-text classes, visible focus outline." \
  src/index.css

commit "feat: add layout, header with theme toggle and 404 page" \
"Single <main> in Layout, accessible navigation with NavLink and a
button-based theme toggle. Header wraps correctly down to 420px.
Unknown routes render a not found page." \
  src/Layout.tsx src/App.tsx src/main.tsx src/components/Header src/pages/NotFound

commit "feat: add accessible VIN form with validation" \
"A real <form> with a label: Enter submits. Validation errors are announced
with role=alert and cleared as soon as the user edits the field." \
  src/components/DecoderInput

remove src/assets/free-icon-right-arrow-angle-54833.png
commit "feat: add history list and sidebar" \
"History items are buttons (keyboard accessible) that decode the VIN
again and are disabled while a request is running. The decorative arrow
image is replaced with a text arrow." \
  src/components/DecoderHistory src/components/Aside

commit "feat: show decoded results and API message on the home page" \
"Table with a fixed two-column layout that wraps long values without
breaking words. Shows the API Message, request errors and empty states.
Home composes the sidebar and results around a single h1." \
  src/components/Results src/pages/Home

commit "feat: add variables list and details pages with sanitized HTML" \
"The list shows full descriptions, the details page works on direct
load, long names wrap instead of widening the page, and all HTML from
the API is sanitized before rendering." \
  src/pages/Variables src/pages/VariableDetails

commit "docs: rewrite README" \
"Describe features, tech stack, local run instructions and project
structure; link the live demo; remove the roadmap and license note." \
  README.md

echo
git log --oneline -n 11
