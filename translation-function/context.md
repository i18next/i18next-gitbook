# Context

By providing a context you can differ translations. Eg. useful to provide gender specific translations.

## Basic

keys

```javascript
{
      "friend": "A friend",
      "friend_male": "A boyfriend",
      "friend_female": "A girlfriend"
}
```

sample

```javascript
i18next.t('friend'); // -> "A friend"
i18next.t('friend', { context: 'male' }); // -> "A boyfriend"
i18next.t('friend', { context: 'female' }); // -> "A girlfriend"
```

## Combining with plurals

You can pass entire data models in options.

keys

```javascript
{
      "friend_male_one": "A boyfriend",
      "friend_female_one": "A girlfriend",
      "friend_male_other": "{{count}} boyfriends",
      "friend_female_other": "{{count}} girlfriends"
}
```

sample

```javascript
i18next.t('friend', {context: 'male', count: 1}); // -> "A boyfriend"
i18next.t('friend', {context: 'female', count: 1}); // -> "A girlfriend"
i18next.t('friend', {context: 'male', count: 100}); // -> "100 boyfriends"
i18next.t('friend', {context: 'female', count: 100}); // -> "100 girlfriends"
```

