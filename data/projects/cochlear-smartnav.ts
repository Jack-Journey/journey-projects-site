/**
 * Content data for Cochlear SmartNav case study.
 * Source: jp-site-project-pages-extraction-2026-05-06.md
 */

import { ProjectData } from "@/data/types";

const cochlearSmartnav: ProjectData = {
  slug: "cochlear-smartnav",
  client: "Cochlear",
  title: "Nucleus SmartNav App",
  context:
    "Cochlear implant surgery has traditionally been performed without visual guidance, depending on surgeon expertise. Complications may only surface post-operatively. The design challenge: create an intuitive system providing real-time operating theatre feedback during electrode placement.",
  description:
    "The Nucleus SmartNav system supplies surgeons with wireless, real-time, actionable intraoperative insights for electrode visualization and navigation. Key features include real-time angular insertion depth and speed measurements, and the Placement Check function. It potentially reduces surgical imaging dependency and operating room time.",
  heroImage: "/images/cochlear-smartnav/hero.png",
  metadata: {
    platform: ["iOS"],
    services: [
      "UX Design",
      "UI Design",
      "Strategy",
      "User Research",
      "Prototyping",
      "User Testing",
      "Design System",
    ],
    tools: [
      "Pen & paper",
      "Miro",
      "Balsamiq",
      "Figma",
      "Adobe After Effects",
    ],
    awards: ["Good Design Australia"],
    link: {
      label: "Inside Look at the SmartNav System",
      url: "https://www.youtube.com/results?search_query=cochlear+smartnav",
    },
  },
  journey: {
    teamSize: "2 designers, cross-functional",
    duration: "2+ years",
    launchDate: "2018 - current",
    ndaNotice:
      "Due to the nature of the project some details have been excluded from this case study.",
  },
  processSections: [
    {
      title: "Workshops",
      images: [
        "/images/cochlear-smartnav/workshops-1.png",
        "/images/cochlear-smartnav/workshops-2.png",
      ],
    },
    {
      title: "Information Architecture",
      images: ["/images/cochlear-smartnav/information-architecture.png"],
    },
    {
      title: "Conceptualisation",
      images: [
        "/images/cochlear-smartnav/conceptualisation-1.png",
        "/images/cochlear-smartnav/conceptualisation-2.png",
        "/images/cochlear-smartnav/conceptualisation-3.png",
        "/images/cochlear-smartnav/conceptualisation-4.png",
        "/images/cochlear-smartnav/conceptualisation-5.png",
        "/images/cochlear-smartnav/conceptualisation-6.png",
        "/images/cochlear-smartnav/conceptualisation-7.png",
        "/images/cochlear-smartnav/conceptualisation-8.png",
      ],
    },
    {
      title: "Wireframing",
      images: [
        "/images/cochlear-smartnav/wireframes-1.png",
        "/images/cochlear-smartnav/wireframes-2.png",
        "/images/cochlear-smartnav/wireframes-3.png",
      ],
    },
    {
      title: "Design Finalization",
      images: ["/images/cochlear-smartnav/design-finalization.png"],
    },
    {
      title: "Product Launch",
      images: [
        "/images/cochlear-smartnav/product-launch-1.png",
        "/images/cochlear-smartnav/product-launch-2.png",
      ],
    },
  ],
};

export default cochlearSmartnav;
