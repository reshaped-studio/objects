# Objects

A public library of object definitions using [OOUX](https://www.ooux.com/) methodology. The intelligence layer behind every ReShaped redesign.

## What this is

Objects are the nouns of an interface. Before designing screens, we define what exists in a system: attributes, relationships, calls to action, and nested objects.

This library is a shared commons. An object defined for a job search redesign might inform a benefits redesign. A government form object might inform a private sector onboarding flow. Definitions accumulate across domains and become reusable.

## Structure

```
objects/
├── SCHEMA.ts                # TypeScript interfaces — source of truth for object structure
├── object.schema.json       # JSON Schema — used for validation
├── objects/
│   ├── _template/
│   │   ├── object.json    # structured data template
│   │   └── object.md      # human-readable documentation template
│   └── [domain]/
│       └── [object-name]/
│           ├── object.json
│           └── object.md
└── domains.md               # index of all domains and objects
```

## Domains

| Domain     | Objects                         |
| ---------- | ------------------------------- |
| Employment | [Browse](./objects/employment/) |

## Contributing

See [SCHEMA.ts](./SCHEMA.ts) for the TypeScript interfaces and [object.schema.json](./object.schema.json) for the JSON Schema. Copy `objects/_template/` to get started.

---

Part of [Reshaped](https://reshaped.studio)
