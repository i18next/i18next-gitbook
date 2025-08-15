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
