# Comparison to others

You now might expect we compare eg. react-i18next to react-intl but that won't happen ;\). But we will list why you should trust i18next to be the best choice for internationalization.

## Sustainability      <a id="sustainability"></a>

I18next was created in late 2011. What does that mean? It's older than most of the libraries you will use nowadays, including your main frontend tech \(react, vue, ...\).

Believe it or not but by the time of writing, the v11.x.x can be dropped in as a replacement for v1 by just adding a minimal compatibility layer. It's important to us not breaking things just for the sake of using new fancy stuff \(which does not mean we do not keep up with latest possibilities of development\).

## Maturity      <a id="maturity"></a>

Based on how long i18next already is available open source, there is no real i18n case that could not be solved with i18next.

i18next and its localization service [https://locize.com](https://locize.com/) are used by companies small to very large.

## Extensibility      <a id="extensibility"></a>

With v2 of i18next we completely rebuild i18next to be as extensible as possible. Doing this i18next can be used in any javascript \(and a few non-javascript - .net, elm, iOS, android, ...\) environment, with any UI framework, with any i18n format, ... the possibilities are endless.

Just have a look at what the community built around the i18next core:

* ​[Supported Frameworks​](supported-frameworks.md)
* ​[Plugins and Utils](plugins-and-utils.md)​

## Richness      <a id="richness"></a>

The regular i18n frameworks work like this:

1. You pass in all translations and the used language
2. You call a function that returns the correct translation based on the translations you passed in and provided values for plural and interpolation.

What you don't get by others - but get with i18next

* Splitting translations into multiple files. Only load translations needed.
* There are plugins to **detect languages** for most environments \(browser, native, server\). This enables to set priority of where to detect and even enables to cache set languages over requests / visits.
* There are endless plugins to **load translation** from server, filesystem, ... these backends also assert that loading gets retried on failure, or that a file does not get loaded twice and callbacks of success are only called once. Those backends can even provide an additional layer for **local caching** eg. in localStorage.
* Options what to load and how to fallback depending on language.
* Support for [objects and arrays](https://www.i18next.com/translation-function/objects-and-arrays)
* Full control over management of the translations stored.
* Rich system of events to react on changes important to your application.
* Freedom of [i18n formats](https://www.i18next.com/overview/plugins-and-utils#i-18-n-formats) - prefer ICU? Just use i18next-icu plugin.

## But I heard      <a id="but-i-heard"></a>

### i18next is complicated      <a id="i-18-next-is-complicated"></a>

True, i18next's documentation is bigger than that of other i18n frameworks - but that's also a tribute to offering a lot more features that you would have to build yourself otherwise \(language detection, translation loading, ...\).

If you do not need that i18next is as simple as any other i18n framework:

```javascript
import i18next from 'i18next';​

i18next.init({
    lng: 'de',
    resources: {
        de: {
            translation: {
                "hello world": "hallo Welt"
            }
        }
    }
});​
i18next.t('hello world'); // hallo Welt
```

### i18next is bloated      <a id="i-18-next-is-bloated"></a>

Hm... ask this in one year again. When your i18n framework needs to catch up with the needs of production systems.

We work hard on keeping the code base clean and readable. We add new features which might help a lot of users and not based on we think it's easy to solve.

### i18next is too big      <a id="i-18-next-is-to-big"></a>

Yes, a size of 33kb minified and 9kb gzipped is huge. But like you saw before there is a lot more inside than just the basic i18n functionality.

But you could make this smaller by precompiling the translations. We could bring down i18next to 4kb gzipped \(good to advertise\) but on the other hand your translation files would grow significantly.

## We tell you      <a id="we-tell-you"></a>

### I18next can do more      <a id="i-18-next-can-do-more"></a>

Just two samples of extended functionality you can get:

#### a\) Ever liked to **dynamically fallback** your error messages to a general info if no specific message is available?      <a id="a-ever-liked-to-dynamically-fallback-your-error-messages-to-a-general-info-if-no-specific-message-is-available"></a>

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
const error = '404';
i18next.t([`error.${error}`, 'error.unspecific']) // -> "The page was not found"​

const error = '502';
i18next.t([`error.${error}`, 'error.unspecific']) // -> "Something went wrong"
```

#### b\) Or like to say something like **interval plurals**:      <a id="b-or-like-to-say-something-like-interval-plurals"></a>

* many goodies still available
* just a few goodies remaining...
* no goodies remaining...sorry you're too late

Just drop in the [interval-postprocessor](https://github.com/i18next/i18next-intervalPlural-postProcessor)​

```javascript
{
    key_interval: '(0){no goodies remaining...sorry you`re too late};(1-100){just a few goodies remaining...};(100-inf){many goodies still available};'
}
```

### Works on serverside      <a id="works-on-serverside"></a>

While some other i18n frameworks run on serverside too there are not many optimized for it. Loading translations only once \(think of a render to string in react.js were you create a new instance and inject translations over and over\). Also does it keep the set language during async requests or do simultaneous requests create race conditions in setting the right language?

### Learn once - translate everywhere      <a id="learn-once-translate-everywhere"></a>

![](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-L9iS6Wm2hynS5H9Gj7j%2F-L9iS7LlT2W7wFtJH-2n%2F-L9iSBP9U65-bHJBRSDv%2Fi18next-ecosystem.jpg?generation=1523345318122913&alt=media)

Should speak for itself.

### We bridge the gap to localization      <a id="we-bridge-the-gap-to-localization"></a>

Being honest, internationalization is the smaller pain in getting a site translated. Localization and the translation process is where the real hard work starts.

With [https://locize.com](https://locize.com/) we fill this gap and enable a localization workflow as never seen before:

{% embed url="https://www.youtube.com/watch?v=9NOzJhgmyQE" caption="" %}

​

