import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Mo Amir",
  initials: "MA",
  url: "https://mekyu.dev",
  location: "Greater Noida",
  locationLink:
    "https://www.google.com/maps/place/Greater+Noida,+Uttar+Pradesh",
  description:
    "Builder mindset with a developer’s toolkit. Always shipping, always learning.",
  summary:
    "Started with curiosity, stayed for the bugs. I’ve worked on freelance and personal projects that taught me more than any course could. Right now, I’m deep into full-stack dev, writing clean logic, and slowly falling in love with the terminal.[](/#education)",
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
      company: "Freelancer",
      href: "https://myhoc.in/",
      badges: [],
      location: "Remote",
      title: "Full Stack Developer",
      logoUrl: "",
      start: "July 2024",
      end: "Jan 2025",
      description:
        "Cloned three casino-style games—Dragon Tiger, Trenball, and Okwin—using React and JavaScript, replicating real gameplay mechanics with animations, betting timers, and round simulations. Included a control system to simulate outcomes and built dynamic game states that mirror real-world platforms.",
    },
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
      title: "ChatGPT Manager",
      href: "https://chromewebstore.google.com/detail/chatgpt-manager/ngdjiegldihfcmiccchkaockgjacbbjm",
      dates: "Feb 2025 - March 2025",
      active: true,
      description:
        "A powerful browser extension to search, organize, tag, and export your ChatGPT conversations with ease.",
      technologies: [
        "React.js",
        "Typescript",
        "Plasmo",
        "TailwindCSS",
        "Node.js",
        "MongoDB",
        "Redis",
      ],
      links: [
        {
          type: "Website",
          href: "https://chromewebstore.google.com/detail/chatgpt-manager/ngdjiegldihfcmiccchkaockgjacbbjm",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "https://img.youtube.com/vi/xzAYtD5INAs/hqdefault.jpg",
      video: "",
    },
    {
      title: "Karteca",
      href: "https://paykart-frontend.vercel.app",
      dates: "",
      active: true,
      description:
        "Karteca is a modern e-commerce app with user authentication, order management, and a multi-level referral system with wallet and activity tracking.",
      technologies: [
        "Next.js",
        "Typescript",
        "TailwindCSS",
        "Node.js",
        "MongoDB",
        "Redis",
        "PWA",
      ],
      links: [
        {
          type: "Website",
          href: "https://paykart-frontend.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/karteca.png",
      video: "",
    },
    {
      title: "Creto",
      href: "https://creto-frontend-black.vercel.app/",
      dates: "",
      active: true,
      description:
        "A modern e-commerce website focused on premium bicycles, offering a clean UI/UX, smooth shopping experience, and curated collections for cycling enthusiasts.",
      technologies: [
        "React.js",
        "Typescript",
        "TailwindCSS",
        "Node.js",
        "MongoDB",
        "Firebase",
        "Stripe",
      ],
      links: [
        {
          type: "Website",
          href: "https://creto-frontend-black.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/creto.png",
      video: "",
    },
    {
      title: "Instagram Clone",
      href: "https://instagram-fullstack-amir.vercel.app/",
      dates: "",
      active: true,
      description:
        "A full-featured Instagram clone with photo and video sharing, real-time chat, likes, comments, explore feed, reels, and user profiles — designed with a clean UI",
      technologies: [
        "React.js",
        "TailwindCSS",
        "Node.js",
        "MongoDB",
        "Socket IO",
      ],
      links: [
        {
          type: "Website",
          href: "https://instagram-fullstack-amir.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/instagram.png",
      video: "",
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
