<!-- toc -->
# Interpolation

Interpolation is one of the most used functionality used. It enables you to integrate dynamic values into your translations.

Per default those interpolations get escaped to safe you from possible xss attacks.

{% method %}
## Basic

Interpolation is one of the most used functionality.

keys

```json
{
    "key": "{{what}} is {{how}}"
}
```

{% sample lang="js" %}
sample

```js
i18next.t('key', { what: 'i18next', how: 'great' });
// -> "i18next is great"
```

{% endmethod %}

{% method %}
## Working with data models

You can pass entire data models in options.

keys

```json
{
    "key": "i am {{author.name}}"
}
```

{% sample lang="js" %}
sample

```js
const author = { 
    name: 'Jan',
    github: 'jamuhl'
};
i18next.t('key', { author });
// -> "i am Jan"
```

{% endmethod %}




{% method %}
## Unescape

Per default the values get escaped to safe from possible xss attacks. You can toggle escaping off.

keys

```json
{
    "keyEscaped": "no danger {{myVar}}",
    "keyUnescaped": "dangerous {{- myVar}}"
}
```

{% sample lang="js" %}
sample

```js
i18next.t('keyEscaped', { myVar: '<img />' });
// -> "no danger &lt;img &#x2F;&gt;"

i18next.t('keyUnescaped', { myVar: '<img />' });
// -> "dangerous <img />"

i18next.t('keyEscaped', { myVar: '<img />', interpolation: { escape: false } });
// -> "no danger <img />" (obviously could be dangerous)

```

*Dangerzone:* Toggling escaping off you should escape any user input yourself!


{% endmethod %}



{% method %}
## Additional options

Prefix/Suffix for interpolation and other options can be overridden in init option or by passing additional options to t function:

{% sample lang="js" %}
sample

```js
i18next.init({
    interpolation: { ... }
});

i18next.t('key', {
    interpolation: { ... }
});
```
{% endmethod %}




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

While there are a lot of options going with the defaults should get you covered.


