export interface Certification {
  slug: string;
  num: string;
  title: string;
  shortTitle: string;
  issuer: string;
  platform: string;
  summary: string;
  overview: string;
  skills: string[];
  cover: string;
  coverType: "image" | "pdf";
  verifyUrl: string;
}

export const certifications: Certification[] = [
  {
    slug: "harvard-cs50x",
    num: "01",
    title: "Harvard CS50x — Introduction to Computer Science",
    shortTitle: "CS50x — Harvard",
    issuer: "Harvard University",
    platform: "CS50 / edX",
    summary: "Computer science fundamentals, algorithms, data structures, databases, and web development.",
    overview:
      "A comprehensive introduction to computer science covering computational thinking, algorithms, data structures, memory, computer architecture, databases, and web development. Built practical projects using C, Python, SQL, HTML, CSS, and JavaScript.",
    skills: ["Algorithms", "Data Structures", "C", "Python", "SQL", "HTML/CSS", "JavaScript"],
    cover: "/Certification/CS50x.pdf",
    coverType: "pdf",
    verifyUrl: "https://certificates.cs50.io/b113f8e7-3911-45fe-aa7c-ed7574cc86fd.pdf?size=letter",
  },
  {
    slug: "responsive-web-design",
    num: "02",
    title: "freeCodeCamp — Responsive Web Design",
    shortTitle: "Responsive Web Design — freeCodeCamp",
    issuer: "freeCodeCamp",
    platform: "freecodecamp.org",
    summary: "Responsive layouts, semantic HTML, CSS, Flexbox, Grid, and accessibility.",
    overview:
      "Demonstrated practical knowledge of modern responsive web development, including semantic HTML, CSS, Flexbox, CSS Grid, accessibility, responsive layouts, and building user-focused web interfaces.",
    skills: ["Semantic HTML", "CSS", "Flexbox", "CSS Grid", "Accessibility"],
    cover: "/Certification/responsiveWebDesignV8_freecodecamp.png",
    coverType: "image",
    verifyUrl: "https://www.freecodecamp.org/certification/fcc-f4785d39-02d1-445e-8a81-3dbd12ca13ea/responsive-web-design",
  },
  {
    slug: "javascript-algorithms-and-data-structures",
    num: "03",
    title: "freeCodeCamp — JavaScript Algorithms and Data Structures",
    shortTitle: "JavaScript Algorithms & Data Structures — freeCodeCamp",
    issuer: "freeCodeCamp",
    platform: "freecodecamp.org",
    summary: "JavaScript, ES6, algorithms, data structures, and problem-solving.",
    overview:
      "Developed a strong foundation in JavaScript programming, including ES6, functions, arrays, objects, classes, recursion, algorithmic problem-solving, and data structures through hands-on coding challenges and projects.",
    skills: ["JavaScript", "ES6", "Algorithms", "Data Structures", "Problem Solving"],
    cover: "/Certification/JavaScript_freecodecamp.png",
    coverType: "image",
    verifyUrl: "https://www.freecodecamp.org/certification/fcc-f4785d39-02d1-445e-8a81-3dbd12ca13ea/javascript-algorithms-and-data-structures-v8",
  },
  {
    slug: "front-end-development-libraries",
    num: "04",
    title: "freeCodeCamp — Front End Development Libraries",
    shortTitle: "Front End Development Libraries — freeCodeCamp",
    issuer: "freeCodeCamp",
    platform: "freecodecamp.org",
    summary: "React, Redux, React Router, Bootstrap, and interactive front-end applications.",
    overview:
      "Built interactive front-end applications using modern JavaScript libraries and tools, with hands-on experience in React, Redux, React Router, Bootstrap, and responsive UI development.",
    skills: ["React", "Redux", "React Router", "Bootstrap"],
    cover: "/Certification/frontend_freecodecamp.png",
    coverType: "image",
    verifyUrl: "https://www.freecodecamp.org/certification/fcc-f4785d39-02d1-445e-8a81-3dbd12ca13ea/front-end-development-libraries",
  },
  {
    slug: "nodejs-backend-development",
    num: "05",
    title: "Node.js & Backend Development — Udemy",
    shortTitle: "Node.js & Backend Development — Udemy",
    issuer: "Udemy",
    platform: "udemy.com",
    summary: "Node.js, REST & GraphQL APIs, Authentication, MongoDB, SQL, and backend architecture.",
    overview:
      "Built RESTful and GraphQL APIs with Node.js, implemented authentication and authorization, and worked with both SQL and MongoDB databases. Gained practical experience with backend architecture, API development, and server-side JavaScript.",
    skills: ["Node.js", "REST & GraphQL APIs", "Authentication", "MongoDB", "SQL", "Backend Architecture"],
    cover: "/Certification/NODEJS_udemy.jpg",
    coverType: "image",
    verifyUrl: "https://www.udemy.com/certificate/UC-18389629-3e90-40ee-b3e6-fdb83834ec01/",
  },
];

export function findCertificationBySlug(slug: string): Certification | undefined {
  return certifications.find((c) => c.slug === slug);
}
