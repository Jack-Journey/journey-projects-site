/**
 * Content data for WHO UHC SPDI case study.
 * Source: jp-site-project-pages-extraction-2026-05-06.md
 */

import { ProjectData } from "@/data/types";

const whoSpdi: ProjectData = {
  slug: "who-spdi",
  client: "WHO",
  title: "UHC Service Planning, Delivery & Implementation (SPDI)",
  context:
    "The UHC Compendium is a database of health services and intersectoral interventions helping countries advance toward Universal Health Coverage. It covers the full spectrum: promotive, preventive, diagnostic, resuscitative, curative, rehabilitative, and palliative care.",
  description:
    "The UHC SPDI Platform is a digital tool helping countries formulate thorough national health service packages. Capabilities include resource estimation, service delivery modeling, and financial planning.",
  heroImage: "/images/who-spdi/hero.png",
  metadata: {
    platform: ["Web app"],
    services: [
      "UX design",
      "UI design",
      "1.0",
      "Strategy",
      "Pitch",
      "User research",
      "Prototyping",
      "User testing",
      "Design system",
    ],
    tools: ["Pen & paper", "FigJam", "Figma"],
    link: {
      label: "UHC Packages",
      url: "https://uhcc.who.int/uhcpackages/",
    },
  },
  journey: {
    teamSize: "2 designers, cross-functional",
    duration: "3.5+ years",
    launchDate: "2021 - current",
    ndaNotice:
      "Due to the nature of the project some details have been excluded from this case study.",
  },
  processSections: [
    {
      title: "Conceptualization Session",
      images: ["/images/who-spdi/conceptualization.png"],
    },
    {
      title: "Launched 1.0",
      images: [
        "/images/who-spdi/launched-1.png",
        "/images/who-spdi/launched-2.png",
        "/images/who-spdi/launched-3.png",
        "/images/who-spdi/launched-4.png",
        "/images/who-spdi/launched-5.png",
        "/images/who-spdi/launched-6.png",
        "/images/who-spdi/launched-7.png",
        "/images/who-spdi/launched-8.png",
      ],
    },
  ],
};

export default whoSpdi;
