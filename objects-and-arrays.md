<!-- toc -->
# Objects and arrays

{% method %}
## Objects

You can return objects or arrays to be used by third party modules localization:

keys

```json
{
    "tree": {
        "res": "added {{something}}"
    },
    "array": ['a', 'b', 'c']
}
```

{% sample lang="js" %}
sample

```js
i18next.t('tree', { returnObjects: true, something: 'gold' });
// -> { res: 'added gold' }

i18next.t('array', { returnObjects: true });
// -> ['a', 'b', 'c']

```

The returned value supports interpolation, plurals, nesting, ...

`returnObjects` can be set to true on init.

{% endmethod %}

{% method %}
## Arrays

You can access array values or join them.

keys

```json
{
      "arrayJoin": [
        "line1",
        "line2",
        "line3"
      ],
      "arrayJoinWithInterpolation": [
        "you",
        "can",
        "{{myVar}}"
      ],
      "arrayOfObjects": [
        { "name": "tom" },
        { "name": "steve" }
      ]
}
```

{% sample lang="js" %}
sample

```js
i18next.t('arrayJoin', { joinArrays: '+' });
// -> "line1+line2+line3"

i18next.t('arrayJoinWithInterpolation', { myVar: 'interpolate', joinArrays: ' ' });
// -> "you can interpolate"

i18next.t('arrayOfObjects.0.name');
// -> "tom"
```

The returned value supports interpolation, plurals, nesting, ...

`joinArrays` can be set to a value on init.

{% endmethod %}





