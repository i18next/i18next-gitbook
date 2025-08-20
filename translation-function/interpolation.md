# Interpolation

Interpolation is one of the most used functionalities in I18N. It allows integrating dynamic values into your translations.

Per default, interpolation values get escaped to mitigate XSS attacks.

{% hint style="info" %}
🎓 Check out this topic in the [i18next crash course video](https://youtu.be/SA_9i4TtxLQ?t=433).
{% endhint %}

If the interpolation functionality provided doesn't suit you, you can use [i18next-sprintf-postProcessor](https://github.com/i18next/i18next-sprintf-postProcessor) for sprintf supported interpolation.

## Basic

Interpolation is one of the most used functionalities in I18N.

Keys

Keys, by default, are strings surrounded by curly brackets:

```javascript
{
    "key": "{{what}} is {{how}}"
}
```

Sample

{% tabs %}
{% tab title="JavaScript" %}
```javascript
i18next.t('key', { what: 'i18next', how: 'great' });
// -> "i18next is great"
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
i18next.t($ => $.key, { what: 'i18next', how: 'great' });
// -> "i18next is great"
```
{% endtab %}
{% endtabs %}

## Working with data models

You can also pass entire data models as a value for interpolation.

Keys

```javascript
{
    "key": "I am {{author.name}}"
}
```

Sample

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const author = { 
    name: 'Jan',
    github: 'jamuhl'
};
i18next.t('key', { author });
// -> "I am Jan"
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
const author = { 
    name: 'Jan',
    github: 'jamuhl'
};
i18next.t($ => $.key, { author });
// -> "I am Jan"
```
{% endtab %}
{% endtabs %}

## Unescape

By default, the values get escaped to mitigate XSS attacks. You can toggle escaping off, by either putting `-` before the key, or set the `escapeValue` option to `false` when requesting a translation.

Keys

```javascript
{
    "keyEscaped": "no danger {{myVar}}",
    "keyUnescaped": "dangerous {{- myVar}}"
}
```

Sample

{% tabs %}
{% tab title="JavaScript" %}
```javascript
i18next.t('keyEscaped', { myVar: '<img />' });
// -> "no danger &lt;img &#x2F;&gt;"

i18next.t('keyUnescaped', { myVar: '<img />' });
// -> "dangerous <img />"

i18next.t('keyEscaped', { myVar: '<img />', interpolation: { escapeValue: false } });
// -> "no danger <img />" (obviously could be dangerous)
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
i18next.t($ => $.keyEscaped, { myVar: '<img />' });
// -> "no danger &lt;img &#x2F;&gt;"

i18next.t($ => $.keyUnescaped, { myVar: '<img />' });
// -> "dangerous <img />"

i18next.t($ => $.keyEscaped, { myVar: '<img />', interpolation: { escapeValue: false } });
// -> "no danger <img />" (obviously could be dangerous)
```
{% endtab %}
{% endtabs %}

_Warning:_ If you toggle escaping off, escape any user input yourself!

## Additional options

Prefix/Suffix for interpolation and other options can be overridden in the init options or by passing additional options to the `t` function:

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

| option              | default  | description                                                                                                                              |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| escape              | function | escape function `function escape(str) { return str; }`                                                                                   |
| escapeValue         | true     | escapes passed in values to avoid XSS injection                                                                                          |
| useRawValueToEscape | false    | If true, then value passed into escape function is not casted to string, use with custom escape function that does its own type-checking |
| prefix              | "\{{"    | prefix for interpolation                                                                                                                 |
| suffix              | "\}}"    | suffix for interpolation                                                                                                                 |

While there are a lot of options going with the defaults should get you covered.

## All interpolation options

| option                  | default                                                  | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| format                  | noop function                                            | format function, read [formatting](formatting.md) for details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| formatSeparator         | ","                                                      | used to separate format from interpolation value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| escape                  | function                                                 | escape function `function escape(str) { return str; }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| escapeValue             | true                                                     | escape passed in values to avoid XSS injection                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| useRawValueToEscape     | false                                                    | If true, then value passed into escape function is not casted to string, use with custom escape function that does its own type-checking                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| prefix                  | "\{{"                                                    | prefix for interpolation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| suffix                  | "\}}"                                                    | suffix for interpolation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| prefixEscaped           | undefined                                                | escaped prefix for interpolation (regexSafe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| suffixEscaped           | undefined                                                | escaped suffix for interpolation (regexSafe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| unescapeSuffix          | undefined                                                | suffix to unescaped mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| unescapePrefix          | "-"                                                      | prefix to unescaped mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| nestingPrefix           | "$t("                                                    | prefix for [nesting](nesting.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| nestingSuffix           | ")"                                                      | suffix for [nesting](nesting.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| nestingPrefixEscaped    | undefined                                                | escaped prefix for nesting (regexSafe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| nestingSuffixEscaped    | undefined                                                | escaped suffix for nesting (regexSafe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| nestingOptionsSeparator | ","                                                      | separates the options from nesting key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| defaultVariables        | undefined                                                | global variables to use in interpolation replacements `defaultVariables: { key: "value" }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| maxReplaces             | 1000                                                     | after how many interpolation runs to break out before throwing a stack overflow                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| skipOnVariables         | <p>true</p><p><em>(was false for &#x3C;v21.0.0)</em></p> | <p>Will skip to interpolate the variables, example:</p><p><code>t('key', { a: '$t(nested)' })</code></p><p>this will not resolve the nested key and will use<code>$t(nested)</code> as the variable value.<br>Another example:</p><p><code>t('key', { a: '{{otherVar}}': otherVar: 'another value' })</code></p><p>this will not resolve the otherVar variable and will use<code>{{otherVar}}</code>as the variable value.</p><p><strong>If your interpolation variables are user provided or loaded from an external source, we strongly suggest to keep this option to true.</strong></p><p><em>If you know what you're doing, you can also set this to false.</em></p> |

## Implications for localization

Checkout the [best practices](../principles/best-practices.md#implications-of-interpolation-for-localization) on this topic.
