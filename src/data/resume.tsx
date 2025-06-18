import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Mo Amir",
  initials: "DV",
  url: "https://dillion.io",
  location: "Greater Noida",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "Pending.",
  summary:
    "[Pending](/#education).",
  avatarUrl: "/me.jpg",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "C++",
    "Node.js",
    "Postgres",
    "Docker",
    "Redux Tool Kit",
    "Tailwind CSS",
    "Express.js",
    "REST APIs",
    "GraphQL",
    "Socket IO",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "Cloudinary",
    "AWS(EC2, S3, Lambda)",
    "VPS",
    "CI/CD(Github Actions)",
    "Nginx",
    "Git",
    "Github",
    "Postman",
    "Firebase",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "mo.amir.code@gmail.com",
    tel: "+916395212960",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/mo-amir-code",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/mo-amir",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/mo_amir_code",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@moamircode",
        icon: Icons.youtube,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "HOC",
      href: "https://myhoc.in/",
      badges: [],
      location: "Remote",
      title: "Full Stack Developer Intern",
      logoUrl: "/hoc.jpeg",
      start: "Sep 2024",
      end: "Nov 2024",
      description:
        "Enhanced application performance, scalability, and user experience by developing 5+ features, optimizing state management with Zustand, reducing Firebase calls by 40%, doubling user capacity, and increasing engagement through UI/UX improvements.",
    },
    {
      company: "Zummit Infolabs",
      href: "https://www.linkedin.com/company/zummit-infolabs-dna",
      badges: [],
      location: "Remote",
      title: "Node.Js Developer Intern",
      logoUrl: "/zummit.jpeg",
      start: "July 2024",
      end: "Sep 2024",
      description:
        "Developed and maintained 6+ modular backend APIs using Node.js and Express, optimizing performance and ensuring seamless collaboration with frontend and design teams for aligned and efficient application flow.",
    },
  ],
  education: [
    {
      school: "G.L. Bajaj",
      href: "https://www.glbitm.org",
      degree: "Master of Computer Applications (MCA)",
      logoUrl: "/gl.jpg",
      start: "2024",
      end: "2026",
    },
    {
      school: "RBMI",
      href: "https://rbmi.in/",
      degree: "Bachelor of Computer Applications (BCA)",
      logoUrl: "/rbmi.jpeg",
      start: "2021",
      end: "2024",
    },
  ],
  projects: [
    {
      title: "Chat Collect",
      href: "https://chatcollect.com",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://chatcollect.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
  ],
  hackathons: [
    {
      title: "Hack Western 5",
      dates: "November 23rd - 25th, 2018",
      location: "London, Ontario",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
  ],
} as const;
