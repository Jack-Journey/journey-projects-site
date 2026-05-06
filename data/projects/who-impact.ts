import { ProjectData } from "@/data/types";

const whoImpact: ProjectData = {
  slug: "who-impact",
  client: "World Health Organisation",
  title: "WHO IMPACT Clinical Decision Support Tool",
  context: [
    "World Health Organization’s (WHO) is active in developing and promoting clinical decision support systems and resources to improve patient care, especially in lower-resource settings. These tools provide timely, evidence-based guidance to healthcare professionals to inform diagnostic and treatment decisions, facilitate shared decision-making, and support a patient-centric healthcare system.",
    "WHO seeks to create a digital platform where countries and partners can easily access and distribute the CDS.",
  ],
  description: [
    "The World Health Organization’s (WHO) Integrated Management for Prevention and Control Tool (IMPACT) is a clinical decision support system designed to enhance healthcare delivery. It provides clinicians with evidence-based recommendations at the point of care, offering tailored guidance on diagnostics, treatment plans, and preventive measures. IMPACT aims to improve patient outcomes, reduce medical errors, and promote adherence to clinical guidelines. With a user-friendly interface and accessible design, it supports healthcare professionals in making informed decisions quickly and efficiently. By streamlining medical guidance, IMPACT enhances the quality and effectiveness of global healthcare services.",
  ],
  heroImage: "/images/who-impact/hero.png",
  metadata: {
    platform: ["Progressive web app"],
    services: [
      "Ux design",
      "Ui design",
      "Strategy",
      "Pitch",
      "User research",
      "Prototyping",
      "User testing",
      "Design system",
    ],
    tools: ["Pen & paper", "Figma jam", "Figma"],
    status: "Pilot currently in progress",
  },
  journey: {
    text: "Working within a team of 2 designers, collaborate with cross-functional teams, including product owners, developers, and stakeholders outside of WHO, this project spanned across 1.5+ years. 2024 - Current. Currently piloting in selected locations across the world.",
    ndaNotice:
      "Due to the nature of the project some details have been excluded from this case study.",
  },
  processSections: [
    {
      title: "Workshops to understand user groups and usage scenarios",
      images: [
        "/images/who-impact/wireframe-prototype-2.png",
        "/images/who-impact/final-ui-2.png",
      ],
    },
    {
      title: "Conceptualisation",
      images: ["/images/who-impact/wireframe-prototype-1.png"],
    },
    {
      title: "Refining concepts and schematics",
      images: [
        "/images/who-impact/conceptualisation.png",
        "/images/who-impact/workshops-2.png",
      ],
    },
    {
      title: "Wireframe and prototype",
      images: [
        "/images/who-impact/refining-2.png",
        "/images/who-impact/refining-1.png",
      ],
    },
    {
      title: "Final UI design and prototype ready for content",
      images: [
        "/images/who-impact/final-ui-1.png",
        "/images/who-impact/workshops-1.png",
      ],
    },
  ],
};

export default whoImpact;
