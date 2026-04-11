# Agency

> A federal department, agency, or sub-element that publishes job listings.

**Slug:** `agency`
**Type:** `domain`
**Category:** `container`
**Products:** usajobs

---

## SIP Validation

| Test | Pass | Evidence |
| --- | --- | --- |
| Structure | yes | name, code, departmentName, agencyLevel, missionSummary, logoUrl, activeListingCount |
| Instances | yes | Department of Defense; National Park Service; Food and Drug Administration |
| Purpose | yes | Job seekers navigate to agencies to browse positions at organizations they want to work for |

**Verdict:** Valid object. Distinct identity, navigable, and a natural hub for Job Listing discovery.

---

## Synonyms

| Term | Context | Notes |
| --- | --- | --- |
| department | Top-level federal organizations | Department is a specific agencyLevel value, not a synonym for Agency as a whole |
| bureau | Sub-elements within an agency | Bureau is an agencyLevel value. A bureau is an Agency with agencyLevel of Sub-element |

---

## Attributes

| Name | Type | Required | Source | Description | Example |
| --- | --- | --- | --- | --- | --- |
| `name` | string | yes | API | The full name of the agency, department, or sub-element | Food and Drug Administration |
| `code` | string | yes | API | The OPM agency code | HHS12 |
| `departmentName` | string | no | API | The parent department name. Absent when agencyLevel is Department | Department of Health and Human Services |
| `departmentCode` | string | no | API | The OPM department code. Absent when agencyLevel is Department | HHS |
| `subElementName` | string | no | API | The bureau or office name. Present only when agencyLevel is Sub-element | Center for Drug Evaluation and Research |
| `agencyLevel` | enum | yes | API | The hierarchical level in the federal structure | Agency |
| `missionSummary` | text | no | manual | Plain-language mission description. Manually curated. | |
| `websiteUrl` | string | no | manual | The official agency website. Manually curated. | https://www.fda.gov |
| `logoUrl` | image | no | manual | Agency seal or logo. Manually curated. | |
| `activeListingCount` | number | no | computed | Count of currently open Job Listings. Computed at query time. | |

### Enumerations

**`agencyLevel`**
- `Department` — top-level federal department (e.g. Department of Defense)
- `Agency` — agency within a department (e.g. Food and Drug Administration)
- `Sub-element` — bureau or office within an agency (e.g. Center for Drug Evaluation and Research)

---

## Actions

| Name | Priority | Roles | Permission | Description |
| --- | --- | --- | --- | --- |
| Browse agency listings | P | job-seeker | read | Navigates to a filtered list of open Job Listings for this agency |
| Follow agency | S | authenticated-job-seeker | read | Subscribes to notifications when new listings are posted |
| Share agency page | T | job-seeker | read | Copies or shares a direct URL to the agency page |

### Cross-object actions

| Action | Leads to | Description |
| --- | --- | --- |
| Browse agency listings | Job Listing (`job-listing`) | Filtered navigation to agency's open listings |

---

## Relationships

### Job Listing

**Mechanics:** Automatic. Job Listings carry the agency code, which maps back to this Agency object.
**Cardinality:** one-to-many (one Agency has many Job Listings; large agencies may have thousands)
**Sorts:** Default: openDate descending. Options: closeDate ascending, grade descending.
**Filters:** Series, location, grade, appointment type, work schedule, telework eligibility.
**Dependencies:** Optional for Agency. Agencies can exist with zero active listings. No cascade.

### Occupational Series

**Mechanics:** Derived. The series codes on an agency's active listings determine which series are associated.
**Cardinality:** many-to-many (one Agency hires across many series; one series spans many agencies)
**Sorts:** Default: activeListingCount descending.
**Filters:** Grade, appointment type.
**Dependencies:** Optional. The relationship dissolves if an agency posts no listings in a given series.

### Location

**Mechanics:** Derived. The locations on an agency's active listings determine which locations are associated.
**Cardinality:** one-to-many (one Agency operates in many Locations)
**Sorts:** Default: activeListingCount descending.
**Filters:** Series, grade.
**Dependencies:** Optional. The relationship dissolves if an agency posts no listings at a given location.

---

## Views

### List Views

#### Agency in browse context

**Context:** A job seeker scanning a list of agencies.
**User intent:** Identify agencies worth exploring for job opportunities.

##### List shape

| Element | Value |
| --- | --- |
| Visible attributes | name, departmentName, agencyLevel, activeListingCount |
| Available actions | Browse agency listings |

---

### Detail Views

#### Agency detail page

**Context:** A job seeker who has navigated to an agency's page.
**User intent:** Learn about the agency and browse its open listings.

**Visible attributes:** name, code, departmentName, subElementName, agencyLevel, missionSummary, websiteUrl, logoUrl, activeListingCount

**Available actions:** Browse agency listings, Follow agency, Share agency page

---

## User Stories

| Title | Role | Action | Benefit | When | Then |
| --- | --- | --- | --- | --- | --- |
| Job seeker explores a target agency | job-seeker | browses | finds relevant open positions at an organization they want to work for | knows which agency they want to work for | sees mission, current openings, and a way to follow for future listings |

---

## Business Rules

- **Hierarchy levels are distinct:** A listing links to the most specific agency level available.
- **Manual attributes may be absent:** missionSummary, websiteUrl, and logoUrl are manually curated. The detail page must degrade gracefully when absent.
- **activeListingCount is live:** Computed from the API at query time, not stored.

---

## Lifecycle

### States

| State | Description | Triggers | Severity |
| --- | --- | --- | --- |
| Active | Agency is operational and may have open listings | Agency is added to the data set | active |
| Inactive | Agency no longer exists or has been merged | Removed or flagged inactive in OPM data | default |

### Transitions

| From | To |
| --- | --- |
| Active | Inactive |

---

## Related Objects

- Occupational Series (`occupational-series`)
- Location (`location`)
