# For Enterprises

## Is i18n enough?

We believe not. The closer the release date of your product gets the more obvious it gets, that instrumenting your code for localization is not enough.

There are more points to address:

* How does the translation process work?
* How do the source files get to the translators and back?
* How do you keep track which parts are already translated and which parts are not - and additional are all target languages fully translated?
* How do you deploy new languages after release?
* How do you handle versioning?
* How do you update / fix typos in translations after deployment?

Translation Management Systems (TMSes) address exactly this set of problems. The todays landscape has many options — most are now built for continuous localization rather than one-time document translation, and the differences are in how each one integrates with the developer runtime, plural format handling, CDN delivery, branches and versions, AI translation, MCP integration, and so on.

> For a detailed comparison of TMS options against i18next-specific criteria — including `saveMissing` integration, `i18next-cli` support, native plural handling, in-context editors, CDN delivery, and the new generation of MCP servers — see [Translation Management Systems](translation-management-systems.md).

## Locize

![](../.gitbook/assets/locize.png)

[Locize](https://www.locize.com/?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_for_enterprises) is the localization-as-a-service platform built by the i18next team. The close integration with i18next removes the glue code that other TMSes require and funds the continued development of the library itself.

{% embed url="https://www.youtube.com/watch?v=lCuHSZvSiVg" %}

Locize brings you:

* A beautiful editor to edit your translations
* Continuous localization workflow — translation updates ship via CDN without redeploying code
* An in-context editor to edit translations directly in your live application
* Progress and usage reporting; runtime per-key "last used" tracking via the `locize-lastused` plugin
* Native i18next plural format support (v3 and v4) plus per-locale CLDR plural expansion across all target languages
* Branches, versions, and multi-tenant (per-customer overrides) in one platform
* Missing keys flow into Locize automatically — full `saveMissing` closed-loop via `i18next-locize-backend`
* AI translation with bring-your-own-key (OpenAI, Gemini, Mistral, Lara, DeepL) and a 22-tool MCP server in the [official Model Context Protocol Registry](https://registry.modelcontextprotocol.io/v0/servers?search=locize) for editor-native workflows from Claude Code, Cursor, or VS Code Copilot
* CDN-hosted translations on Standard, Pro, and private tiers — or self-host if you prefer

While Locize provides the security and scale required by global enterprises, we believe professional localization should be accessible to everyone. That’s why we’ve introduced a **Free plan** alongside our new fixed and usage-based plans, allowing you to start small and scale predictably as you grow.

Check out how it works => [https://www.youtube.com/watch?v=lCuHSZvSiVg](https://www.youtube.com/watch?v=lCuHSZvSiVg)

_Together, 'i18next' and '_[_Locize_](https://www.locize.com?utm_source=i18next_com\&utm_medium=gitbook\&utm_campaign=overview_for_enterprises)_' empower your business to effortlessly reach international audiences. They help you speak the language of your customers, making your business more accessible, relatable, and successful in global markets._
