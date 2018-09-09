# Interpolation

## Interpolation

Interpolation is one of the most used functionalities in I18N. It enables you to integrate dynamic values into your translations.

Per default, interpolation values get escaped to save you from possible xss attacks.

If the interpolation functionality provided doesn't suit you, you can use [i18next-sprintf-postProcessor](https://github.com/i18next/i18next-sprintf-postProcessor) for sprintf supported interpolation.

### Basic

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

### Working with data models

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

### Unescape

Per default the values get escaped to save you from possible xss attacks. You can toggle escaping off, by either putting `-` before the key, or set the `escapeValue` option to `false` when requesting a translation.

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

_Warning:_ If you toggle escaping off, you should escape any user input yourself!

### Additional options

Prefix/Suffix for interpolation and other options can be overridden in the init options or by passing additional options to the `t` function:

```javascript
i18next.init({
    interpolation: { ... }
});

i18next.t('key', {
    interpolation: { ... }
});
```

| option | default | description |
| :--- | :--- | :--- |
| escape | function | escape function `function escape(str) { return str; }` |
| escapeValue | true | escapes passed in values to avoid xss injection |
| useRawValueToEscape | false | If true, then value passed into escape function is not casted to string, use with custom escape function that does its own type check |
| prefix | "{{" | prefix for interpolation |
| suffix | "}}" | suffix for interpolation |

While there are a lot of options going with the defaults should get you covered.

### All interpolation options

| option | default | description |
| :--- | :--- | :--- |
| format | noop function | format function see [formatting](formatting.md) for details |
| formatSeparator | "," | used to separate format from interpolation value |
| escape | function | escape function `function escape(str) { return str; }` |
| escapeValue | true | escape passed in values to avoid xss injection |
| useRawValueToEscape | false | If true, then value passed into escape function is not casted to string, use with custom escape function that does its own type check |
| prefix | "{{" | prefix for interpolation |
| suffix | "}}" | suffix for interpolation |
| prefixEscaped | undefined | escaped prefix for interpolation \(regexSafe\) |
| suffixEscaped | undefined | escaped suffix for interpolation \(regexSafe\) |
| unescapeSuffix | undefined | suffix to unescaped mode |
| unescapePrefix | "-" | prefix to unescaped mode |
| nestingPrefix | "$t\(" | prefix for [nesting](nesting.md) |
| nestingSuffix | "\)" | suffix for nesting |
| nestingPrefixEscaped | undefined | escaped prefix for nesting \(regexSafe\) |
| nestingSuffixEscaped | undefined | escaped suffix for nesting \(regexSafe\) |
| defaultVariables | undefined | global variables to use in interpolation replacements `defaultVariables: { key: "value" }` |
| maxReplaces | 1000 | after how many interpolation runs to break out before throwing a stack overflow |

