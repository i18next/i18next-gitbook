<!-- toc -->
# Formatting

You can define a function to handle formattings. Beside formatting numbers or dates you can use this to define custom formattings.

You can add formatting using [moment.js](http://momentjs.com/) and [numeral.js](http://numeraljs.com/) or the [intl api](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl).



{% method %}
## Basic

As a sample using momentjs to format dates.

keys

```json
{
    "key": "The current date is {{date, MM/DD/YYYY}}"
}
```

Init i18next with a format function:

```js
i18next.init({
    interpolation: {
        format: function(value, format, lng) {
            if(value instanceof Date) return moment(value).format(format);
            return value;
        }
    }
});
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

i18next.t('keyEscaped', { myVar: '<img />', interpolation: { escapeValue: false } });
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


