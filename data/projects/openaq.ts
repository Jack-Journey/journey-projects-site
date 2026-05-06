/**
 * Content data for OpenAQ Website & Data Explorer case study.
 * Source: jp-site-project-pages-extraction-2026-05-06.md
 */

import { ProjectData } from "@/data/types";

const openaq: ProjectData = {
  slug: "openaq",
  client: "OpenAQ",
  title: "Website & Data Explorer",
  context:
    "OpenAQ is a nonprofit organisation providing universal access to air quality data to empower a global community of change-makers to solve air inequality.",
  description:
    "An innovative UI providing intuitive access to global air quality data. Features include an interactive Data Explorer map, real-time pollution exploration, and API access for developers.",
  heroImage: "/images/openaq/hero.png",
  metadata: {
    platform: ["Responsive web app"],
    services: [
      "UX design",
      "UI design",
      "Strategy",
      "Pitch",
      "User research",
      "Prototyping",
      "User testing",
      "Design system",
    ],
    tools: ["Pen & paper", "FigJam", "Figma"],
    link: {
      label: "openaq.org",
      url: "https://openaq.org",
    },
  },
  journey: {
    teamSize: "2 designers, cross-functional",
    duration: "6 months",
    launchDate: "2022 v2.0 - current",
    ndaNotice:
      "Due to the nature of the project some details have been excluded from this case study.",
  },
  processSections: [
    {
      title: "Initial Audit and Stakeholder Workshop",
      images: ["/images/openaq/audit-workshop.png"],
    },
    {
      title: "2.0 UI Design Concepts",
      images: [
        "/images/openaq/ui-concepts-1.png",
        "/images/openaq/ui-concepts-2.png",
        "/images/openaq/ui-concepts-3.png",
        "/images/openaq/ui-concepts-4.png",
        "/images/openaq/ui-concepts-5.png",
        "/images/openaq/ui-concepts-6.png",
      ],
    },
    {
      title: "Design System for 2.0",
      images: ["/images/openaq/design-system.png"],
    },
    {
      title: "Design Finalised Handover",
      images: [
        "/images/openaq/handover-1.png",
        "/images/openaq/handover-2.png",
        "/images/openaq/handover-3.png",
        "/images/openaq/handover-4.png",
        "/images/openaq/handover-5.png",
      ],
    },
  ],
};

export default openaq;
