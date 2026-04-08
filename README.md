# Objects

A public library of object definitions using [OOUX](https://www.ooux.com/) methodology. The intelligence layer behind every ReShaped redesign.

## What this is

Objects are the nouns of an interface. Before designing screens, we define what exists in a system: attributes, relationships, calls to action, and nested objects.

This library is a shared commons. An object defined for a job search redesign might inform a benefits redesign. A government form object might inform a private sector onboarding flow. Definitions accumulate across domains and become reusable.

## Structure

```
objects/
├── SCHEMA.md              # the standard every object follows
├── objects/
│   ├── _template/
│   │   └── object.md      # copy this to create a new object
│   └── [domain]/
│       └── [object-name]/
│           ├── object.md
│           └── relationships.md
└── domains.md             # index of all domains and objects
```

## Domains

| Domain | Objects |
|---|---|
| Employment | [Browse](./objects/employment/) |

## Contributing

See [SCHEMA.md](./SCHEMA.md) for the object definition standard. Copy `_template/object.md` to get started.

---

Part of [Reshaped](https://reshaped.studio)
