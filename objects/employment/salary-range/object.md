# Salary Range

> The pay band for a federal position, defined by a minimum and maximum salary, pay scale, and grade.

**Slug:** `salary-range`
**Type:** `domain`
**Category:** `knowledge`
**Products:** usajobs

---

## SIP Validation

| Test | Pass | Evidence |
| --- | --- | --- |
| Structure | yes | minimumSalary, maximumSalary, salaryType, payScale, payPlan, minimumGrade, maximumGrade, stepRange |
| Instances | yes | $82,764 to $107,590 per year (GS-13); $19.47 to $25.32 per hour (WG-7); SES negotiable |
| Purpose | yes | Job seekers filter by salary to establish a pay floor and evaluate financial viability before applying |

**Verdict:** Valid object. Federal pay complexity justifies standalone definition. Reusable across any redesign involving federal employment.

---

## Synonyms

| Term | Context | Notes |
| --- | --- | --- |
| pay range | Applicant-facing copy | Plain-language variant |
| GS pay grade | General Schedule positions | Specific to GS positions. Not applicable to WG, SES, or other pay plans |

---

## Attributes

| Name | Type | Required | Source | Description | Example |
| --- | --- | --- | --- | --- | --- |
| `minimumSalary` | number | yes | API | The lower bound of the pay range | 82764 |
| `maximumSalary` | number | yes | API | The upper bound of the pay range | 107590 |
| `salaryType` | enum | yes | API | The payment frequency | Per year |
| `payScale` | enum | yes | API | The pay scale system governing this range | GS |
| `payPlan` | string | no | API | The specific pay plan code within the pay scale | GS |
| `minimumGrade` | string | no | API | The lowest grade level in this range. Applicable to GS and WG positions. | 13 |
| `maximumGrade` | string | no | API | The highest grade level in this range | 13 |
| `stepRange` | string | no | API | The GS step range within the grade. Applicable to GS positions only. | Step 1 to Step 10 |

### Enumerations

**`salaryType`**
- `Per year`
- `Per hour`
- `Without compensation`

**`payScale`**
- `GS` — General Schedule
- `WG` — Wage Grade
- `SES` — Senior Executive Service
- `FWS` — Federal Wage System
- `Other`

---

## Actions

| Name | Priority | Roles | Permission | Description |
| --- | --- | --- | --- | --- |
| Browse listings in range | P | job-seeker | read | Navigates to a filtered list of open Job Listings at this salary range |
| Share salary range page | S | job-seeker | read | Copies or shares a direct URL to the salary range page |

### Cross-object actions

| Action | Leads to | Description |
| --- | --- | --- |
| Browse listings in range | Job Listing (`job-listing`) | Filtered navigation to listings at this pay grade |

---

## Relationships

### Job Listing

**Mechanics:** Automatic. Grade and pay scale on a Job Listing map to this Salary Range object.
**Cardinality:** one-to-many (one Salary Range covers many Job Listings at the same grade and pay scale)
**Sorts:** Default: openDate descending. Options: grade descending, series alphabetical.
**Filters:** Series, agency, location.
**Dependencies:** Optional for Salary Range. A range can exist with zero active listings.

### Occupational Series

**Mechanics:** Derived. The grade range of an Occupational Series implies associated Salary Ranges.
**Cardinality:** many-to-many (one series spans multiple grades and thus multiple ranges; one range may apply to many series)
**Sorts:** Default: seriesCode ascending.
**Filters:** Pay scale.
**Dependencies:** Optional. The relationship is informational, not structural.

---

## Views

### List Views

#### Salary Range in browse or filter context

**Context:** A job seeker scanning salary ranges.
**User intent:** Find pay grades that meet their salary floor.

##### List shape

| Element | Value |
| --- | --- |
| Visible attributes | minimumSalary, maximumSalary, salaryType, payScale, minimumGrade, maximumGrade |
| Available actions | Browse listings in range |

---

### Detail Views

#### Salary Range detail page

**Context:** A job seeker who has navigated to a pay grade page.
**User intent:** Browse open positions at a specific pay grade.

**Visible attributes:** minimumSalary, maximumSalary, salaryType, payScale, payPlan, minimumGrade, maximumGrade, stepRange

**Available actions:** Browse listings in range, Share salary range page

---

## User Stories

| Title | Role | Action | Benefit | When | Then |
| --- | --- | --- | --- | --- | --- |
| Job seeker filters positions by minimum salary | job-seeker | filters | avoids spending time on listings that do not meet their pay requirements | has a minimum salary requirement | sees only listings at or above their target pay grade |

---

## Business Rules

- **minimumSalary must not exceed maximumSalary:** Listings where this is inverted are a data error.
- **Pay rates change annually:** Salary values reflect current pay tables from the API. Historical listings may show outdated data.
- **SES positions have flexible pay:** minimumGrade and maximumGrade are absent for SES. Salary is negotiable within the SES pay band.
- **Locality pay excluded from v1:** Displayed salaries are base pay only. Locality adjustments are not modeled in v1.

---

## Lifecycle

### States

| State | Description | Triggers | Severity |
| --- | --- | --- | --- |
| Current | Reflects current OPM pay tables | Pay tables updated for the current year | active |
| Historical | Reflects a previous year's pay tables | OPM publishes updated pay tables | default |

### Transitions

| From | To |
| --- | --- |
| Current | Historical |

---

## Related Objects

- Occupational Series (`occupational-series`)
