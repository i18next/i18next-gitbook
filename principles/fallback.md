# Fallback

## Fallback

Doing graceful fallbacks are a core principle of i18next. This enables you to display the most accurate content possible.

### language fallback

#### locals resolving

Per default locals containing region or script will take a translation from the pure language file if not found.

en-GB.json

```javascript
{
  "i18n": "Internationalisation"
}
```

en.json

```javascript
{
  "i18n": "Internationalization",
  "i18n_short": "i18n"
}
```

Sample

```javascript
// fallback to one language
i18next.init({
    lng: 'en-GB'
}, () => {
  i18next.t('i18n'); // -> "Internationalisation"
  i18next.t('i18n_short'); // -> "i18n" (from en.json)

  // force loading en
  i18next.t('i18n', { lng: 'en' } ); // -> "Internationalization"
});
```

#### fallback language

If you can not provide the preferred language for a user you can specify a fallback language.

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
        'de-CH': ['fr', 'it'], 
        'zh-HANT': ['zh-HANS', 'en'],
        'es': ['fr'],
        'default': ['en']
    }
});
```

The default is set to `dev` which means developer language. At first this might look strange to set the default to a language but this enables to set the saveMissing feature to send new keys to that developer specific language. From there your translators can modify the texts to a translation file containing eg. proper english including defined terminology. For production just set fallbackLng to an existing language.

### namespace fallback

i18next per default loads it translations from one file named `translation`. But you can set and structure it to load from multiple files, we call this files namespaces.

Additional to defining multiple namespaces to load you also can set fallback namespaces. So if a key to translate gets not found in the namespace it looks it up in the fallbacks.

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
    namespaces: ['app', 'common'],

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

### key fallback

#### key not found

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


i18next.t('This will be shown if the current loaded translations to not have this.');
// -> "This will be shown if the current loaded translations to not have this."
```

While this works and might reduce files to load it makes the management of translations a lot harder as you will need to update changes to fallback values in code and json files.

Possible - but not recommended.

#### calling with fallback keys

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

