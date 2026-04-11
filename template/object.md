# [Object Name]

> [One sentence definition. What is this object, not what it does.]

**Slug:** `object-slug`
**Type:** `core` | `domain` | `variation`
**Category:** `people` | `container` | `activity` | `knowledge` | `data-ai` | `content` | `analytics`
**Qualifier:** [optional — e.g. "federal", "active", "archived"]
**Products:** [which products or contexts this object appears in]

---

## SIP Validation

| Test      | Pass     | Evidence                                                               |
| --------- | -------- | ---------------------------------------------------------------------- |
| Structure | yes / no | [What attributes does it have? Could you design a detail page for it?] |
| Instances | yes / no | [Name three distinct real-world instances.]                            |
| Purpose   | yes / no | [Why does a user seek this out? What do they do with it?]              |

**Verdict:** [One sentence. Valid object / Not valid — and why.]

---

## Synonyms

| Term      | Context                   | Notes                                    |
| --------- | ------------------------- | ---------------------------------------- |
| [synonym] | [where this term is used] | [why it differs from the canonical name] |

---

## Attributes

| Name             | Type                                                                          | Required | Source                          | Description                      | Example            |
| ---------------- | ----------------------------------------------------------------------------- | -------- | ------------------------------- | -------------------------------- | ------------------ |
| `attribute-name` | string / number / boolean / date / datetime / enum / reference / image / text | yes / no | [API, system, manual, computed] | [What this attribute represents] | [Concrete example] |

### Enumerations

**`attribute-name`**

- `option` — [what it means]

### References

| Attribute        | References                   | Cardinality |
| ---------------- | ---------------------------- | ----------- |
| `attribute-name` | [ObjectName] (`object-slug`) | one / many  |

---

## Actions

Ordered by priority. P = primary, S = secondary, T = tertiary, Q = quaternary.

| Name          | Priority      | Roles   | Permission         | Description    |
| ------------- | ------------- | ------- | ------------------ | -------------- |
| [Action name] | P / S / T / Q | [roles] | [permission level] | [what happens] |

### Cross-object actions

| Action        | Leads to                     | Description    |
| ------------- | ---------------------------- | -------------- |
| [Action name] | [ObjectName] (`object-slug`) | [what happens] |

---

## Relationships

### [Related Object Name]

**Mechanics:** [how these objects are connected and how that connection is created]
**Cardinality:** [one-to-one / one-to-many / many-to-many, with typical counts]
**Sorts:** [meaningful sort orders when viewing related objects]
**Filters:** [available filters when viewing related objects]
**Dependencies:** [what happens when one side is deleted, archived, or deactivated]

---

## Nested Objects

Objects that exist within this object and have no meaningful existence outside it.

| Object                       | Cardinality | Description                            |
| ---------------------------- | ----------- | -------------------------------------- |
| [ObjectName] (`object-slug`) | one / many  | [why it is nested rather than related] |

---

## Views

### List Views

Scanning contexts. The user is looking across multiple instances of this object.

---

#### [View name — e.g. "Job Listing in search results"]

**Context:** [Describe the situation. Where is the user? What are they looking at?]
**User intent:** [What is the user trying to accomplish in this context?]

##### List shape

| Element            | Value                     |
| ------------------ | ------------------------- |
| Visible attributes | [attr1], [attr2], [attr3] |
| Available actions  | [action1], [action2]      |

##### Grid shape

| Element            | Value                     |
| ------------------ | ------------------------- |
| Visible attributes | [attr1], [attr2], [attr3] |
| Available actions  | [action1], [action2]      |

##### Table shape

| Element            | Value                     |
| ------------------ | ------------------------- |
| Visible attributes | [attr1], [attr2], [attr3] |
| Available actions  | [action1], [action2]      |

---

### Detail Views

Focus contexts. The user is looking at one instance of this object in depth.

---

#### [View name — e.g. "Job Listing reviewed by an applicant"]

**Context:** [Describe the situation. What brought the user here? What do they need?]
**User intent:** [What is the user trying to accomplish?]

**Visible attributes:** [attr1], [attr2], [attr3], [attr4]
**Available actions:** [action1], [action2], [action3]

---

## User Stories

| Title   | Role   | Action   | Benefit   | When        | Then      |
| ------- | ------ | -------- | --------- | ----------- | --------- |
| [title] | [role] | [action] | [benefit] | [condition] | [outcome] |

---

## Business Rules

- **[Rule title]:** [Description of the constraint, validation, or behavior and why it exists.]

---

## Lifecycle

### States

| State   | Description             | Triggers            | Severity                |
| ------- | ----------------------- | ------------------- | ----------------------- |
| [state] | [what this state means] | [what causes entry] | active / default / warn |

### Transitions

| From    | To               |
| ------- | ---------------- |
| [state] | [state], [state] |

---

## Variations

| Name             | Slug             | Qualifier   | Products   |
| ---------------- | ---------------- | ----------- | ---------- |
| [Variation Name] | `variation-slug` | [qualifier] | [products] |

---

## Related Objects

Objects frequently used alongside this one but not nested or directly related.

- [ObjectName] (`object-slug`) — [brief note]
