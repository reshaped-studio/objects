# Hiring Path

> A classification that determines which job seekers are eligible to apply for a federal position.

**Slug:** `hiring-path`
**Type:** `domain`
**Category:** `knowledge`
**Products:** usajobs

---

## SIP Validation

| Test | Pass | Evidence |
| --- | --- | --- |
| Structure | yes | code, name, description, eligibilityCriteria, iconUrl, activeListingCount |
| Instances | yes | Open to the public; Federal employees (competitive service); Veterans; Military spouses; Students and recent graduates; National Guard members |
| Purpose | yes | Job seekers filter listings by the hiring paths they qualify for to avoid applying for positions they are ineligible for |

**Verdict:** Valid object. Named instances, consistent structure, and a filtering purpose that extends across all Job Listings.

---

## Synonyms

| Term | Context | Notes |
| --- | --- | --- |
| eligibility | Federal HR documentation | Broad term. Hiring path is the specific USAJobs implementation of eligibility categories |
| hiring authority | Agency HR practitioners | The legal authority under which a hiring path operates. More granular than hiring path. |

---

## Attributes

| Name | Type | Required | Source | Description | Example |
| --- | --- | --- | --- | --- | --- |
| `code` | string | yes | manual | URL-safe identifier | veterans |
| `name` | string | yes | manual | Display name | Veterans |
| `description` | text | yes | manual | Plain-language explanation of who qualifies | Veterans of the U.S. Armed Forces or an eligible family member |
| `eligibilityCriteria` | text | no | manual | Detailed criteria for determining eligibility. Manually curated. | |
| `iconUrl` | image | no | manual | Icon used in the UI to represent this path | |
| `activeListingCount` | number | no | computed | Count of currently open Job Listings on this hiring path. Computed at query time. | |

---

## Actions

| Name | Priority | Roles | Permission | Description |
| --- | --- | --- | --- | --- |
| Browse listings by hiring path | P | job-seeker | read | Navigates to a filtered list of open Job Listings on this hiring path |
| Share hiring path page | S | job-seeker | read | Copies or shares a direct URL to the hiring path page |
| Learn about eligibility | T | job-seeker | read | Links to detailed eligibility criteria for this hiring path |

### Cross-object actions

| Action | Leads to | Description |
| --- | --- | --- |
| Browse listings by hiring path | Job Listing (`job-listing`) | Filtered navigation to listings open to this hiring path |

---

## Relationships

### Job Listing

**Mechanics:** Automatic. Job Listings carry one or more hiring path codes that map to this Hiring Path object. No manual curation required.
**Cardinality:** many-to-many (one Hiring Path applies to many Job Listings; one Job Listing carries multiple Hiring Paths)
**Sorts:** Default: openDate descending. Options: closeDate ascending, grade descending, salary descending.
**Filters:** Agency, series, location, grade, appointment type, work schedule.
**Dependencies:** Optional for Hiring Path. A Hiring Path can exist with zero active listings. Removing a listing does not affect the Hiring Path object.

---

## Views

### List Views

#### Hiring Path in browse context

**Context:** A job seeker scanning available hiring paths.
**User intent:** Identify which hiring path applies to them and find listings they are eligible for.

##### List shape

| Element | Value |
| --- | --- |
| Visible attributes | iconUrl, name, description, activeListingCount |
| Available actions | Browse listings by hiring path |

---

### Detail Views

#### Hiring Path detail page

**Context:** A job seeker who has navigated to a hiring path page.
**User intent:** Confirm their eligibility and browse open listings on this path.

**Visible attributes:** name, description, eligibilityCriteria, activeListingCount

**Available actions:** Browse listings by hiring path, Share hiring path page, Learn about eligibility

---

## User Stories

| Title | Role | Action | Benefit | When | Then |
| --- | --- | --- | --- | --- | --- |
| Veteran finds positions they are eligible for | job-seeker | filters | avoids applying to listings they cannot be considered for | knows they qualify under a veterans hiring path | sees only listings open to veterans across all agencies and series |

---

## Business Rules

- **Hiring paths are OPM-defined:** The redesign does not create or modify hiring path definitions.
- **A listing may have multiple hiring paths:** A job seeker who qualifies under any one of a listing's hiring paths is eligible to apply.
- **eligibilityCriteria may be absent:** Manually curated. The detail page must degrade gracefully when absent.
- **activeListingCount is live:** Computed from the API at query time, not stored.

---

## Lifecycle

### States

| State | Description | Triggers | Severity |
| --- | --- | --- | --- |
| Active | Hiring path is in current use by OPM and agencies | Defined by OPM and present in API data | active |
| Deprecated | Hiring path has been retired or consolidated by OPM | OPM removes or replaces the hiring path | default |

### Transitions

| From | To |
| --- | --- |
| Active | Deprecated |

---

## Related Objects

- Job Listing (`job-listing`)
