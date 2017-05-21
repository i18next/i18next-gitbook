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
    "key": "The current date is {{date, MM/DD/YYYY}}",
    "key2": "{{text, uppercase}} just uppercased"
}
```

Init i18next with a format function:

```js
i18next.init({
    interpolation: {
        format: function(value, format, lng) {
            if (format === 'uppercase') return value.toUpperCase();
            if(value instanceof Date) return moment(value).format(format);
            return value;
        }
    }
});
```

{% sample lang="js" %}
sample

```js
i18next.t('key', { date: new Date() });
// -> "The current date is 07/13/2016"

i18next.t('key2', { text: 'can you hear me' });
// => "CAN YOU HEAR ME just uppercased"
```

Keep the language on moment in sync with i18next by listening to the change language event:

```js
i18next.on('languageChanged', function(lng) {
  moment.locale(lng);
});
```

{% endmethod %}


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


