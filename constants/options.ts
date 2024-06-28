export const VALUE_CHAIN_OPTIONS = [
  { value: "Input Supply", label: "Input Supply" },
  { value: "Production", label: "Production" },
  { value: "Harvesting", label: "Harvesting" },
  { value: "Processing", label: "Processing" },
  { value: "Logistics", label: "Logistics" },
  { value: "Export", label: "Export" },
];

export const PRODUCT_PHASE_OPTIONS = [
  { value: "Concept", label: "Concept" },
  { value: "Prototype", label: "Prototype" },
  { value: "Commercial", label: "Commercial" },
  { value: "In Wide Use", label: "In Wide Use" },
  { value: "Upgraded", label: "Upgraded" },
  { value: "Phased Out", label: "Phased Out" },
];

export const MONTH_OPTIONS = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

export const OCCUPATION_OPTIONS = [
  { value: "Farmer", label: "Farmer" },
  { value: "Processor", label: "Processor" },
  { value: "Consultant", label: "Consultant" },
  { value: "Input Supplier", label: "Input Supplier" },
  { value: "Researcher", label: "Researcher" },
  { value: "Marketer", label: "Marketer" },
  { value: "Transporter", label: "Transporter" },
  { value: "Entrepreneur", label: "Entrepreneur" },
  { value: "Others", label: "Others" },
];

export const phaseOptions = PRODUCT_PHASE_OPTIONS.map((phase) => phase.value);
