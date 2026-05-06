export interface ProcessSection {
  title: string;
  description?: string;
  images: string[];
}

export interface ProjectMetadata {
  platform: string[];
  services: string[];
  tools: string[];
  awards?: string[];
  status?: string;
  link?: {
    label: string;
    url: string;
  };
}

export interface ProjectJourney {
  text: string;
  ndaNotice: string;
}

export interface KeyBenefits {
  items: string[];
  summary?: string;
}

export interface ProjectData {
  slug: string;
  client: string;
  title: string;
  context: string[];
  description: string[];
  heroImage: string;
  metadata: ProjectMetadata;
  journey: ProjectJourney;
  processSections: ProcessSection[];
  keyBenefits?: KeyBenefits;
}
