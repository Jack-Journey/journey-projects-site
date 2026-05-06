/**
 * Shared types for project case study data.
 * Every case study page consumes a ProjectData object.
 * These types enforce consistency across all 8 project content files.
 */

/** A single section in the design process gallery */
export interface ProcessSection {
  title: string;
  images: string[];
}

/** Metadata sidebar block — platform, services, tools, awards, external link */
export interface ProjectMetadata {
  platform: string[];
  services: string[];
  tools: string[];
  awards?: string[];
  link?: {
    label: string;
    url: string;
  };
}

/** The Journey section — team composition and timeline */
export interface ProjectJourney {
  teamSize: string;
  duration: string;
  launchDate: string;
  ndaNotice: string;
}

/** Complete data shape for a single case study page */
export interface ProjectData {
  slug: string;
  client: string;
  title: string;
  context: string;
  description: string;
  heroImage: string;
  metadata: ProjectMetadata;
  journey: ProjectJourney;
  processSections: ProcessSection[];
}
