<!-- toc -->
# Essentials

{% method %}
## Accessing keys

keys

```json
{
    "key": "value of key",
    "look": {
        "deep": "value of look deep"
    }
}
```

{% sample lang="js" %}
sample

```js
i18next.t('key');
// -> "value of key"

i18next.t('look.deep');
// -> "value of look deep"

```

{% endmethod %}


{% method %}
## Accessing keys in different namespaces

