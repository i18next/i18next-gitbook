# Introduction

I18next is an **internationalization-framework** written in and for JavaScript. But it's much more than that.

i18next goes beyond just providing the standard i18n features such as (plurals, context, interpolation, format). It provides you with a complete solution to localize your product from web to mobile and desktop.

## learn once - translate everywhere

![](.gitbook/assets/i18next\_eco.jpg)

The i18next-community created integrations for frontend-frameworks such as React, AngularJS, Vue.js and many more.

But this is not where it ends. You can also use i18next with [Node.js](https://dev.to/adrai/how-does-server-side-internationalization-i18n-look-like-5f4c), [Deno](https://dev.to/adrai/internationalization-i18n-for-deno-with-i18next-3e0l), PHP, iOS, Android and other platforms.

{% hint style="info" %}
**Your software is using i18next? **_**-** Spread the word and let the world know!_

make a tweet... write it on your website...  create a blog post... etc...

![](.gitbook/assets/speaker.jpg)
{% endhint %}

[Learn more about supported frameworks](overview/supported-frameworks.md)

{% hint style="success" %}
[Here](https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb) you'll find a simple tutorial on how to best use [react-i18next](https://react.i18next.com/).\
Some basics of i18next and some cool possibilities on how to optimize your localization workflow.[\
![](.gitbook/assets/title-width.jpg)](https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb)
{% endhint %}

{% hint style="success" %}
Do you want to use i18next in [Vue.js](https://github.com/locize/locize-i18next-vue-example)? Check out [this tutorial blog post](https://dev.to/adrai/how-to-properly-internationalize-a-vue-application-using-i18next-1doj).

[![](.gitbook/assets/i18next-vue.jpg)](https://dev.to/adrai/how-to-properly-internationalize-a-vue-application-using-i18next-1doj)
{% endhint %}

{% hint style="success" %}
Did you know internationalization is also important on your app's backend? In [this tutorial blog post](https://dev.to/adrai/how-does-server-side-internationalization-i18n-look-like-5f4c) you can check out how this works.[  \
](https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb)[![](.gitbook/assets/server\_side\_backend.jpg) ](https://dev.to/adrai/how-does-server-side-internationalization-i18n-look-like-5f4c)
{% endhint %}

{% hint style="success" %}
Are you still using i18next in [jQuery](https://github.com/i18next/jquery-i18next)? Check out [this tutorial blog post](https://dev.to/adrai/the-progressive-guide-to-jquery-internationalization-i18n-using-i18next-3dc3).

[![](.gitbook/assets/jquery-localization.jpg)](https://dev.to/adrai/the-progressive-guide-to-jquery-internationalization-i18n-using-i18next-3dc3)
{% endhint %}

## Complete solution

Most frameworks leave it to you how translations are being loaded. You are responsible to detect the user language, to load the translations and push them into the framework.

i18next takes care of these issues for you. We provide you with plugins to:

* detect the user language
* load the translations
* optionally cache the translations
* extension, by using post-processing - e.g. to enable sprintf support

[Learn more about plugins and utilities](overview/plugins-and-utils.md)

## Flexibility

i18next comes with strong defaults but it is flexible enough to fulfill custom needs.

* Use moment.js over intl for date formatting?
* Prefer different pre- and suffixes for interpolation?
* Like gettext style keys better?

i18next has you covered!

[Learn more about options](overview/configuration-options.md)

## Scalability

The framework was built with scalability in mind. For smaller projects, having a single file with all the translation might work, but for larger projects this approach quickly breaks down. i18next gives you the option to separate translations into multiple files and to load them on demand.

[Learn more about namespaces](principles/namespaces.md)

## Ecosystem

There are tons of modules built for and around i18next: from extracting translations from your code over bundling translations using webpack, to converting gettext, CSV and RESX to JSON.

* [Learn more about plugins and utils](overview/plugins-and-utils.md)
* [Learn more about frameworks supported](overview/supported-frameworks.md)

## [Localization as a service](https://locize.com)

Through [locize.com](http://locize.com/?utm\_source=i18next\_com\&utm\_medium=gitbook), i18next even provides its own translation management tool: localization as a service.

{% embed url="https://youtu.be/ds-yEEYP1Ks" %}

[Learn more about the enterprise offering](overview/for-enterprises.md)
