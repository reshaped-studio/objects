# Occupational Series

> A four-digit OPM classification code that groups federal positions by occupation type.

**Slug:** `occupational-series`
**Type:** `domain`
**Category:** `knowledge`
**Products:** usajobs

---

## SIP Validation

| Test | Pass | Evidence |
| --- | --- | --- |
| Structure | yes | seriesCode, seriesName, payPlan, grade range, typicalDuties, activeListingCount |
| Instances | yes | IT Management (2210); Miscellaneous Administration and Program (0301); Border Patrol Agent (1896) |
| Purpose | yes | Job seekers browse by series to find all open positions of a given occupation type across agencies |

**Verdict:** Valid object. Distinct classification with structure, named instances, and a clear navigation purpose.

---

## Synonyms

| Term | Context | Notes |
| --- | --- | --- |
| series | Federal HR practitioners and job listings | Shortened form. Common in API fields and HR documentation |
| job series | Applicant-facing copy and help center | Plain-language variant used on USAJobs.gov |
| OPM series code | Technical and HR documentation | Emphasizes that the code is defined and maintained by OPM |

---

## Attributes

| Name | Type | Required | Source | Description | Example |
| --- | --- | --- | --- | --- | --- |
| `seriesCode` | string | yes | API | The four-digit OPM classification code | 2210 |
| `seriesName` | string | yes | API | The full name of the series as defined by OPM | Information Technology Management |
| `payPlan` | enum | yes | API | The pay plan that applies to this series | GS |
| `minimumGrade` | string | no | API | The lowest grade level typically offered | 5 |
| `maximumGrade` | string | no | API | The highest grade level typically offered | 15 |
| `typicalDuties` | text | no | manual | General occupation description from OPM classification standards. Manually curated. | |
| `activeListingCount` | number | no | computed | Count of currently open Job Listings in this series. Computed at query time. | |

### Enumerations

**`payPlan`**
- `GS` — General Schedule
- `WG` — Wage Grade
- `SES` — Senior Executive Service
- `FWS` — Federal Wage System
- `Other`

---

## Actions

| Name | Priority | Roles | Permission | Description |
| --- | --- | --- | --- | --- |
| Browse series listings | P | job-seeker | read | Navigates to a filtered list of open Job Listings in this series |
| Follow series | S | authenticated-job-seeker | read | Subscribes to notifications when new listings are posted in this series |
| Share series page | T | job-seeker | read | Copies or shares a direct URL to the series page |

### Cross-object actions

| Action | Leads to | Description |
| --- | --- | --- |
| Browse series listings | Job Listing (`job-listing`) | Filtered navigation to series listings |

---

## Relationships

### Job Listing

**Mechanics:** Automatic. Job Listings carry a series code that maps to this Occupational Series object.
**Cardinality:** one-to-many (one Occupational Series has many Job Listings; popular series such as 2210 may have thousands)
**Sorts:** Default: openDate descending. Options: salary descending, grade descending, closeDate ascending.
**Filters:** Agency, location, grade, appointment type, telework eligibility.
**Dependencies:** Optional for Occupational Series. A series can exist with zero active listings.

### Agency

**Mechanics:** Derived. The agencies posting listings in this series determine the association.
**Cardinality:** many-to-many (one series spans many agencies; one agency hires across many series)
**Sorts:** Default: activeListingCount descending.
**Filters:** Location, grade.
**Dependencies:** Optional. Dissolves if an agency posts no listings in this series.

### Salary Range

**Mechanics:** Derived. The grade range of active listings in this series determines associated salary ranges.
**Cardinality:** one-to-many (one series spans multiple grade levels, each with a Salary Range)
**Sorts:** Default: grade ascending.
**Filters:** Pay scale.
**Dependencies:** Optional. Linked through active listings, not directly to the series.

---

## Views

### List Views

#### Occupational Series in browse context

**Context:** A job seeker scanning a list of occupational series.
**User intent:** Find the series that matches their occupation or career interest.

##### List shape

| Element | Value |
| --- | --- |
| Visible attributes | seriesCode, seriesName, payPlan, minimumGrade, maximumGrade, activeListingCount |
| Available actions | Browse series listings |

---

### Detail Views

#### Occupational Series detail page

**Context:** A job seeker who has navigated to a series page.
**User intent:** Understand the occupation and browse open positions.

**Visible attributes:** seriesCode, seriesName, payPlan, minimumGrade, maximumGrade, typicalDuties, activeListingCount

**Available actions:** Browse series listings, Follow series, Share series page

---

## User Stories

| Title | Role | Action | Benefit | When | Then |
| --- | --- | --- | --- | --- | --- |
| Job seeker discovers all open IT positions across government | job-seeker | browses | finds all open positions in their field without knowing which agencies are hiring | knows their occupation type but not which agency to target | sees all active listings for that series across all agencies and locations |

---

## Business Rules

- **Series codes are OPM-defined:** The redesign does not create or modify series codes.
- **Grade range is typical, not binding:** Individual listings may advertise grades outside minimumGrade to maximumGrade.
- **typicalDuties may be absent:** Manually curated. The detail page must degrade gracefully when absent.

---

## Lifecycle

### States

| State | Description | Triggers | Severity |
| --- | --- | --- | --- |
| Active | Series is in current use by OPM and agencies | Included in OPM classification standards | active |
| Deprecated | Series has been retired or replaced by OPM | OPM retires the series code | default |

### Transitions

| From | To |
| --- | --- |
| Active | Deprecated |

---

## Related Objects

- Agency (`agency`)
- Salary Range (`salary-range`)
