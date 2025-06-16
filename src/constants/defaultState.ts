import EmailLogo from "@/assets/EmailIcon.svg";
import PhoneLogo from "@/assets/PhoneLogo.svg";
import ExperienceLogo from "@/assets/ExperienceLogo.svg";
import LocationIcon from "@/assets/LocationIcon.svg";
import Figma from "@/assets/Figma.svg";
import Invision from "@/assets/Invision.svg";
import AdobeXD from "@/assets/AdobeXD.svg";
import Sketch from "@/assets/Sketch.svg";
import Balsamiq from "@/assets/Balsamiq.svg";
import Illustrator from "@/assets/Illustrator.svg";
import { Projectcategory, ProjectType } from "./enums";

export const profileWidgetDetails = [
  {
    id: 1,
    label: "EMAIL",
    value: "deepanraj2001m@gmail.com",
    icon: EmailLogo,
  },
  {
    id: 2,
    label: "PHONE NUMBER",
    value: "+91 63805-58537",
    icon: PhoneLogo,
  },
  {
    id: 3,
    label: "TOTAL EXPERIENCE",
    value: "2 Years 9 Months",
    icon: ExperienceLogo,
  },
  {
    id: 4,
    label: "LOCATION",
    value: "Eroder, TN",
    icon: LocationIcon,
  },
];

export const navbarPaths = [
  {
    id: 1,
    label: "About",
    href: "/",
  },
  {
    id: 2,
    label: "Resume",
    href: "/resume",
  },
  {
    id: 3,
    label: "Projects",
    href: "/project",
  },
  {
    id: 4,
    label: "Case Study",
    href: "/case-study",
  },
  {
    id: 5,
    label: "Contact",
    href: "/contact",
  },
];

export const whatIamDoing = [
  {
    id: 1,
    title: "Usability",
    description:
      "Ensures the interface is easy to use, intuitive, and accessible, allowing all users to achieve their goals effortlessly.",
  },
  {
    id: 2,
    title: "Aesthetics",
    description:
      "The visual appeal of a design, driven by consistency design, clear Visual hierarchy, and emotional connection.",
  },
  {
    id: 3,
    title: "Functionality",
    description:
      "Ensures the product works reliably, efficiently, and is scalable to meet user needs and future demands.",
  },
  {
    id: 4,
    title: "User-Centric Design",
    description:
      "Focuses on understanding user needs through empathy, feedback, and continuous improvement based on user input.",
  },
];

export const experience = [
  {
    id: 1,
    title: "Hexadecimal Software Pvt. Ltd.",
    subTitle: "20 Jun 2023 - Present",
    description:
      "Designed user interfaces for e-commerce platforms, focusing on enhancing usability and visual appeal.",
  },
  {
    id: 2,
    title: "Acclaim Solutions",
    subTitle: "05 Feb 2023 - 15 Jun 2023",
    description:
      "Designed user interfaces for e-commerce platforms, focusing on enhancing usability and visual appeal.",
  },
  {
    id: 3,
    title: "Avasoft",
    subTitle: "20 Nov 2021 - 07 May 2022",
    description:
      "Designed user interfaces for e-commerce platforms, focusing on enhancing usability and visual appeal.",
  },
];

export const tools = [
  {
    id: 1,
    title: "Figma",
    description:
      "A design tool for collaborative UI/UX design and prototyping.",
    icon: Figma,
    rating: 4,
  },
  {
    id: 2,
    title: "Invision",
    description: "A platform for prototyping and workflow management.",
    icon: Invision,
    rating: 4,
  },
  {
    id: 3,
    title: "Adobe XD",
    description: "A tool for designing user - interfaces and prototypes.",
    icon: AdobeXD,
    rating: 4,
  },
  {
    id: 4,
    title: "Sketch",
    description: "A design tool with plugins and prototyping features.",
    icon: Sketch,
    rating: 3,
  },
  {
    id: 5,
    title: "Balsamiq",
    description: "A wireframing tool for low-fidelity mockups.",
    icon: Balsamiq,
    rating: 4,
  },
  {
    id: 6,
    title: "Illustrator",
    description: "A tool for creating vector graphics, and illustrations.",
    icon: Illustrator,
    rating: 3,
  },
];

export const experienceTimeline = [
  {
    title: "UI/UX Designer",
    subtitle: "Hexadecimal Software Pvt. Ltd.",
    startDate: "20 Jun 2023",
    endDate: "Present",
    description:
      "Worked on designing user-friendly interfaces and enhancing user experiences for web and mobile applications, focusing on usability, aesthetics, and client requirements.",
  },
  {
    title: "UI/UX Design Intern",
    subtitle: "Acclaim Solution",
    startDate: "05 Feb 2023",
    endDate: "15 Jun 2023",
    description:
      "Gained hands-on experience in creating wireframes, prototypes, and design systems, collaborating with teams to deliver intuitive design solutions.",
  },
  {
    title: "User Experience Design Intern",
    subtitle: "Avasoft",
    startDate: "20 Nov 2021",
    endDate: "07 May 2022",
    description:
      "Conducted user research and usability testing to optimize design processes and improve the overall user experience for digital platforms.",
  },
];

export const educationTimeline = [
  {
    title: "Builders Engineering College",
    startDate: "2016",
    endDate: "2020",
    description:
      "I earned a B.E. in Computer Science with a 7.58 CGPA from Builders Engineering College (2016–2020), gaining expertise in programming and software development.",
  },
  {
    title: "Kongu Vellalar Matriculation Higher Secondary School",
    startDate: "2014",
    endDate: "2015",
    description:
      "I completed my SSLC at Kongu Vellalar Matriculation Secondary School in 2014–2015, securing 78% and building a solid academic foundation.",
  },
];

export const mySkills = [
  {
    title: "Requirement Gathering",
    description:
      "Collecting and analyzing project needs to align design goals with user and business objectives..",
  },
  {
    title: "Business Knowledge",
    description:
      "Understanding business goals and objectives to design solutions that align with the company’s vision.",
  },
  {
    title: "User Research",
    description:
      "Understanding user behavior, needs, and pain points through interviews, surveys, and observations.",
  },
  {
    title: "User Flow",
    description:
      "Designing step-by-step paths that users take to achieve their goals in a product or application.",
  },
  {
    title: "Information Architecture",
    description:
      "Structuring and organizing content to make navigation intuitive and user-friendly.",
  },
  {
    title: "Wireframing",
    description:
      "Creating low-fidelity layouts to visualize page structure and functionality.",
  },
  {
    title: "Visual Designing",
    description:
      "Designing engaging interfaces and creating interactive prototypes for usability testing.",
  },
  {
    title: "Unit Testing",
    description:
      "Ensuring design components function as intended by testing individual UI/UX elements.",
  },
  {
    title: "Prototyping",
    description:
      "Building interactive models of the design to test and validate user interactions before development.",
  },
  {
    title: "HTML & CSS",
    description:
      "Developing responsive and accessible front-end interfaces using coding and Bootstrap framework.",
  },
];

export const ProjectCategories = [
  {
    label: "All",
    value: Projectcategory.ALL,
  },
  {
    label: "Applications",
    value: Projectcategory.APPLICATION,
  },
  {
    label: "Dashboards",
    value: Projectcategory.DASHBOARD,
  },
  {
    label: "Web Design",
    value: Projectcategory.WEBDESIGN,
  },
];

export const ProjectTypeValues = [
  {
    label: "Project",
    value: ProjectType.PROJECT,
  },
  {
    label: "Case Study",
    value: ProjectType.CASE_STUDY,
  },
];
