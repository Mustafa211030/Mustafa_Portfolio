//  Navigation 
export const NAV_LINKS = [
  { label: 'Home',         href: '#home'         },
  { label: 'Services',     href: '#services'     },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Projects',     href: '#projects'     },
  { label: 'Tech Stack',   href: '#tech-stack'   },
  { label: 'Process',      href: '#process'      },
  { label: 'Pricing',      href: '#pricing'      },
  { label: 'Testimonials', href: '#testimonials' },
]

//  Owner 
export const OWNER = {
  firstName:   'Mustafa',
  lastName:    'Saeed',
  fullName:    'Mustafa Saeed',
  email:       'cmustafasaeed665@gmail.com',
  tagline:     "Hi, I'm",
  description: 'I engineer scalable MERN solutions and AI-driven automation that reduce operational costs and accelerate business growth—turning complex requirements into elegant, high-performance systems.',
}

//  Hero roles (3 typewriter phrases) 
export const HERO_ROLES = [
  'Frontend Web Developer',
  'AI Engineer',
  'MERN Stack Expert',
]

export const HERO_STATS = [
  { num: '2+',  label: 'Years Experience'   },
  { num: '10+', label: 'Projects Delivered' },
  { num: '98%', label: 'Job Success'        },
]

//  Featured social platforms 
export const FEATURED_ON = [
  { name: 'LinkedIn',  href: '#', color: '#0a66c2', weight: 700 },
  { name: 'GitHub',    href: '#', color: 'rgba(255,255,255,0.75)', weight: 700 },
  { name: 'Upwork',    href: '#', color: '#6fda44', weight: 800 },
  { name: 'Fiverr',    href: '#', color: 'rgba(255,255,255,0.75)', weight: 700 },
  { name: 'WhatsApp',  href: '#', color: '#25d366', weight: 700 },
]

//  Marquee 
export const MARQUEE_ITEMS = [
  'AI Solutions Architect',
  '500+ Hours Saved Annually',
  'AI Engineer',
  '2+ Years Experience',
  'Full Stack MERN',
  '10+ Projects Delivered',
  'Enterprise Scalability',
  'System Architecture',
]

//  Services 
export const AUTOMATION_FEATURES = [
  '24/7 Autopilot Operations',
  'Instant AI Knowledge Assistants',
  'Hands-Free Workflows',
  'Predictive Analytics',
]
export const AUTOMATION_METRICS = [
  '40% overhead reduction',
  '500+ hours saved annually',
  '24/7 autonomous operation',
]
export const REVENUE_FEATURES  = ['Conversion-Optimized UI', 'High-Speed Infrastructure', 'MVP in Weeks, Not Months']
export const FORTRESS_FEATURES = ['Auto-Scaling Cloud', 'Sub-Millisecond Latency', 'Bank-Grade Compliance', 'Disaster Recovery']

//  Process 
export const PROCESS_STEPS = [
  { num: '01', title: 'Discovery', desc: 'Map the logic, data models, and critical path before writing a single line of code. Define success metrics and align on scope.' },
  { num: '02', title: 'Strategy',  desc: 'Align every technology decision with your business goals. Choose the right stack, architecture pattern, and delivery cadence.' },
  { num: '03', title: 'Build',     desc: 'Rapid, iterative development with continuous feedback loops. Clean code, modular architecture, and CI/CD pipelines from day one.' },
  { num: '04', title: 'Launch',    desc: 'Zero-downtime deployment, live monitoring, full handoff with documentation, and post-launch support included.' },
]

//  Testimonials 
export const TESTIMONIALS = [
  {
    initials:    'MT',
    name:        'Marcus Thornton',
    title:       'VP of Engineering, CloudScale',
    location:    'San Francisco 🇺🇸',
    avatarColor: 'rgba(37,99,235,0.25)',
    text:        "Mustafa is one of the rare full-stack architects who actually understands the 'full' part. From optimising heavy MongoDB queries to implementing complex Framer Motion animations, his versatility is a massive asset to any tech team.",
    highlights:  ['MongoDB queries', 'Framer Motion animations'],
  },
  {
    initials:    'ZA',
    name:        'Zubair Ahmed',
    title:       'Head of Digital, TextileBridge',
    location:    'Lahore 🇵🇰',
    avatarColor: 'rgba(34,197,94,0.2)',
    text:        'Our supply chain automation was a mess until Mustafa stepped in. He built a custom Python-based AI system that saves us over 30 hours of manual work every week. The ROI was immediate and significant.',
    highlights:  ['Python-based AI system'],
  },
  {
    initials:    'CO',
    name:        'Chidi Okechukwu',
    title:       'CTO, Boctrust Microfinance Bank',
    location:    'Lagos 🇳🇬',
    avatarColor: 'rgba(245,158,11,0.2)',
    text:        'The transformation of our loan disbursement system was remarkable. Mustafa solved critical security vulnerabilities and optimised our processing speed by 97%, making our app the most reliable in the microfinance sector.',
    highlights:  ['security vulnerabilities', '97%'],
  },
]

//  Projects 
export interface Project {
  id:           number
  title:        string
  category:     string
  subcategory:  string
  description:  string
  techStack:    string[]
  liveUrl:      string
  githubUrl:    string
  caseStudyUrl: string
  previewBg:    string
  previewAccent:string
  tag:          string
}

export const PROJECTS: Project[] = [
  { id:1,  title:'Royal Devs - Web Design Agency',       category:'Frontend',   subcategory:'Agency Website',         description:'A tailored web design and development services website built for a professional agency. Features modern UI/UX, smooth animations, and responsive design with Framer Motion and Swiper.',   techStack:['Next.js 15','React 19','Tailwind CSS v4','Shadcn/UI','Framer Motion','CI/CD'],              liveUrl:'#', githubUrl:'#', caseStudyUrl:'#', previewBg:'#0d1b2a', previewAccent:'#f59e0b', tag:'Frontend'   },
  { id:2,  title:'Designer District (DDG)',               category:'Full Stack', subcategory:'Fashion Ecosystem',      description:'A luxury e-commerce platform featuring a sophisticated Next.js 15 frontend, an automated admin dashboard, and secure Stripe integration. Engineered for seamless high-fashion shopping.',     techStack:['Next.js 15','Tailwind CSS 4','Supabase','Stripe','Express','Nodemailer'],                   liveUrl:'#', githubUrl:'#', caseStudyUrl:'#', previewBg:'#1e293b', previewAccent:'#3b82f6', tag:'Full Stack' },
  { id:3,  title:'Hardware & Professional Equipment Store',category:'E-Commerce',subcategory:'Hardware & Tools',      description:'Professional e-commerce platform for hardware, tools, and safety equipment. Built with Next.js 16 and React 19. Features high-performance animations powered by GSAP.',                         techStack:['Next.js 16','React 19','Tailwind CSS 4','GSAP','Radix UI','Framer Motion'],                  liveUrl:'#', githubUrl:'#', caseStudyUrl:'#', previewBg:'#1a2535', previewAccent:'#6366f1', tag:'E-Commerce' },
  { id:4,  title:'AI Lead Scoring Platform',             category:'AI / ML',    subcategory:'Sales Automation',       description:'An autonomous AI agent that scores every incoming lead with 99.86% accuracy, helping sales teams cut wasted effort by 50% and focus only on high-value prospects.',                         techStack:['Python','TensorFlow','FastAPI','React','PostgreSQL','Redis'],                                liveUrl:'#', githubUrl:'#', caseStudyUrl:'#', previewBg:'#0f2318', previewAccent:'#22c55e', tag:'AI / ML'    },
  { id:5,  title:'Healthcare Analytics Dashboard',       category:'Full Stack', subcategory:'Analytics Platform',     description:'HIPAA-compliant healthcare analytics platform with real-time patient monitoring, predictive readmission modelling, and a zero-downtime deployment pipeline serving 20+ hospitals.',          techStack:['Next.js 14','TypeScript','Prisma','PostgreSQL','tRPC','Tailwind'],                           liveUrl:'#', githubUrl:'#', caseStudyUrl:'#', previewBg:'#1a1040', previewAccent:'#a855f7', tag:'SaaS'       },
  { id:6,  title:'PakFin Digital Banking Platform',      category:'Fintech',    subcategory:'Payment Infrastructure', description:'Modernised a fintech platform reducing transaction failures by 60% with bank-grade encryption, sub-millisecond latency improvements, and a real-time fraud-detection engine.',              techStack:['Node.js','MongoDB','React','Redis','Docker','Kubernetes'],                                   liveUrl:'#', githubUrl:'#', caseStudyUrl:'#', previewBg:'#1a1200', previewAccent:'#f59e0b', tag:'Fintech'    },
  { id:7,  title:'EduLearn LMS Platform',                category:'EdTech',     subcategory:'Learning Management',    description:'High-performance LMS handling 50k+ concurrent users with zero lag. Built for the local market with global engineering standards, live-streaming, and AI-powered quiz generation.',           techStack:['React','Node.js','MongoDB','WebSockets','AWS','FFmpeg'],                                    liveUrl:'#', githubUrl:'#', caseStudyUrl:'#', previewBg:'#0d1f12', previewAccent:'#22c55e', tag:'EdTech'     },
  { id:8,  title:'Supply Chain Automation System',       category:'Automation', subcategory:'Business Process',       description:'Custom Python-based AI automation system saving 30+ hours of manual work weekly. Integrated with existing ERP, auto-generates reports and dispatches notifications.',                       techStack:['Python','FastAPI','React','PostgreSQL','Celery','Docker'],                                   liveUrl:'#', githubUrl:'#', caseStudyUrl:'#', previewBg:'#1a0a2e', previewAccent:'#8b5cf6', tag:'Automation' },
  { id:9,  title:'Real Estate Listing Platform',         category:'Full Stack', subcategory:'Property Portal',        description:'Modern real estate platform with advanced property search, virtual tours, agent dashboards, and integrated mortgage calculator. Built for the Pakistani market.',                           techStack:['Next.js','Prisma','PostgreSQL','Mapbox','Stripe','Cloudinary'],                              liveUrl:'#', githubUrl:'#', caseStudyUrl:'#', previewBg:'#0a1628', previewAccent:'#3b82f6', tag:'Full Stack' },
  { id:10, title:'Bulk Vendor Wholesale Distribution Hub',category:'E-Commerce',subcategory:'Wholesale Platform',    description:'B2B wholesale distribution platform with tiered pricing, bulk order management, automated invoicing, and real-time inventory tracking for enterprise clients.',                               techStack:['React','Node.js','MongoDB','Express','Stripe','SendGrid'],                                   liveUrl:'#', githubUrl:'#', caseStudyUrl:'#', previewBg:'#1a1a0a', previewAccent:'#eab308', tag:'E-Commerce' },
]

//  Contact form 
export const BUDGET_OPTIONS = [
  { value: '',        label: 'Select a range'    },
  { value: '<$5k',    label: 'Under $5,000'      },
  { value: '$5-15k',  label: '$5,000 – $15,000'  },
  { value: '$15-50k', label: '$15,000 – $50,000' },
  { value: '$50k+',   label: '$50,000+'          },
]
