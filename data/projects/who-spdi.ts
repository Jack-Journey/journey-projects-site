import { ProjectData } from "@/data/types";

const whoSpdi: ProjectData = {
  slug: "who-spdi",
  client: "World Health Organisation",
  title: "UHC Service Planning, Delivery & Implementation (SPDI)",
  context: [
    "The UHC Compendium is a database of health services and intersectoral interventions designed to assist countries in making progress toward Universal Health Coverage (UHC). It provides a strategic way to organize and present information and creates a framework to think about health services and health interventions. The database for the Compendium spans the full spectrum of promotive, preventive, diagnostic, resuscitative, curative, rehabilitative, and palliative services, as well as a full complement of intersectoral interventions. The Compendium provides rapid, one-stop access to supporting evidence, associated human and material resource inputs, and feedback on cost impact as interventions are selected.",
    "WHO seeks to create a digital platform where countries and partners can easily access the compendium data and utilize the data to respond to their needs.",
  ],
  description: [
    "The World Health Organization's (WHO) Universal Health Coverage (UHC) Service Planning, Delivery & Implementation (SPDI) Platform is a digital tool designed to assist countries in developing comprehensive national health service packages. It offers features such as resource estimation, service delivery modeling, and financial planning, enabling policymakers to design effective health services tailored to their populations' needs. The platform's user-friendly interface and intuitive navigation enhance the user experience, facilitating efficient planning and implementation processes. By providing a centralized, accessible platform, the SPDI supports the achievement of universal health coverage goals globally.",
  ],
  heroImage: "/images/who-spdi/hero.png",
  metadata: {
    platform: ["Web app"],
    services: [
      "Ux design",
      "Ui design",
      "1.0",
      "Strategy",
      "Pitch",
      "User research",
      "Prototyping",
      "User testing",
      "Design system",
    ],
    tools: ["Pen & paper", "Figma jam", "Figma"],
    link: {
      label: "uhcc.who.int",
      url: "https://uhcc.who.int/uhcpackages/",
    },
  },
  journey: {
    text: "Working within a team of 2 designers, scollaborate with cross-functional teams, including product owners, developers, and stakeholders outside of WHO, this project spanned across 3.5+ years. The app launched in 2021 - current.",
    ndaNotice:
      "Due to the nature of the project some details have been excluded from this case study.",
  },
  processSections: [
    {
      title: "Conceptualization",
      description:
        "One of many conceptualisation sessions with stakeholders trying to build out the schematics of the product. The key challenge was the scale and complexity of the framework.",
      images: ["/images/who-spdi/launched-5.png"],
    },
    {
      title: "Launched 1.0",
      images: [
        "/images/who-spdi/launched-8.png",
        "/images/who-spdi/conceptualization.png",
        "/images/who-spdi/launched-7.png",
        "/images/who-spdi/launched-6.png",
        "/images/who-spdi/launched-4.png",
        "/images/who-spdi/launched-1.png",
        "/images/who-spdi/launched-3.png",
        "/images/who-spdi/launched-2.png",
      ],
    },
  ],
};

export default whoSpdi;
