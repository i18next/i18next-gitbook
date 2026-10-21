---
description: "Use ICU MessageFormat (i18next-icu) or Unicode MessageFormat 2 (i18next-mf2) with i18next: what keeps working, what stops working, TypeScript, i18next-cli and next-i18next setup."
---

# Using ICU or MF2

[i18next-icu](https://github.com/i18next/i18next-icu) and [i18next-mf2](https://github.com/i18next/i18next-mf2) let you write your translations in ICU MessageFormat or in Unicode MessageFormat 2 (MF2) instead of the [i18next JSON format](../misc/json-format.md).

Both are `i18nFormat` plugins. They do not extend i18next's message handling, they replace it: interpolation, plurals and selects come from the message syntax, and several i18next features stop working without an error. This page lists what changes.

## Setup

{% tabs %}
{% tab title="ICU" %}
```bash
npm install i18next i18next-icu intl-messageformat
```

`intl-messageformat` is a peer dependency of i18next-icu, so it is installed next to it.

```javascript
import i18next from 'i18next';
import ICU from 'i18next-icu';

i18next.use(ICU).init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        greeting: 'Hello {name}!',
        photos: 'You have {count, plural, one {one photo} other {# photos}}.',
        friend: '{context, select, male {A boyfriend} female {A girlfriend} other {A friend}}'
      }
    }
  }
});

i18next.t('greeting', { name: 'Ana' }); // -> "Hello Ana!"
i18next.t('photos', { count: 3 }); // -> "You have 3 photos."
i18next.t('friend', { context: 'male' }); // -> "A boyfriend"
```
{% endtab %}

{% tab title="MF2" %}
```bash
npm install i18next i18next-mf2
```

i18next-mf2 installs [messageformat](https://github.com/messageformat/messageformat) itself.

```javascript
import i18next from 'i18next';
import MF2 from 'i18next-mf2';

i18next.use(MF2).init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        greeting: 'Hello {$name}!',
        photos: '.input {$count :number} .match $count one {{You have one photo.}} * {{You have {$count} photos.}}',
        friend: '.input {$context :string} .match $context male {{A boyfriend}} female {{A girlfriend}} * {{A friend}}'
      }
    }
  },
  i18nFormat: {
    bidiIsolation: 'none' // see "Other differences" below
  }
});

i18next.t('greeting', { name: 'Ana' }); // -> "Hello Ana!"
i18next.t('photos', { count: 3 }); // -> "You have 3 photos."
i18next.t('friend', { context: 'male' }); // -> "A boyfriend"
```
{% endtab %}
{% endtabs %}

Only one `i18nFormat` plugin can be used per i18next instance. A second `.use()` replaces the first. To use two formats side by side, create separate instances with `i18next.createInstance()`.

## What keeps working

Everything around the message itself:

* language resolution, `fallbackLng`, `fallbackNS`, namespaces, backends and language detectors
* fallback keys like `t(['error.404', 'error.unspecific'])` and `defaultValue` (written in the plugin's syntax)
* missing keys: the key is returned, `saveMissing`, `missingKeyHandler` and `parseMissingKeyHandler` work
* `postProcess`, `keyPrefix`, `getFixedT` and `interpolation.defaultVariables`
* react-i18next's `Trans` component with numbered tags like `<0>text</0>`

## What stops working

These features are part of i18next's own message handling, which the plugins replace. None of them throws an error:

| i18next feature | With ICU or MF2 | Use instead |
| --- | --- | --- |
| [Plural](../translation-function/plurals.md) suffix keys (`key_one`, `key_other`, `key_ordinal_one`) | not looked up, `t('key', { count })` returns the key | a plural in the message: `{count, plural, ...}` (ICU), `.match $count` (MF2) |
| [Context](../translation-function/context.md) keys (`key_male`) | not looked up, the value of `key` is returned | a select on the value: `{context, select, ...}` (ICU), `.match $context` (MF2) |
| `{{name}}` [interpolation](../translation-function/interpolation.md) | can not be parsed, the message is returned unformatted (MF2 renders a message that is only `{{name}}` as `name`) | `{name}` (ICU), `{$name}` (MF2) |
| [Nesting](../translation-function/nesting.md) `$t(key)` | output as text | translate the inner key and pass it as a value: `t('a', { b: t('b') })` |
| [Formatting](../translation-function/formatting.md) (`{{value, number}}`, `list`, `relativetime`, `formatter.add`) | not applied | ICU: `{n, number}`, `{d, date, medium}` and the `formats` option. MF2: `:number`, `:integer`, `:currency`, `:percent`, `:date` (with `mf2DraftFunctions: true`) and the `mf2Functions` option. For lists and relative time, format the value with `Intl.ListFormat` or `Intl.RelativeTimeFormat` and pass the string |
| [`returnObjects`, `joinArrays`](../translation-function/objects-and-arrays.md) | the raw object or array is returned, also without `returnObjects`, and the strings in it are not formatted | look up the nested keys one by one |
| `interpolation.escapeValue` (on by default) | values are inserted without HTML escaping | i18next-icu: the `escapeVariables: true` option. i18next-mf2: escape values before passing them. Not needed with React, which escapes on its own |
| `saveMissingPlurals` | sends `key_one`, `key_other`, ... to the backend, keys the plugins never read | `saveMissingPlurals: false` |
| Errors in a message | the default `parseErrorHandler` returns the message source without a log | a `parseErrorHandler` option of your own, or `debug: true` (see below) |

### Debug warnings

Since i18next-icu 2.6.0 and i18next-mf2 2.1.0, both plugins log a warning through the i18next logger when i18next runs with `debug: true`:

* once per key, for a message that can not be parsed or formatted, with a hint if it contains `{{`
* once per key, for plural or context suffix keys that exist next to the key you call with `count` or `context`
* once per key, for `$t(` in a message and for a key that resolves to an object or array
* once per instance, if `interpolation.escapeValue` is on (i18next-icu: unless `escapeVariables: true` is set)

```javascript
i18next.use(ICU).init({ debug: true, /* ... */ });
i18next.t('photos', { count: 3 });
// i18next: i18next-icu: key "photos" (en/translation) was called with count, but i18next-icu
// does not look up plural suffix keys (photos_one, photos_other). Put the plural into the message: ...
```

Without `debug` the checks do not run.

## Other differences

* **Cache after resource changes.** Both plugins cache the parsed message per language, namespace and key (`memoize: true`). Since i18next-icu 2.6.1 and i18next-mf2 2.1.1 the cache compares the message, so a message changed by `addResource`, `addResourceBundle`, `reloadResources` or a hot reload is parsed again. With older versions the old message is still used unless you set `bindI18nStore: 'added'` and `bindI18n: 'loaded'` in the `i18nFormat` options.
* **Apostrophes (ICU).** An apostrophe in front of `{` starts quoted text: `l'{place}, {name}` renders as `l{place}, {name}`. Write `l''{place}` or use the typographic apostrophe `’`.
* **Bidi isolation marks (MF2).** Placeholders whose direction can differ from the message, for example strings, are wrapped in the invisible characters U+2068 and U+2069. They end up in `<title>`, attributes and string comparisons in tests. Set `bidiIsolation: 'none'` in the `i18nFormat` options to turn them off.
* **Markup (MF2).** MF2 markup like `{#b}text{/b}` is dropped when a message is formatted to a string. With react-i18next use numbered tags like `<0>text</0>`, which MF2 treats as text.

## TypeScript

Since i18next v26.5.0, the [type-safe `t` function](../overview/typescript.md) can check the arguments of ICU and MF2 messages. Set `parseInterpolation` to `'icu'` or `'mf2'`:

```typescript
// i18next.d.ts
import 'i18next';
import type Resources from './resources'; // generated by i18next-cli, see below

declare module 'i18next' {
  interface CustomTypeOptions {
    parseInterpolation: 'icu'; // or 'mf2'
    resources: Resources;
  }
}
```

Then a missing, misspelled or wrongly typed argument is a type error, and so is leaving out the options for a message with arguments:

```typescript
// photos: 'You have {count, plural, one {# photo} other {# photos}} in {album}.'
t('photos', { count: 3, album: 'Summer' }); // ok
t('photos', { count: 3, albm: 'Summer' }); // error: Property 'album' is missing
t('photos', { count: 'three', album: 'Summer' }); // error: count takes a number
t('photos'); // error: 'pass these arguments as t() options': { count: number; album: string | number; }
```

| ICU | MF2 | type |
| --- | --- | --- |
| `{name}` | `{$name}` | `string \| number` |
| `{n, number}`, `plural`, `selectordinal` | `:number`, `:integer`, `:currency`, `:percent`, `:unit` | `number` |
| `{d, date}`, `{t, time}` | `:datetime`, `:date`, `:time` | `Date` |
| `select` | `:string` | its cases or any `string` (ICU), `string` (MF2) |

Arguments nested in ICU cases are required too, `#` and tags are not arguments, and apostrophe quoting is read the way i18next-icu reads it. In MF2, annotations count inline and through `.input` or `.local`, variables in options and markup (`minimumFractionDigits=$digits`, `{#link href=$url}`) are required, `.local` variables are not arguments, and `|literals|` and `\{` escapes are skipped. Add an `interpolationFormatTypeMap` entry to change a type by format or function name, for example `date: Date | number` or a custom `uppercase: string`. The same checks apply to `getFixedT`, the selector API and react-i18next's `Trans` and `IcuTrans` `values`.

The messages need literal types. The resources file that the [i18next-cli](#i18next-cli) `types` command generates has them; with `typeof` a JSON import, every message is a `string` and no argument is checked.

With i18next v26.2.0 to v26.4.x, set `parseInterpolation: false` instead. The default extractor reads `{{variable}}`, and ICU plurals like `{count, plural, one {{count} row} other {{count} rows}}` and MF2 variants like `* {{You have {$count} photos.}}` contain double braces too, so without it these `t` calls do not compile. With `false` keys are still checked, the values you pass to `t` are not.

## i18next-cli

Since [i18next-cli](https://github.com/i18next/i18next-cli) 1.76.0, set `extract.messageFormat` to `'icu'` or `'mf2'` in your `i18next.config.ts`. The default, `'i18next'`, keeps the i18next JSON format.

```javascript
import { defineConfig } from 'i18next-cli';

export default defineConfig({
  locales: ['en', 'de', 'ru'],
  extract: {
    input: ['src/**/*.{js,jsx,ts,tsx}'],
    output: 'locales/{{language}}/{{namespace}}.json',
    messageFormat: 'icu' // or 'mf2'
  }
});
```

With it:

* `extract` writes one key per message: `t('photos', '{count, plural, one {# photo} other {# photos}}', { count })` gives `photos`, not `photos_one` and `photos_other`, and `context` adds no `_male` keys. The children of `Trans` are written with `{name}` (ICU) or `{$name}` (MF2), with apostrophes and braces escaped, and `IcuTrans`, `IcuTransWithoutContext` and the `icu.macro` components are extracted.
* `lint` checks every value in all locales: syntax errors, argument names that differ from the primary language, and plural categories that do not fit the locale (for example `few` and `many` missing in Russian, or `zero` in English, which is never used). Exact selectors like `=1` count when they cover a category (`one` in English, but not in Russian, where `one` is also 21, 31, ...). For MF2 it also warns when whitespace at the start or end of a pattern differs from the primary language, since MF2 shows a space inside `{{ }}` as text (i18next-cli 1.78.0). The `t()` interpolation check reads ICU and MF2 arguments.
* `status` counts a plural or select message as one key, so it no longer asks for `_few` and `_many` keys.
* `types` sets `parseInterpolation: 'icu'` or `'mf2'` in a newly generated `i18next.d.ts` when the project's i18next is v26.5.0 or later (i18next-cli 1.77.0; before, and with older i18next versions, `parseInterpolation: false`), and warns when an existing one lacks it.
* `instrument` writes ICU or MF2 placeholders, turns a `count === 1 ? ... : ...` ternary into one plural message, and registers i18next-icu or i18next-mf2 in the init file it creates.

## Translation management

[Locize](https://www.locize.com/docs/integration/i18n-formats) supports both as project formats, ICU as "MessageFormat v1" and MF2 as "MessageFormat v2": the editor highlights the syntax and shows parse errors, checks argument names and the plural forms each language needs, and checks every AI and machine translation for both before it is stored. The details are in the post [AI translations that respect your i18n format](https://www.locize.com/blog/ai-translations-i18n-format).

## React

react-i18next works with both plugins. For rich text use the `Trans` component with numbered tags, or the [IcuTrans component](https://react.i18next.com/latest/icu-trans-component). See [Using with ICU format](https://react.i18next.com/misc/using-with-icu-format) in the react-i18next docs.

## next-i18next (App Router)

With [next-i18next](https://github.com/i18next/next-i18next) 16.4.0 or later and the App Router, register the plugin in the server config and import `I18nProvider` from `next-i18next/icu` (or `next-i18next/mf2`) instead of `next-i18next/client`. It takes the same props and registers the plugin on the client instance. A Server Component can not pass a plugin class to a Client Component as a prop, so this import replaces the `'use client'` wrapper you would otherwise write.

```typescript
// i18n.config.ts
import type { I18nConfig } from 'next-i18next/proxy';
import ICU from 'i18next-icu';

const i18nConfig: I18nConfig = {
  supportedLngs: ['en', 'de'],
  fallbackLng: 'en',
  // ...
  use: [ICU],
};

export default i18nConfig;
```

```tsx
// app/[lng]/layout.tsx
import { initServerI18next, getT, getResources } from 'next-i18next/server';
import { I18nProvider } from 'next-i18next/icu'; // or 'next-i18next/mf2'
import i18nConfig from '../../i18n.config';

initServerI18next(i18nConfig);

export default async function RootLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { i18n } = await getT();
  return (
    <html lang={lng}>
      <body>
        <I18nProvider language={lng} resources={getResources(i18n)}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
```

`getT` in Server Components and `useT` in Client Components then format the ICU messages. For rich text in a Server Component, use `IcuTransWithoutContext` from `react-i18next/IcuTransWithoutContext` (react-i18next 17.0.21 or later) and pass `t` and `i18n` from `getT()`, so it renders in the request's language:

```tsx
// app/[lng]/page.tsx
import { getT } from 'next-i18next/server';
import { IcuTransWithoutContext } from 'react-i18next/IcuTransWithoutContext';

export default async function Page() {
  const { t, i18n } = await getT();
  return (
    <IcuTransWithoutContext
      i18nKey="welcome"
      defaultTranslation="Welcome back, <0>{name}</0>!"
      content={[{ type: 'strong' }]}
      values={{ name: 'Ada' }}
      t={t}
      i18n={i18n}
    />
  );
}
```

`Trans` from `react-i18next/TransWithoutContext` with the `values` and `components` props works too. The client instance does not read the server config: plugin options in `i18nextOptions.i18nFormat` (for example `bidiIsolation: 'none'` for MF2) go to `I18nProvider` as well, through its `i18nextOptions` prop. For MF2, put `MF2` from `i18next-mf2` into `use` and import `I18nProvider` from `next-i18next/mf2`.

See [ICU and MF2 with the App Router](https://github.com/i18next/next-i18next#icu-and-mf2-with-the-app-router) in the next-i18next README and the [app-router-icu example](https://github.com/i18next/next-i18next/tree/master/examples/app-router-icu).
