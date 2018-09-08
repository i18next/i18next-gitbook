# Essentials

## Essentials

### Accessing keys

keys

```javascript
{
    "key": "value of key",
    "look": {
        "deep": "value of look deep"
    }
}
```

sample

```javascript
i18next.t('key');
// -> "value of key"

i18next.t('look.deep');
// -> "value of look deep"
```

### Accessing keys in different namespaces

Namespaces are a feature in i18next internationalization framework which allows you to separate translations that get loaded into multiple files.

init

```javascript
i18next.init({
  ns: ['common', 'moduleA'],
  defaultNS: 'moduleA'
});
```

moduleA.json

```javascript
{
    "name": "Module A"
}
```

common.json

```javascript
{
    "button": {
        "save": "save"
    }
}
```

sample

```javascript
i18next.t('name');
// -> "Module A"

i18next.t('common:button.save');
// -> "save"
```

### Multiple fallback keys

Calling the t function with an array of keys enables you to translate dynamic keys providing a non specific fallback value.

As a sample think of an error code you get and you like to show a specific warning in some cases:

keys

```javascript
{
  "error": {
    "unspecific": "Something went wrong.",
    "404": "The page was not found."
  }
}
```

sample

```javascript
// const error = '404';
i18next.t([`error.${error}`, 'error.unspecific']); // -> "The page was not found"

// const error = '502';
i18next.t([`error.${error}`, 'error.unspecific']); // -> "Something went wrong"
```

### Overview options

`i18next.t(key, options)`

| option | description |
| :--- | :--- |
| defaultValue | defaultValue to return if a translation was not found |
| count | count value used for [plurals](plurals.md) |
| context | used for [contexts](context.md) \(eg. male / female\) |
| replace | object with vars for [interpolation](interpolation.md) - or put them directly in options |
| lng | override language to use |
| lngs | override languages to use |
| fallbackLng | override language to lookup key if not found see [fallbacks](../principles/fallback.md) for details |
| ns | override namespaces \(string or array\) |
| keySeparator | override char to separate keys |
| nsSeparator | override char to split namespace from key |
| returnObjects | accessing an object not a translation string \(can be set globally too\) |
| joinArrays | char, eg. '\n' that arrays will be joined by \(can be set globally too\) |
| postProcess | string or array of postProcessors to apply see  [interval plurals](plurals.md) as a sample |
| interpolation | override [interpolation options](interpolation.md) |
| skipInterpolation | skip interpolation and nesting for this call to t function |

