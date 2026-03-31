# Built-in Default Design Profile

This is the built-in fallback profile used when no user profile exists in PACK memory.
It represents a professional, general-purpose Notion style suitable for most content types.

When a user profile exists under `## NOTION Design Profiles` in PACK memory, it takes
precedence and this file is not consulted.

---

### technical-structured *(built-in default)*
*Last updated: 2026-03-22*
*Pages analyzed: built-in — based on the canonical design system*

- **Patterns used**: intro callout, section header callouts, tables in gray callouts, architecture layers, columns, blue blockquotes, bottom navigation
- **Patterns avoided**: labeled steps with background colors, colored inline text
- **Color palette**: red_bg=section headers, blue_bg=objectives/key statements, green_bg=next steps/success, yellow_bg=table headers/caution, purple_bg=architecture/innovation, gray_bg=tables/reference
- **Colors avoided**: orange_bg (use sparingly for priority labels only)
- **Callout density**: high — nearly every section wrapped in callouts
- **Section header style**: colored callout headers (red_bg primary, green_bg for positive sections)
- **Column usage**: occasional — 2-column for paired/parallel content
- **Table style**: in gray callouts with yellow_bg header rows
- **Toggle usage**: for supplementary content only (metrics, ticket lists, reference data)
- **Visual density**: dense — information-rich sections, minimal whitespace
- **Intro pattern**: owner+purpose callout with italic context note
- **Content structure**: mixed — bullets for lists, prose for explanations, tables for structured data
- **Signature moves**: every page opens with an intro callout establishing owner and purpose; tables always wrapped in gray callouts with yellow header rows; sections use colored header callout + plain content callout pairing

---

## When This Profile Is Used

The fallback chain for profile selection is:

1. **User PACK profile** — if the user has a profile stored in PACK memory under `## NOTION Design Profiles`, use it. If multiple profiles exist, ask which to apply.
2. **Built-in default profile** (this file) — if no user profile exists, apply the `technical-structured` profile above to ensure professional, consistent formatting.
3. **Raw design system rules** — the patterns documented in `SKILL.md` are always the underlying implementation. The profile guides *which* patterns to emphasize and *how* to apply colors; the design system rules govern *how* each pattern is rendered.

The built-in default ensures that all users get professional Notion formatting out of the box, even before running LEARN mode to capture their personal style.
