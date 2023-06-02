# Interpolation

Interpolation is one of the most used functionalities in I18N. It allows integrating dynamic values into your translations.

Per default, interpolation values get escaped to mitigate XSS attacks.

{% hint style="info" %}
🎓 Check out this topic in the [i18next crash course video](https://youtu.be/SA\_9i4TtxLQ?t=433).
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

```javascript
i18next.t('key', { what: 'i18next', how: 'great' });
// -> "i18next is great"
```

## Working with data models

You can also pass entire data models as a value for interpolation.

Keys

```javascript
{
    "key": "I am {{author.name}}"
}
```

Sample

```javascript
const author = { 
    name: 'Jan',
    github: 'jamuhl'
};
i18next.t('key', { author });
// -> "I am Jan"
```

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

```javascript
i18next.t('keyEscaped', { myVar: '<img />' });
// -> "no danger &lt;img &#x2F;&gt;"

i18next.t('keyUnescaped', { myVar: '<img />' });
// -> "dangerous <img />"

i18next.t('keyEscaped', { myVar: '<img />', interpolation: { escapeValue: false } });
// -> "no danger <img />" (obviously could be dangerous)
```

_Warning:_ If you toggle escaping off, escape any user input yourself!

## Additional options

Prefix/Suffix for interpolation and other options can be overridden in the init options or by passing additional options to the `t` function:

```javascript
i18next.init({
    interpolation: { ... }
});

i18next.t('key', {
    interpolation: { ... }
});
```

| option              | default  | description                                                                                                                              |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| escape              | function | escape function `function escape(str) { return str; }`                                                                                   |
| escapeValue         | true     | escapes passed in values to avoid XSS injection                                                                                          |
| useRawValueToEscape | false    | If true, then value passed into escape function is not casted to string, use with custom escape function that does its own type-checking |
| prefix              | "\{{"    | prefix for interpolation                                                                                                                 |
| suffix              | "\}}"    | suffix for interpolation                                                                                                                 |

While there are a lot of options going with the defaults should get you covered.

## All interpolation options

| option                  | default                                                          | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| format                  | noop function                                                    | format function, read [formatting](formatting.md) for details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| formatSeparator         | ","                                                              | used to separate format from interpolation value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| escape                  | function                                                         | escape function `function escape(str) { return str; }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| escapeValue             | true                                                             | escape passed in values to avoid XSS injection                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| useRawValueToEscape     | false                                                            | If true, then value passed into escape function is not casted to string, use with custom escape function that does its own type-checking                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| prefix                  | "\{{"                                                            | prefix for interpolation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| suffix                  | "\}}"                                                            | suffix for interpolation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| prefixEscaped           | undefined                                                        | escaped prefix for interpolation (regexSafe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| suffixEscaped           | undefined                                                        | escaped suffix for interpolation (regexSafe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| unescapeSuffix          | undefined                                                        | suffix to unescaped mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| unescapePrefix          | "-"                                                              | prefix to unescaped mode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| nestingPrefix           | "$t("                                                            | prefix for [nesting](nesting.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| nestingSuffix           | ")"                                                              | suffix for [nesting](nesting.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| nestingPrefixEscaped    | undefined                                                        | escaped prefix for nesting (regexSafe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| nestingSuffixEscaped    | undefined                                                        | escaped suffix for nesting (regexSafe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| nestingOptionsSeparator | ","                                                              | separates the options from nesting key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| defaultVariables        | undefined                                                        | global variables to use in interpolation replacements `defaultVariables: { key: "value" }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| maxReplaces             | 1000                                                             | after how many interpolation runs to break out before throwing a stack overflow                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| skipOnVariables         | <p>true</p><p></p><p><em>(was false for  &#x3C;v21.0.0)</em></p> | <p>Will skip to interpolate the variables, example:</p><p><code>t('key', { a: '$t(nested)' })</code></p><p>this will not resolve the nested key and will use<code>$t(nested)</code> as the variable value.<br>Another example:</p><p><code>t('key', { a: '{{otherVar}}': otherVar: 'another value' })</code></p><p>this will not resolve the otherVar variable and will use<code>{{otherVar}}</code>as the variable value.</p><p><strong>If your interpolation variables are user provided or loaded from an external source, we strongly suggest to keep this option to true.</strong></p><p><em>If you know what you're doing, you can also set this to false.</em></p> |

## Cautionary note regarding interpolation

To improve translatability and reduce linguistic bug churn, use interpolation sparingly. Use interpolation for values that can only be known at runtime, such as 
* Time stamps
* User-inputted data

Fundamentally what interpolation does is concatonate pieces of text. When translating into other languages concatonation can cause real problems. Use multiple independent self-contained strings instead. English grammatical sentence structure cannot be programmatically forced on other languages. Only use interpolation for substrings if you are using a multilingual grammar engine.

A simple example here shows how an infinitive "to rejoin" is split between two strings. In German the preposition "to" is embedded in the middle of a separable verb "teilnehmen" when used in this particular sentence. In other words, "to rejoin" needs to translate to "erneut teilzunehmen" and so the preposition "to" cannot exist in a string separate from "rejoin" in this case. 

|---------| Source English                                          | Target German                                                                        | 
|---------| --------------------------------------------------------| -------------------------------------------------------------------------------------|
|String1  | Please wait while we resolve the issue or try to        | Warten Sie, während wir das Problem beheben oder versuchen Sie zu                    |
|String2  | Rejoin                                                  | Erneut teilnehmen                                                                    |
|Corrected| Please wait while we resolve the issue or try to Rejoin | Warten Sie, während wir das Problem beheben oder versuchen Sie, erneut teilzunehmen. |

If a German linguist "fixes" these strings so they appear translated correctly at runtime the linguist will undoubtably also be breaking another version of this string when a different value is passed.
