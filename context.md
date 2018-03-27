<!-- toc -->
# Context

By providing a context you can differ translations. Eg. useful to provide gender specific translations.


## Basic
{% method %}

keys

```json
{
      "friend": "A friend",
      "friend_male": "A boyfriend",
      "friend_female": "A girlfriend"
}
```

{% sample lang="js" %}
sample

```js
i18next.t('friend'); // -> "A friend"
i18next.t('friend', { context: 'male' }); // -> "A boyfriend"
i18next.t('friend', { context: 'female' }); // -> "A girlfriend"
```

{% endmethod %}

## Combining with plurals
{% method %}


You can pass entire data models in options.

keys

```json
{
      "friend_male": "A boyfriend",
      "friend_female": "A girlfriend",
      "friend_male_plural": "{{count}} boyfriends",
      "friend_female_plural": "{{count}} girlfriends"
}
```

{% sample lang="js" %}
sample

```js
i18next.t('friend', {context: 'male', count: 1}); // -> "A boyfriend"
i18next.t('friend', {context: 'female', count: 1}); // -> "A girlfriend"
i18next.t('friend', {context: 'male', count: 100}); // -> "100 boyfriends"
i18next.t('friend', {context: 'female', count: 100}); // -> "100 girlfriends"
```

{% endmethod %}
