import { ProjectData } from "@/data/types";

const cochlearSmartApp: ProjectData = {
  slug: "cochlear-smart-app",
  client: "Cochlear",
  title: "Nucleus Smart App",
  context: [
    "Cochlear Nucleus® Sound Processors are design to be small and lightweight with a single button control. The team wanted to create a companion app to connect with the latest generation of processors. The UX team was tasked with feature exploration and validation. Once the features were locked in, we embarked on the journey of ideation, wire framing, prototyping, user testing, building out the design system, Ui design, documentation , dev handover, pilot studies and product launch.",
  ],
  description: [
    "Nucleus Smart App is a digital remote assistant for recipients of the Cochlear implant system, empowering the user to control their hearing performance, check the health status of their hearing processor and progress track their personal hearing fitness from their mobile phones.",
  ],
  heroImage: "/images/cochlear-smart-app/additional-3.png",
  metadata: {
    platform: ["iOS", "Android"],
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
    tools: [
      "Pen & paper",
      "Miro",
      "Balsamiq",
      "Sketchapp",
      "Adobe after effect",
    ],
    awards: ["Red dot"],
    link: {
      label: "Start Using the Nucleus® Smart App",
      url: "https://www.youtube.com/results?search_query=cochlear+nucleus+smart+app",
    },
  },
  journey: {
    text: "Working within a team of 4 designers, collaborate with cross-functional teams, including product managers, developers, and stakeholders outside of Cochlear, this project spanned across 3+ years. The app launched in 2017 - current.",
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
      title: "Visual design exploration",
      images: ["/images/cochlear-smart-app/visual-design-exploration.png"],
    },
    {
      title: "Product launch",
      images: [
        "/images/cochlear-smart-app/product-launch-1.png",
        "/images/cochlear-smart-app/hero-2.png",
        "/images/cochlear-smart-app/product-launch-2.png",
      ],
    },
  ],
};

export default cochlearSmartApp;
