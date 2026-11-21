---
description: "Reference other keys inside a translation with $t(key), pass options to nested keys, and reuse glossary terms."
---

# Nesting

Nesting allows you to reference other keys in a translation. Could be useful to build glossary terms.

## Basic

keys

```javascript
{
    "nesting1": "1 $t(nesting2)",
    "nesting2": "2 $t(nesting3)",
    "nesting3": "3",
}
```

sample

{% tabs %}
{% tab title="String keys" %}
```javascript
i18next.t('nesting1'); // -> "1 2 3"
```
{% endtab %}

{% tab title="Selector API" %}
```typescript
i18next.t($ => $.nesting1); // -> "1 2 3"
```
{% endtab %}
{% endtabs %}

You can reference keys from other namespaces by prepending the namespace: `"nesting1": "1 $t(common:nesting2)",`

## Passing options to nestings

You can pass entire data models in options.

keys

```javascript
{
    "girlsAndBoys": "They have $t(girls, {\"count\": {{girls}} }) and $t(boys, {\"count\": {{boys}} })",
    "boys": "{{count}} boy",
    "boys_other": "{{count}} boys",
    "girls": "{{count}} girl",
    "girls_other": "{{count}} girls",
}
```

sample

{% tabs %}
{% tab title="String keys" %}
```javascript
i18next.t('girlsAndBoys', {girls: 3, boys: 2});
// -> "They have 3 girls and 2 boys"
```
{% endtab %}

{% tab title="Selector API" %}
```typescript
i18next.t($ => $.girlsAndBoys, {girls: 3, boys: 2});
// -> "They have 3 girls and 2 boys"
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Make sure the options string is valid JSON and can be parsed using JSON.parse

`'sampleKey': 'test $t(nest2, { "changedVarName": "{{var}}" })'`
{% endhint %}

## Passing nesting to interpolated

keys

```javascript
{
      "key1": "hello world",
      "key2": "say: {{val}}"
}
```

sample

{% tabs %}
{% tab title="String keys" %}
```javascript
i18next.t('key2', {val: '$t(key1)'});
// -> "say: hello world"
```
{% endtab %}

{% tab title="Selector API" %}
```typescript
i18next.t($ => $.key2, {val: '$t(key1)'});
// -> "say: hello world"
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
If you're using >= v21.0.0 you need to set [skipOnVariables](../misc/migration-guide.md#skiponvariables-true) to false:

```
interpolation: {
  skipOnVariables: false
}
```
{% endhint %}

## Additional options

Prefix/Suffix for nesting and other options can be overridden in init [interpolation options](interpolation.md#all-interpolation-options) or by passing additional options to t function:

sample

{% tabs %}
{% tab title="String keys" %}
```javascript
i18next.init({
    interpolation: { ... }
});

i18next.t('key', {
    interpolation: { ... }
});
```
{% endtab %}

{% tab title="Selector API" %}
```typescript
i18next.init({
    interpolation: { ... }
});

i18next.t($ => $.key, {
    interpolation: { ... }
});
```
{% endtab %}
{% endtabs %}

| option                  | default | description                                                                        |
| ----------------------- | ------- | ---------------------------------------------------------------------------------- |
| nestingPrefix           | `$t(`   | prefix for nesting                                                                 |
| nestingSuffix           | `)`     | suffix for nesting                                                                 |
| nestingOptionsSeparator | `,`     | separates the options from the nesting key, as in `$t(key, { "count": {{count}} })` |

While there are a lot of options going with the defaults should get you covered.

## Security note: interpolated values inside a nesting-options block

Since i18next **27.2.3**, a `{{var}}` inside the options of a `$t(key, { ... })` is escaped for the options' JSON, whatever `escapeValue` is. A value can not end its string or add options: it reaches the nested lookup unchanged, and the nested lookup escapes it once, as a direct `t()` call does.

The one form that still inserts a value unescaped there is `{{- var}}`. A user-controlled value in it can break out of the JSON options literal and inject additional options:

```javascript
{
    "title": "$t(greeting, { \"count\": \"{{- userCount}}\" })",
    "greeting_one": "One item",
    "greeting_other": "{{count}} items"
}
```

```javascript
i18next.t('title', { userCount: userInput }) // userInput from a query string / form / ...
```

If `userInput` is `1", "lng": "xx`, the substituted options string becomes `{ "count": "1", "lng": "xx" }`: the injected `lng` redirects the nested lookup to a locale the attacker chose. In combination with a translation that contains raw HTML this can escalate to DOM XSS when the output is rendered into the page.

i18next logs a warning (at `warn` level, via the library's configured logger) when a translation uses `{{- var}}` inside a `$t()` options block, so you can spot it during development.

**Mitigation:** use `{{var}}` inside nesting options. Keep `{{- var}}` there for values your own code produces, like a formatter that returns the options, and never for user input.

**Before 27.2.3**, the same injection worked with `{{var}}` when `escapeValue: false` was set (26.0.6 to 27.2.2 log a warning for it), and with the default `escapeValue: true` a value passed on this way was HTML-escaped twice. On those versions, keep the default `escapeValue: true` or sanitise every user-controlled string before passing it to `t()` (at minimum strip or escape `"` and `\`).
