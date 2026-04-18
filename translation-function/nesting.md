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
{% tab title="JavaScript" %}
```javascript
i18next.t('nesting1'); // -> "1 2 3"
```
{% endtab %}

{% tab title="TypeScript" %}
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
{% tab title="JavaScript" %}
```javascript
i18next.t('girlsAndBoys', {girls: 3, boys: 2});
// -> "They have 3 girls and 2 boys"
```
{% endtab %}

{% tab title="TypeScript" %}
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
{% tab title="JavaScript" %}
```javascript
i18next.t('key2', {val: '$t(key1)'});
// -> "say: hello world"
```
{% endtab %}

{% tab title="TypeScript" %}
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
{% tab title="JavaScript" %}
```javascript
i18next.init({
    interpolation: { ... }
});

i18next.t('key', {
    interpolation: { ... }
});
```
{% endtab %}

{% tab title="TypeScript" %}
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

| option               | default   | description                            |
| -------------------- | --------- | -------------------------------------- |
| nestingPrefixEscaped | undefined | escaped prefix for nesting (regexSafe) |
| nestingSuffixEscaped | undefined | escaped suffix for nesting (regexSafe) |

While there are a lot of options going with the defaults should get you covered.

## Security note: interpolated values inside a nesting-options block

When you combine the nested-options syntax with interpolation **and** have disabled the default `escapeValue: true`, user-controlled input in those interpolated values can break out of the JSON options literal and inject additional options.

Example of the risky pattern:

```javascript
{
    "title": "$t(greeting, { \"count\": \"{{userCount}}\" })",
    "greeting_one": "One item",
    "greeting_other": "{{count}} items"
}
```

```javascript
i18next.init({ interpolation: { escapeValue: false } }) // explicit opt-out of the safe default

i18next.t('title', { userCount: userInput }) // userInput from a query string / form / ...
```

If `userInput` is `1", "lng": "xx`, the substituted options string becomes `{ "count": "1", "lng": "xx" }` — the injected `lng` redirects the nested lookup to a locale the attacker chose. In combination with a translation that contains raw HTML this can escalate to DOM XSS when the output is rendered into the page.

i18next **26.0.6+** logs a runtime warning when this configuration is detected (at `warn` level, via the library's configured logger) so you can spot it during development.

**Mitigation — any one of the following is sufficient:**

1. Keep the default `interpolation.escapeValue: true`. HTML-escaping neutralises the `"` before `JSON.parse`, so the attack cannot succeed. If you need raw HTML output in a specific call, use the explicit `{{- var }}` unescape syntax for values you have already sanitised.
2. Sanitise every user-controlled string before passing it as a `t()` option — at minimum strip or escape `"` and `\`.
3. Avoid the `$t(key, { ... "{{var}}" ... })` pattern when the variable can be influenced by untrusted input. Pass the nested call's options directly from the caller's language instead of through the translation template.

The risky pattern only fires when **all** of these are true: (a) `escapeValue: false`, (b) a translation uses interpolation inside a `$t()` options JSON block, and (c) the interpolation variable carries attacker-controlled data. Applications that rely on the default `escapeValue: true` are not affected.
