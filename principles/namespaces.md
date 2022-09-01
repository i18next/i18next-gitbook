# Namespaces

Namespaces are a feature in i18next internationalization framework which allows you to separate translations that get loaded into multiple files.

While in a smaller project it might be reasonable to just put everything in one file you might get at a point where you want to break translations into multiple files. Reasons might be:

* You start losing the overview having more than 300 segments in a file
* Not every translation needs to be loaded on the first page, speed up load time

{% hint style="info" %}
🎓 Check out this topic in the [i18next crash course video](https://youtu.be/SA\_9i4TtxLQ?t=314).
{% endhint %}

## semantic reasons

Often you wish to separate some segments out because they belong together. We do this in most of our projects, eg.:

* **common.json** -> Things that are reused everywhere, eg. Button labels 'save', 'cancel'
* **validation.json** -> All validation texts
* **glossary.json** -> Words we want to be reused consistently inside texts

## technical / editorial reasons

More often you don't want to load all the translations upfront or at least reduce the amount loaded. This reason often goes hand in hand with the one translation file gets too large and you start losing the overview scrolling through hundreds of text fragments.

* namespace per view/page
* namespace per application section / feature set (admin area, ...)
* namespace per module which gets lazy loaded (single page applications)

## Sample

```javascript
i18next.init({
  ns: ['common', 'moduleA', 'moduleB'],
  defaultNS: 'moduleA'
}, (err, t) => {
  i18next.t('myKey'); // key in moduleA namespace (defined default)
  i18next.t('common:myKey'); // key in common namespace (not recommended with ns prefix when used in combination with natural language keys)
  // better use the ns option:
  i18next.t('myKey', { ns: 'common' });
});

// load additional namespaces after initialization
i18next.loadNamespaces('anotherNamespace', (err, t) => { /* ... */ });
```

Check the extended sample on the [getting started](../overview/getting-started.md) page for a running sample.
