export const trqStudioCaseStudy = {
  id: 'trq-studio',
  title: 'TRQ Studio',
  subtitle: 'Bilingual Portfolio & Content Management Platform',
  image: '/Projects/TRQ.png',
  sections: {
    overview: {
      title: 'Overview',
      content: `The Bilingual Portfolio & Content Management Platform is a modern, full-stack web application designed for creative agencies, design studios, and professionals who need a powerful online presence combined with advanced content management capabilities.

The platform delivers a seamless bilingual experience in both English and Arabic, featuring enterprise-grade security, an intuitive administration dashboard, rich content editing tools, and a scalable architecture ready for production deployment.`,
    },
    client: {
      title: 'The Client',
      content: `Modern creative agencies require more than a simple portfolio website. They need a solution that can showcase projects professionally, manage blog content efficiently, support both Arabic and English audiences, provide secure administrator access, handle file uploads safely, maintain high performance across devices, and scale for future growth.`,
    },
    challenges: [
      {
        title: 'Bilingual Experience & RTL Support',
        content: 'Creating a fully bilingual application required dynamic language switching between English and Arabic while supporting Right-to-Left (RTL) layouts.',
      },
      {
        title: 'Enterprise-Level Security',
        content: 'The platform needed secure authentication and authorization mechanisms to protect sensitive administrative operations and user data.',
      },
      {
        title: 'Content Management Complexity',
        content: 'Administrators required a powerful dashboard to manage projects, blog posts, media files, and website content through a single interface.',
      },
      {
        title: 'File Upload Security',
        content: 'Uploaded files needed validation, size restrictions, and secure storage mechanisms to prevent malicious content and unauthorized access.',
      },
      {
        title: 'Performance & Responsiveness',
        content: 'The application had to deliver a fast experience on desktop, tablet, and mobile devices while maintaining smooth navigation and content loading.',
      },
    ],
    goals: [
      {
        title: 'Bilingual Support',
        content: 'Deliver a seamless experience for both English and Arabic-speaking audiences with proper RTL layout support.',
      },
      {
        title: 'Powerful Admin Dashboard',
        content: 'Create an intuitive interface for managing all platform content and settings in one centralized location.',
      },
      {
        title: 'Secure Authentication',
        content: 'Implement enterprise-grade security with JWT-based authentication and role-based access control.',
      },
      {
        title: 'Rich Content Management',
        content: 'Provide content creators with powerful tools to publish professional articles and manage projects.',
      },
      {
        title: 'High Performance',
        content: 'Ensure fast loading times and smooth navigation across all devices and screen sizes.',
      },
      {
        title: 'Production Readiness',
        content: 'Build a scalable, reliable platform ready for immediate deployment and future growth.',
      },
    ],
    solution: {
      title: 'The Solution',
      content: `A modern full-stack architecture was implemented using React, TypeScript, Vite, Express.js, and SQLite/Turso.

The frontend delivers a responsive, bilingual user interface with dynamic language switching and RTL support. The backend provides secure API endpoints with JWT authentication, comprehensive content management, and safe file handling.

Security was integrated throughout the architecture with JWT-based authentication, bcryptjs password hashing, rate limiting, input sanitization, and protected admin routes.`,
    },
    features: [
      {
        title: 'Bilingual Support (English & Arabic)',
        content: 'Dynamic language switching, RTL and LTR layouts, localized content management, and improved accessibility.',
      },
      {
        title: 'Admin Dashboard',
        content: 'Centralized administration panel to manage projects, blog posts, media files, and site settings.',
      },
      {
        title: 'Rich Text Editor',
        content: 'Professional content creation tools with formatting options, image embedding, and SEO-friendly features.',
      },
      {
        title: 'Project Management System',
        content: 'Add projects, update information, organize categories, and showcase completed work professionally.',
      },
      {
        title: 'Blog Engine',
        content: 'Complete blogging solution with article publishing, content editing, and category management.',
      },
      {
        title: 'Email Integration',
        content: 'Built-in email functionality for contact forms, notifications, and client communication.',
      },
      {
        title: 'File Upload Management',
        content: 'Secure file upload with validation, size restrictions, and safe storage mechanisms.',
      },
      {
        title: 'Responsive Design',
        content: 'Mobile-first responsive layouts that maintain design consistency across all devices.',
      },
    ],
    results: [
      {
        title: 'Improved User Experience',
        content: 'Smooth bilingual navigation, fast content delivery, and responsive layouts across all devices.',
      },
      {
        title: 'Enhanced Security',
        content: 'Secure administrator access, protected API endpoints, and safe file upload processes.',
      },
      {
        title: 'Efficient Content Management',
        content: 'Streamlined content publishing, simplified project management, and centralized administration.',
      },
      {
        title: 'Production Readiness',
        content: 'Scalable architecture, optimized performance, and reliable deployment workflow.',
      },
      {
        title: 'Multilingual Reach',
        content: 'Successfully serves both English and Arabic-speaking audiences with proper language support.',
      },
      {
        title: 'Professional Presence',
        content: 'Provides creative agencies with a powerful platform to showcase their work and expertise.',
      },
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'Vite', 'HTML5', 'CSS3'],
      backend: ['Express.js', 'Node.js', 'RESTful APIs', 'JWT'],
      database: ['SQLite', 'Turso'],
      security: ['JWT', 'bcryptjs', 'Rate Limiting', 'CORS', 'Input Sanitization'],
    },
    learnings: [
      {
        title: 'Advanced React & TypeScript',
        content: 'Mastered modern React patterns and TypeScript type safety for building complex applications.',
      },
      {
        title: 'Internationalization (i18n)',
        content: 'Gained expertise in building truly bilingual applications with dynamic language switching.',
      },
      {
        title: 'RTL Interface Design',
        content: 'Learned how to design responsive interfaces that work seamlessly in both LTR and RTL contexts.',
      },
      {
        title: 'JWT Authentication',
        content: 'Developed deep understanding of token-based authentication and secure session management.',
      },
      {
        title: 'File Upload Security',
        content: 'Practiced secure file handling with validation, sanitization, and protection against malicious content.',
      },
      {
        title: 'Vite Performance Optimization',
        content: 'Leveraged Vite for fast development and production builds with optimized asset loading.',
      },
      {
        title: 'Express.js API Architecture',
        content: 'Built scalable RESTful APIs with proper middleware, error handling, and security measures.',
      },
    ],
    future: [
      {
        title: 'Mobile Applications',
        content: 'Native iOS and Android apps for on-the-go content management and portfolio viewing.',
      },
      {
        title: 'Analytics Dashboard',
        content: 'Comprehensive analytics and insights into portfolio views, blog engagement, and user behavior.',
      },
      {
        title: 'AI-Powered Features',
        content: 'Intelligent content recommendations, auto-generated descriptions, and smart categorization.',
      },
      {
        title: 'E-Commerce Integration',
        content: 'Enable agencies to sell digital products, services, and merchandise directly from the platform.',
      },
      {
        title: 'Social Media Integration',
        content: 'Direct publishing to social platforms and automated social media scheduling.',
      },
      {
        title: 'Advanced SEO Tools',
        content: 'Built-in SEO optimization, sitemap generation, and search engine integration.',
      },
      {
        title: 'Collaboration Features',
        content: 'Team collaboration tools, comments, and workflow management for agency teams.',
      },
    ],
  },
};
