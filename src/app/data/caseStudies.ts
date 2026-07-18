export const tdLogisticsCaseStudy = {
  title: 'TD Logistics',
  subtitle: 'Building a Secure Digital Logistics Platform',
  image: '/Projects/TD.png',
  sections: {
    overview: {
      title: 'Overview',
      content: `TD Logistics is a logistics and transportation company focused on delivering reliable shipping and supply chain solutions. As the company expanded its operations, it required a modern digital platform capable of improving customer experience, streamlining communication, and supporting future business growth.

The project involved designing and developing a comprehensive logistics website and management platform that combines shipment tracking, customer engagement, recruitment, content management, and enterprise-grade security into a single ecosystem.`,
    },
    client: {
      title: 'The Client',
      content: `TD Logistics operates in a highly competitive industry where transparency, speed, and trust are critical factors for success. Customers expect immediate access to shipment information, responsive communication channels, and a seamless digital experience.

The company needed a platform that would:
• Strengthen its online presence
• Simplify interactions between customers and the business
• Provide reliable shipment tracking
• Manage customer communications efficiently
• Support business scalability and growth`,
    },
    challenges: [
      {
        title: 'Limited Shipment Visibility',
        content: 'Customers had no convenient way to track shipments independently, resulting in increased support requests and communication overhead.',
      },
      {
        title: 'Fragmented Customer Communication',
        content: 'Quote requests, inquiries, and customer interactions were spread across multiple channels, making communication less efficient.',
      },
      {
        title: 'Content Management Difficulties',
        content: 'The company lacked a structured way to publish industry updates, company news, and informational content.',
      },
      {
        title: 'Security Requirements',
        content: 'With customer accounts and business data becoming increasingly important, security needed to become a core part of the platform architecture.',
      },
      {
        title: 'Scalability Concerns',
        content: 'The business required a solution that could grow alongside future operational needs without requiring significant redevelopment.',
      },
    ],
    goals: [
      {
        title: 'Improve Customer Experience',
        content: 'Provide customers with immediate access to shipment information and essential services.',
      },
      {
        title: 'Increase Transparency',
        content: 'Allow users to track shipments in real time and stay informed throughout the delivery process.',
      },
      {
        title: 'Streamline Communication',
        content: 'Create centralized channels for inquiries, quote requests, and customer support.',
      },
      {
        title: 'Support Business Growth',
        content: 'Develop a scalable platform capable of accommodating future expansion.',
      },
      {
        title: 'Strengthen Brand Presence',
        content: 'Create a modern digital experience aligned with the company\'s professional image.',
      },
      {
        title: 'Ensure Security',
        content: 'Protect customer information and business operations through industry-standard security practices.',
      },
    ],
    solution: {
      title: 'The Solution',
      content: `A full-scale logistics platform was developed using modern technologies and a user-centered design approach. The solution combines operational functionality with a professional customer-facing experience.

The platform integrates real-time shipment tracking with secure user authentication, allowing customers to monitor their deliveries instantly. An intuitive admin dashboard enables administrators to manage operations efficiently, while a dedicated content management system allows publishing updates and news. The platform includes a careers portal for recruitment and quote request forms to streamline lead generation.

Every component was designed with security as a foundational principle, implementing protection against XSS, SQL Injection, CSRF attacks, and brute force attempts. The responsive design ensures accessibility across all devices, and the RTL (Right-to-Left) architecture provides full Arabic language support.`,
    },
    features: [
      {
        title: 'Real-Time Shipment Tracking',
        content: 'Customers can track shipments using unique tracking numbers and receive live status updates throughout the delivery process.',
      },
      {
        title: 'User Authentication System',
        content: 'Secure account registration and login functionality provide customers with personalized access to platform services.',
      },
      {
        title: 'Admin Dashboard',
        content: 'Comprehensive dashboard for managing shipments, customers, employees, and platform operations.',
      },
      {
        title: 'Content Management System',
        content: 'Administrators can publish company updates, articles, and announcements through a dedicated blog management system.',
      },
      {
        title: 'Careers Portal',
        content: 'Job seekers can browse available opportunities and submit applications directly through the platform.',
      },
      {
        title: 'Quote Request Forms',
        content: 'Businesses can easily request logistics quotations through structured forms designed to streamline lead generation.',
      },
      {
        title: 'Contact & Support',
        content: 'Multiple communication channels provide customers with quick access to assistance and information.',
      },
      {
        title: 'Fully Responsive Experience',
        content: 'The platform is optimized for desktop, tablet, and mobile devices, ensuring accessibility across all screen sizes.',
      },
    ],
    screenshots: {
      title: 'Screenshots',
      subtitle: 'A visual walkthrough of the platform',
      images: [
        { src: '/Projects/screenshot/FeatureClientProject/td/Home.png', alt: 'TD Logistics Homepage' },
        { src: '/Projects/screenshot/FeatureClientProject/td/2.png', alt: 'Shipment Tracking Page' },
        { src: '/Projects/screenshot/FeatureClientProject/td/3.png', alt: 'Services Overview' },
        { src: '/Projects/screenshot/FeatureClientProject/td/4.png', alt: 'Quote Request Form' },
        { src: '/Projects/screenshot/FeatureClientProject/td/5.png', alt: 'Admin Dashboard' },
        { src: '/Projects/screenshot/FeatureClientProject/td/6.png', alt: 'Blog & News Section' },
        { src: '/Projects/screenshot/FeatureClientProject/td/7.png', alt: 'Contact & Support Page' },
      ],
    },
    results: [
      {
        title: 'Enhanced Customer Experience',
        content: 'Users gained immediate access to shipment information and essential services, reducing support overhead.',
      },
      {
        title: 'Increased Transparency',
        content: 'Real-time tracking improved customer confidence and reduced uncertainty about delivery status.',
      },
      {
        title: 'Operational Efficiency',
        content: 'Centralized management tools simplified administrative workflows and reduced manual processes.',
      },
      {
        title: 'Stronger Brand Presence',
        content: 'The new platform reflects the professionalism and reliability of the company.',
      },
      {
        title: 'Improved Security',
        content: 'Multiple layers of protection help safeguard customer data and business operations.',
      },
      {
        title: 'Scalable Foundation',
        content: 'The architecture supports future enhancements and long-term business growth.',
      },
    ],
    techStack: {
      frontend: ['Next.js 14', 'React 19', 'TypeScript', 'Tailwind CSS', 'React Hook Form', 'Motion'],
      backend: ['Node.js', 'Express.js', 'API Routes', 'Authentication Services', 'Validation Layer', 'Security Middleware'],
      database: ['SQLite', 'Turso'],
      security: ['JWT Authentication', 'bcryptjs Encryption', 'CSRF Protection', 'Rate Limiting', 'Input Sanitization', 'XSS Prevention', 'SQL Injection Prevention'],
    },
    learnings: [
      {
        title: 'Trust is Critical',
        content: 'Trust is a critical factor in logistics experiences and should be reflected in every design and development decision.',
      },
      {
        title: 'Security from the Start',
        content: 'Security should be integrated from the beginning of development, not added as an afterthought.',
      },
      {
        title: 'Simplicity Improves Adoption',
        content: 'Simple, intuitive interfaces significantly improve user adoption and reduce support requests.',
      },
      {
        title: 'Early Scalability Planning',
        content: 'Scalability should be considered early in the architecture process to avoid costly redevelopment.',
      },
      {
        title: 'Self-Service Efficiency',
        content: 'Customer self-service features can significantly improve operational efficiency and reduce overhead.',
      },
      {
        title: 'RTL Architecture',
        content: 'Implementing RTL (Right-to-Left) support from the start is crucial for Arabic-speaking markets.',
      },
      {
        title: 'Real-Time Updates Matter',
        content: 'Real-time information updates build customer confidence and reduce support friction.',
      },
    ],
    future: [
      {
        title: 'Mobile Applications',
        content: 'Native iOS and Android apps for on-the-go shipment tracking and notifications.',
      },
      {
        title: 'Live Map Tracking',
        content: 'Interactive maps showing shipment locations in real time with estimated delivery times.',
      },
      {
        title: 'Push Notifications',
        content: 'Instant alerts for shipment status changes, delivery updates, and important announcements.',
      },
      {
        title: 'CRM Integration',
        content: 'Advanced customer relationship management tools for personalized service delivery.',
      },
      {
        title: 'Analytics Dashboard',
        content: 'Comprehensive analytics and reporting for business intelligence and operational optimization.',
      },
      {
        title: 'Multi-Language Support',
        content: 'Expansion to support additional languages and regional markets.',
      },
      {
        title: 'AI-Powered Support',
        content: 'Chatbots and AI-driven customer support for 24/7 assistance.',
      },
    ],
  },
};

export interface ScreenshotImage {
  src: string;
  alt: string;
}

export interface ScreenshotData {
  title: string;
  subtitle: string;
  images: ScreenshotImage[];
}

export const projectScreenshots: Record<string, ScreenshotData> = {
  'TD Logistics': tdLogisticsCaseStudy.sections.screenshots,
  "Writer's Journey": {
    title: 'Screenshots',
    subtitle: 'A visual walkthrough of the platform',
    images: [
      { src: '/Projects/screenshot/FeatureClientProject/writerjouney/1.png', alt: 'Homepage' },
    ],
  },
  'TRQ Studio': {
    title: 'Screenshots',
    subtitle: 'A visual walkthrough of the platform',
    images: [
      { src: '/Projects/screenshot/FeatureClientProject/trqstudio/1.png', alt: 'Homepage' },
      { src: '/Projects/screenshot/FeatureClientProject/trqstudio/2.png', alt: 'Portfolio Section' },
      { src: '/Projects/screenshot/FeatureClientProject/trqstudio/3.png', alt: 'Project Gallery' },
      { src: '/Projects/screenshot/FeatureClientProject/trqstudio/4.png', alt: 'CMS Dashboard' },
      { src: '/Projects/screenshot/FeatureClientProject/trqstudio/5.png', alt: 'Blog Management' },
      { src: '/Projects/screenshot/FeatureClientProject/trqstudio/6.png', alt: 'Content Editor' },
      { src: '/Projects/screenshot/FeatureClientProject/trqstudio/7.png', alt: 'Settings Panel' },
    ],
  },
  'Mesaha Lakum': {
    title: 'Screenshots',
    subtitle: 'A visual walkthrough of the platform',
    images: [
      { src: '/Projects/screenshot/FeatureClientProject/lakumartspace/1.png', alt: 'Homepage' },
      { src: '/Projects/screenshot/FeatureClientProject/lakumartspace/2.png', alt: 'Events Page' },
      { src: '/Projects/screenshot/FeatureClientProject/lakumartspace/3.png', alt: 'Event Details' },
      { src: '/Projects/screenshot/FeatureClientProject/lakumartspace/4.png', alt: 'Gallery' },
      { src: '/Projects/screenshot/FeatureClientProject/lakumartspace/5.png', alt: 'Booking Form' },
      { src: '/Projects/screenshot/FeatureClientProject/lakumartspace/6.png', alt: 'Admin Dashboard' },
      { src: '/Projects/screenshot/FeatureClientProject/lakumartspace/7.png', alt: 'Content Management' },
      { src: '/Projects/screenshot/FeatureClientProject/lakumartspace/8.png', alt: 'Contact Page' },
      { src: '/Projects/screenshot/FeatureClientProject/lakumartspace/9.png', alt: 'Footer & Navigation' },
    ],
  },
  'MUCOMMERANCE': {
    title: 'Screenshots',
    subtitle: 'A visual walkthrough of the platform',
    images: [
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/1.png', alt: 'Homepage' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/2.png', alt: 'Product Catalog' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/3.png', alt: 'Product Details' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/4.png', alt: 'Shopping Cart' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/5.png', alt: 'Checkout Flow' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/6.png', alt: 'User Account' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/7.png', alt: 'Order History' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/8.png', alt: 'Wishlist' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/9.png', alt: 'Admin Dashboard' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/10.png', alt: 'Product Management' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/11.png', alt: 'Order Management' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/12.png', alt: 'Customer Management' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/13.png', alt: 'Analytics' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/14.png', alt: 'Shipping Integration' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/15.png', alt: 'Payment Processing' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/16.png', alt: 'Content Management' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/17.png', alt: 'Audit Logs' },
      { src: '/Projects/screenshot/ProductionProjects/MUcommarance/18.png', alt: 'Settings' },
    ],
  },
  'Nova-Ecommerance-Platform': {
    title: 'Screenshots',
    subtitle: 'A visual walkthrough of the platform',
    images: [
      { src: '/Projects/screenshot/ProductionProjects/Nova/1.png', alt: 'Homepage' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/2.png', alt: 'Product Catalog' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/3.png', alt: 'Product Details' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/4.png', alt: 'Shopping Cart' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/5.png', alt: 'Checkout' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/6.png', alt: 'User Account' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/7.png', alt: 'Order Tracking' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/8.png', alt: 'Admin Dashboard' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/9.png', alt: 'Product Management' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/10.png', alt: 'Inventory Management' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/11.png', alt: 'Fulfillment Pipeline' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/12.png', alt: 'Supplier Management' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/13.png', alt: 'Shipping Labels' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/14.png', alt: 'Returns & RMA' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/15.png', alt: 'Analytics' },
      { src: '/Projects/screenshot/ProductionProjects/Nova/16.png', alt: 'Coupon System' },
    ],
  },
  'Nexus Network Platform': {
    title: 'Screenshots',
    subtitle: 'A visual walkthrough of the platform',
    images: [
      { src: '/Projects/screenshot/ProductionProjects/Networkplatform/1.png', alt: 'Login Page' },
      { src: '/Projects/screenshot/ProductionProjects/Networkplatform/2.png', alt: 'News Feed' },
      { src: '/Projects/screenshot/ProductionProjects/Networkplatform/3.png', alt: 'Post Creation' },
      { src: '/Projects/screenshot/ProductionProjects/Networkplatform/4.png', alt: 'Profile Page' },
      { src: '/Projects/screenshot/ProductionProjects/Networkplatform/5.png', alt: 'Messaging' },
      { src: '/Projects/screenshot/ProductionProjects/Networkplatform/6.png', alt: 'Network & Connections' },
      { src: '/Projects/screenshot/ProductionProjects/Networkplatform/7.png', alt: 'Job Board' },
      { src: '/Projects/screenshot/ProductionProjects/Networkplatform/8.png', alt: 'Events' },
      { src: '/Projects/screenshot/ProductionProjects/Networkplatform/9.png', alt: 'Courses' },
      { src: '/Projects/screenshot/ProductionProjects/Networkplatform/10.png', alt: 'Analytics' },
      { src: '/Projects/screenshot/ProductionProjects/Networkplatform/11.png', alt: 'Notifications' },
      { src: '/Projects/screenshot/ProductionProjects/Networkplatform/12.png', alt: 'Admin Panel' },
    ],
  },
};
