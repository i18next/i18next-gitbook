<!-- toc -->
# Interpolation

Interpolation is one of the most used functionality used. It enables you to integrate dynamic values into your translations.

Per default those interpolations get escaped to safe you from possible xss attacks.

If you do not like the interpolation functionality provided you can use [i18next-sprintf-postProcessor](https://github.com/i18next/i18next-sprintf-postProcessor) for sprintf supported interpolation.


## Basic
{% method %}


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


## Working with data models
{% method %}

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




## Unescape
{% method %}


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

i18next.t('keyEscaped', { myVar: '<img />', interpolation: { escapeValue: false } });
// -> "no danger <img />" (obviously could be dangerous)

```

*Dangerzone:* Toggling escaping off you should escape any user input yourself!


{% endmethod %}




## Additional options
{% method %}

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
escape            | function            | escape function `function escape(str) { return str; }`
escapeValue       | true                | escapes passed in values to avoid xss injection
prefix            | "\{\{"                | prefix for interpolation
suffix            | "\}\}"                | suffix for interpolation
 from interpolation value
prefixEscaped     | undefined           | escaped prefix for interpolation (regexSafe)
suffixEscaped     | undefined           | escaped suffix for interpolation (regexSafe)
unescapeSuffix    | undefined           | suffix to unescaped mode
unescapePrefix    | "-"                 | prefix to unescaped mode
defaultVariables  | undefined           | default variables to use in interpolation replacements

While there are a lot of options going with the defaults should get you covered.


## all interpolation options

option            | default             | description
----------------- | --------------------| -----------------
format            | noop function       | format function see [formatting](/formatting.md) for details
formatSeparator   | ","                 | used to separate format from interpolation value
escape            | function            | escape function `function escape(str) { return str; }`
escapeValue       | true                | escape passed in values to avoid xss injection
prefix            | "\{\{"                | prefix for interpolation
suffix            | "\}\}"                | suffix for interpolation
prefixEscaped     | undefined           | escaped prefix for interpolation (regexSafe)
suffixEscaped     | undefined           | escaped suffix for interpolation (regexSafe)
unescapeSuffix    | undefined           | suffix to unescaped mode
unescapePrefix    | "-"                 | prefix to unescaped mode
nestingPrefix     | "$t("               | prefix for [nesting](/nesting.md)
nestingSuffix     | ")"                 | suffix for nesting
nestingPrefixEscaped     | undefined               | escaped prefix for nesting (regexSafe)
nestingSuffixEscaped     | undefined               | escaped suffix for nesting (regexSafe)
defaultVariables  | undefined           | global variables to use in interpolation replacements

