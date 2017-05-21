<!-- toc -->
# Translation Function

After initializing i18next the function you will use most is the `t` function.

{% method %}
## Interpolation

Interpolation is one of the most used functionality.

keys

```json
{
    "key": "{{what}} is {{how}}",
    "keyDeep": "i am {{author.what}}",
    "keyEscaped": "no danger {{myVar}}",
    "keyUnescaped": "dangerous {{- myVar}}"
}
```

{% sample lang="js" %}
Calling t function with options

```js
i18next.t('key', { what: 'i18next', how: 'great' });
// -> "i18next is great"

i18next.t('keyDeep', { author: { what: 'happy' } });
// -> "i am happy"

// ESCAPE / UNESCAPE
i18next.t('keyEscaped', { myVar: '<img />' });
// -> "no danger &lt;img &#x2F;&gt;"
i18next.t('keyUnescaped', { myVar: '<img />' });
// -> "dangerous <img />"
```

{% common %}
Prefix/Suffix for interpolation and other options can be overridden in init option or by passing additional options to t function:


option            | default             | description
----------------- | --------------------| -----------------
format            | noop function       | format function `function format(value, format, lng) {}`
escape            | function            | escape function `function escape(str) { return str; }`
escapeValue       | true                | escapes passed in values to avoid xss injection
prefix            | '{{'                | prefix for interpolation
suffix            | '}}'                | suffix for interpolation
formatSeparator   | ','                 | used to separate format from interpolation value
prefixEscaped     | undefined           | escaped prefix for interpolation (regexSafe)
suffixEscaped     | undefined           | escaped suffix for interpolation (regexSafe)
unescapeSuffix    | undefined           | suffix to unescaped mode
unescapePrefix    | '-'                 | prefix to unescaped mode
nestingPrefix     | '$t('               | prefix for nesting
nestingSuffix     | ')'                 | suffix for nesting
nestingPrefixEscaped     | undefined               | escaped prefix for nesting (regexSafe)
nestingSuffixEscaped     | undefined               | escaped suffix for nesting (regexSafe)
defaultVariables  | undefined           | default variables to use in interpolation replacements

{% endmethod %}


{% method %}
## Plurals

Plurals are commonly used

keys

```json
{
  "key": "item",
  "key_plural": "items",
  "keyWithCount": "{{count}} item",
  "keyWithCount_plural": "{{count}} items"
}
```

{% sample lang="js" %}
Calling t function with options

```js
i18next.t('key', {count: 0}); // -> "items"
i18next.t('key', {count: 1}); // -> "item"
i18next.t('key', {count: 5}); // -> "items"
i18next.t('key', {count: 100}); // -> "items"
i18next.t('keyWithCount', {count: 0}); // -> "0 items"
i18next.t('keyWithCount', {count: 1}); // -> "1 item"
i18next.t('keyWithCount', {count: 5}); // -> "5 items"
i18next.t('keyWithCount', {count: 100}); // -> "100 items"
```
{% common %}
Plural can be combined with interpolation, context, ...

{% endmethod %}

