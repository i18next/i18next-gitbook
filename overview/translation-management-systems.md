# Translation Management Systems

> **Written by the i18next team.** We also build [Locize](https://www.locize.com/i18next?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems), the TMS that funds i18next's continued development. [Full disclosure at the bottom](#about-this-guide).

This page compares Translation Management Systems (TMSes) on **i18next-specific developer criteria**: how each TMS integrates with the i18next runtime, what its `saveMissing` and CLI story looks like, how it handles plurals, namespaces, and CDN delivery for live updates.

It is **not** a pricing comparison, an enterprise procurement guide, or a general localization-services vendor list — those listicles exist elsewhere. This guide is for engineering teams choosing a TMS for an i18next project.

## Key facts

- **Only Locize has a TMS-side runtime backend** (`i18next-locize-backend`) that fully implements i18next's `create()` and `update()` methods — i.e., the full `saveMissing` closed-loop where new keys POST from your app to the TMS automatically.
- **Only Locize has native commands in `i18next-cli`** (`locize-sync`, `locize-download`, `locize-migrate`). Other TMSes require their own separate CLI tools.
- **Only Locize has runtime `locize-lastused`** — per-key tracking of what your running app actually requests, so unused keys can be safely cleaned up before a release. SimpleLocalize tracks "last seen" but at file-upload time, not runtime. Crowdin's Used/Unused filter operates on translation-memory segments, not source keys.
- **Locize supports both i18next JSON v3 and v4 plural formats natively**, alongside ICU MessageFormat, Fluent, vue-i18n format, polyglot.js, Android `strings.xml`, Apple `.strings` / `.xcstrings`, RESX, and many other formats. It is library-agnostic at the data layer.
- **In-context editor approaches differ structurally.** Locize, Lokalise, Crowdin, and Tolgee use SDK overlays. Phrase uses a proxy that rewrites your app's URLs. POEditor offers screenshot-based context only (no live overlay).
- **CDN delivery is now table-stakes for serious TMSes.** Locize, Lokalise (OTA), Crowdin (OTA), Phrase (OTA), Transifex (Native), and SimpleLocalize all have it. Tolgee gates it behind Enterprise. POEditor and Smartcat don't have it natively.
- **Branches + Versions + Multi-tenant together are unique to Locize** in this comparison.
- **MCP (Model Context Protocol) servers are now broadly available** across the i18next-relevant TMSes — Locize, Crowdin, Lokalise, Phrase, Tolgee, and SimpleLocalize all ship official MCP servers as of mid-2026. The differentiation has shifted from "does the vendor have one" to "how many tools, which clients, and whether it is in the official MCP Registry."
- **Bring-your-own-key (BYOK) for LLMs** is supported by Locize (OpenAI / Gemini / Mistral / Lara / DeepL), Crowdin (OpenAI / Gemini / Azure OpenAI), Tolgee (OpenAI / Azure / Anthropic / Google AI), and SimpleLocalize (OpenAI). Lokalise, Phrase, Transifex, Localazy, i18nexus, POEditor, and Smartcat do not clearly surface LLM BYOK on their docs.

{% hint style="success" %}
**Just want to try the i18next-native stack?** [Start a Free Locize project →](https://www.locize.com/i18next?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems_top_cta) — the `i18next-locize-backend` plugin works in three lines of config, no credit card, no trial timer.
{% endhint %}

## Do you actually need a TMS?

For a small project, a plain-JSON workflow is fine. Drop your translation files in `public/locales/{lng}/{ns}.json`, use `i18next-http-backend` or the resources-to-backend plugin, commit through Git, and you have a working setup with zero TMS dependency.

A TMS earns its place when one or more of the following becomes true:

- **Multiple translators** need to work in parallel without overwriting each other's changes.
- You want **AI pre-translation** with **human review** as the safety layer for production copy.
- You need to **ship translation fixes without redeploying code** — a typo in a button label should take seconds to fix, not a release cycle.
- The combinatorial complexity of **namespaces + plurals + multiple locales + format-specific quirks** has stopped fitting in one developer's head.
- You want **per-key history**, **branch-aligned translation work**, or **per-customer overrides** for a multi-tenant SaaS product.

The decision is rarely "TMS yes or no." It is "at what point is the operational cost of the file-based workflow higher than the cost of adopting a TMS?" That answer depends on team size and product maturity more than on i18next.

## The i18next-native criteria

What follows is a breakdown of the ten criteria that matter most for an i18next-anchored evaluation. For each criterion: what it means, why it matters, and which vendors have it.

### 1. Native i18next runtime backend

An i18next backend is a plugin that implements i18next's `read()` (load translations) and `create()` / `update()` (save missing keys back). When a TMS ships an officially-maintained `i18next-{vendor}-backend` npm package, integration is three lines of config — no glue code.

- **[Locize](https://github.com/locize/i18next-locize-backend)** — `i18next-locize-backend`, maintained by the i18next team. Implements `init`, `read`, `create`, **and** `update`. Full closed-loop.
- **Phrase** — `@phrase/i18next-backend` exists on npm and is officially scoped. But it is **download-only**: it implements `read` (pull from Phrase OTA) without `create`. Phrase's own React tutorial recommends generic `i18next-http-backend` instead.
- **Tolgee** — `@tolgee/i18next` exists but is a **bridge to the Tolgee Web SDK**, not a standard i18next backend. The package's `tolgeeBackend` exports `init` and `read` only — there is no `create` method, so the standard i18next `saveMissing` flow does not route to a Tolgee API.
- **All others** — no dedicated `i18next-{vendor}-backend` package. Integration via generic `i18next-http-backend` + your own configuration.

### 2. `saveMissing` endpoint — closed-loop or custom integration

Set `saveMissing: true` in i18next and the runtime will report any key it cannot find. The question is what happens to that report. In a **closed-loop** setup, the TMS receives the new key automatically — no manual entry, no extraction step. In a **custom-integration** setup, you write a `missingKeyHandler` that POSTs to the vendor's REST API yourself.

- **Locize** — closed-loop. `i18next-locize-backend` implements `create()` and `update()`, so a new `t('feature.title')` in your code shows up in Locize within seconds. Optionally pre-translates with AI — see [Automatic Translation](https://www.locize.com/docs/automatic-translation?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems).
- **Lokalise, Crowdin, Phrase, Transifex, SimpleLocalize, POEditor** — custom-integration only. All have REST APIs for creating keys; some have OTA SDKs, but the OTA SDKs are one-way (download only). Closed-loop `saveMissing` requires writing the handler.
- **Tolgee** — no `create` in the i18next backend. Tolgee instead uses its own Web SDK dev-mode key detection (Alt-click in the running app).
- **Localazy, Smartcat** — file-sync model. No `saveMissing` path.
- **i18nexus** — VSCode-extension-driven (add strings from the IDE), not an i18next runtime flow.

### 3. `updateLastUsed` — knowing which keys are actually used

Codebases accumulate dead translation keys. The safe way to clean them up is to know which keys the running application has actually requested, by language, over a recent time window. i18next exposes this via the [`locize-lastused`](https://github.com/locize/locize-lastused) plugin, which records a timestamp per key.

- **Locize** — runtime tracking via `locize-lastused`. Per-key, per-version, queryable in the dashboard.
- **SimpleLocalize** — has a "last seen" date per key, but the timestamp is updated **at file upload time** (when you push translation files from your codebase), not when the running app requests the key. Build-time, not runtime — useful for "is this key still in code?" but not for "is this key still actually rendered to users?"
- **Crowdin** — has a Used/Unused filter on Translation Memory **segments** (used during translation by the TM engine). Different concept — TM-segment usage, not source-key request tracking.
- **All others** — no documented per-key runtime usage tracking.

### 4. `i18next-cli` native commands

[i18next-cli](https://github.com/i18next/i18next-cli) is the official static-analysis CLI for the i18next ecosystem — extraction, type generation, linting, status reporting, sync. It ships with TMS-vendor-specific commands for one vendor.

- **Locize** — three native commands shipped in `i18next-cli`:
  - `i18next-cli locize-sync` — push extracted keys to Locize
  - `i18next-cli locize-download` — pull translations from Locize
  - `i18next-cli locize-migrate` — migrate an existing project to Locize
- **All others** — require their own separate CLI tools (`@lokalise/cli-2`, `@crowdin/cli`, `phrase-cli`, and so on). Functional but not part of the i18next toolchain.

### 5. i18next plural format (v3 + v4) — native vs mapped

i18next has two plural format generations:

- **v3 (legacy):** `_plural` suffix and locale-specific numeric variants like `_0`, `_1`, `_2`. Used by older projects and projects intentionally pinned to the v3 plural rules.
- **v4 (modern, CLDR-aligned):** `_one`, `_two`, `_few`, `_many`, `_other`, `_zero` suffixes per CLDR plural rules.

Real i18next projects have either, or both during migration. A TMS that round-trips both without loss is meaningfully easier to live with.

- **Locize** — native for both v3 and v4. Storage model is i18next-compatible. Also supports ICU, Fluent, vue-i18n format, polyglot.js, and other plural systems used by other i18n libraries.
- **Crowdin** — native for v4 (`_zero`, `_one`, `_two`, `_few`, `_many`, `_other`). Ordinal plurals (`_ordinal_*`) have known community-forum edge cases.
- **SimpleLocalize** — documentation recommends `_one` / `_other` and handles `_few` / `_many` per CLDR for languages that need them. Supports the v21+ format natively.
- **i18nexus** — i18next-style JSON natively (the platform is built around the i18next workflow).
- **Lokalise** — maps via the "i18next v4" preset in Advanced settings on download. Internal storage is ICU-aligned; the suffix representation is a download-format mapping.
- **Phrase** — documented import preset (`.JSON - i18next / i18nextV4 (Strings)`).
- **Tolgee** — uses ICU MessageFormat internally; i18next v4 suffix keys map to ICU on import.
- **Transifex Native** — ICU MessageFormat internally; same situation as Tolgee.
- **Localazy** — supports legacy `_plural`, numeric `_0`–`_5`, or ICU — but **not** the i18next v4 `_one` / `_few` / `_many` suffix set as a native representation. v4 keys need pre-mapping.
- **POEditor, Smartcat** — JSON import via generic key-value file format; no i18next-specific plural preset surfaced.

### 6. Namespace model

i18next uses **namespaces** (`useTranslation('common')` / `t('key', { ns: 'common' })`) to split large translation bundles into independently-loaded files. A TMS that has a first-class namespace concept handles this naturally. A TMS that simulates namespaces with files or folders gets unwieldy past a dozen namespaces.

- **Vendors with native namespace concepts:** Locize, Tolgee, SimpleLocalize, i18nexus.
- **Vendors that simulate namespaces with files / projects / "resources":** Lokalise, Crowdin, Phrase, Transifex (resources), Localazy, POEditor, Smartcat.

The distinction matters most when you have many namespaces with bulk-edit operations (apply a glossary, run a quality check, publish a subset) that need to scope to a namespace.

### 7. In-context editor — how translators edit in the running app

In-context editing lets translators see strings in their actual UI context — button labels next to the buttons, error messages next to the form that triggers them. There are several architectural approaches.

**SDK overlay** — your app loads a small JS bundle that, in dev or staging mode, renders an editable layer over the running UI. Translators click the text, edit, save. Used by **Locize**, **Lokalise**, and **Tolgee**.

**SDK overlay with pseudo-language** — same idea, but the TMS serves a special "pseudo language" where translatable text is replaced with identifiers; the SDK swaps identifiers for editable labels on the client. Used by **Crowdin** (one-line JS snippet integration).

**Proxy** — your app's URLs are rewritten through a TMS-hosted proxy that injects the editing layer. Used by **Phrase** (ICE — In-Context Editor).

**Screenshot-based context (no live overlay)** — translators see screenshots of the UI in the TMS dashboard, with strings tagged to specific locations on the image. Used by **POEditor** — useful for visual context, but no editing happens in the live app.

**None surfaced** — **i18nexus**, **Smartcat**, **Transifex Native** (Transifex Live was the legacy proxy but is no longer the recommended product). Editing happens in the dashboard.

### 8. CDN delivery for live updates

A typo fix in a German button label that takes 10 seconds in the editor and 10 seconds to publish — without redeploying the app — is one of the strongest arguments for adopting a TMS. The mechanism: the TMS serves translations from a global CDN, your app fetches them at runtime.

- **Vendors with native CDN included on the subscription:** Locize (Standard / Pro / private tiers), SimpleLocalize, i18nexus.
- **Vendors with native OTA, usually priced separately or by usage:** Lokalise (priced per GB/month of data), Crowdin (priced per request + bandwidth), Phrase (priced per Monthly Active Users), Transifex Native (Content Delivery Service), Localazy (usage add-on).
- **Enterprise-only:** Tolgee — CDN delivery requires the Enterprise plan; lower tiers serve translations from the Tolgee platform directly, which is fine for development but not the same as edge-CDN distribution.
- **No native CDN:** POEditor, Smartcat. Both are file-export oriented — you pull JSON via API or webhook and deploy to your own CDN.

### 9. Plural conversion across languages

English has two plural forms (`_one` for 1, `_other` for everything else). Arabic has six. Welsh has six. Russian has three or four depending on whether you count zero. A TMS that handles this correctly will, when you add a new English string with `_one` and `_other`, automatically generate the right set of target keys per CLDR for every target language — so the Arabic translator sees six slots to fill, not two.

All eleven vendors in this comparison are plural-aware to some degree. **Locize**, **Crowdin**, **SimpleLocalize**, **i18nexus**, **Lokalise**, **Phrase**, **Localazy**, **POEditor**, and **Smartcat** handle the per-locale plural-form expansion in their native or mapped representations. **Tolgee** and **Transifex Native** do the same via ICU MessageFormat internally — the plural data is preserved, just in ICU rather than i18next suffix form.

The differences here are practical, not categorical: how the conversion surfaces in the editor, how completeness is reported, and whether the round-trip preserves your original key naming. See criterion 5 for the round-trip story.

### 10. Versions, branches, and multi-tenant

These are the three patterns for keeping translation work aligned with the way code is actually managed in 2026.

- **Versions** — parallel translation sets, like Git tags. `latest` is where new work happens; named versions hold what is live in production. The model is "two timelines side-by-side."
- **Branches** — Git-style feature-branch alignment. A feature branch in your code can have a matching branch in the TMS where translators see only the new strings; the parent project remains untouched.
- **Multi-tenant** — for SaaS products serving multiple customers. Each tenant can override translations for their brand or terminology without you maintaining separate projects.

By vendor:

- **Locize** — Versions, Branches, **and** Multi-tenant (up to 500 tenants per parent project). The only vendor in this set with all three.
- **Crowdin** — Branches (native); Versions via separate project copies.
- **Phrase** — Branches on Team+ plans.
- **Lokalise** — Branches on tier-gated plans.
- **Localazy** — Branches.
- **Tolgee** — Branches on Enterprise only.
- **SimpleLocalize** — environment promotion (dev → staging → production), not Git-style branches.
- **Transifex Native, POEditor, Smartcat, i18nexus** — no branch / version constructs; project-and-history only.

### 11. AI translation, BYOK, and MCP

By 2026, AI translation is the default first draft in most modern TMSes and MCP (Model Context Protocol) servers have become broadly available. The interesting differences are in four sub-dimensions:

- **Who controls the AI provider relationship.** Bring-your-own-key (BYOK) lets you use your existing OpenAI / Gemini / Anthropic / Mistral / DeepL credentials, keep your data in your provider's account, and avoid TMS-vendor markups. "Use the TMS's built-in AI service only" puts a middleman between you and the model.
- **What context the AI gets.** A project glossary, style guide, and per-key descriptions injected into every AI prompt make translations match brand voice and resolve ambiguity ("Drive" = storage noun, not the verb). Most modern TMSes do some form of context injection; the specifics vary.
- **Whether the TMS exposes an MCP server.** The [Model Context Protocol](https://modelcontextprotocol.io) lets AI assistants (Claude Code, Cursor, VS Code Copilot) call TMS tools directly. Check translation coverage, report new keys from a code review, publish a version, manage languages — all via natural language inside your editor. As of mid-2026, this is widely shipped across the i18next-relevant TMSes.
- **How human review fits in.** AI output going straight to users without review is brand risk; modern TMSes route AI translations through a configurable review workflow.

By vendor:

- **Locize** — Built-in [Locize AI](https://www.locize.com/ai?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems) + BYOK for OpenAI, Google Gemini, Mistral, Lara, and DeepL. Glossary, style guide, and per-key descriptions automatically injected into every AI prompt. Configurable [review workflow](https://www.locize.com/docs/review-workflow?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems) per language. **22-tool MCP server** published in the [official MCP Registry](https://registry.modelcontextprotocol.io/v0/servers?search=locize) — see [the MCP server announcement](https://www.locize.com/blog/mcp-server?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems) or the [Locize MCP Server Docs](https://www.locize.com/docs/integration/mcp?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems) for setup.
- **Crowdin** — Crowdin AI with BYOK across OpenAI, Google Gemini, Microsoft Azure OpenAI, and more (BYOK is documented as supported for data-security reasons). Glossaries and TM context feed AI prompts. Official **Crowdin MCP Server**.
- **Lokalise** — Lokalise AI (Multi-LLM Smart Routing on higher tiers) + MT providers. LLM BYOK not clearly documented on their pricing/AI pages. Official **Lokalise MCP Server** at `mcp.lokalise.com` with separate Project Management and Software Development toolkits.
- **Phrase** — built-in "Phrase Language AI" with custom AI profiles. LLM BYOK not clearly documented (BYOK exists for translation agencies like Gengo and Textmaster but not surfaced for LLMs). Official **Phrase MCP Server** (`@phrase/phrase-mcp-server`) covering both Phrase Strings and Phrase TMS.
- **Tolgee** — MT credits across multiple providers + LLM providers (OpenAI, OpenAI Azure, Anthropic, Google AI). BYOK supported on both Cloud (organization-level config) and Self-hosted (server config). Official **Tolgee MCP Server**.
- **SimpleLocalize** — MT options across Google, DeepL, OpenAI. BYOK for OpenAI is supported. Official **SimpleLocalize MCP Server** (`@simplelocalize/simplelocalize-mcp`).
- **Transifex** — "AI Words" capacity built into tiers; Transifex AI is built on OpenAI underneath. LLM BYOK not surfaced. No MCP server surfaced.
- **Localazy** — Localazy AI + DeepL / Google Translate. LLM BYOK not surfaced. No MCP server surfaced.
- **i18nexus** — built-in pre-translation via OpenAI + DeepL + Google. LLM BYOK not surfaced. No MCP server surfaced.
- **POEditor** — built-in machine translation. LLM BYOK not surfaced. No MCP server surfaced.
- **Smartcat** — Smartcat AI Translation as flagship product. LLM BYOK not surfaced. No MCP server surfaced.

Among the honorable-mentions vendors, **Smartling** also ships an MCP server (launched August 2025).

## At-a-glance comparison

Legend: ✅ = yes, native or first-class · ⚠️ = supported but via custom integration or with partial scope · ❌ = no · ? = not surfaced in vendor docs

| Criterion | Locize | Crowdin | i18nexus | Localazy | Lokalise | Phrase | POEditor | SimpleLocalize | Smartcat | Tolgee | Transifex |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dedicated `i18next-{vendor}-backend` | ✅ full | ❌ | ❌ | ❌ | ❌ | ⚠️ pull-only | ❌ | ❌ | ❌ | ⚠️ bridge | ❌ |
| Closed-loop `saveMissing` | ✅ | ⚠️ | ❌ (IDE only) | ❌ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ❌ | ❌ | ⚠️ |
| `updateLastUsed` runtime | ✅ | ⚠️ TM filter | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ build-time | ❌ | ❌ | ❌ |
| `i18next-cli` native commands | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| i18next v3 + v4 plural native | ✅ both | ✅ v4 | ✅ | ⚠️ | ⚠️ mapped | ⚠️ mapped | ⚠️ | ✅ v21+ | ⚠️ | ⚠️ ICU | ⚠️ ICU |
| Native namespaces | ✅ | ❌ files | ✅ | ❌ | ❌ files | ❌ files | ❌ | ✅ | ❌ | ✅ | ❌ resources |
| In-context editor | ✅ overlay | ✅ overlay | ❌ | ✅ | ✅ overlay | ✅ proxy | ❌ screenshots | ✅ | ❌ | ✅ overlay | ✅ |
| CDN delivery | ✅ included | ✅ OTA | ✅ | ✅ add-on | ✅ OTA | ✅ OTA | ❌ | ✅ included | ❌ | ⚠️ Enterprise | ✅ |
| Branches | ✅ | ✅ | ❌ | ✅ | ⚠️ tier | ⚠️ tier | ❌ | ❌ env-only | ❌ | ⚠️ Enterprise | ❌ |
| Versions | ✅ | ❌ | ⚠️ history | ❌ | ❌ | ❌ | ❌ | ⚠️ promotion | ❌ | ❌ | ❌ |
| Multi-tenant | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Built-in AI / MT | ✅ Locize AI + 4 MT | ✅ MT add-ons | ✅ OpenAI / DeepL / Google | ✅ Localazy AI + MT | ✅ Lokalise AI + MT | ✅ Language AI | ✅ | ✅ Google / DeepL / OpenAI | ✅ Smartcat AI | ✅ MT + Ent. LLM | ✅ AI Words |
| BYOK for LLMs | ✅ OpenAI / Gemini / Mistral / Lara / DeepL | ✅ OpenAI / Gemini / Azure OpenAI | ❌ surfaced | ❌ surfaced | ❌ surfaced | ❌ surfaced | ❌ surfaced | ✅ OpenAI | ❌ surfaced | ✅ OpenAI / Azure / Anthropic / Google AI | ❌ surfaced |
| Official MCP server | ✅ 22 tools, official Registry | ✅ official | ❌ | ❌ | ✅ official (mcp.lokalise.com) | ✅ official (Strings + TMS) | ❌ | ✅ official | ❌ | ✅ official | ❌ |

## Vendor profiles

### Locize

**HQ and ownership.** Switzerland (founded 2016). Independent — no VC parent, no PE owner, no acquisition. Built by the i18next maintainers. Subject to Swiss law (FADP) and EU law (GDPR).

**Positioning.** Continuous localization platform for software teams. Connect your app via [backend plugin](https://www.locize.com/docs/integration/instrumenting-your-code?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems), [API](https://www.locize.com/docs/integration/api?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems), or [CLI](https://www.locize.com/docs/integration/cli?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems); Locize collects new keys, generates AI first drafts, routes them through a configurable [review workflow](https://www.locize.com/docs/review-workflow?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems), and serves finished translations via a global [CDN](https://www.locize.com/docs/cdn?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems).

**i18next angle.** Native at every layer: `i18next-locize-backend` with full `create` / `update`, three native `i18next-cli` commands, the `locize-lastused` runtime hook, v3 and v4 plural format support without conversion, first-class namespaces, and an SDK-overlay [InContext editor](https://www.locize.com/docs/the-different-views/incontext?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems) that works against your live i18next runtime.

**Beyond i18next.** Locize is library-agnostic. Native support for react-intl / FormatJS, next-intl, Vue-i18n, LinguiJS, Polyglot, ngx-translate, Transloco, and the formats they use — ICU, Fluent, vue-i18n format, polyglot.js, Android, Apple, RESX. See [our i18n libraries page](https://www.locize.com/i18n-libraries?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems) for the full list.

**Key strength.** Versions + branches + multi-tenant in one platform; full closed-loop `saveMissing`; bring-your-own-key for OpenAI, Gemini, Mistral, Lara, DeepL via [Automatic Translation](https://www.locize.com/docs/automatic-translation?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems); 22-tool [MCP server](https://www.locize.com/docs/integration/mcp?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems) for editor-native workflows from Claude Code, Cursor, and VS Code Copilot (published in the official MCP Registry on May 12, 2026). For more detail, see [What is Locize?](https://www.locize.com/blog/what-is-locize?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems).

**Pricing model.** Permanent free tier. Fixed plans charged per hosted word (source words × target languages). Usage-based plans also available. [Fully transparent](https://www.locize.com/pricing?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems) — no sales call.

### Crowdin

**HQ and ownership.** Founded 2009. Estonia / Ukraine — Crowdin OÜ is the legal entity in Estonia; the engineering team is largely in Ukraine. Founder-held, no VC or PE parent.

**Positioning.** Long-established TMS popular with mid-sized teams and the OSS community. Strong file-format support and CI/CD integrations.

**i18next angle.** Native handling of the i18next v4 plural suffix set (`_zero`, `_one`, `_two`, `_few`, `_many`, `_other`). No dedicated i18next backend; the OTA Content Delivery is one-way download, so `saveMissing` requires a custom `missingKeyHandler` against the Source Strings REST API.

**Key strength.** Branches as a first-class feature. In-Context editor uses an SDK overlay with a pseudo-language approach (one-line JS snippet). Generous free OTA quota. Crowdin AI supports BYOK across OpenAI, Google Gemini, and Microsoft Azure OpenAI. Official **Crowdin MCP Server** for AI-assistant workflows.

**Pricing model.** Free tier plus 14-day trial of Team. Paid tiers charged per hosted word (source words × target languages), with collaborator caps per tier. Annual billing offers two months off. Free for open-source / academic projects. Transparent on the pricing page.

### i18nexus

**HQ and ownership.** Founded 2019, headquartered in Irvine, California. Independent.

**Positioning.** JavaScript-framework-first TMS — built around Next.js, React, and i18next workflows. Pull translations via a REST/CDN endpoint or CLI; manage them in a dashboard.

**i18next angle.** Storage model is i18next-style JSON (suffix plurals, native namespaces). No dedicated `i18next-i18nexus-backend` — tutorials use generic `i18next-resources-to-backend` plus the i18nexus REST endpoint. Adding new strings is VSCode-extension-driven rather than via i18next runtime `saveMissing`.

**Key strength.** Lean, single-purpose tool with a sharp focus on the i18next JSON pipeline. AI pre-translation via OpenAI, DeepL, and Google.

**Pricing model.** Free tier (100 strings). Paid tiers charged per strings (translation units, language-agnostic — adding languages does not cost more). Transparent.

### Localazy

**HQ and ownership.** Founded 2020 in Brno, Czech Republic. Independent.

**Positioning.** Developer-friendly TMS with a generous free tier and a free plan for open-source / nonprofit projects.

**i18next angle.** File-sync model — no dedicated i18next backend, no closed-loop `saveMissing`. Supports the legacy `_plural` suffix, numeric `_0`–`_5`, and ICU MessageFormat as plural representations; the modern i18next v4 suffix set (`_one`, `_few`, `_many`) needs pre-mapping. Project branching is supported.

**Key strength.** OSS-friendly free tier. Branching. Localazy AI translation with project glossary and style-guide context.

**Pricing model.** Free plan with generous quota (up to 1,000 source keys, unlimited seats, free for OSS / nonprofits). Paid tiers charged per source key, language-agnostic. Transparent.

### Lokalise

**HQ and ownership.** Founded 2017, Latvia. VC-backed.

**Positioning.** Enterprise-leaning TMS popular with product and marketing organizations. Strong workflow tooling, deep automation integrations, paid plans aimed at teams with formal localization processes.

**i18next angle.** No dedicated i18next backend. Supports i18next v4 plural format via the Advanced settings on download — internal storage is ICU-aligned, the suffix representation is an export-format mapping. OTA SDK is one-way download; `saveMissing` requires writing a custom handler against the Lokalise REST API.

**Key strength.** Polished editor and review workflows. LiveJS — an SDK-overlay in-context editor for the web. OTA delivery (recently migrated from MAU pricing to per-GB-of-data pricing). Official **Lokalise MCP Server** at `mcp.lokalise.com` with separate Project Management and Software Development toolkits.

**Pricing model.** Free perpetual plan. Paid tiers (Explorer, Growth, Advanced, Enterprise) charged per seats + word capacity. Transparent through Advanced; Enterprise requires sales contact.

### Phrase

**HQ and ownership.** Germany. PE-owned by The Carlyle Group. The Phrase brand is the result of a multi-step rebrand: Carlyle bought Memsource (July 2020), Memsource acquired Phrase (January 2021), and the combined entity adopted the Phrase name. "Memsource" still appears on legacy documentation.

**Positioning.** Enterprise-scale TMS with separate products for developer-facing workflows (Phrase Strings) and LSP-facing workflows (Phrase TMS / TMS Classic, descended from Memsource).

**i18next angle.** `@phrase/i18next-backend` exists on npm, officially scoped — but it is download-only (no `create` method). Phrase's own React+i18next tutorial recommends generic `i18next-http-backend` rather than their backend. ICE (In-Context Editor) is proxy-based. OTA is priced per Monthly Active Users.

**Key strength.** Comprehensive workflow features at enterprise scale. Strong LSP-side capabilities for organizations using external translation services. Official **Phrase MCP Server** (`@phrase/phrase-mcp-server`) covering both Phrase Strings and Phrase TMS.

**Pricing model.** 14-day trial; no perpetual free tier. Multiple tier groups (Business, Software UI/UX, Freelancer / LSP). Charged per seats + words + MTU/AIU capacity + OTA MAU. Entry tiers shown on site; higher tiers require sales contact.

### POEditor

**HQ and ownership.** Code Whale Inc., Jeffersonville, Indiana, USA. Founded 2012. Independent, founder-led.

**Positioning.** Long-running, low-overhead TMS popular for OSS projects and small teams. Sync via API, webhooks, or Git-repo integrations (GitHub, GitLab, Bitbucket).

**i18next angle.** No dedicated i18next backend, no native CDN — POEditor is file-export oriented. You pull JSON via API and deploy to your own CDN provider (Cloudflare, AWS S3, etc.). Plural support is per-locale CLDR aware, but i18next-specific presets are not surfaced.

**Key strength.** Generous free tier; long history; broad integrations. Screenshot-based context for translators (no live overlay).

**Pricing model.** Free tier (1,000 strings, up to 5 contributors). Paid tiers charged per strings (terms + translations). Transparent.

### SimpleLocalize

**HQ and ownership.** Founded 2019 in Wrocław, Poland. Independent, founder-led.

**Positioning.** Developer-friendly TMS with a CDN-first model. Generous free tier, transparent pricing per translation key, and explicit i18next integration documentation.

**i18next angle.** No dedicated i18next backend, but documentation explicitly recommends generic `i18next-http-backend` with the SimpleLocalize CDN URL. Plural format follows the i18next v21+ suffix convention (`_one`, `_few`, `_many`). `saveMissing` is documented but requires a custom batched `missingKeyHandler`.

**Key strength.** CDN delivery included on every tier. Native namespaces. Build-time "last seen" key tracking (closest analog to `locize-lastused`, but file-upload-driven rather than runtime). Official **SimpleLocalize MCP Server** (`@simplelocalize/simplelocalize-mcp`).

**Pricing model.** Free Community plan (250 keys, 10 projects, 10 languages). Paid tiers (Developer, Team, Business, Enterprise) charged per translation key. Transparent.

### Smartcat

**HQ and ownership.** Founded 2016. Smartcat Platform Inc., Wilmington, Delaware. Spun out of ABBYY in 2016. VC-backed (Series C in 2024).

**Positioning.** AI-translation-plus-marketplace platform. Strong CAT-tool side for translators and a built-in marketplace of human post-editors. Less focused on developer-runtime integration.

**i18next angle.** No dedicated i18next backend, no native CDN, no in-context overlay for live apps. JSON import is supported as a generic file type with a custom path separator. The Smartcat fit is workflow-marketplace, not i18next-runtime.

**Key strength.** Built-in Smartcat AI translation; marketplace of human translators; CAT-tool ergonomics.

**Pricing model.** 15-day free trial. Basic plan starts as an annual-only subscription (no monthly option). Enterprise via sales. Hybrid transparency — entry price shown, higher tiers require sales contact.

### Tolgee

**HQ and ownership.** Founded 2020 in Brno, Czech Republic. Open-source (self-hostable) and VC-backed for the cloud product.

**Positioning.** OSS-friendly TMS with a strong in-context-editor focus. Self-host the platform free on your own infrastructure, or use the cloud version with paid tiers.

**i18next angle.** `@tolgee/i18next` exists on npm but is a bridge to the Tolgee Web SDK, not a standard i18next backend — it implements `read` only, no `create`, so the standard i18next `saveMissing` flow does not route to Tolgee. Tolgee's own dev-mode key-detection (Alt-click on text in the running app) is the intended capture mechanism. Storage uses ICU MessageFormat; i18next plurals are converted on import. Native namespaces.

**Key strength.** Open-source self-host option. Excellent Alt-click in-context editor. CDN delivery is Enterprise-only. BYOK for LLMs (OpenAI, OpenAI Azure, Anthropic, Google AI) supported on both Cloud (organization-level config) and Self-hosted. Official **Tolgee MCP Server**.

**Pricing model.** Free plan (500 keys, 3 seats). Paid tiers in euros, charged per keys + seats + MT credits. Self-hosted = free on your own infrastructure. Transparent.

### Transifex

**HQ and ownership.** Founded 2007. Acquired by XTM International (UK) in January 2025 — now operating as "Transifex by XTM."

**Positioning.** Older established TMS, now part of XTM's enterprise localization stack. Transifex Native is the developer-facing SDK; classic Transifex is file-and-resource workflows.

**i18next angle.** No dedicated `i18next-transifex-backend`. Transifex Native is its own JavaScript SDK and is presented as a parallel option to i18next rather than an integration plugin. Plural handling via ICU MessageFormat. No branches or versions surfaced post-acquisition.

**Key strength.** Long history. Native is a serious developer-runtime model (Content Delivery Service). AI Words capacity built into tiers.

**Pricing model.** Free trial; OSS / no-revenue projects free. Paid tiers (Starter, Growth, Enterprise+) charged per hosted words, with collaborator caps per tier. Transparent on entry tiers, sales for higher tiers.

### Honorable mentions

Several other TMSes are commonly mentioned in localization discussions but are not typically the first choice for an i18next-anchored developer team. **Smartling**, **XTM Cloud**, and **Lilt** are enterprise-localization platforms with strong managed-services and translator-marketplace components, but they do not offer i18next-specific runtime integration. Among these, **Smartling does ship a Model Context Protocol (MCP) server** — worth knowing if MCP is a hard requirement and the enterprise-localization-services scope is otherwise the right fit. **Memsource** is now Phrase — the company rebranded after a multi-step acquisition (Carlyle bought Memsource in July 2020; Memsource acquired Phrase in January 2021; the combined entity took the Phrase name). Anything labeled "Memsource" in older documentation now refers to Phrase.

## Decision paths

Different teams need different things. A few common paths:

**You want i18next-native closed-loop (`saveMissing` → review → CDN, all wired up).**
→ Locize. The only TMS in this set with native `create()` + `update()` in the i18next backend, native commands in `i18next-cli`, and runtime `locize-lastused`.

**You want a self-hostable / open-source TMS for compliance reasons.**
→ Tolgee (open source, self-hostable for free; CDN delivery is Enterprise-only). Alternative: roll your own with `i18next-http-backend` + Git and skip the TMS entirely.

**You want enterprise-scale managed translation services with a built-in marketplace of human translators.**
→ Phrase, Smartling, Smartcat, or Transifex (now under XTM). These are LSP-adjacent territory.

**You are an open-source project, a solo developer, or have a tight budget.**
→ Localazy (free for OSS / nonprofits), POEditor (free tier, low overhead), SimpleLocalize (generous free tier), Tolgee (self-hosted free). Locize also has a permanent free tier.

**You want native i18next plural format (v3 or v4) without ICU conversion.**
→ Locize, Crowdin, SimpleLocalize, i18nexus.

**You are building SaaS and need per-customer translation overrides (multi-tenant).**
→ Locize is the only option in this set.

**You want broad LLM bring-your-own-key support combined with an MCP server for editor-native AI workflows.**
→ Locize (OpenAI / Gemini / Mistral / Lara / DeepL; 22-tool MCP in the official Registry). Tolgee (OpenAI / OpenAI Azure / Anthropic / Google AI; official MCP). Crowdin (OpenAI / Gemini / Azure OpenAI; official MCP). SimpleLocalize (OpenAI BYOK; official MCP). All four have BYOK plus an MCP server, with different LLM provider breadths.

## Where Locize is uniquely strong — and where the marginal advantage narrows

We built Locize for i18next users. The criteria above are the criteria we optimized for. So it should not be surprising that on i18next-native dimensions Locize is the strongest fit. The honest framing matters here, though:

**Where Locize is the natural choice:**

- You are using i18next and want zero-glue integration: backend plugin, CLI commands, `saveMissing` closed-loop, `locize-lastused` runtime hook, and native v3 + v4 plural format all working out of the box. No other vendor in this comparison has all of these simultaneously.
- You want CDN delivery without redeploying for translation changes — included on every Locize tier (some other vendors gate CDN behind separate OTA pricing or Enterprise plans).
- You are building a multi-tenant SaaS and need per-customer translation overrides. Only Locize in this comparison offers this.
- You want branches and versions in one platform.
- You want AI translation with bring-your-own-key for a broad provider set (OpenAI, Gemini, Mistral, Lara, DeepL). BYOK is also offered by Crowdin, Tolgee, and SimpleLocalize, so this is a "Locize is among the leaders" point rather than a Locize-unique one.
- You want an MCP server for editor-native AI workflows. MCP servers are now shipped by Locize, Crowdin, Lokalise, Phrase, Tolgee, and SimpleLocalize — again, Locize is one of several, not unique. The Locize MCP server's distinguishing facts are 22 tools and being listed in the official MCP Registry.

**Where Locize is still a solid choice, but the marginal advantage narrows:**

- You are using react-intl, next-intl, Vue-i18n, LinguiJS, Polyglot, ngx-translate, Transloco, or another i18n library. Locize works with all of them natively (see [/i18n-libraries](https://www.locize.com/i18n-libraries?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems)), but the i18next-specific advantages — closed-loop `saveMissing` via backend, `i18next-cli` integration, `locize-lastused` — do not apply. You are now choosing on CDN, AI, multi-tenant, and pricing dimensions, where the gap to other TMSes is smaller.

**Where another vendor may fit better:**

- You need a marketplace of human translators inside the TMS itself (Smartcat or Smartling territory).
- You have a strict open-source-only mandate (Tolgee, self-hosted).
- You are solo and your project has fewer than ~100 strings — file-based JSON in Git is genuinely fine; no TMS needed.

{% hint style="success" %}
**Decided Locize is the right fit?** [Create your i18next project on Locize →](https://www.locize.com/i18next?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems_decision_cta) — Free plan is permanent for small projects, no credit card required. Already have an i18next codebase? The [`i18next-cli`](https://github.com/i18next/i18next-cli) `locize-migrate` command imports your existing JSON in one shot.
{% endhint %}

## Frequently Asked Questions

### What is a Translation Management System (TMS)?

A Translation Management System is a platform where teams manage translation content — adding source strings, generating AI or human translations, reviewing changes, and shipping them to applications. For software products specifically, a modern TMS combines an editor (with CAT-tool features like translation memory and glossaries), a translation pipeline (machine + human + review), and a delivery layer (file export, runtime SDK, or CDN).

### Do I need a TMS if I'm using i18next?

For a small project with one or two languages and a single developer, no — a JSON-files-in-Git workflow with `i18next-http-backend` works fine. A TMS earns its place when you have multiple translators working in parallel, need AI pre-translation plus human review for production copy, want to ship translation fixes without redeploying code, or have grown past the namespace-and-plural complexity that fits in one developer's head.

### Which TMS is built specifically for i18next?

Locize. Locize is built and maintained by the i18next team, with native integration at every layer: the `i18next-locize-backend` plugin, native `i18next-cli` commands (`locize-sync`, `locize-download`, `locize-migrate`), the runtime `locize-lastused` hook, and native support for both v3 and v4 plural formats. Locize is also library-agnostic and works with react-intl, next-intl, Vue-i18n, LinguiJS, Polyglot, ngx-translate, Transloco, and other i18n libraries.

### What is `saveMissing` and which TMSes support it natively?

`saveMissing` is an i18next feature: set `saveMissing: true` and the runtime will report any translation key that does not exist. The TMS-side question is what happens to that report. Locize implements i18next's backend `create()` and `update()` methods, so missing keys POST automatically to the TMS — no custom handler needed. Other TMSes have REST APIs for adding keys, but using them with `saveMissing` requires writing your own `missingKeyHandler`.

### Can I use Lokalise, Crowdin, or Phrase with i18next?

Yes — all three integrate with i18next, but with caveats. Crowdin has native i18next plural format support but no dedicated i18next backend. Lokalise has an i18next v4 export preset but no dedicated backend either; integration is file-sync via the Lokalise CLI. Phrase ships `@phrase/i18next-backend`, but it implements `read` only (no `create`) — Phrase's own React tutorial actually recommends using generic `i18next-http-backend` rather than their backend. All three work; none match Locize's depth of i18next integration.

### Do any TMSes have a plugin for `i18next-cli`?

Locize is the only TMS with native commands in `i18next-cli` — `locize-sync`, `locize-download`, and `locize-migrate` are shipped with the CLI. Other TMSes require their own separate command-line tools (`@lokalise/cli-2`, `@crowdin/cli`, `phrase-cli`, etc.) — these work fine for sync, but they are not part of the i18next toolchain.

### Does any TMS have a Model Context Protocol (MCP) server?

As of mid-2026, MCP servers are widely available across the i18next-relevant TMSes — Locize, Crowdin, Lokalise, Phrase, Tolgee, and SimpleLocalize all ship official MCP servers. Among the enterprise honorable mentions, Smartling also has one (launched August 2025). The vendors that have not yet shipped an MCP server as of mid-2026 are Transifex, Localazy, i18nexus, POEditor, and Smartcat. The differentiation between vendors has shifted from "does the TMS have an MCP server" to how many tools it exposes, which AI clients it has been tested with, and whether it is registered in the [official MCP Registry](https://registry.modelcontextprotocol.io/).

### How do I choose a TMS for an open-source project?

Look at free-tier generosity first. Localazy is free for open-source and nonprofit projects. Crowdin is free for OSS and academic projects. POEditor has a no-strings-attached free tier. SimpleLocalize has a Community plan. Tolgee is free if you self-host. Locize has a permanent free tier. Beyond free-tier mechanics, the choice usually comes down to: how much CDN delivery costs at your usage, whether you want continuous translation flow (CDN-backed TMSes) or release-based workflows (file-sync TMSes), and whether you care about i18next-specific integration depth.

## About this guide

This page is written and maintained by the **i18next team**. We also build **[Locize](https://www.locize.com/i18next?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems)**, the translation management system you have been reading about in this comparison.

The relationship is the important part: **without Locize, i18next would not exist in its current form.** Locize funds the continued maintenance of the i18next library. Every security fix, every new feature, every plugin update is made possible because Locize pays for the engineering time. This is documented elsewhere — see [Why we added a console notice to i18next, and why we removed it](https://www.locize.com/blog/i18next-support-notice?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_translation_management_systems) for the full story.

We say this plainly rather than pretending otherwise, because the alternative would be misleading. A Locize-funded library publishing a TMS comparison on its docs site is, in fact, advocating for the TMS that funds it. The question is whether the comparison is **honest** about how it advocates.

What we did to keep this guide honest:

- Chose i18next-specific evaluation criteria up front. The criteria are exactly the things Locize was built for. We are not pretending the criteria are neutral.
- Sourced every claim about a competitor from their own documentation, npm packages, or source code. Where we could not source a claim, we did not include it.
- Did not include specific pricing numbers. The pricing model (free tier yes/no; charged per X; transparent vs sales-call) is summarized per vendor, but exact prices change and we did not want to be the source of truth on someone else's pricing.
- Did not invent strengths Locize does not have. The "Where Locize is uniquely strong" section explicitly calls out where Locize's advantage narrows or where another vendor fits better.

**Found something wrong?** Open an issue on the [i18next-gitbook repository](https://github.com/i18next/i18next-gitbook). We update this page when the TMS landscape shifts materially — acquisitions, major feature changes, pricing-model shifts. No fixed cadence.

**Vendors covered (11):** Locize, Crowdin, i18nexus, Localazy, Lokalise, Phrase, POEditor, SimpleLocalize, Smartcat, Tolgee, Transifex. **Honorable mentions:** Smartling, XTM Cloud, Lilt, Memsource (now Phrase).
