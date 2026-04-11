# Location

> A geographic duty station where one or more federal positions are based.

**Slug:** `location`
**Type:** `domain`
**Category:** `knowledge`
**Products:** usajobs

---

## SIP Validation

| Test | Pass | Evidence |
| --- | --- | --- |
| Structure | yes | city, state, country, region, remoteEligible, activeListingCount, coordinates |
| Instances | yes | Washington DC; Fort Bragg, NC; Anchorage, AK |
| Purpose | yes | Job seekers filter and browse by location to find positions near them or in a target city |

**Verdict:** Valid object. Clear structure, named instances, and a primary navigation role in job discovery.

---

## Synonyms

| Term | Context | Notes |
| --- | --- | --- |
| duty station | Federal HR and position descriptions | Formal term for where an employee is assigned to work |
| work location | Applicant-facing copy | Plain-language variant |

---

## Attributes

| Name | Type | Required | Source | Description | Example |
| --- | --- | --- | --- | --- | --- |
| `city` | string | yes | API | The city name | Washington |
| `state` | string | no | API | Two-letter state or territory code. Absent for international locations. | DC |
| `country` | string | yes | API | The country name | United States |
| `region` | string | no | computed | Geographic grouping derived from state, used for regional filtering | Mid-Atlantic |
| `remoteEligible` | boolean | no | computed | Whether any active listings at this location are telework-eligible | |
| `activeListingCount` | number | no | computed | Count of currently open Job Listings at this location. Computed at query time. | |
| `coordinates` | string | no | computed | Approximate latitude and longitude for map display | 38.9072,-77.0369 |

---

## Actions

| Name | Priority | Roles | Permission | Description |
| --- | --- | --- | --- | --- |
| Browse location listings | P | job-seeker | read | Navigates to a filtered list of open Job Listings at this location |
| Share location page | S | job-seeker | read | Copies or shares a direct URL to the location page |

### Cross-object actions

| Action | Leads to | Description |
| --- | --- | --- |
| Browse location listings | Job Listing (`job-listing`) | Filtered navigation to listings at this location |

---

## Relationships

### Job Listing

**Mechanics:** Automatic. Job Listings carry one or more location records that map to Location objects.
**Cardinality:** one-to-many (one Location has many Job Listings; Washington DC may have thousands)
**Sorts:** Default: openDate descending. Options: salary descending, grade descending, series alphabetical.
**Filters:** Series, agency, grade, appointment type, telework eligibility.
**Dependencies:** Optional for Location. A location can exist with zero active listings. No cascade.

---

## Views

### List Views

#### Location in browse context

**Context:** A job seeker scanning a list of locations.
**User intent:** Find locations with open positions relevant to them.

##### List shape

| Element | Value |
| --- | --- |
| Visible attributes | city, state, country, remoteEligible, activeListingCount |
| Available actions | Browse location listings |

---

### Detail Views

#### Location detail page

**Context:** A job seeker who has navigated to a location page.
**User intent:** Browse all open federal positions at a specific location.

**Visible attributes:** city, state, country, region, remoteEligible, activeListingCount, coordinates

**Available actions:** Browse location listings, Share location page

---

## User Stories

| Title | Role | Action | Benefit | When | Then |
| --- | --- | --- | --- | --- | --- |
| Job seeker finds all federal jobs in their city | job-seeker | browses | discovers all open federal positions near them without filtering by agency or series | wants to stay in a specific city or region | sees all active listings at that location across all agencies and series |

---

## Business Rules

- **Remote positions may have no physical location:** A listing with teleworkEligible = true and no duty station maps to no Location object. The redesign must handle this without breaking the relationship.
- **coordinates are approximate:** Derived from city and state. Suitable for map display only.
- **International locations omit state:** Locations outside the US and territories do not have a state value.

---

## Lifecycle

### States

| State | Description | Triggers | Severity |
| --- | --- | --- | --- |
| Active | Location has or has had federal job listings | A Job Listing references this location | active |

### Transitions

| From | To |
| --- | --- |

---

## Related Objects

- Agency (`agency`)
