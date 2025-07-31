# Formatting

Starting with **i18next>=21.3.0** you can use the built-in formatting functions based on the [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

_You may need to_ [_polyfill_](https://formatjs.io/docs/polyfills/) _the Intl API:_

* [_Intl.PluralRules_](https://formatjs.io/docs/polyfills/intl-pluralrules)
* [_Intl.RelativeTimeFormat_](https://formatjs.io/docs/polyfills/intl-relativetimeformat)
* [_Intl.ListFormat_](https://formatjs.io/docs/polyfills/intl-listformat)
* [_Intl.DisplayNames_](https://formatjs.io/docs/polyfills/intl-displaynames)
* [_Intl.NumberFormat_](https://formatjs.io/docs/polyfills/intl-numberformat) _(ES2020)_
* [_Intl.Locale_](https://formatjs.io/docs/polyfills/intl-locale)
* [_Intl.getCanonicalLocales_](https://formatjs.io/docs/polyfills/intl-getcanonicallocales)
* [_Intl.DateTimeFormat_](https://formatjs.io/docs/polyfills/intl-datetimeformat) _(ES2020)_

{% hint style="info" %}
🎓 Check out this topic in the [i18next crash course video](https://youtu.be/SA_9i4TtxLQ?t=557).
{% endhint %}

## Basic usage

The translation string has the following signature:

```json
{
  "key": "Some format {{value, formatname}}",
  "keyWithOptions": "Some format {{value, formatname(option1Name: option1Value; option2Name: option2Value)}}"
}
```

{% hint style="info" %}
Use a "semicolon" delimited list of options.
{% endhint %}

{% tabs %}
{% tab title="JavaScript" %}
Passing options to the formatting:

1. In the translation string using `{{value, formatname(options1: options1Value)}}`
2. Using the root level options when calling `t('key', { option1: option1Value })`
3. Using the per value options like: `t('key', { formatParams: { value: { option1: option1Value } })`

Samples

```javascript
// JSON
{
  "intlNumber": "Some {{val, number}}",
  "intlNumberWithOptions": "Some {{val, number(minimumFractionDigits: 2)}}"
}

i18next.t('intlNumber', { val: 1000 });
// --> Some 1,000
i18next.t('intlNumber', { val: 1000.1, minimumFractionDigits: 3 });
// --> Some 1,000.100
i18next.t('intlNumber', { val: 1000.1, formatParams: { val: { minimumFractionDigits: 3 } } });
// --> Some 1,000.100
i18next.t('intlNumberWithOptions', { val: 2000 });
// --> Some 2,000.00
i18next.t('intlNumberWithOptions', { val: 2000, minimumFractionDigits: 3 });
// --> Some 2,000.000
```
{% endtab %}

{% tab title="TypeScript" %}
Passing options to the formatting:

1. In the translation string using `{{value, formatname(options1: options1Value)}}`
2. Using the root level options when calling `t($ => $.key, { option1: option1Value })`
3. Using the per value options like: `t($ => $.key, { formatParams: { value: { option1: option1Value } })`

Samples

```typescript
// JSON
{
  "intlNumber": "Some {{val, number}}",
  "intlNumberWithOptions": "Some {{val, number(minimumFractionDigits: 2)}}"
}

i18next.t($ => $.intlNumber, { val: 1000 });
// --> Some 1,000
i18next.t($ => $.intlNumber, { val: 1000.1, minimumFractionDigits: 3 });
// --> Some 1,000.100
i18next.t($ => $.intlNumber, { val: 1000.1, formatParams: { val: { minimumFractionDigits: 3 } } });
// --> Some 1,000.100
i18next.t($ => $.intlNumberWithOptions, { val: 2000 });
// --> Some 2,000.00
i18next.t($ => $.intlNumberWithOptions, { val: 2000, minimumFractionDigits: 3 });
// --> Some 2,000.000
```
{% endtab %}
{% endtabs %}

#### Overriding the language to use

The language can be overridden by passing it in t.options

{% tabs %}
{% tab title="JavaScript" %}
```javascript
i18next.t('intlNumber', { val: 1000.1, lng: 'de' }); 
// or: i18next.t('intlNumber', { val: 1000.1, locale: 'de' });
i18next.t('intlNumber', { val: 1000.1, formatParams: { val: { lng: 'de' } } });
// or: i18next.t('intlNumber', { val: 1000.1, formatParams: { val: { locale: 'de' } } });
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
i18next.t($ => $.intlNumber, { val: 1000.1, lng: 'de' }); 
// or: i18next.t($ => $.intlNumber, { val: 1000.1, locale: 'de' });
i18next.t($ => $.intlNumber, { val: 1000.1, formatParams: { val: { lng: 'de' } } }); 
// or: i18next.t($ => $.intlNumber, { val: 1000.1, formatParams: { val: { locale: 'de' } } });
```
{% endtab %}
{% endtabs %}

#### Adding custom format function

It's rather simple to add own function:

```javascript
// after i18next.init(options);
i18next.services.formatter.add('lowercase', (value, lng, options) => {
  return value.toLowerCase();
});
i18next.services.formatter.add('underscore', (value, lng, options) => {
  return value.replace(/\s+/g, '_');
});
```

{% hint style="warning" %}
Make sure you add your custom format function **AFTER** the `i18next.init()` call.
{% endhint %}

There's also an addCached version for optimized performance:

```javascript
i18next.services.formatter.addCached('specialformat', (lng, options) => {
  const formatter = new Intl.NumberFormat(lng, options);
  return (val) => formatter.format(val);
});
```

#### Using multiple formatters

```json
{
  "key": "Some format {{value, formatter1, formatter2}}"
}
```

## Built-in formats

### Number

{% tabs %}
{% tab title="JavaScript" %}
```javascript
// JSON
{
  "intlNumber": "Some {{val, number}}",
  "intlNumberWithOptions": "Some {{val, number(minimumFractionDigits: 2)}}"
}

i18next.t('intlNumber', { val: 1000 });
// --> Some 1,000
i18next.t('intlNumber', { val: 1000.1, minimumFractionDigits: 3 });
// --> Some 1,000.100
i18next.t('intlNumber', { val: 1000.1, formatParams: { val: { minimumFractionDigits: 3 } } });
// --> Some 1,000.100
i18next.t('intlNumberWithOptions', { val: 2000 });
// --> Some 2,000.00
i18next.t('intlNumberWithOptions', { val: 2000, minimumFractionDigits: 3 });
// --> Some 2,000.000
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
// JSON
{
  "intlNumber": "Some {{val, number}}",
  "intlNumberWithOptions": "Some {{val, number(minimumFractionDigits: 2)}}"
}

i18next.t($ => $.intlNumber, { val: 1000 });
// --> Some 1,000
i18next.t($ => $.intlNumber, { val: 1000.1, minimumFractionDigits: 3 });
// --> Some 1,000.100
i18next.t($ => $.intlNumber, { val: 1000.1, formatParams: { val: { minimumFractionDigits: 3 } } });
// --> Some 1,000.100
i18next.t($ => $.intlNumberWithOptions, { val: 2000 });
// --> Some 2,000.00
i18next.t($ => $.intlNumberWithOptions, { val: 2000, minimumFractionDigits: 3 });
// --> Some 2,000.000
```
{% endtab %}
{% endtabs %}

For options see: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Intl/NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

### Currency

{% tabs %}
{% tab title="JavaScript" %}
```javascript
// JSON
{
  "intlCurrencyWithOptionsSimplified": "The value is {{val, currency(USD)}}",
  "intlCurrencyWithOptions": "The value is {{val, currency(currency: USD)}}",
  "twoIntlCurrencyWithUniqueFormatOptions": "The value is {{localValue, currency}} or {{altValue, currency}}",
}

i18next.t('intlCurrencyWithOptionsSimplified', { val: 2000 });
// --> The value is $2,000.00
i18next.t('intlCurrencyWithOptions', { val: 2300 });
// --> The value is $2,300.00
i18next.t('twoIntlCurrencyWithUniqueFormatOptions',
          {
            localValue: 12345.67,
            altValue: 16543.21,
            formatParams: {
              localValue: { currency: 'USD', locale: 'en-US' },
              altValue: { currency: 'CAD', locale: 'fr-CA' },
            },
          },);
// --> The value is $12,345.67 or 16 543,21 $ CA
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
// JSON
{
  "intlCurrencyWithOptionsSimplified": "The value is {{val, currency(USD)}}",
  "intlCurrencyWithOptions": "The value is {{val, currency(currency: USD)}}",
  "twoIntlCurrencyWithUniqueFormatOptions": "The value is {{localValue, currency}} or {{altValue, currency}}",
}

i18next.t($ => $.intlCurrencyWithOptionsSimplified, { val: 2000 });
// --> The value is $2,000.00
i18next.t($ => $.intlCurrencyWithOptions, { val: 2300 });
// --> The value is $2,300.00
i18next.t($ => $.twoIntlCurrencyWithUniqueFormatOptions,
          {
            localValue: 12345.67,
            altValue: 16543.21,
            formatParams: {
              localValue: { currency: 'USD', locale: 'en-US' },
              altValue: { currency: 'CAD', locale: 'fr-CA' },
            },
          },);
// --> The value is $12,345.67 or 16 543,21 $ CA
```
{% endtab %}
{% endtabs %}

For options see: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Intl/NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

### DateTime

{% tabs %}
{% tab title="JavaScript" %}
```javascript
// JSON
{
  "intlDateTime": "On the {{val, datetime}}",
}

i18next.t('intlDateTime', { val: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)) });
// --> On the 12/20/2012
i18next.t('intlDateTime',
          {
            val: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)),
            formatParams: {
              val: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
            },
          });
// --> On the Thursday, December 20, 2012
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
// JSON
{
  "intlDateTime": "On the {{val, datetime}}",
}

i18next.t($ => $.intlDateTime, { val: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)) });
// --> On the 12/20/2012
i18next.t($ => $.intlDateTime,
          {
            val: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)),
            formatParams: {
              val: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
            },
          });
// --> On the Thursday, December 20, 2012
```
{% endtab %}
{% endtabs %}

For options see: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Intl/DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

### RelativeTime

{% tabs %}
{% tab title="JavaScript" %}
```javascript
// JSON
{
  "intlRelativeTime": "Lorem {{val, relativetime}}",
  "intlRelativeTimeWithOptions": "Lorem {{val, relativetime(quarter)}}",
  "intlRelativeTimeWithOptionsExplicit": "Lorem {{val, relativetime(range: quarter; style: narrow;)}}",
}

i18next.t('intlRelativeTime', { val: 3 });
// --> Lorem in 3 days
i18next.t('intlRelativeTimeWithOptions', { val: -3 });
// --> Lorem 3 quarters ago
i18next.t('intlRelativeTimeWithOptionsExplicit', { val: -3 });
// --> Lorem 3 qtrs. ago
i18next.t('intlRelativeTimeWithOptionsExplicit', { val: -3, style: 'long' });
// --> Lorem 3 quarters ago
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
// JSON
{
  "intlRelativeTime": "Lorem {{val, relativetime}}",
  "intlRelativeTimeWithOptions": "Lorem {{val, relativetime(quarter)}}",
  "intlRelativeTimeWithOptionsExplicit": "Lorem {{val, relativetime(range: quarter; style: narrow;)}}",
}

i18next.t($ => $.intlRelativeTime, { val: 3 });
// --> Lorem in 3 days
i18next.t($ => $.intlRelativeTimeWithOptions, { val: -3 });
// --> Lorem 3 quarters ago
i18next.t($ => $.intlRelativeTimeWithOptionsExplicit, { val: -3 });
// --> Lorem 3 qtrs. ago
i18next.t($ => $.intlRelativeTimeWithOptionsExplicit, { val: -3, style: 'long' });
// --> Lorem 3 quarters ago
```
{% endtab %}
{% endtabs %}

For options see: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Intl/RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)

### List

{% tabs %}
{% tab title="JavaScript" %}
```javascript
// JSON
{
  "intlList": "A list of {{val, list}}"
}

i18next.t('intlList', { val: ['locize', 'i18next', 'awesomeness'] });
// --> A list of locize, i18next, and awesomeness
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
// JSON
{
  "intlList": "A list of {{val, list}}"
}

i18next.t($ => $.intlList, { val: ['locize', 'i18next', 'awesomeness'] });
// --> A list of locize, i18next, and awesomeness
```
{% endtab %}
{% endtabs %}

For options see: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Intl/ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat)

## Legacy format function i18next<21.3.0

You can add formatting using [moment.js](http://momentjs.com/) and [numeral.js](http://numeraljs.com/) or the [intl api](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl).

As a sample using momentjs to format dates.

keys

```javascript
{
    "key": "The current date is {{date, MM/DD/YYYY}}",
    "key2": "{{text, uppercase}} just uppercased"
}
```

Init i18next with a format function:

```javascript
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

sample

{% tabs %}
{% tab title="JavaScript" %}
```javascript
i18next.t('key', { date: new Date() });
// -> "The current date is 07/13/2016"

i18next.t('key2', { text: 'can you hear me' });
// => "CAN YOU HEAR ME just uppercased"
```
{% endtab %}

{% tab title="TypeScript" %}
```typescript
i18next.t($ => $.key, { date: new Date() });
// -> "The current date is 07/13/2016"

i18next.t($ => $.key2, { text: 'can you hear me' });
// => "CAN YOU HEAR ME just uppercased"
```
{% endtab %}
{% endtabs %}

Keep the language on moment in sync with i18next by listening to the change language event:

```javascript
i18next.on('languageChanged', function(lng) {
  moment.locale(lng);
});
```

## Additional options

Prefix/Suffix for interpolation and other options can be overridden in init option:

sample

```javascript
i18next.init({
    interpolation: { ... }
});
```

| option          | default       | description                                                                                                                                          |
| --------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| alwaysFormat    | false         | used to always call the format function for all interpolated values                                                                                  |
| format          | noop function | <p>Passing this function is considered LEGACY in i18next>=21.3.0</p><p>format function <code>function format(value, format, lng, edit) {}</code></p> |
| formatSeparator | ','           | used to separate format from interpolation value                                                                                                     |

While there are a lot of options going with the defaults should get you covered.

## Custom formatter

{% hint style="info" %}
Do you want to create some sort of default formatter, that does not need a specific format to be passed via i18n resources? i18next gets you covered also with that...
{% endhint %}

Create a custom formatter plugin, and pass it to i18next:

{% tabs %}
{% tab title="JavaScript" %}
<pre class="language-javascript"><code class="lang-javascript">const myFormatter = {
  type: 'formatter',
  init(services, backendOptions, i18nextOptions) {}, // of you need some init stuff to be done...
  format(value, format, lng, options) {
    // do whatever you like here... and return the formatted string
    if (!format &#x26;&#x26; value instanceof Date) {
      return value.toUTCString()
    }
  },
  add(name, fc) {
    // handle adding a new format, if you need it
  },
  addCached(name, fc) {
    // handle adding a new cached format, if you need it
  }
}

i18next
<strong>  .use(myFormatter)
</strong>  .init({
    fallbackLng: "en",
    interpolation: {
      alwaysFormat: true // set alwaysFormat to true
    },
    resources: {
      en: {
        translation: {
          testKeyWithoutFormat: 'On the "{val}"',
        }
      }
    }
  });
  
i18next.t("testKeyWithoutFormat", { val: new Date() }) // On the "Mon, 07 Jul 2025 11:44:50 GMT"
</code></pre>
{% endtab %}

{% tab title="TypeScript" %}
<pre class="language-typescript"><code class="lang-typescript">const myFormatter = {
  type: 'formatter',
  init(services, backendOptions, i18nextOptions) {}, // of you need some init stuff to be done...
  format(value, format, lng, options) {
    // do whatever you like here... and return the formatted string
    if (!format &#x26;&#x26; value instanceof Date) {
      return value.toUTCString()
    }
  },
  add(name, fc) {
    // handle adding a new format, if you need it
  },
  addCached(name, fc) {
    // handle adding a new cached format, if you need it
  }
}

i18next
<strong>  .use(myFormatter)
</strong>  .init({
    fallbackLng: "en",
    interpolation: {
      alwaysFormat: true // set alwaysFormat to true
    },
    resources: {
      en: {
        translation: {
          testKeyWithoutFormat: 'On the "{val}"',
        }
      }
    }
  });
  
i18next.t($ => $.testKeyWithoutFormat, { val: new Date() }) // On the "Mon, 07 Jul 2025 11:44:50 GMT"
</code></pre>
{% endtab %}
{% endtabs %}
