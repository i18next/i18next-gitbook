# What is i18next?

The short answer would be i18next is a internationalization **i18n-framework** written in javascript.

What makes i18next outstanding is it goes over providing only the i18n features \(plurals, context, interpolation, format\) expected but provides you with a complete solution to localize your product.

## It runs everywhere

<img src="/assets/img/frameworks.png" width="50%" />

Learn it once - use it everywhere. The community made integrations for frameworks like react.js, angualar.js, vue.js and many more. But this is not where it ends...you can use i18next on node.js, php, ios, android and other platforms.

I18next reached not only the web, but also mobile and desktop development.

## Complete solution

Most frameworks leave it to you how the translation are loaded from the server. You are responsible to detect the right user language, to load the translations for that language and push those translations into the framework.

Not so with i18next. We provide you with plugins to:

* detect the user language
* load the translations
* optionally cache the translations
* extending by using post processing - eg. to enable sprintf support

It even provides with [locize.com](http://locize.com) a own translation management tool - localization as a service offering.

<img src="/assets/img/locize_recap_big_low.gif" />

## Flexibility

i18next comes with strong defaults but it is open to adapt to your needs. Prefer moment.js over intl api for date formatting?

## Scalability

The framework was built with scalability in mind. While for smaller projects having one file with all the translation might work with i18next you have the option to separate translations into multiple files and to load them on demand.

## Ecosystem

There are endless modules built around i18next to extract translations from your code, to bundle translations using webpack, to convert gettext, csv, resx to json format.

