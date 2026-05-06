/**
 * Content data for Cochlear Nucleus Smart App case study.
 * Source: jp-site-project-pages-extraction-2026-05-06.md
 */

import { ProjectData } from "@/data/types";

const cochlearSmartApp: ProjectData = {
  slug: "cochlear-smart-app",
  client: "Cochlear",
  title: "Nucleus Smart App",
  context:
    "Cochlear Nucleus Sound Processors are designed to be small and lightweight with a single button control. Scope included feature exploration, validation, ideation, wireframing, prototyping, user testing, design system development, UI design, documentation, developer handover, pilot studies, and product launch.",
  description:
    "Nucleus Smart App is a digital remote assistant for recipients of the Cochlear implant system, empowering the user to control their hearing performance, check the health status of their hearing processor and progress track their personal hearing fitness from their mobile phones.",
  heroImage: "/images/cochlear-smart-app/hero-1.png",
  metadata: {
    platform: ["iOS", "Android"],
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
    tools: [
      "Pen & paper",
      "Miro",
      "Balsamiq",
      "Sketchapp",
      "Adobe After Effects",
    ],
    awards: ["Red Dot"],
    link: {
      label: "Start Using the Nucleus Smart App",
      url: "https://www.youtube.com/results?search_query=cochlear+nucleus+smart+app",
    },
  },
  journey: {
    teamSize: "4 designers, cross-functional",
    duration: "3+ years",
    launchDate: "2017 - current",
    ndaNotice:
      "Due to the nature of the project some details have been excluded from this case study.",
  },
  processSections: [
    {
      title: "Conceptualisation",
      images: ["/images/cochlear-smart-app/conceptualisation.png"],
    },
    {
      title: "Wireframes",
      images: [
        "/images/cochlear-smart-app/wireframes-1.png",
        "/images/cochlear-smart-app/wireframes-2.png",
      ],
    },
    {
      title: "Visual Design Exploration",
      images: ["/images/cochlear-smart-app/visual-design-exploration.png"],
    },
    {
      title: "Product Launch",
      images: [
        "/images/cochlear-smart-app/product-launch-1.png",
        "/images/cochlear-smart-app/hero-2.png",
        "/images/cochlear-smart-app/product-launch-2.png",
      ],
    },
    {
      title: "Additional",
      images: [
        "/images/cochlear-smart-app/additional-1.png",
        "/images/cochlear-smart-app/additional-2.png",
        "/images/cochlear-smart-app/additional-3.png",
      ],
    },
  ],
};

export default cochlearSmartApp;
