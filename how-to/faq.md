# FAQ

## FAQ

### Misc

**i18next is awesome. How can i support the project?**

_There are a lot of ways to support us. Make a PR for a feature requested. Improve the documentation. Help others to get started. Spread the word._

_Further you could try _[_locize.com_](http://locize.com)_ - our localization as a service offering. It's like donating to i18next but with additional benefits for you - like saving hours of time translating your project._

### Loading issues

**I don't see my translations!!!**

_Try setting _`debug: true`_ on init and check the console log. There rather sure is a warning for unable to resolve the loadPath or invalid json. Check if the translation files are accessible via browser._

### Translation

**How do i know which plural suffix i have to use?**

_On the _[_plural page_](../translation-function/plurals.md)_ there is a tool to get them._

### Process

**How do i keep overview over my translation progress?**

_Might be time to use a translation management tool._

**How to handle with changes in e2e tests?**

_For e2e tests a good tactic is to set language to _`cimode`_ on init. This will set i18next to always return the key on calling _`i18next.t`_. Want to add the namespace to returned value change _`appendNamespaceToCIMode: true`_ on init._

