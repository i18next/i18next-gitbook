<!-- toc -->
# Fallback

Doing graceful fallbacks are a core principle of i18next. This enables you to display the most accurate content possible.

## language fallback

### locals resolving

Per default locals containing region or script will take a translation from the pure language file if not found.

en-GB.json

```json
{
  "i18n": "Internationalisation"
}
```

en.json

```json
{
  "i18n": "Internationalization",
  "i18n_short": "i18n"
}
```

Sample

```js

// fallback to one language
i18next.init({
    lng: 'en-GB'
}, () => {
  i18next.t('i18n'); // -> "Internationalisation"
  i18next.t('i18n_short'); // -> "i18n" (from en.json)

  // force loading en
  i18next.t('i18n', { lng: 'en' ); // -> "Internationalization"
});
```


### fallback language

If you can not provide the preferred language for a user you can specify a fallback language.

```js

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

## namespace fallback

i18next per default loads it translations from one file named `translation`. But you can set and structure it to load from multiple files, we call this files namespaces.

Additional to defining multiple namespaces to load you also can set fallback namespaces. So if a key to translate gets not found in the namespace it looks it up in the fallbacks.

app.json

```json
{
  "title": "i18next"
}
```

common.json

```json
{
  "button": {
    "save": "save"
  }
}
```

Sample

```js
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

## key fallback

Calling the t function with an array of keys enables you to translate dynamic keys providing a non specific fallback value.

As a sample think of an error code you get and you like to show a specific warning in some cases:

translation.json

```json
{
  "error": "Something went wrong.",
  "error.404": "The page was not found."
}
```

Sample

```js
// const error = '404';
i18next.t([`error.${error}`, 'error']) // -> "The page was not found"

// const error = '502';
i18next.t([`error.${error}`, 'error']) // -> "Something went wrong"

```



