import { ProjectData } from "@/data/types";

const cochlearRemoteCheck: ProjectData = {
  slug: "cochlear-remote-check",
  client: "Cochlear",
  title: "Remote Hearing Health Check",
  context: [
    "According to World Health Organisation figures, over 460 million people worldwide suffer from disabling hearing loss. Scaling of the current hearing healthcare model to meet this need will require considerable public and private investment to train more healthcare professionals, build more clinics, and install expensive audiological equipment. The design challenge was to transform this current hearing healthcare paradigm, enabling clinics to treat more patients whilst maintaining a high standard of professional care.",
  ],
  description: [
    "Remote Check is designed to be a convenient, at-home testing tool that allows Cochlear recipients with a Cochlear™ Nucleus® 7 Sound Processor to complete a series of hearing tests from their mobile device using the Nucleus Smart App. Results are then sent remotely to the recipient's clinic for review by their clinician, so a clinician can quickly determine whether a patient is progressing well, or whether further clinical intervention is required.",
    "Remote Check frees up a clinic's time and resources, enabling the clinic to provide care to more patients and prioritise resources based on need. From a patient perspective, Remote Check provides convenient access to care so that patients no longer need to take time off work or school, or spend time and money travelling to unnecessary in-clinic appointments.",
  ],
  heroImage: "/images/cochlear-remote-check/clinicians-1.png",
  metadata: {
    platform: ["iOS", "Android", "Web app"],
    services: [
      "Ux design",
      "Ui design",
      "Strategy",
      "User research",
      "Prototyping",
      "User testing",
      "Design system",
    ],
    tools: [
      "Pen & paper",
      "Miro",
      "Balsamiq",
      "Figma",
      "Adobe after effect",
    ],
    awards: ["Good Design Australia"],
    link: {
      label: "Remote Check @ Cochlear",
      url: "https://www.cochlear.com/us/en/campaign/remote-check-pro",
    },
  },
  journey: {
    text: "Working within a team of 4 designers, collaborate with cross-functional teams, including product managers, developers, and stakeholders outside of Cochlear, this project spanned across 2+ years. The Remote check service launched in 2018 - current.",
    ndaNotice:
      "Due to the nature of the project some details have been excluded from this case study.",
  },
  processSections: [
    {
      title: "Wireframes",
      images: [
        "/images/cochlear-remote-check/wireframes-1.png",
        "/images/cochlear-remote-check/recipients-2.png",
      ],
    },
    {
      title: "Remote check for recipients",
      images: [
        "/images/cochlear-remote-check/hero-1.png",
        "/images/cochlear-remote-check/recipients-3.png",
        "/images/cochlear-remote-check/wireframes-2.png",
        "/images/cochlear-remote-check/clinicians-2.png",
        "/images/cochlear-remote-check/recipients-6.png",
        "/images/cochlear-remote-check/recipients-5.png",
      ],
    },
    {
      title: "Remote check for clinicians",
      images: [
        "/images/cochlear-remote-check/hero-2.png",
        "/images/cochlear-remote-check/recipients-4.png",
        "/images/cochlear-remote-check/recipients-1.png",
      ],
    },
  ],
};

export default cochlearRemoteCheck;
