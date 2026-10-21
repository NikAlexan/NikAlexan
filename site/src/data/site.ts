export type Locale = "ru" | "en";

type Service = {
  title: string;
  description: string;
  iconPath: string;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

type Social = {
  label: string;
  href: string;
};

export type SiteContent = {
  locale: Locale;
  meta: {
    title: string;
    description: string;
    url: string;
    ogImage: string;
    siteName: string;
    personName: string;
    personAlternateName: string;
    jobTitle: string;
  };
  nav: {
    logo: string;
    homeHref: string;
    links: { label: string; href: string }[];
    cta: { label: string; href: string };
  };
  hero: {
    name: string;
    tagline: string;
    description: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    note: string;
    cardKicker: string;
    cardTitle: string;
    cardText: string;
    cardChips: string[];
  };
  about: {
    title: string;
    body: string;
    bullets: string[];
    jokes: string[];
    stack: { label: string; items: string[] }[];
    availability: string;
  };
  services: {
    title: string;
    items: Service[];
  };
  projects: {
    title: string;
  };
  petProjects: {
    title: string;
    note: string;
  };
  testimonials: {
    title: string;
    items: Testimonial[];
  };
  contact: {
    title: string;
    blurb: string;
    formEnabled: boolean;
    form: {
      nameLabel: string;
      emailLabel: string;
      messageLabel: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      submitLabel: string;
    };
    socials: Social[];
  };
  ui: {
    home: string;
    navigation: string;
    location: string;
    availability: string;
    experience: string;
    positions: (count: number) => string;
    viewDetails: string;
    comingSoon: string;
    allProjectsOnGitHub: string;
    techStack: string;
  };
  footer: {
    copyright: string;
    links: { label: string; href: string }[];
  };
};

const base = {
  url: "https://nikalexan.com",
  ogImage: "https://nikalexan.com/og-image.png"
};

const servicesIconPaths = [
  "M4 6h16v12H4z M4 10h16",
  "M12 3v6m0 0l-3-3m3 3l3-3 M6 21h12",
  "M7 7h10v10H7z M3 12h4m10 0h4",
  "M5 9h14M5 15h10m-6 6h6",
  "M12 4l6 4v6l-6 4-6-4V8z",
  "M5 12a7 7 0 1 0 14 0a7 7 0 1 0-14 0"
];

const shared = {
  navLinks: [
    { label: "Experience", href: "#works" },
    { label: "Side projects", href: "#pet-projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ],
  socials: [
    { label: "Telegram", href: "https://t.me/nikalexan" },
    { label: "Email", href: "mailto:hi@nikalexan.com" },
    { label: "LinkedIn", href: "https://linkedin.com/in/nikalexan" },
    { label: "GitHub", href: "https://github.com/nikalexan" }
  ]
};

const pluralRu = (count: number, [one, few, many]: [string, string, string]) => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
};

export const siteRu: SiteContent = {
  locale: "ru",
  meta: {
    title: "Никита Василенко (Nikita Vassilenko) — backend-разработчик на PHP, Java и Go",
    description:
      "Middle Backend Developer из Астаны: PHP, Laravel, Java, Go. Поддерживаю государственные порталы с аудиторией 750K+ визитов в месяц. Победитель WorldSkills Kazakhstan 2023.",
    url: `${base.url}/`,
    ogImage: base.ogImage,
    siteName: "Никита Василенко",
    personName: "Никита Василенко",
    personAlternateName: "Nikita Vassilenko",
    jobTitle: "Middle Backend Developer"
  },
  nav: {
    logo: "Nikita Vassilenko",
    homeHref: "/",
    links: [
      { label: "Опыт", href: "#works" },
      { label: "Пет-проекты", href: "#pet-projects" },
      { label: "Обо_мне", href: "#about" },
      { label: "Контакты", href: "#contact" }
    ],
    cta: { label: "Связаться", href: "#contact" }
  },
  hero: {
    name: "Nikita Vassilenko",
    tagline: "Middle Backend Developer",
    description:
      "Пишу бэкенд на PHP, Java и Go: API, базы данных, очереди, CI/CD. Поддерживаю государственные порталы с аудиторией 750K+ визитов в месяц.",
    ctaPrimary: { label: "LinkedIn", href: "https://www.linkedin.com/in/nikalexan/" },
    ctaSecondary: { label: "Опыт работы", href: "#works" },
    note: "Астана, Казахстан",
    cardKicker: "WorldSkills",
    cardTitle: "WorldSkills 2023 Winner",
    cardText:
      "WorldSkills Astana 2023 и WorldSkills Kazakhstan 2023 — «IT solutions for business».",
    cardChips: ["PHP", "Java", "Go"]
  },
  about: {
    title: "Обо мне",
    body:
      "Middle Backend Developer в KazInSys, Астана. С 2023 года делаю бэкенд для государственных сайтов: в основном PHP и Laravel, на работе также Java и Go. Проектирую API, ускоряю запросы к базе, настраиваю Docker и CI/CD. В своих проектах пишу микросервисы на Go с gRPC и NATS и деплою их в Kubernetes через Terraform.",
    bullets: [
      "Победитель WorldSkills Astana 2023 и WorldSkills Kazakhstan 2023",
      "Middle Backend Developer в KazInSys (апр. 2025 — настоящее время)",
      "Junior Full Stack Developer в KazInSys (июль 2023 — апр. 2025)",
      "Astana IT University — Software Engineering (2024–2027)",
      "Астанинский политехнический колледж — информационные системы (2020–2024)",
      "Сертификаты: Senior Laravel Developer, Red Hat RH124, Linux Essentials (Cisco)"
    ],
    jokes: [
      "Когда рога падают — никто не замечает, а когда прод — все",
      "Собрал микросервис — теперь ищу, куда он делся в проде",
      "Бэкап — это как чувство юмора: нужен до инцидента",
      "Если фича работает, значит ты забыл про кеш",
      "Логи молчат — значит, ты не там ищешь правду",
      "Сначала была таблица. Потом JOIN. Потом стало грустно"
    ],
    stack: [
      { label: "Языки", items: ["PHP", "Java", "Go", "SQL"] },
      { label: "Фреймворки", items: ["Laravel", "Symfony", "Spring Boot", "Gin"] },
      { label: "Базы данных", items: ["MySQL", "PostgreSQL", "Redis", "MongoDB"] },
      { label: "DevOps", items: ["Docker", "Kubernetes", "Nginx", "Linux", "GitLab CI/CD"] },
      { label: "Логи, метрики, тесты", items: ["Graylog", "Grafana", "PHPUnit", "JUnit"] },
      { label: "В своих проектах", items: ["gRPC", "NATS", "Terraform", "Vue", "Solidity"] }
    ],
    availability: 'Открыт для сотрудничества'
  },
  services: {
    title: "",
    items: []
  },
  projects: {
    title: "Опыт работы"
  },
  petProjects: {
    title: "Пет-проекты",
    note: "Хакатоны, командные и учебные проекты"
  },
  testimonials: {
    title: "",
    items: []
  },
  contact: {
    title: "Связаться",
    blurb:
      "Открыт к новым возможностям и задачам. Напишите пару строк — отвечу и обсудим детали.",
    formEnabled: true,
    form: {
      nameLabel: "Имя",
      emailLabel: "Email",
      messageLabel: "Сообщение",
      namePlaceholder: "Ваше имя",
      emailPlaceholder: "you@email.com",
      messagePlaceholder: "Опишите задачу или проект",
      submitLabel: "Отправить"
    },
    socials: shared.socials
  },
  ui: {
    home: "Главная",
    navigation: "Навигация",
    location: "Город",
    availability: "Статус",
    experience: "Опыт",
    positions: (count) => `${count}+ ${pluralRu(count, ["должность", "должности", "должностей"])}`,
    viewDetails: "Подробнее",
    comingSoon: "Скоро",
    allProjectsOnGitHub: "Все проекты на GitHub",
    techStack: "Стек"
  },
  footer: {
    copyright: "© 2026 Nikita Vassilenko",
    links: [{ label: "English", href: "/en/" }]
  }
};

export const siteEn: SiteContent = {
  locale: "en",
  meta: {
    title: "Nikita Vassilenko — Backend Developer (PHP, Java, Go)",
    description:
      "Middle Backend Developer in Astana, Kazakhstan: PHP, Laravel, Java, Go. I maintain government portals with 750K+ monthly visits. WorldSkills Kazakhstan 2023 winner.",
    url: `${base.url}/en/`,
    ogImage: base.ogImage,
    siteName: "Nikita Vassilenko",
    personName: "Nikita Vassilenko",
    personAlternateName: "Никита Василенко",
    jobTitle: "Middle Backend Developer"
  },
  nav: {
    logo: "Nikita Vassilenko",
    homeHref: "/en/",
    links: shared.navLinks,
    cta: { label: "Get in touch", href: "#contact" }
  },
  hero: {
    name: "Nikita Vassilenko",
    tagline: "Middle Backend Developer",
    description:
      "I build backends in PHP, Java and Go: APIs, databases, queues, CI/CD. I maintain government portals with 750K+ monthly visits.",
    ctaPrimary: { label: "LinkedIn", href: "https://www.linkedin.com/in/nikalexan/" },
    ctaSecondary: { label: "Experience", href: "#works" },
    note: "Astana, Kazakhstan",
    cardKicker: "WorldSkills",
    cardTitle: "WorldSkills 2023 Winner",
    cardText:
      "WorldSkills Astana 2023 and WorldSkills Kazakhstan 2023 — “IT solutions for business”.",
    cardChips: ["PHP", "Java", "Go"]
  },
  about: {
    title: "About",
    body:
      "Middle Backend Developer at KazInSys in Astana. Since 2023 I have built backends for government websites, mostly in PHP and Laravel, with some Java and Go at work. I design APIs, speed up database queries and set up Docker and CI/CD. In my own projects I write Go microservices with gRPC and NATS and deploy them to Kubernetes with Terraform.",
    bullets: [
      "Winner of WorldSkills Astana 2023 and WorldSkills Kazakhstan 2023",
      "Middle Backend Developer at KazInSys (Apr 2025 — Present)",
      "Junior Full Stack Developer at KazInSys (Jul 2023 — Apr 2025)",
      "Astana IT University — Software Engineering (2024–2027)",
      "Astana Polytechnic College — Information Systems (2020–2024)",
      "Certificates: Senior Laravel Developer, Red Hat RH124, Cisco Linux Essentials"
    ],
    jokes: [
      "When antlers fall, no one notices; when prod falls, everyone does",
      "Shipped a microservice — now tracking it down in prod",
      "Backups are like jokes: you need them before the incident",
      "If the feature works, you probably forgot the cache",
      "When logs are quiet, you're looking in the wrong place",
      "It started as a table. Then JOINs happened. Then sadness"
    ],
    stack: [
      { label: "Languages", items: ["PHP", "Java", "Go", "SQL"] },
      { label: "Frameworks", items: ["Laravel", "Symfony", "Spring Boot", "Gin"] },
      { label: "Databases", items: ["MySQL", "PostgreSQL", "Redis", "MongoDB"] },
      { label: "DevOps", items: ["Docker", "Kubernetes", "Nginx", "Linux", "GitLab CI/CD"] },
      { label: "Logs, metrics, tests", items: ["Graylog", "Grafana", "PHPUnit", "JUnit"] },
      { label: "Side projects", items: ["gRPC", "NATS", "Terraform", "Vue", "Solidity"] }
    ],
    availability: "Open for new opportunities"
  },
  services: {
    title: "",
    items: []
  },
  projects: {
    title: "Experience"
  },
  petProjects: {
    title: "Side projects",
    note: "Hackathons, team and university projects"
  },
  testimonials: {
    title: "",
    items: []
  },
  contact: {
    title: "Contact",
    blurb:
      "Open to new opportunities and tasks. Share a few details and I’ll reply.",
    formEnabled: true,
    form: {
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@email.com",
      messagePlaceholder: "Tell me about your project",
      submitLabel: "Send message"
    },
    socials: shared.socials
  },
  ui: {
    home: "Home",
    navigation: "Navigation",
    location: "Location",
    availability: "Availability",
    experience: "Experience",
    positions: (count) => `${count}+ ${count === 1 ? "Position" : "Positions"}`,
    viewDetails: "View details",
    comingSoon: "Coming soon",
    allProjectsOnGitHub: "All Projects on GitHub",
    techStack: "Tech Stack"
  },
  footer: {
    copyright: "© 2026 Nikita Vassilenko",
    links: [{ label: "Русская версия", href: "/" }]
  }
};

export const getSite = (locale: Locale): SiteContent =>
  locale === "en" ? siteEn : siteRu;
