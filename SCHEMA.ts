// SCHEMA.ts
// TypeScript interfaces for the Reshaped object definition standard.
// Source of truth for object structure.
// The JSON Schema (object.schema.json) is derived from these interfaces.

export type ObjectType = "core" | "domain" | "variation";

export type Category =
  | "people"
  | "container"
  | "activity"
  | "knowledge"
  | "data-ai"
  | "content"
  | "analytics";

export type DataType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "datetime"
  | "enum"
  | "reference"
  | "image"
  | "text";

export type Priority = "P" | "S" | "T" | "Q";

export type LifecycleVariant = "active" | "default" | "warn";

// Reusable reference to another object by slug and display name.
export interface ObjectRef {
  slug: string;
  name: string;
}

// Core identifying information.
export interface Identity {
  slug: string;           // kebab-case, unique within the library
  name: string;           // display name
  qualifier?: string;     // optional context modifier (e.g. "federal", "archived")
  objectType: ObjectType;
  category: Category;
  definition: string;     // one sentence, plain language
  products: string[];     // which products or contexts this object appears in
}

// SIP validation confirms this is a real object (Structure, Instances, Purpose).
export interface SIPTest {
  pass: boolean;
  evidence: string;
}

export interface SIPValidation {
  structure: SIPTest;
  instances: SIPTest;
  purpose: SIPTest;
  verdict: string;  // one sentence summary
}

export interface Synonym {
  term: string;
  context: string;  // where this term is used
  notes: string;    // why it differs from the canonical name
}

// An attribute is a piece of data the object is made of.
// Force-ranked by importance to the user.
export interface Attribute {
  name: string;           // camelCase
  dataType: DataType;
  required: boolean;
  source: string;         // "API" | "system" | "manual" | "computed"
  description: string;
  example?: string;
  roles?: string[];       // omit if visible to all roles
  enumOptions?: string[]; // required when dataType is "enum"
  reference?: ObjectRef;  // required when dataType is "reference"
}

// An action is something a user can do to this object.
// Force-ranked P/S/T/Q. One P per object per role.
export interface Action {
  name: string;           // verb or verb phrase
  priority: Priority;
  roles: string[];
  permission: string;     // "read" | "write" | "admin" | "system"
  description: string;
  crossObject?: ObjectRef; // if this action navigates to or creates another object
}

// A relationship describes how this object connects to another, using MCSFD.
export interface Relationship {
  targetSlug: string;
  targetName: string;
  mechanics: string;      // how the relationship is created and maintained
  cardinality: string;    // e.g. "one-to-many (one Agency has many Job Listings)"
  sorts: string;          // meaningful sort orders when viewing related objects
  filters: string;        // available filters when viewing related objects
  dependencies: string;   // what happens when one side is deleted or deactivated
}

// A nested object exists within this object and has no meaning outside it.
export interface NestedObject {
  slug: string;
  name: string;
  cardinality: "one" | "many";
  description: string;    // why it is nested rather than related
}

// A ShapeSpec defines which attributes and actions are visible in a layout shape.
export interface ShapeSpec {
  visibleAttributes: string[];  // attribute names
  availableActions: string[];   // action names
}

// A ListView is a scanning context: the user is looking across multiple instances.
export interface ListView {
  viewType: "list";
  context: string;        // where is the user? what are they looking at?
  userIntent: string;     // what are they trying to accomplish?
  shapes: {
    list?: ShapeSpec;
    grid?: ShapeSpec;
    table?: ShapeSpec;
  };
}

// A DetailView is a focus context: the user is looking at one instance in depth.
export interface DetailView {
  viewType: "detail";
  context: string;
  userIntent: string;
  visibleAttributes: string[];
  availableActions: string[];
}

export type View = ListView | DetailView;

// A story ties a user need to an action on this object.
export interface Story {
  title: string;
  role: string;
  action: string;
  object: string;
  benefit: string;
  whenClause: string;
  thenClause: string;
  crossObjects?: ObjectRef[];
}

// A business rule is a constraint or behavior that governs this object.
export interface BusinessRule {
  title: string;
  description: string;
}

export interface LifecycleState {
  name: string;
  description: string;
  triggers: string;       // what causes entry into this state
  variant: LifecycleVariant;
}

export interface LifecycleTransition {
  from: string;
  to: string[];
}

export interface Lifecycle {
  states: LifecycleState[];
  transitions: LifecycleTransition[];
}

// A variation is a distinct version of this object with different attributes or behavior.
export interface Variation {
  name: string;
  slug: string;
  qualifier: string;
  products: string[];
  objectType: ObjectType;
}

// Top-level object definition. Matches object.schema.json.
export interface ObjectDefinition {
  identity: Identity;
  sipValidation: SIPValidation;
  synonyms?: Synonym[];
  attributes: Attribute[];
  actions: Action[];
  relationships: Relationship[];
  nestedObjects: NestedObject[];
  views: View[];
  stories: Story[];
  businessRules: BusinessRule[];
  lifecycle: Lifecycle;
  variations?: Variation[];
  relatedObjects: ObjectRef[];
}
