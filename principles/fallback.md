# Fallback

Doing graceful fallbacks is a core principle of i18next. This enables you to display the most accurate content possible, while not repeating content over and over.

## Language fallback

### Variant resolving - fallback from dialects or scripts

By default, if a variant \(containing region, script, etc\) is not found, i18next will look for the same key in the broader version of that language. With this in mind, a common strategy if you're supporting language variants is to write common text inside the pure language, specifying only what differs in the variants.

Example:

```javascript
// fallback to one language
i18next.init({
  lng: "en-GB",
  resources: {
    "en-GB": {
      "translation": {
        "i18n": "Internationalisation"
      }
    },
    "en": {
      "translation": {
        "i18n": "Internationalization",
        "i18n_short": "i18n"
      }
    }
  }
}, () => {
  i18next.t('i18n'); // -> finds "Internationalisation"
  i18next.t('i18n_short'); // -> falls back to "en": "i18n"

  // force using en
  i18next.t('i18n', { lng: 'en' }); // -> "Internationalization"
});
```

### Fallback to different languages

If you can not provide the preferred language for a user, you can specify another language as fallback. This is useful to indicate the main language or, for instance, if you want to keep the fallbacks different per region.

```javascript
// fallback to one language
i18next.init({
    fallbackLng: 'en'
});

// fallback ordered
i18next.init({
    fallbackLng: ['fr', 'en']
});

// fallback depending on user language
i18next.init({
    fallbackLng: { 
        'de-CH': ['fr', 'it'], //French and Italian are also spoken in Switzerland
        'zh-Hant': ['zh-Hans', 'en'],
        'es': ['fr'],
        'default': ['en']
    }
});

// function that returns an array of fallbacks
// your function may also return a string or object as above
i18next.init({
  fallbackLng: (code) => {
    if (!code || code === 'en') return ['en-US'];
    const fallbacks = [code];

    // We maintain en-US and en-AU. Some regions will prefer en-AU.
    if (code.startsWith('en-') && !['en-US', 'en-AU'].includes(code)) {
      if (['en-GB', 'en-NZ', 'en-IR'].includes(code)) fallbacks.push('en-AU');
      else fallbacks.push('en-US');
      return fallbacks;
    }

    // add pure lang
    const langPart = code.split('-')[0];
    if (langPart !== code) fallbacks.push(langPart);

    // finally, developer language
    fallbacks.push('en-AU');
    return fallbacks;
  }
});
```

The default is set to `dev` which means developer language. At first this might look strange to set the default to a language, but this enables to set the `saveMissing` feature to send new keys to that developer specific language. From there your translators can modify the texts to a translation file containing, for instance, proper English, including defined terminology. For production use, just set `fallbackLng` to an existing language.

## Namespace fallback

i18next by default loads its translations from one file named `translation`. However, you can configure it to load from multiple files, called _namespaces_.

Besides defining multiple namespaces to load from, you also can set fallback namespaces. Thus, if a key to translate isn't found in the given namespace, it will look it up in the indicated fallbacks.

app.json

```javascript
{
  "title": "i18next"
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

Sample

```javascript
i18next.init({
    // files to load
    ns: ['app', 'common'],

    // default namespace (needs no prefix on calling t)
    defaultNS: 'app',

    // fallback, can be a string or an array of namespaces
    fallbackNS: 'common'
}, () => {
    i18next.t('title') // -> "i18next"

    i18next.t('button.save') // -> "save" (fallback from common)

    // without fallbackNS you would have to prefix namespace 
    // to access keys in that namespace
    i18next.t('common:button.save') // -> "save"
});
```

## Key fallback

### Key not found

If a key does not return a value the key acts as fallback:

```javascript
i18next.t('notExistingKey'); // -> "notExistingKey"
```

So you could configure i18next to have the key being the fallback instead of loading a fallback language:

de.json

```javascript
{
  "No one says a key can not be the fallback.": "Niemand sagt ein key kann nicht als Ersatz dienen."
}
```

```javascript
i18next.init({
  lng: 'de',

  // allow keys to be phrases having `:`, `.`
  nsSeparator: false,
  keySeparator: false,

  // do not load a fallback
  fallbackLng: false
});

i18next.t('No one says a key can not be the fallback.')
// -> "Niemand sagt ein key kann nicht als Ersatz dienen."


i18next.t('This will be shown if the current loaded translations do not have this.');
// -> "This will be shown if the current loaded translations do not have this."
```

While this works and might reduce files to load it makes the management of translations a lot harder as you will need to update changes to fallback values in code and JSON files.

Possible - but not recommended.

### Missing values for existing keys

In addition to the above, if you want missing values to fallback to the key in cases where the keys \(e.g. got extracted by a code parser\) exist in your JSON translation file with empty string as value, you also need this setting:

```text
// allow an empty value to count as invalid (by default is true)
  returnEmptyString: false
```

### Calling with fallback keys

Calling the t function with an array of keys enables you to translate dynamic keys providing a non specific fallback value.

As a sample think of an error code you get and you like to show a specific warning in some cases:

translation.json

```javascript
{
  "error": {
    "unspecific": "Something went wrong.",
    "404": "The page was not found."
  }
}
```

Sample

```javascript
// const error = '404';
i18next.t([`error.${error}`, 'error.unspecific']) // -> "The page was not found"

// const error = '502';
i18next.t([`error.${error}`, 'error.unspecific']) // -> "Something went wrong"
```

