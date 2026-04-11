# Job Listing

> A time-bound federal vacancy announcement for a specific position at a specific agency.

**Slug:** `job-listing`
**Type:** `domain`
**Category:** `content`
**Products:** usajobs

---

## SIP Validation

| Test | Pass | Evidence |
| --- | --- | --- |
| Structure | yes | positionTitle, announcementNumber, openDate, closeDate, salary, location, duties, qualifications, status, applyUrl |
| Instances | yes | IT Specialist GS-13 at Dept of Defense; Park Ranger GS-7 at National Park Service; Border Patrol Agent GS-11 at CBP |
| Purpose | yes | Job seekers browse and evaluate listings to decide whether to apply |

**Verdict:** Valid object. Time-bound, agency-specific, and navigable with a full detail page.

---

## Synonyms

| Term | Context | Notes |
| --- | --- | --- |
| vacancy announcement | Federal HR and OPM documentation | Formal term used in hiring regulations |
| job announcement | USAJobs Help Center and applicant-facing copy | Plain-language variant used on USAJobs.gov |
| JOA | Federal HR practitioners and agency HR staff | Acronym for Job Opportunity Announcement. Not used in applicant-facing copy |

---

## Attributes

| Name | Type | Required | Source | Description | Example |
| --- | --- | --- | --- | --- | --- |
| `positionTitle` | string | yes | API | The title of the position as defined by the hiring agency | IT Specialist (INFOSEC) |
| `announcementNumber` | string | yes | API | The public-facing identifier for the listing | HHS-FDA-2026-001 |
| `status` | enum | yes | API | The current state of the listing | Open |
| `closingType` | enum | yes | API | How the listing closes. Determines whether closeDate is present | On date |
| `totalOpenings` | string | yes | API | Number of available positions, or a qualitative indicator | 3 |
| `openDate` | date | yes | API | The date applications opened | 2026-03-15 |
| `closeDate` | date | no | API | The application deadline. Absent when closingType is Continuous | 2026-04-15 |
| `workSchedule` | enum | yes | API | The employment schedule | Full-time |
| `appointmentType` | enum | yes | API | The duration and nature of the appointment | Permanent |
| `serviceType` | enum | yes | API | The federal service classification | Competitive |
| `supervisoryStatus` | boolean | yes | API | Whether the role includes supervisory responsibilities | |
| `travelRequirement` | enum | yes | API | Expected travel frequency | Occasional |
| `relocationAssistance` | boolean | yes | API | Whether relocation expenses are reimbursed | |
| `teleworkEligible` | boolean | yes | API | Whether remote work is available | |
| `securityClearance` | enum | yes | API | The security clearance level required | Secret |
| `drugTestRequired` | boolean | yes | API | Whether a drug test is required | |
| `whoMayApply` | string | yes | API | Plain-text summary of who is eligible to apply | Open to the public |
| `hiringPaths` | string | yes | API | Hiring path codes for eligible applicant groups. String for v1; references deferred Hiring Path object | PUBINT |
| `promotionPotential` | string | no | API | The highest grade this position can reach through non-competitive promotion | GS-13 |
| `duties` | text | yes | API | Full description of the position's responsibilities | |
| `summary` | text | no | API | Overview paragraph describing the position and agency context | |
| `howToApply` | text | yes | API | Instructions for completing and submitting an application | |
| `requiredDocuments` | text | no | API | Documents the applicant must submit | |
| `benefits` | text | no | API | Description of benefits available for this position | |
| `applyUrl` | string | yes | API | URL to the agency's external application system | https://apply.usastaffing.gov/Application/Apply |

### Enumerations

**`status`**
- `Open` — accepting applications
- `Closed` — no longer accepting applications
- `Cancelled` — withdrawn before close

**`closingType`**
- `On date` — closes when closeDate is reached
- `Number of applicants` — closes when the applicant limit is hit
- `Continuous` — no fixed deadline; closeDate is absent

**`workSchedule`**
- `Full-time`
- `Part-time`
- `Shift`
- `Intermittent`

**`appointmentType`**
- `Permanent`
- `Temporary`
- `Term`
- `Detail`

**`serviceType`**
- `Competitive`
- `Excepted`

**`travelRequirement`**
- `None`
- `Occasional` — up to 25%
- `Frequent` — up to 50%
- `Extensive` — 75% or more

**`securityClearance`**
- `None`
- `Public Trust`
- `Secret`
- `Top Secret`
- `TS/SCI`

---

## Actions

Ordered by priority. P = primary, S = secondary, T = tertiary, Q = quaternary.

| Name | Priority | Roles | Permission | Description |
| --- | --- | --- | --- | --- |
| Apply | P | job-seeker | read | Links to the agency's external application system. Not a POST. |
| Save listing | S | authenticated-job-seeker | read | Saves the listing for later review. Requires state persistence. |
| Share listing | T | job-seeker | read | Copies or shares a direct URL to the listing. |
| View similar listings | T | job-seeker | read | Navigates to a filtered list of listings in the same series and location. |
| Check eligibility | T | job-seeker | read | Surfaces whether the job seeker's hiring path matches the listing's requirements. |
| Print / export listing | Q | job-seeker | read | Produces a printable or exportable version of the listing. |

### Cross-object actions

| Action | Leads to | Description |
| --- | --- | --- |
| Apply | Agency (`agency`) | Handoff to agency's external application system |
| View similar listings | Job Listing (`job-listing`) | Filtered navigation by series and location |

---

## Relationships

### Agency

**Mechanics:** Automatic. Agency code on the listing maps to the Agency object via the API. Read-only from the redesign side.
**Cardinality:** many-to-one (one Agency has many Job Listings; one listing belongs to one agency)
**Sorts:** Default: openDate descending. Options: closeDate ascending, salary descending.
**Filters:** Series, location, grade, appointment type, work schedule, telework eligibility.
**Dependencies:** Required. If agency data is unavailable, the listing renders in a degraded state. No cascade.

### Occupational Series

**Mechanics:** Automatic. Series code on the listing maps to the Occupational Series object via the API.
**Cardinality:** many-to-one (one Occupational Series has many Job Listings; one listing belongs to one series)
**Sorts:** Default: openDate descending. Options: salary descending, grade descending, closeDate ascending.
**Filters:** Agency, location, grade, appointment type, telework eligibility.
**Dependencies:** Required. A listing must have a valid series code.

### Location

**Mechanics:** Automatic. One or more location records on the listing map to Location objects via the API.
**Cardinality:** many-to-many (one listing can be at multiple Locations — typically 1 to 3, up to dozens for nationwide postings)
**Sorts:** Default: openDate descending. Options: salary descending, grade descending, series alphabetical.
**Filters:** Series, agency, grade, appointment type, telework eligibility.
**Dependencies:** Required unless teleworkEligible is true. No cascade.

### Salary Range

**Mechanics:** Automatic. Grade and pay scale on the listing map to the Salary Range object via the API.
**Cardinality:** many-to-one (one Salary Range covers many Job Listings; one listing has one Salary Range)
**Sorts:** Default: openDate descending. Options: grade descending, series alphabetical.
**Filters:** Series, agency, location.
**Dependencies:** Required. A listing must have salary information.

---

## Nested Objects

| Object | Cardinality | Description |
| --- | --- | --- |
| Qualification (`qualification`) | many | Experience and education requirements by grade level. No existence outside a specific listing. |

---

## Views

### List Views

---

#### Job Listing in search results

**Context:** A job seeker scanning search results.
**User intent:** Find listings worth reading in full.

##### List shape

| Element | Value |
| --- | --- |
| Visible attributes | positionTitle, status, closeDate, appointmentType, workSchedule, teleworkEligible, announcementNumber |
| Available actions | Apply, Save listing |

---

### Detail Views

---

#### Job Listing reviewed by a job seeker

**Context:** A job seeker who has opened a listing to evaluate it.
**User intent:** Determine whether the position is worth applying for.

**Visible attributes:** positionTitle, announcementNumber, status, closingType, totalOpenings, openDate, closeDate, workSchedule, appointmentType, serviceType, supervisoryStatus, travelRequirement, relocationAssistance, teleworkEligible, securityClearance, drugTestRequired, whoMayApply, hiringPaths, promotionPotential, duties, summary, howToApply, requiredDocuments, benefits, applyUrl

**Available actions:** Apply, Save listing, Share listing, View similar listings, Check eligibility, Print / export listing

---

## User Stories

| Title | Role | Action | Benefit | When | Then |
| --- | --- | --- | --- | --- | --- |
| First-time applicant evaluates a listing | job-seeker | reads | understands eligibility and role before investing time in an application | opens a listing from search results | sees title, salary, location, qualifications, and path to apply |
| Job seeker saves a listing to review later | authenticated-job-seeker | saves | can return to promising listings without repeating the search | wants to compare multiple listings | listing appears in saved listings |

---

## Business Rules

- **Apply requires Open status:** Apply is only available when status is Open and applyUrl is present. Falls back to Save listing if either condition is not met.
- **closeDate conditional on closingType:** closeDate is required unless closingType is Continuous.
- **Location or remote required:** At least one Location is required, or teleworkEligible must be true.
- **At least one Qualification required:** Every listing must have at least one Qualification nested object.
- **No submission:** The redesign does not accept applications. Apply always links out to the agency's external system.
- **One primary CTA per role:** Job seekers have one primary CTA: Apply. Falls back to Save listing if Apply is unavailable.

---

## Lifecycle

### States

| State | Description | Triggers | Severity |
| --- | --- | --- | --- |
| Open | Accepting applications | openDate is reached | active |
| Closed | No longer accepting applications | closeDate reached, applicant limit hit, or agency closes manually | default |
| Cancelled | Withdrawn before close | Agency cancels | warn |

### Transitions

| From | To |
| --- | --- |
| Open | Closed, Cancelled |
