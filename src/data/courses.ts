import { Course } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'full-stack-web-dev',
    title: 'Full Stack Web Development',
    subtitle: 'Master modern frontend and backend web architecture with React, Node.js, and Cloud deployment.',
    description: 'A comprehensive, industry-aligned specialization designed for modern software engineers. Learn semantic HTML5, modern CSS3/Tailwind, ES6+ TypeScript, React ecosystem with state management, Node.js RESTful microservices, PostgreSQL & MongoDB database design, and end-to-end cloud deployment pipelines.',
    instructor: {
      name: 'Arun Kumar',
      role: 'Principal Full Stack Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    category: 'Web Development',
    rating: 4.9,
    studentsCount: 18450,
    duration: '12 weeks',
    level: 'Intermediate',
    price: 'Free',
    isEnrolled: false,
    progress: 72,
    completedLessons: 26,
    totalLessons: 36,
    nextLesson: 'React Hooks & State Architecture',
    bannerGradient: 'from-blue-600 via-indigo-600 to-purple-700',
    whatYouWillLearn: [
      'Architect production-grade React single page applications with TypeScript',
      'Design RESTful and GraphQL APIs with Node.js and Express',
      'Model relational databases with PostgreSQL and ORMs',
      'Implement secure JWT authentication and role-based access control',
      'Deploy full-stack applications with Docker and modern CI/CD pipelines',
      'Optimize web performance, Core Web Vitals, and responsive UI/UX'
    ],
    modules: [
      {
        id: 'm1',
        title: 'Module 1 — HTML & CSS Modern Foundations',
        lessons: [
          { id: 'l1', title: 'Semantic HTML5 & Accessible Document Structure', duration: '22 min', type: 'video', completed: true },
          { id: 'l2', title: 'Advanced Flexbox, Grid Systems & Responsive Layouts', duration: '35 min', type: 'video', completed: true },
          { id: 'l3', title: 'CSS Custom Properties & Design Tokens', duration: '18 min', type: 'reading', completed: true },
          { id: 'l4', title: 'Hands-on Lab: Responsive Education Landing Page', duration: '45 min', type: 'code', completed: true }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2 — JavaScript ES6+ & Asynchronous Programming',
        lessons: [
          { id: 'l5', title: 'Modern JavaScript Engine & Scope Closures', duration: '28 min', type: 'video', completed: true },
          { id: 'l6', title: 'Promises, Async/Await and Event Loop Mechanics', duration: '32 min', type: 'video', completed: true },
          { id: 'l7', title: 'DOM Manipulation, Web APIs and Event Delegation', duration: '25 min', type: 'video', completed: true },
          { id: 'l8', title: 'Quiz: JavaScript Engine Internals', duration: '15 min', type: 'quiz', completed: true }
        ]
      },
      {
        id: 'm3',
        title: 'Module 3 — React & Component Architecture',
        lessons: [
          { id: 'l9', title: 'React 19 Core Concepts & JSX Compilation', duration: '30 min', type: 'video', completed: true },
          { id: 'l10', title: 'React Hooks & State Architecture', duration: '40 min', type: 'video', completed: false },
          { id: 'l11', title: 'React Router v7 Navigation & Route Loaders', duration: '35 min', type: 'video', completed: false },
          { id: 'l12', title: 'Global State Management with Context & Zustand', duration: '42 min', type: 'code', completed: false }
        ]
      },
      {
        id: 'm4',
        title: 'Module 4 — Backend Development with Node.js',
        lessons: [
          { id: 'l13', title: 'Node.js Architecture & Express Server Setup', duration: '38 min', type: 'video', completed: false },
          { id: 'l14', title: 'Building RESTful APIs & Middleware Chains', duration: '45 min', type: 'video', completed: false },
          { id: 'l15', title: 'Input Validation, Error Handling & Logging', duration: '24 min', type: 'reading', completed: false }
        ]
      },
      {
        id: 'm5',
        title: 'Module 5 — Databases & Data Persistence',
        lessons: [
          { id: 'l16', title: 'Relational Database Schema Design with PostgreSQL', duration: '40 min', type: 'video', completed: false },
          { id: 'l17', title: 'CRUD Operations & Query Optimization', duration: '36 min', type: 'code', completed: false },
          { id: 'l18', title: 'Database Migrations & Connection Pooling', duration: '28 min', type: 'reading', completed: false }
        ]
      },
      {
        id: 'm6',
        title: 'Module 6 — Deployment & Production Engineering',
        lessons: [
          { id: 'l19', title: 'Containerization with Docker & Multi-stage Builds', duration: '35 min', type: 'video', completed: false },
          { id: 'l20', title: 'CI/CD Pipelines with GitHub Actions', duration: '30 min', type: 'video', completed: false },
          { id: 'l21', title: 'Final Capstone Project Deployment to Cloud', duration: '50 min', type: 'code', completed: false }
        ]
      }
    ]
  },
  {
    id: 'machine-learning-fundamentals',
    title: 'Machine Learning Fundamentals',
    subtitle: 'From exploratory data analysis and mathematical intuition to Scikit-Learn pipelines.',
    description: 'Dive deep into supervised and unsupervised learning algorithms. Understand gradient descent, regression, decision trees, random forests, clustering, and neural network foundations with practical Python notebooks.',
    instructor: {
      name: 'Priya Sharma',
      role: 'Staff AI Research Scientist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80',
    category: 'AI & ML',
    rating: 4.8,
    studentsCount: 14200,
    duration: '10 weeks',
    level: 'Intermediate',
    price: 'Free / Enrolled',
    isEnrolled: true,
    progress: 48,
    completedLessons: 14,
    totalLessons: 30,
    nextLesson: 'Classification Algorithms & ROC Curves',
    bannerGradient: 'from-violet-600 via-purple-600 to-pink-600',
    whatYouWillLearn: [
      'Master data preparation, imputation, and feature scaling with Pandas & NumPy',
      'Implement Linear Regression, Logistic Regression, and Support Vector Machines',
      'Evaluate model performance using Confusion Matrix, Precision-Recall, and AUC',
      'Train Ensemble models: Random Forests, AdaBoost, and XGBoost',
      'Apply unsupervised k-Means clustering and Principal Component Analysis (PCA)'
    ],
    modules: [
      {
        id: 'ml-m1',
        title: 'Module 1 — Mathematical Foundations for ML',
        lessons: [
          { id: 'ml-l1', title: 'Linear Algebra: Vectors, Matrices & Eigenvalues', duration: '35 min', type: 'video', completed: true },
          { id: 'ml-l2', title: 'Calculus: Derivatives & Multivariate Gradients', duration: '40 min', type: 'video', completed: true },
          { id: 'ml-l3', title: 'Probability & Bayes Theorem in Action', duration: '25 min', type: 'reading', completed: true }
        ]
      },
      {
        id: 'ml-m2',
        title: 'Module 2 — Supervised Learning Algorithms',
        lessons: [
          { id: 'ml-l4', title: 'Linear Regression & Cost Minimization', duration: '42 min', type: 'video', completed: true },
          { id: 'ml-l5', title: 'Classification Algorithms & ROC Curves', duration: '38 min', type: 'video', completed: false },
          { id: 'ml-l6', title: 'Hands-on Lab: Student Grade Prediction Model', duration: '45 min', type: 'code', completed: false }
        ]
      }
    ]
  },
  {
    id: 'computer-networks',
    title: 'Computer Networks',
    subtitle: 'Comprehensive study of OSI 7-layer model, TCP/IP protocol suite, routing protocols and socket programming.',
    description: 'Gain a solid grasp of how the modern internet works. Explore packet switching, link layer framing, subnetting, BGP/OSPF routing, flow control, congestion avoidance in TCP, and transport layer security (TLS 1.3).',
    instructor: {
      name: 'Rahul Menon',
      role: 'Associate Professor & Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    category: 'Networking',
    rating: 4.7,
    studentsCount: 9800,
    duration: '8 weeks',
    level: 'Intermediate',
    price: 'Free / Enrolled',
    isEnrolled: true,
    progress: 35,
    completedLessons: 8,
    totalLessons: 24,
    nextLesson: 'TCP/IP Protocols & 3-Way Handshake',
    bannerGradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    whatYouWillLearn: [
      'Analyze network traffic packets with Wireshark',
      'Calculate IPv4 CIDR subnetting and IPv6 transition schemes',
      'Implement socket communication in Python and C',
      'Understand DNS resolution, HTTP/2, HTTP/3, and TLS handshakes'
    ],
    modules: [
      {
        id: 'net-m1',
        title: 'Module 1 — Physical & Data Link Layers',
        lessons: [
          { id: 'net-l1', title: 'Network Topologies & Transmission Media', duration: '24 min', type: 'video', completed: true },
          { id: 'net-l2', title: 'Ethernet Standards, CSMA/CD & MAC Addressing', duration: '30 min', type: 'video', completed: true }
        ]
      },
      {
        id: 'net-m2',
        title: 'Module 2 — Transport Layer & Congestion Control',
        lessons: [
          { id: 'net-l3', title: 'TCP/IP Protocols & 3-Way Handshake', duration: '36 min', type: 'video', completed: false },
          { id: 'net-l4', title: 'UDP vs TCP Performance Comparison Lab', duration: '40 min', type: 'code', completed: false }
        ]
      }
    ]
  },
  {
    id: 'database-management-systems',
    title: 'Database Management Systems',
    subtitle: 'Relational algebra, SQL mastery, normalization (1NF-BCNF), indexing, and ACID transactions.',
    description: 'Learn the architectural principles of modern relational and NoSQL database engines. Write high-performance SQL queries, design normalized schemas, tune indexes, and manage transactional concurrency.',
    instructor: {
      name: 'Sunita Narang',
      role: 'Database Systems Consultant',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80',
    category: 'Database',
    rating: 4.8,
    studentsCount: 11200,
    duration: '8 weeks',
    level: 'Intermediate',
    price: 'Free / Enrolled',
    isEnrolled: true,
    progress: 85,
    completedLessons: 22,
    totalLessons: 26,
    nextLesson: 'B+ Tree Indexing & Query Execution Plans',
    bannerGradient: 'from-amber-600 via-orange-600 to-red-600',
    whatYouWillLearn: [
      'Write complex analytical SQL queries with Window Functions & CTEs',
      'Perform Schema Normalization up to Boyce-Codd Normal Form',
      'Understand WAL logging, Buffer Pool Management, and Isolation Levels'
    ],
    modules: [
      {
        id: 'db-m1',
        title: 'Module 1 — Relational Model & Query Language',
        lessons: [
          { id: 'db-l1', title: 'Relational Algebra & Entity-Relationship Modeling', duration: '32 min', type: 'video', completed: true },
          { id: 'db-l2', title: 'Complex Joins, Subqueries & Aggregations', duration: '44 min', type: 'code', completed: true }
        ]
      }
    ]
  },
  {
    id: 'data-structures-algorithms',
    title: 'Data Structures & Algorithms',
    subtitle: 'Cracking technical interviews with algorithmic thinking, dynamic programming, and graphs.',
    description: 'Master core computer science algorithms: arrays, linked lists, binary search trees, heaps, graph traversals (BFS, DFS, Dijkstra), dynamic programming, and greedy heuristics with asymptotic analysis.',
    instructor: {
      name: 'Vikas Deshmukh',
      role: 'Competitive Programming Champion',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    category: 'Programming',
    rating: 4.9,
    studentsCount: 22000,
    duration: '14 weeks',
    level: 'Advanced',
    price: 'Free / Enrolled',
    isEnrolled: true,
    progress: 60,
    completedLessons: 18,
    totalLessons: 30,
    nextLesson: 'Dynamic Programming on Trees',
    bannerGradient: 'from-indigo-700 via-blue-700 to-sky-700',
    whatYouWillLearn: [
      'Derive Big-O asymptotic time and space complexities',
      'Solve recursion and multi-dimensional dynamic programming problems',
      'Implement graph algorithms including Kruskal, Prim, and Topological Sort'
    ],
    modules: [
      {
        id: 'dsa-m1',
        title: 'Module 1 — Linear Data Structures & Recursion',
        lessons: [
          { id: 'dsa-l1', title: 'Arrays, Two Pointers & Sliding Window Patterns', duration: '38 min', type: 'video', completed: true },
          { id: 'dsa-l2', title: 'Stacks, Queues & Monotonic Deques', duration: '34 min', type: 'video', completed: true }
        ]
      }
    ]
  },
  {
    id: 'modern-web-programming',
    title: 'Modern Web Programming',
    subtitle: 'The modern web curriculum: semantic markup, accessible interfaces, Vite, TypeScript, and modern JS.',
    description: 'Learn modern industry standards for high-performance web engineering. Build reactive client applications, leverage modern build tooling, design responsive UX interfaces, and ship full accessible web apps.',
    instructor: {
      name: 'Arun Kumar',
      role: 'Principal Full Stack Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
    category: 'Web Development',
    rating: 4.9,
    studentsCount: 8900,
    duration: '6 weeks',
    level: 'Beginner',
    price: 'Free / Enrolled',
    isEnrolled: true,
    progress: 95,
    completedLessons: 19,
    totalLessons: 20,
    nextLesson: 'Capstone Project Demonstration',
    bannerGradient: 'from-teal-600 via-emerald-600 to-green-600',
    whatYouWillLearn: [
      'Build fully responsive web layouts with Tailwind CSS',
      'Write clean and strict TypeScript frontend interfaces',
      'Deploy and optimize Vite client applications'
    ],
    modules: [
      {
        id: 'mwp-m1',
        title: 'Module 1 — Core Web Architecture',
        lessons: [
          { id: 'mwp-l1', title: 'Browser Rendering Engine & Critical CSS Path', duration: '28 min', type: 'video', completed: true },
          { id: 'mwp-l2', title: 'Capstone Project Demonstration', duration: '40 min', type: 'code', completed: false }
        ]
      }
    ]
  },
  // Additional Explore Courses (Total at least 9 courses as required)
  {
    id: 'python-for-beginners',
    title: 'Python for Beginners',
    subtitle: 'Zero to hero with Python fundamentals, object-oriented programming, and file handling.',
    description: 'The definitive starting point for computer science students learning Python. Build strong foundational knowledge of data types, loops, functions, classes, error handling, and basic data manipulation.',
    instructor: {
      name: 'Ananya Rao',
      role: 'Senior Software Engineer & Educator',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    },
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=600&q=80',
    category: 'Programming',
    rating: 4.8,
    studentsCount: 12450,
    duration: '8 weeks',
    level: 'Beginner',
    price: 'Free',
    isEnrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 28,
    nextLesson: 'Python Syntax & Interactive REPL',
    bannerGradient: 'from-yellow-600 via-amber-600 to-orange-600',
    whatYouWillLearn: [
      'Write clean, idiomatic Python 3 scripts',
      'Understand OOP principles: Classes, Inheritance, Polymorphism',
      'Work with JSON, CSV, and file I/O operations',
      'Create basic command-line applications and data scrapers'
    ],
    modules: [
      {
        id: 'py-m1',
        title: 'Module 1 — Introduction to Python',
        lessons: [
          { id: 'py-l1', title: 'Python Syntax & Interactive REPL', duration: '20 min', type: 'video', completed: false },
          { id: 'py-l2', title: 'Variables, Expressions & Control Structures', duration: '35 min', type: 'video', completed: false }
        ]
      }
    ]
  },
  {
    id: 'cloud-computing-aws',
    title: 'Cloud Architecture & AWS Services',
    subtitle: 'Design scalable, resilient, fault-tolerant infrastructure on Amazon Web Services.',
    description: 'Learn modern cloud architecture concepts including EC2 virtual machines, S3 object storage, VPC networking, RDS databases, IAM security policies, and serverless compute with AWS Lambda.',
    instructor: {
      name: 'Karthik Raman',
      role: 'AWS Solutions Architect Professional',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    },
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    category: 'Cloud',
    rating: 4.9,
    studentsCount: 7850,
    duration: '9 weeks',
    level: 'Intermediate',
    price: 'Free',
    isEnrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 24,
    nextLesson: 'Cloud Fundamentals & AWS Global Infrastructure',
    bannerGradient: 'from-orange-500 via-amber-600 to-red-600',
    whatYouWillLearn: [
      'Architect highly available applications using Auto Scaling & Load Balancers',
      'Configure VPC subnets, route tables, and security groups',
      'Deploy serverless APIs with AWS API Gateway & Lambda'
    ],
    modules: [
      {
        id: 'cld-m1',
        title: 'Module 1 — AWS Cloud Foundations',
        lessons: [
          { id: 'cld-l1', title: 'Cloud Fundamentals & AWS Global Infrastructure', duration: '25 min', type: 'video', completed: false },
          { id: 'cld-l2', title: 'Identity & Access Management (IAM)', duration: '30 min', type: 'video', completed: false }
        ]
      }
    ]
  },
  {
    id: 'generative-ai-essentials',
    title: 'Generative AI & LLM Applications',
    subtitle: 'Build intelligent applications with Large Language Models, Prompt Engineering & RAG.',
    description: 'Explore the revolution in generative AI. Understand transformer attention mechanisms, fine-tuning techniques, vector databases, LangChain pipelines, and Retrieval-Augmented Generation (RAG).',
    instructor: {
      name: 'Priya Sharma',
      role: 'Staff AI Research Scientist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    category: 'AI & ML',
    rating: 4.9,
    studentsCount: 15600,
    duration: '7 weeks',
    level: 'Intermediate',
    price: 'Free',
    isEnrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 22,
    nextLesson: 'Transformer Architecture & Self-Attention',
    bannerGradient: 'from-fuchsia-600 via-purple-600 to-indigo-700',
    whatYouWillLearn: [
      'Master prompt engineering patterns and chain-of-thought prompting',
      'Build end-to-end RAG workflows with ChromaDB and FAISS',
      'Integrate LLM API endpoints into modern React web applications'
    ],
    modules: [
      {
        id: 'gen-m1',
        title: 'Module 1 — Foundations of Generative Models',
        lessons: [
          { id: 'gen-l1', title: 'Transformer Architecture & Self-Attention', duration: '32 min', type: 'video', completed: false },
          { id: 'gen-l2', title: 'Vector Embeddings & Semantic Search', duration: '35 min', type: 'video', completed: false }
        ]
      }
    ]
  },
  {
    id: 'cybersecurity-essentials',
    title: 'Cybersecurity & Ethical Hacking',
    subtitle: 'Defensive security, penetration testing fundamentals, web vulnerabilities, and cryptography.',
    description: 'Understand modern cybersecurity threats and counter-measures. Learn the OWASP Top 10 vulnerabilities (XSS, SQL Injection, CSRF), public key cryptography, network packet sniffing, and secure coding practices.',
    instructor: {
      name: 'Aditya Sen',
      role: 'Certified Information Security Manager',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    },
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    category: 'Networking',
    rating: 4.7,
    studentsCount: 6400,
    duration: '8 weeks',
    level: 'Intermediate',
    price: 'Free',
    isEnrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 20,
    nextLesson: 'Cyber Threat Landscape & Attack Vectors',
    bannerGradient: 'from-slate-800 via-zinc-800 to-slate-900',
    whatYouWillLearn: [
      'Identify and remediate OWASP Top 10 web vulnerabilities',
      'Implement cryptographic hashes, symmetric and asymmetric encryption',
      'Conduct vulnerability assessments with industry security scanners'
    ],
    modules: [
      {
        id: 'sec-m1',
        title: 'Module 1 — Threat Landscape & Reconnaissance',
        lessons: [
          { id: 'sec-l1', title: 'Cyber Threat Landscape & Attack Vectors', duration: '28 min', type: 'video', completed: false },
          { id: 'sec-l2', title: 'Web Security: Mitigating XSS and SQL Injection', duration: '42 min', type: 'code', completed: false }
        ]
      }
    ]
  }
];
