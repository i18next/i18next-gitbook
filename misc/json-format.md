# JSON Format

{% hint style="info" %}
Do you prefer the ICU format? Then use the [i18next-icu](https://github.com/i18next/i18next-icu) plugin.
{% endhint %}

## i18next JSON v4

```javascript
{
  "key": "value",
  "keyDeep": {
    "inner": "value"
  },
  "keyNesting": "reuse $t(keyDeep.inner)",
  "keyInterpolate": "replace this {{value}}",
  "keyInterpolateUnescaped": "replace this {{- value}}",
  "keyInterpolateWithFormatting": "replace this {{value, format}}",
  "keyContext_male": "the male variant",
  "keyContext_female": "the female variant",
  "keyPluralSimple_one": "the singular",
  "keyPluralSimple_other": "the plural",
  "keyPluralMultipleEgArabic_zero": "the plural form 0",
  "keyPluralMultipleEgArabic_one": "the plural form 1",
  "keyPluralMultipleEgArabic_two": "the plural form 2",
  "keyPluralMultipleEgArabic_few": "the plural form 3",
  "keyPluralMultipleEgArabic_many": "the plural form 4",
  "keyPluralMultipleEgArabic_other": "the plural form 5",
  "keyWithArrayValue": ["multiple", "things"],
  "keyWithObjectValue": { "valueA": "return this with valueB", "valueB": "more text" }
}
```

These are the defaults. Nesting and Interpolation formats are configurable.

To learn more about the features check the documentation:

* [Interpolation](../translation-function/interpolation.md)
* [Formatting](../translation-function/formatting.md)
* [Plurals](../translation-function/plurals.md)
* [Nesting](../translation-function/nesting.md)
* [Objects and Arrays](../translation-function/objects-and-arrays.md)

The only difference to _v3_ is the plural suffixes.

You may need to [polyfill](https://github.com/eemeli/intl-pluralrules) the [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules) API, in case it is not available it will fallback to the [i18next JSON format v3](json-format.md#i-18-next-json-v3) plural handling.

To convert your existing translations to the new v4 format, have a look at [i18next-v4-format-converter](https://github.com/i18next/i18next-v4-format-converter) or [this web tool](https://i18next.github.io/i18next-v4-format-converter-web/). _(It will only handle keys with the default pluralSeparator `_`)_

## i18next JSON v3

enabled by:

```javascript
i18next.init({
  compatibilityJSON: 'v3'
});
```

formats:

```javascript
{
  "key": "value",
  "keyDeep": {
    "inner": "value"
  },
  "keyNesting": "reuse $t(keyDeep.inner)",
  "keyInterpolate": "replace this {{value}}",
  "keyInterpolateUnescaped": "replace this {{- value}}",
  "keyInterpolateWithFormatting": "replace this {{value, format}}",
  "keyContext_male": "the male variant",
  "keyContext_female": "the female variant",
  "keyPluralSimple": "the singular",
  "keyPluralSimple_plural": "the plural",
  "keyPluralMultipleEgArabic_0": "the plural form 0",
  "keyPluralMultipleEgArabic_1": "the plural form 1",
  "keyPluralMultipleEgArabic_2": "the plural form 2",
  "keyPluralMultipleEgArabic_3": "the plural form 3",
  "keyPluralMultipleEgArabic_4": "the plural form 4",
  "keyPluralMultipleEgArabic_5": "the plural form 5",
  "keyWithArrayValue": ["multiple", "things"],
  "keyWithObjectValue": { "valueA": "return this with valueB", "valueB": "more text" }
}
```

The only difference to _v2_ is the plural suffixes for languages with multiple plural forms.

## i18next JSON v2

enabled by:

```javascript
i18next.init({
  compatibilityJSON: 'v2'
});
```

formats:

```javascript
{
  "key": "value",
  "keyDeep": {
    "inner": "value"
  },
  "keyNesting": "reuse $t(keyDeep.inner)",
  "keyInterpolate": "replace this {{value}}",
  "keyInterpolateUnescaped": "replace this {{- value}}",
  "keyContext_male": "the male variant",
  "keyContext_female": "the female variant",
  "keyPluralSimple": "the singular",
  "keyPluralSimple_plural": "the plural",
  "keyPluralMultipleEgArabic_0": "the plural form 0",
  "keyPluralMultipleEgArabic_1": "the plural form 1",
  "keyPluralMultipleEgArabic_2": "the plural form 2",
  "keyPluralMultipleEgArabic_3": "the plural form 3",
  "keyPluralMultipleEgArabic_11": "the plural form 4",
  "keyPluralMultipleEgArabic_100": "the plural form 5"
}
```

These are the defaults. Nesting and Interpolation formats are configurable.

## i18next JSON v1

enabled by:

```javascript
i18next.init({
  compatibilityJSON: 'v1'
});
```

formats:

```javascript
{
  "key": "value",
  "keyDeep": {
    "inner": "value"
  },
  "keyNesting": "reuse $t(keyDeep.inner)",
  "keyInterpolate": "replace this __value__",
  "keyInterpolateUnescaped": "replace this __valueHTML__",
  "keyContext_male": "the male variant",
  "keyContext_female": "the female variant",
  "keyPluralSimple": "the singular",
  "keyPluralSimple_plural": "the plural",
  "keyPluralMultipleEgArabic": "the plural form 0",
  "keyPluralMultipleEgArabic_plural_1": "the plural form 1",
  "keyPluralMultipleEgArabic_plural_2": "the plural form 2",
  "keyPluralMultipleEgArabic_plural_3": "the plural form 3",
  "keyPluralMultipleEgArabic_plural_11": "the plural form 4",
  "keyPluralMultipleEgArabic_plural_100": "the plural form 5"
}
```

These are the defaults. Nesting and Interpolation formats are configurable.
