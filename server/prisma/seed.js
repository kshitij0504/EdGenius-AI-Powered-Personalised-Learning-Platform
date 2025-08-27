// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive database seeding...');

  // 1. Create Professional Instructors
  const instructors = await Promise.all([
    prisma.user.upsert({
      where: { email: 'sarah.johnson@edutech.com' },
      update: {},
      create: {
        id: 'instructor-dev',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@edutech.com',
        password: '$2b$10$hashedpassword1',
        profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face',
        role: 'INSTRUCTOR',
        isVerified: true,
        interests: ['JavaScript', 'React', 'Node.js', 'Full Stack'],
      },
    }),
    prisma.user.upsert({
      where: { email: 'david.chen@edutech.com' },
      update: {},
      create: {
        id: 'instructor-design',
        name: 'David Chen',
        email: 'david.chen@edutech.com',
        password: '$2b$10$hashedpassword2',
        profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        role: 'INSTRUCTOR',
        isVerified: true,
        interests: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Branding'],
      },
    }),
    prisma.user.upsert({
      where: { email: 'maria.garcia@edutech.com' },
      update: {},
      create: {
        id: 'instructor-business',
        name: 'Maria Garcia',
        email: 'maria.garcia@edutech.com',
        password: '$2b$10$hashedpassword3',
        profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        role: 'INSTRUCTOR',
        isVerified: true,
        interests: ['Digital Marketing', 'Business Strategy', 'Entrepreneurship'],
      },
    }),
    prisma.user.upsert({
      where: { email: 'james.wilson@edutech.com' },
      update: {},
      create: {
        id: 'instructor-data',
        name: 'Dr. James Wilson',
        email: 'james.wilson@edutech.com',
        password: '$2b$10$hashedpassword4',
        profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        role: 'INSTRUCTOR',
        isVerified: true,
        interests: ['Data Science', 'Machine Learning', 'Python', 'AI'],
      },
    }),
    prisma.user.upsert({
      where: { email: 'emma.taylor@edutech.com' },
      update: {},
      create: {
        id: 'instructor-photo',
        name: 'Emma Taylor',
        email: 'emma.taylor@edutech.com',
        password: '$2b$10$hashedpassword5',
        profilePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
        role: 'INSTRUCTOR',
        isVerified: true,
        interests: ['Photography', 'Video Editing', 'Creative Arts'],
      },
    }),
    prisma.user.upsert({
      where: { email: 'alex.martinez@edutech.com' },
      update: {},
      create: {
        id: 'instructor-music',
        name: 'Alex Martinez',
        email: 'alex.martinez@edutech.com',
        password: '$2b$10$hashedpassword6',
        profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        role: 'INSTRUCTOR',
        isVerified: true,
        interests: ['Music Production', 'Guitar', 'Music Theory'],
      },
    }),
    // Additional instructors
    prisma.user.upsert({
      where: { email: 'dr.priya.shah@edutech.com' },
      update: {},
      create: {
        id: 'instructor-health',
        name: 'Dr. Priya Shah',
        email: 'dr.priya.shah@edutech.com',
        password: '$2b$10$hashedpassword7',
        profilePhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
        role: 'INSTRUCTOR',
        isVerified: true,
        interests: ['Health', 'Fitness', 'Nutrition', 'Wellness'],
      },
    }),
    prisma.user.upsert({
      where: { email: 'carlos.rodriguez@edutech.com' },
      update: {},
      create: {
        id: 'instructor-language',
        name: 'Carlos Rodriguez',
        email: 'carlos.rodriguez@edutech.com',
        password: '$2b$10$hashedpassword8',
        profilePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
        role: 'INSTRUCTOR',
        isVerified: true,
        interests: ['Languages', 'Spanish', 'French', 'Communication'],
      },
    }),
  ]);

  console.log('👥 Created 8 professional instructors');

  // 2. Comprehensive Courses Data
  const coursesData = [
    // ===== DEVELOPMENT CATEGORY =====
    {
      id: 'course-react-mastery',
      title: 'React Mastery: Complete Developer Guide 2025',
      slug: 'react-mastery-complete-guide-2025',
      description: 'Master React.js from fundamentals to advanced concepts. Build real-world projects with hooks, context, Redux, and modern React patterns. Perfect for beginners to advanced developers.',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
      category: 'Development',
      price: 4999,
      published: true,
      instructorId: 'instructor-dev',
    },
    {
      id: 'course-nodejs-backend',
      title: 'Complete Node.js Backend Development Bootcamp',
      slug: 'nodejs-backend-development-bootcamp',
      description: 'Build scalable backend applications with Node.js, Express, MongoDB, JWT authentication, and deploy production-ready APIs with testing and security best practices.',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop',
      category: 'Development',
      price: 5999,
      published: true,
      instructorId: 'instructor-dev',
    },
    {
      id: 'course-python-fullstack',
      title: 'Python Full-Stack Web Development with Django',
      slug: 'python-fullstack-django-development',
      description: 'Learn Python web development with Django framework. Build complete web applications with user authentication, database integration, and REST APIs from scratch to deployment.',
      thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=800&h=600&fit=crop',
      category: 'Development',
      price: 6499,
      published: true,
      instructorId: 'instructor-dev',
    },
    {
      id: 'course-nextjs-fullstack',
      title: 'Next.js 14 Full-Stack Development with TypeScript',
      slug: 'nextjs-14-fullstack-typescript',
      description: 'Master Next.js 14 with TypeScript, Server Components, App Router, Prisma ORM, and TailwindCSS. Build modern full-stack applications with authentication and deployment.',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      category: 'Development',
      price: 7999,
      published: true,
      instructorId: 'instructor-dev',
    },
    {
      id: 'course-vue-complete',
      title: 'Vue.js 3 Complete Course: Composition API & Pinia',
      slug: 'vuejs-3-complete-composition-api',
      description: 'Learn Vue.js 3 from basics to advanced. Master Composition API, Pinia state management, Vue Router, and build professional single-page applications.',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      category: 'Development',
      price: 4799,
      published: true,
      instructorId: 'instructor-dev',
    },
    {
      id: 'course-flutter-mobile',
      title: 'Flutter Mobile App Development: iOS & Android',
      slug: 'flutter-mobile-app-development',
      description: 'Build native iOS and Android apps with Flutter and Dart. Learn widgets, state management, API integration, and publish apps to App Store and Play Store.',
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      category: 'Development',
      price: 6999,
      published: true,
      instructorId: 'instructor-dev',
    },

    // ===== DESIGN CATEGORY =====
    {
      id: 'course-ui-ux-mastery',
      title: 'UI/UX Design Mastery: From Concept to Prototype',
      slug: 'ui-ux-design-mastery-concept-prototype',
      description: 'Complete UI/UX design course covering user research, wireframing, prototyping, and design systems. Learn industry-standard tools and methodologies.',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      category: 'Design',
      price: 4499,
      published: true,
      instructorId: 'instructor-design',
    },
    {
      id: 'course-figma-advanced',
      title: 'Advanced Figma: Design Systems & Interactive Prototypes',
      slug: 'advanced-figma-design-systems',
      description: 'Master Figma\'s advanced features including auto-layout, components, variants, design systems, and interactive prototyping. Perfect for professional designers.',
      thumbnail: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=600&fit=crop',
      category: 'Design',
      price: 3999,
      published: true,
      instructorId: 'instructor-design',
    },
    {
      id: 'course-adobe-creative-suite',
      title: 'Adobe Creative Suite Masterclass: Photoshop, Illustrator & InDesign',
      slug: 'adobe-creative-suite-masterclass',
      description: 'Complete guide to Adobe Creative Suite. Master Photoshop for photo editing, Illustrator for vector graphics, and InDesign for layout design.',
      thumbnail: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop',
      category: 'Design',
      price: 8999,
      published: true,
      instructorId: 'instructor-design',
    },
    {
      id: 'course-web-design-modern',
      title: 'Modern Web Design: HTML5, CSS3 & Responsive Design',
      slug: 'modern-web-design-html-css-responsive',
      description: 'Learn modern web design with HTML5, CSS3, Flexbox, Grid, animations, and create beautiful responsive websites that work on all devices.',
      thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
      category: 'Design',
      price: 3799,
      published: true,
      instructorId: 'instructor-design',
    },
    {
      id: 'course-brand-identity-design',
      title: 'Brand Identity Design: Logo to Brand Guidelines',
      slug: 'brand-identity-design-complete',
      description: 'Learn professional brand identity design from logo creation to complete brand guidelines. Master typography, color theory, and brand strategy.',
      thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
      category: 'Design',
      price: 5499,
      published: true,
      instructorId: 'instructor-design',
    },

    // ===== BUSINESS CATEGORY =====
    {
      id: 'course-digital-marketing',
      title: 'Complete Digital Marketing Masterclass 2025',
      slug: 'complete-digital-marketing-masterclass-2025',
      description: 'Master SEO, social media marketing, Google Ads, email marketing, content marketing, and analytics. Build comprehensive digital marketing strategies that drive results.',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      category: 'Business',
      price: 5499,
      published: true,
      instructorId: 'instructor-business',
    },
    {
      id: 'course-startup-entrepreneurship',
      title: 'Startup & Entrepreneurship: From Idea to IPO',
      slug: 'startup-entrepreneurship-idea-to-ipo',
      description: 'Complete guide to building successful startups. Learn idea validation, business model creation, fundraising, scaling, and exit strategies with real case studies.',
      thumbnail: 'https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=800&h=600&fit=crop',
      category: 'Business',
      price: 6999,
      published: true,
      instructorId: 'instructor-business',
    },
    {
      id: 'course-social-media-marketing',
      title: 'Social Media Marketing: Instagram, Facebook & TikTok',
      slug: 'social-media-marketing-instagram-facebook-tiktok',
      description: 'Master social media marketing across all major platforms. Learn content creation, influencer marketing, paid advertising, and community management.',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      category: 'Business',
      price: 4299,
      published: true,
      instructorId: 'instructor-business',
    },
    {
      id: 'course-ecommerce-shopify',
      title: 'E-commerce Business with Shopify: Build & Scale',
      slug: 'ecommerce-shopify-build-scale',
      description: 'Build profitable e-commerce stores with Shopify. Learn product research, store setup, marketing, fulfillment, and scaling strategies to 7-figures.',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      category: 'Business',
      price: 7499,
      published: true,
      instructorId: 'instructor-business',
    },

    // ===== DATA SCIENCE CATEGORY =====
    {
      id: 'course-data-science-python',
      title: 'Data Science with Python: Complete Bootcamp',
      slug: 'data-science-python-complete-bootcamp',
      description: 'Master data science with Python, pandas, NumPy, matplotlib, seaborn, and scikit-learn. Work with real datasets and build machine learning models.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      category: 'Data Science',
      price: 7499,
      published: true,
      instructorId: 'instructor-data',
    },
    {
      id: 'course-machine-learning',
      title: 'Machine Learning A-Z: Complete ML & AI Course',
      slug: 'machine-learning-complete-course',
      description: 'Comprehensive machine learning course covering supervised/unsupervised learning, neural networks, deep learning, NLP, and computer vision with practical projects.',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
      category: 'Data Science',
      price: 8999,
      published: true,
      instructorId: 'instructor-data',
    },
    {
      id: 'course-sql-data-analysis',
      title: 'SQL for Data Analysis: PostgreSQL & MySQL',
      slug: 'sql-data-analysis-postgresql-mysql',
      description: 'Master SQL for data analysis with PostgreSQL and MySQL. Learn complex queries, joins, window functions, and database optimization for data science.',
      thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
      category: 'Data Science',
      price: 3999,
      published: true,
      instructorId: 'instructor-data',
    },
    {
      id: 'course-tableau-power-bi',
      title: 'Data Visualization: Tableau & Power BI Masterclass',
      slug: 'data-visualization-tableau-power-bi',
      description: 'Create stunning data visualizations and interactive dashboards with Tableau and Power BI. Learn to tell compelling stories with data.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      category: 'Data Science',
      price: 5999,
      published: true,
      instructorId: 'instructor-data',
    },

    // ===== PHOTOGRAPHY CATEGORY =====
    {
      id: 'course-photography-masterclass',
      title: 'Complete Photography Masterclass: Beginner to Pro',
      slug: 'complete-photography-masterclass',
      description: 'Master photography from basics to advanced techniques. Learn composition, lighting, portrait, landscape, and street photography with hands-on projects.',
      thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop',
      category: 'Photography',
      price: 4999,
      published: true,
      instructorId: 'instructor-photo',
    },
    {
      id: 'course-video-editing-premiere',
      title: 'Professional Video Editing: Premiere Pro & After Effects',
      slug: 'video-editing-premiere-after-effects',
      description: 'Master video editing with Adobe Premiere Pro and After Effects. Learn color grading, motion graphics, audio mixing, and create cinematic videos.',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
      category: 'Photography',
      price: 6499,
      published: true,
      instructorId: 'instructor-photo',
    },
    {
      id: 'course-drone-photography',
      title: 'Drone Photography & Videography: Aerial Cinematography',
      slug: 'drone-photography-videography-aerial',
      description: 'Learn drone photography and videography. Master aerial composition, flight techniques, legal requirements, and post-processing for stunning aerial content.',
      thumbnail: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop',
      category: 'Photography',
      price: 5499,
      published: true,
      instructorId: 'instructor-photo',
    },

    // ===== MUSIC CATEGORY =====
    {
      id: 'course-music-production',
      title: 'Electronic Music Production: Ableton Live & FL Studio',
      slug: 'electronic-music-production-ableton-fl',
      description: 'Create professional electronic music tracks using Ableton Live and FL Studio. Learn beat making, synthesis, mixing, mastering, and music theory for producers.',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      category: 'Music',
      price: 5999,
      published: true,
      instructorId: 'instructor-music',
    },
    {
      id: 'course-guitar-complete',
      title: 'Complete Guitar Course: Acoustic & Electric Mastery',
      slug: 'complete-guitar-acoustic-electric',
      description: 'Master guitar from beginner to advanced level. Learn chords, scales, techniques, music theory, and play various genres from rock to jazz.',
      thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop',
      category: 'Music',
      price: 3999,
      published: true,
      instructorId: 'instructor-music',
    },
    {
      id: 'course-piano-masterclass',
      title: 'Piano Masterclass: Classical to Modern Styles',
      slug: 'piano-masterclass-classical-modern',
      description: 'Learn piano from classical foundations to modern styles. Master technique, sight-reading, improvisation, and perform beautiful pieces.',
      thumbnail: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=600&fit=crop',
      category: 'Music',
      price: 4499,
      published: true,
      instructorId: 'instructor-music',
    },

    // ===== HEALTH & FITNESS CATEGORY =====
    {
      id: 'course-yoga-instructor-certification',
      title: 'Yoga Instructor Certification: 200-Hour RYT Training',
      slug: 'yoga-instructor-certification-200-hour',
      description: 'Comprehensive 200-hour yoga teacher training. Learn asanas, philosophy, anatomy, meditation, and teaching methodology. Internationally recognized certification.',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
      category: 'Health & Fitness',
      price: 12999,
      published: true,
      instructorId: 'instructor-health',
    },
    {
      id: 'course-nutrition-weight-loss',
      title: 'Nutrition Science & Weight Loss: Evidence-Based Approach',
      slug: 'nutrition-science-weight-loss',
      description: 'Learn evidence-based nutrition science for weight loss and optimal health. Understand macronutrients, meal planning, and sustainable lifestyle changes.',
      thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
      category: 'Health & Fitness',
      price: 4999,
      published: true,
      instructorId: 'instructor-health',
    },
    {
      id: 'course-fitness-training',
      title: 'Personal Fitness Training: Strength & Conditioning',
      slug: 'personal-fitness-training-strength',
      description: 'Complete fitness training course covering strength training, cardio, flexibility, program design, and injury prevention. Perfect for fitness enthusiasts and trainers.',
      thumbnail: 'https://images.unsplash.com/photo-1571019613914-85e855767c3f?w=800&h=600&fit=crop',
      category: 'Health & Fitness',
      price: 5999,
      published: true,
      instructorId: 'instructor-health',
    },

    // ===== LANGUAGE CATEGORY =====
    {
      id: 'course-english-business',
      title: 'Business English: Professional Communication Skills',
      slug: 'business-english-professional-communication',
      description: 'Master business English for professional communication. Learn email writing, presentation skills, meeting management, and negotiation techniques.',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
      category: 'Language',
      price: 3499,
      published: true,
      instructorId: 'instructor-language',
    },
    {
      id: 'course-spanish-complete',
      title: 'Complete Spanish Course: Beginner to Advanced',
      slug: 'complete-spanish-beginner-advanced',
      description: 'Master Spanish through interactive lessons, conversation practice, and cultural immersion. Achieve fluency with structured learning path from A1 to C1 level.',
      thumbnail: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop',
      category: 'Language',
      price: 4999,
      published: true,
      instructorId: 'instructor-language',
    },
    {
      id: 'course-french-conversation',
      title: 'French Conversation & Culture: Intermediate to Advanced',
      slug: 'french-conversation-culture-intermediate',
      description: 'Improve your French through conversation practice and cultural exploration. Perfect for intermediate learners wanting to achieve fluency.',
      thumbnail: 'https://images.unsplash.com/photo-1509191436522-c7392e3bac05?w=800&h=600&fit=crop',
      category: 'Language',
      price: 3999,
      published: true,
      instructorId: 'instructor-language',
    },

    // ===== PERSONAL DEVELOPMENT CATEGORY =====
    {
      id: 'course-productivity-mastery',
      title: 'Productivity Mastery: Time Management & Goal Achievement',
      slug: 'productivity-mastery-time-management',
      description: 'Master productivity with proven time management techniques, goal setting frameworks, and habit formation strategies. Transform your personal and professional life.',
      thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
      category: 'Personal Development',
      price: 2999,
      published: true,
      instructorId: 'instructor-business',
    },
    {
      id: 'course-public-speaking',
      title: 'Public Speaking Mastery: Confidence & Communication',
      slug: 'public-speaking-mastery-confidence',
      description: 'Overcome fear and master public speaking. Learn presentation skills, storytelling, body language, and become a confident, compelling speaker.',
      thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
      category: 'Personal Development',
      price: 3499,
      published: true,
      instructorId: 'instructor-business',
    },
  ];

  for (const courseData of coursesData) {
    const course = await prisma.course.upsert({
      where: { id: courseData.id },
      update: {},
      create: courseData,
    });
    console.log(`📚 Created course: ${course.title}`);
  }

  // 3. Modules & Lessons (Enhanced)
  const modulesAndLessons = [
    {
      courseId: 'course-react-mastery',
      modules: [
        {
          id: 'module-react-fundamentals',
          title: 'React Fundamentals',
          order: 1,
          lessons: [
            {
              id: 'lesson-react-intro',
              title: 'What is React and Why Use It?',
              content: `# Introduction to React\n\nReact is a powerful JavaScript library for building user interfaces, particularly web applications. Created by Facebook in 2013, React has revolutionized how we think about building interactive UIs.\n\n## Key Features:\n- **Component-Based**: Build encapsulated components that manage their own state\n- **Virtual DOM**: Efficient updates and rendering\n- **Declarative**: Describe what the UI should look like\n- **Learn Once, Write Anywhere**: Use for web, mobile, and desktop\n\n## Why Choose React in 2025?\n1. **Industry Standard**: Used by Facebook, Netflix, Airbnb\n2. **Strong Ecosystem**: Vast library of third-party packages\n3. **Performance**: Virtual DOM ensures optimal rendering\n4. **Developer Experience**: Excellent debugging tools\n5. **Job Market**: High demand and excellent career opportunities`,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              order: 1,
            },
            {
              id: 'lesson-react-setup',
              title: 'Modern React Development Setup',
              content: `# Setting Up Your React Development Environment\n\n## Prerequisites:\n- Node.js (v18 or higher)\n- Code Editor (VS Code recommended)\n- Basic JavaScript knowledge\n\n## Installation Steps:\n\n### 1. Install Node.js and npm\n\`\`\`bash\n# Verify installation\nnode --version\nnpm --version\n\`\`\`\n\n### 2. Create React App with Vite (Recommended 2025)\n\`\`\`bash\n# Create new React project with Vite\nnpm create vite@latest my-react-app -- --template react\ncd my-react-app\nnpm install\nnpm run dev\n\`\`\`\n\n### 3. Essential VS Code Extensions:\n- ES7+ React/Redux/React-Native snippets\n- Prettier - Code formatter\n- Auto Rename Tag\n- Bracket Pair Colorizer 2\n- GitLens`,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
              order: 2,
            },
          ],
        },
        {
          id: 'module-react-components',
          title: 'Components & JSX',
          order: 2,
          lessons: [
            {
              id: 'lesson-jsx-fundamentals',
              title: 'JSX Fundamentals and Syntax',
              content: `# JSX Fundamentals and Syntax\n\nJSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.\n\n## JSX Rules:\n1. **Single Parent Element**: JSX must have one parent element\n2. **Close All Tags**: All tags must be closed\n3. **camelCase Properties**: HTML attributes use camelCase\n4. **JavaScript Expressions**: Use {} to embed JavaScript\n\n## Example:\n\`\`\`jsx\nfunction Welcome({ name }) {\n  return (\n    <div className="welcome">\n      <h1>Hello, {name.toUpperCase()}!</h1>\n      <p>Welcome to React learning.</p>\n    </div>\n  );\n}\n\`\`\``,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
              order: 1,
            },
          ],
        },
      ],
    },
    {
      courseId: 'course-ui-ux-mastery',
      modules: [
        {
          id: 'module-design-thinking',
          title: 'Design Thinking & User Research',
          order: 1,
          lessons: [
            {
              id: 'lesson-design-thinking-process',
              title: 'The Design Thinking Process',
              content: `# Design Thinking: A Human-Centered Approach\n\n## The 5-Stage Process:\n\n### 1. 🤝 Empathize\n**Understand your users through research**\n- Conduct user interviews\n- Create observation studies\n- Develop user personas\n- Map user journeys\n\n### 2. 🎯 Define\n**Frame the right problem**\n- Synthesize research findings\n- Create problem statements\n- Define user needs\n- Establish design principles\n\n### 3. 💡 Ideate\n**Generate creative solutions**\n- Brainstorming sessions\n- Mind mapping\n- Crazy 8's technique\n- How Might We questions\n\n### 4. 🔧 Prototype\n**Build to think and test ideas**\n- Low-fidelity sketches\n- Digital wireframes\n- Interactive prototypes\n- User flow diagrams\n\n### 5. 🔍 Test\n**Learn from users**\n- Usability testing\n- A/B testing\n- Feedback collection\n- Iterate based on insights`,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
              order: 1,
            },
          ],
        },
      ],
    },
    {
      courseId: 'course-digital-marketing',
      modules: [
        {
          id: 'module-seo-fundamentals',
          title: 'SEO Fundamentals & Strategy',
          order: 1,
          lessons: [
            {
              id: 'lesson-seo-basics',
              title: 'SEO Basics: On-Page & Off-Page Optimization',
              content: `# SEO Fundamentals: Drive Organic Traffic\n\n## What is SEO?\nSearch Engine Optimization (SEO) is the practice of increasing the quantity and quality of traffic to your website through organic search engine results.\n\n## Types of SEO:\n\n### 1. On-Page SEO\n- **Title Tags**: Optimize page titles for target keywords\n- **Meta Descriptions**: Write compelling descriptions\n- **Header Tags**: Use H1, H2, H3 hierarchy\n- **Content Optimization**: Keyword research and content creation\n- **Internal Linking**: Link to relevant pages on your site\n\n### 2. Off-Page SEO\n- **Link Building**: Earn high-quality backlinks\n- **Social Signals**: Social media engagement\n- **Brand Mentions**: Online reputation management\n- **Local SEO**: Google My Business optimization\n\n### 3. Technical SEO\n- **Site Speed**: Optimize loading times\n- **Mobile Responsiveness**: Mobile-first indexing\n- **Schema Markup**: Structured data implementation\n- **XML Sitemaps**: Help search engines crawl your site`,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              order: 1,
            },
          ],
        },
      ],
    },
  ];

  for (const courseModules of modulesAndLessons) {
    for (const moduleData of courseModules.modules) {
      const { lessons, ...moduleInfo } = moduleData;

      const module = await prisma.module.upsert({
        where: { id: moduleInfo.id },
        update: { title: moduleInfo.title, order: moduleInfo.order },
        create: { ...moduleInfo, courseId: courseModules.courseId },
      });

      for (const lesson of lessons) {
        await prisma.lesson.upsert({
          where: { id: lesson.id },
          update: {
            title: lesson.title,
            content: lesson.content,
            order: lesson.order,
            videoUrl: lesson.videoUrl,
            moduleId: module.id,
          },
          create: { ...lesson, moduleId: module.id },
        });
      }
    }
  }

  console.log('📘 Modules and lessons created successfully');

  // 4. Students (Enhanced)
  const students = [
    { id: 'student-1', name: 'Rahul Patel', email: 'rahul.patel@student.com', password: '$2b$10$hashedpassword7', profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', interests: ['Development', 'JavaScript', 'React'] },
    { id: 'student-2', name: 'Anjali Singh', email: 'anjali.singh@student.com', password: '$2b$10$hashedpassword8', profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face', interests: ['Design', 'UI/UX', 'Photography'] },
    { id: 'student-3', name: 'Vikash Kumar', email: 'vikash.kumar@student.com', password: '$2b$10$hashedpassword9', profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', interests: ['Business', 'Marketing', 'Data Science'] },
    { id: 'student-4', name: 'Priya Sharma', email: 'priya.sharma@student.com', password: '$2b$10$hashedpassword10', profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face', interests: ['Health', 'Fitness', 'Yoga'] },
    { id: 'student-5', name: 'Arjun Reddy', email: 'arjun.reddy@student.com', password: '$2b$10$hashedpassword11', profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face', interests: ['Music', 'Photography', 'Video'] },
  ];

  for (const student of students) {
    await prisma.user.upsert({ where: { email: student.email }, update: {}, create: student });
  }

  // 5. Enhanced Enrollments
  const enrollments = [
    { id: 'enroll-1', userId: 'student-1', courseId: 'course-react-mastery' },
    { id: 'enroll-2', userId: 'student-1', courseId: 'course-python-fullstack' },
    { id: 'enroll-3', userId: 'student-2', courseId: 'course-ui-ux-mastery' },
    { id: 'enroll-4', userId: 'student-2', courseId: 'course-figma-advanced' },
    { id: 'enroll-5', userId: 'student-3', courseId: 'course-digital-marketing' },
    { id: 'enroll-6', userId: 'student-3', courseId: 'course-startup-entrepreneurship' },
    { id: 'enroll-7', userId: 'student-4', courseId: 'course-yoga-instructor-certification' },
    { id: 'enroll-8', userId: 'student-5', courseId: 'course-music-production' },
    { id: 'enroll-9', userId: 'student-5', courseId: 'course-photography-masterclass' },
  ];

  for (const enrollment of enrollments) {
    await prisma.enrollment.upsert({ where: { id: enrollment.id }, update: {}, create: enrollment });
  }

  // 6. Cart Items
  const cartItems = [
    { id: 'cart-1', userId: 'student-1', courseId: 'course-nodejs-backend' },
    { id: 'cart-2', userId: 'student-2', courseId: 'course-brand-identity-design' },
    { id: 'cart-3', userId: 'student-3', courseId: 'course-data-science-python' },
  ];

  for (const cartItem of cartItems) {
    await prisma.cartItem.upsert({ where: { id: cartItem.id }, update: {}, create: cartItem });
  }

  console.log('📊 Database seeded successfully!');
  console.log('\n🎯 Created Content Summary:');
  console.log('- 8 Professional Instructors');
  console.log('- 30+ Courses across 9 Categories:');
  console.log('  • Development (6 courses)');
  console.log('  • Design (5 courses)');
  console.log('  • Business (4 courses)');
  console.log('  • Data Science (4 courses)');
  console.log('  • Photography (3 courses)');
  console.log('  • Music (3 courses)');
  console.log('  • Health & Fitness (3 courses)');
  console.log('  • Language (3 courses)');
  console.log('  • Personal Development (2 courses)');
  console.log('- Detailed modules with rich lesson content');
  console.log('- 5 Sample students with realistic enrollments');
  console.log('- Cart items and professional thumbnails');
  console.log('\n✅ Your platform is ready with comprehensive data!');
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error('❌ Error seeding database:', e); await prisma.$disconnect(); process.exit(1); });
