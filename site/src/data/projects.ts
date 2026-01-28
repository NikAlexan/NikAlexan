export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  description: string;
  stack: string[];
  links?: ProjectLink[];
};

export const projectsRu: Project[] = [
  {
    title: "KAZINSYS.kz — Back End Developer",
    description:
      "Полный рабочий день · апр. 2025 — настоящее время · Astana, Kazakhstan · работа в офисе.",
    stack: ["Backend", "Full-time", "On-site"]
  },
  {
    title: "KAZINSYS.kz — Full Stack Developer",
    description: "июнь 2023 — апр. 2025 · 1 г. 11 мес. · работа в офисе.",
    stack: ["Full stack", "Full-time", "On-site"]
  },
  {
    title: "Телерадиокомплекс Президента РК — Student Intern",
    description: "май 2023 — июнь 2023 · 2 мес. · стажировка · работа в офисе.",
    stack: ["Internship", "On-site"]
  }
];

export const projectsEn: Project[] = [
  {
    title: "KAZINSYS.kz — Back End Developer",
    description:
      "Full-time · Apr 2025 — Present · Astana, Kazakhstan · On-site.",
    stack: ["Backend", "Full-time", "On-site"]
  },
  {
    title: "KAZINSYS.kz — Full Stack Developer",
    description: "Jun 2023 — Apr 2025 · 1 yr 11 mos · On-site.",
    stack: ["Full stack", "Full-time", "On-site"]
  },
  {
    title: "Tele Radio Complex of the President of RK — Student Intern",
    description: "May 2023 — Jun 2023 · 2 mos · Internship · On-site.",
    stack: ["Internship", "On-site"]
  }
];
