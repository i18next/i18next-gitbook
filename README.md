# Introduction

I18next is an **internationalization-framework** written in and for JavaScript. But it's much more than that.

i18next goes beyond just providing the standard i18n features such as \(plurals, context, interpolation, format\). It provides you with a complete solution to localize your product from web to mobile and desktop.

## learn once - translate everywhere

![](.gitbook/assets/ecosys.jpg)

The i18next-community created integrations for frontend-frameworks such as React, AngularJS, Vue.js and many more.

But this is not where it ends. You can also use i18next with Node.js, PHP, iOS, Android and other platforms.

[Learn more about supported frameworks](overview/supported-frameworks.md)

{% hint style="success" %}
[Here](https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb) you'll find a simple tutorial on how to best use [react-i18next](https://react.i18next.com/).  
Some basics of i18next and some cool possibilities on how to optimize your localization workflow.[  
 ![](.gitbook/assets/title-width.jpg)](https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb)
{% endhint %}

{% hint style="success" %}
Did you know internationalization is also important on your app's backend? In [this tutorial blog post](https://dev.to/adrai/how-does-server-side-internationalization-i18n-look-like-5f4c) you can check out how this works.[  
](https://dev.to/adrai/how-to-properly-internationalize-a-react-application-using-i18next-3hdb)[![](.gitbook/assets/server_side_backend.jpg) ](https://dev.to/adrai/how-does-server-side-internationalization-i18n-look-like-5f4c)
{% endhint %}

## Complete solution

Most frameworks leave it to you how translations are being loaded. You are responsible to detect the user language, to load the translations and push them into the framework.

i18next takes care of these issue for you. We provide you with plugins to:

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

Through [locize.com](http://locize.com/?utm_source=i18next_com&utm_medium=gitbook), i18next even provides its own translation management tool: localization as a service.

![](.gitbook/assets/general-locize-screen.png)

[Learn more about the enterprise offering](overview/for-enterprises.md)

