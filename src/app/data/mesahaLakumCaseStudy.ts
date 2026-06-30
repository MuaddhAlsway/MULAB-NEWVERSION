export const mesahaLakumCaseStudy = {
  id: 'mesaha-lakum',
  title: 'Mesaha Lakum',
  subtitle: 'Cultural Artspace Platform with Admin Management',
  image: '/Projects/LAKUM.png',
  sections: {
    overview: {
      title: 'Overview',
      content: `Mesaha Lakum (LAKUM Artspace) is a comprehensive full-stack web application serving as the official digital presence for Riyadh's premier cultural destination. The platform combines a professional public-facing website with a powerful private admin management system.

The application enables visitors to discover contemporary art exhibitions, creative workshops, and cultural events while providing administrators with tools to manage all site content seamlessly. Built with PHP, MySQL, and vanilla JavaScript, the platform delivers a bilingual experience (English & Arabic) with full RTL layout support and enterprise-grade security.`,
    },
    client: {
      title: 'The Client',
      content: `LAKUM Artspace is a cultural institution in Riyadh dedicated to showcasing contemporary art and hosting creative events. The organization required a digital platform that could present exhibitions professionally, manage event scheduling, handle visitor inquiries, and provide administrators with intuitive content management tools. The solution needed to support both English and Arabic audiences with seamless language switching and proper RTL layout support.`,
    },
    challenges: [
      {
        title: 'Bilingual & RTL Support',
        content: 'Creating a fully bilingual platform with English and Arabic required dynamic language switching, RTL layout support, and proper translation management across the entire application.',
      },
      {
        title: 'Complex Admin Panel',
        content: 'Developing an intuitive admin interface for managing events, galleries, blogs, press releases, pricing, and legal pages required careful UX design and efficient data handling.',
      },
      {
        title: 'Email System Integration',
        content: 'Implementing a reliable email system for contact form submissions, password resets, and confirmations using raw SMTP over PHP socket to Gmail SMTP.',
      },
      {
        title: 'Database Structure Complexity',
        content: 'Managing bilingual content with separate translation tables for events, blogs, press releases, and pricing while maintaining data integrity and performance.',
      },
      {
        title: 'Security & Authentication',
        content: 'Implementing secure authentication, password reset workflows with expiring tokens, role-based access control, and session management for admin users.',
      },
      {
        title: 'File Upload & Gallery Management',
        content: 'Building a secure file upload system for event galleries, blog images, and press materials with validation and proper storage mechanisms.',
      },
    ],
    goals: [
      {
        title: 'Professional Online Presence',
        content: 'Create a polished, modern website that showcases LAKUM\'s exhibitions, events, and services to both local and international audiences.',
      },
      {
        title: 'Bilingual Accessibility',
        content: 'Deliver seamless support for both English and Arabic speakers with proper RTL layout and localized content management.',
      },
      {
        title: 'Efficient Content Management',
        content: 'Provide administrators with an intuitive dashboard to manage all aspects of the platform without technical knowledge.',
      },
      {
        title: 'Visitor Engagement',
        content: 'Enable visitors to discover events, exhibitions, and booking opportunities through an organized, responsive interface.',
      },
      {
        title: 'Secure Admin Operations',
        content: 'Implement enterprise-grade security with role-based access control and secure authentication mechanisms.',
      },
      {
        title: 'Scalable Architecture',
        content: 'Build a maintainable platform using vanilla PHP that can handle growing content and user volumes.',
      },
    ],
    solution: {
      title: 'The Solution',
      content: `A complete full-stack PHP application was developed using vanilla PHP (no framework), MySQL database, and vanilla JavaScript for the frontend. The architecture consists of three main layers:

The public website serves visitors with a clean interface for browsing exhibitions, events, blogs, and press releases. The REST API layer (/api/) powers both the public site and admin panel with 260+ endpoints handling authentication, content retrieval, uploads, and email operations.

The admin panel (/admin/) provides content managers with a comprehensive dashboard for managing all site content. Security was implemented throughout with bcrypt password hashing, PHP sessions with security flags, email-based password reset workflows, and role-based access control.

Bilingual support was built into the core architecture with a translation system using JSON files and database translation tables. The platform supports full RTL layout for Arabic content and includes a language switcher in localStorage.`,
    },
    features: [
      {
        title: 'Public Website',
        content: 'Professional showcase of exhibitions, events, blog articles, press releases, and venue spaces with clean SEO URLs and featured hero sections.',
      },
      {
        title: 'Event Management',
        content: 'Create, edit, and delete events with gallery images, descriptions, dates, and categories. Events are accessible via slug-based URLs.',
      },
      {
        title: 'Blog & Press System',
        content: 'Full blogging capability with cover image uploads, categories, and related posts. Press release management with similar functionality.',
      },
      {
        title: 'Admin Dashboard',
        content: 'Centralized interface for managing events, blogs, press releases, pricing plans, hero images, site settings, and legal pages.',
      },
      {
        title: 'Bilingual Content',
        content: 'Separate English/Arabic translations for all content stored in database tables with dynamic language switching and RTL layout support.',
      },
      {
        title: 'Space Rental & Pricing',
        content: 'Manage venue rental pricing plans with bilingual support and admin-controlled pricing tiers.',
      },
      {
        title: 'Contact Form & Email',
        content: 'Contact form that saves messages to database, sends notifications to admin, and confirms receipt to visitors via Gmail SMTP.',
      },
      {
        title: 'Password Reset System',
        content: 'Secure email-based password reset flow with 1-hour expiring tokens and single-use validation.',
      },
      {
        title: 'Role-Based Access Control',
        content: 'Three admin roles (super_admin, admin, editor, viewer) with granular permission levels for different administrative tasks.',
      },
      {
        title: 'File Upload Security',
        content: 'Secure file upload with validation, size restrictions, and file type checking for images and documents.',
      },
    ],
    results: [
      {
        title: 'Professional Digital Presence',
        content: 'LAKUM now has a modern, polished website that effectively showcases exhibitions and events to potential visitors.',
      },
      {
        title: 'Bilingual Reach',
        content: 'Successfully serves both Arabic and English-speaking audiences with proper RTL support and seamless language switching.',
      },
      {
        title: 'Efficient Operations',
        content: 'Admin team can manage all content independently without technical assistance through the intuitive dashboard.',
      },
      {
        title: 'Enhanced Security',
        content: 'Enterprise-grade security with bcrypt password hashing, secure sessions, and role-based access control.',
      },
      {
        title: 'Automated Communications',
        content: 'Email system handles contact forms, password resets, and confirmations automatically without manual intervention.',
      },
      {
        title: 'Scalable Foundation',
        content: 'Clean PHP architecture provides a solid foundation for future features and integrations.',
      },
    ],
    techStack: {
      frontend: ['Vanilla JavaScript', 'HTML5', 'CSS3', 'Remix Icons'],
      backend: ['PHP 7.4+', 'REST API', 'MySQL', 'bcrypt'],
      database: ['MySQL (Hostinger)', 'UTF8MB4'],
      security: ['bcrypt Hashing', 'PHP Sessions', 'CORS Protection', 'Email Verification'],
      deployment: ['Apache', 'GitHub Actions', 'FTP Deploy', 'Hostinger Hosting'],
    },
    learnings: [
      {
        title: 'Vanilla PHP Development',
        content: 'Built scalable applications without framework dependencies, understanding core PHP concepts and best practices.',
      },
      {
        title: 'Bilingual Architecture',
        content: 'Designed and implemented comprehensive internationalization system with JSON translations and database-driven content.',
      },
      {
        title: 'RTL Layout Design',
        content: 'Mastered responsive design principles for right-to-left layouts while maintaining design consistency.',
      },
      {
        title: 'Email System Integration',
        content: 'Implemented raw SMTP socket connections for reliable email delivery without external libraries.',
      },
      {
        title: 'Database Design',
        content: 'Created normalized database schema with translation tables, cascading deletes, and proper relationships.',
      },
      {
        title: 'Security Implementation',
        content: 'Applied best practices including password hashing, session security, token validation, and role-based access control.',
      },
      {
        title: 'CI/CD Workflow',
        content: 'Set up automated deployment using GitHub Actions with incremental FTP deployment to production.',
      },
      {
        title: 'File Upload Handling',
        content: 'Developed secure file upload system with validation, size restrictions, and proper storage management.',
      },
    ],
    future: [
      {
        title: 'Event Ticketing System',
        content: 'Integrate online ticketing capability for paid workshops and exclusive events with payment processing.',
      },
      {
        title: 'Visitor Analytics',
        content: 'Add comprehensive analytics dashboard tracking visitor behavior, popular exhibitions, and engagement metrics.',
      },
      {
        title: 'Social Media Integration',
        content: 'Automated posting to Instagram and other platforms with social media feed integration on the website.',
      },
      {
        title: 'Mobile Application',
        content: 'Native iOS and Android apps for event discovery, gallery viewing, and visitor engagement.',
      },
      {
        title: 'Virtual Gallery Tours',
        content: 'Add 360-degree virtual exhibition tours and high-resolution artwork galleries for online viewing.',
      },
      {
        title: 'Subscription System',
        content: 'Membership programs with exclusive event access and newsletter subscriptions.',
      },
      {
        title: 'Multi-language Support',
        content: 'Expand beyond English and Arabic to additional languages for international reach.',
      },
      {
        title: 'Advanced Search & Filtering',
        content: 'Implement AI-powered search with recommendations and advanced filtering by date, category, and venue.',
      },
    ],
  },
};
