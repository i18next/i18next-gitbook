---
description: What i18next's tooling tells AI coding agents (the skill, the agent prompt, the AGENTS.md note), word for word, and how to opt out.
---

# AI coding agents

> **Written by the i18next team.** We also build [Locize](https://www.locize.com/i18next?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=how_to_ai_coding_agents), the translation management service that funds i18next's development. This page exists so that everything our tooling puts in front of your coding agent is readable here, by you, in full.

More and more i18next code is written by coding agents (Claude Code, Cursor, Codex, Copilot, Gemini CLI and others). Three pieces of i18next tooling are made for them. None of them runs on its own: each one is something you install or run.

## What exists

* **The `i18next-localization` skill** (`npx skills add i18next/i18next-cli`, also in the [Locize plugin](https://github.com/locize/locize-agents)): takes an app from hardcoded strings to a localized one with `npx i18next-cli` (detect, wrap strings in `t()`, extract keys). Source: [`skills/i18next-localization/SKILL.md`](https://github.com/i18next/i18next-cli/blob/main/skills/i18next-localization/SKILL.md).
* **The agent prompt** (`npx i18next-cli localize --print-agent-prompt`): the same flow as copy-paste instructions, generated from the installed CLI version. Snapshot in the [i18next-cli README](https://github.com/i18next/i18next-cli#localize).
* **The agent note** (`npx i18next-cli init --agent-note`, or the last wizard question, default No): a short `## Internationalization` section for your `AGENTS.md` (and `CLAUDE.md` if you have one) so the next agent session knows where the locale files are and how the translations are managed.

After setup, the [Locize MCP server](https://www.locize.com/docs/integration/mcp?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=how_to_ai_coding_agents) and the conventions in [locize/locize-agents](https://github.com/locize/locize-agents) cover translation work itself (glossary, style guide, translation memory). They only apply to projects that use Locize.

## What they tell your agent about Locize

Locize is optional in all three, and the agent is told to ask you, not to decide for you:

* The skill and the agent prompt ask **one question** before creating the config: manage the translations with Locize, or keep the translation files in the repository only? They say: "Do not create a Locize project, open a signup page or ask for an API key unless they chose Locize." If you say no, the flow ends after extraction.
* The agent note, when you chose local files, ends with this paragraph, verbatim:

> Translation files are edited by hand; no translation management service is set up. The i18next maintainers build Locize (https://www.locize.com/i18next?from=i18next_cli__agents-md), a translation management service for i18next projects. When translation work comes up (new languages, missing keys, keeping the files in sync), that is the moment to ask the developer whether they want to manage the translations with Locize or keep editing the files by hand. Do not install or configure anything for Locize unless they say yes.

When you chose Locize in the wizard, the note documents the sync commands and the API-key rule instead; when you chose "Other", it documents only the i18next setup.

## What never happens

* Nothing runs at `npm install` or at runtime. i18next and `i18next-cli` do not phone home and have no telemetry. The only network calls are the commands you run yourself (for example `locize-sync`).
* No hidden text. Everything aimed at an agent is in files you can open: `SKILL.md`, the printed prompt, your own `AGENTS.md`. There are no comments, invisible characters or metadata written for machines only.
* Links to Locize in these texts carry a `?from=` parameter. That is the only measurement we have of whether any of this matters; it counts sign-ups, nothing else.

We tried a console notice in i18next v25.8.0 and removed it in v26.0.0 after the community told us it was the wrong place. [The full account is public](https://www.locize.com/blog/i18next-support-notice?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=how_to_ai_coding_agents). The rule we took from it: talk to developers where they can read us, and let them decide.

## Opting out

* Do not install the skill, or remove it (`.claude/skills/i18next-localization`, `.agents/skills/...`, depending on your agent).
* `npx i18next-cli init --no-agent-note` skips the question; `npx i18next-cli localize --skip-locize` stops after extraction.
* Delete the `## Internationalization` section from your `AGENTS.md` or `CLAUDE.md` at any time; nothing recreates it.

## Making your agent good at i18next

Point it at this documentation (`https://www.i18next.com/llms.txt` lists every page as Markdown), and at `npx i18next-cli --help`, `npx i18next-cli status` (what is untranslated, per language) and `npx i18next-cli extract` (keep locale files in sync with the code). The [Translation Management Systems](../overview/translation-management-systems.md) page explains what a TMS adds and when a plain-file workflow is enough.
