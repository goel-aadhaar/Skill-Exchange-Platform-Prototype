import {
  Student,
  Skill,
  Company,
  DomainInfo,
  MentoringRequest,
  RatingReview,
  NotificationItem,
  SkillVerificationRequest
} from '../types';

export const INITIAL_SKILLS: Skill[] = [
  // Analytics & Data
  {
    id: 'skill-sql',
    name: 'SQL & Database Querying',
    domain: 'Data Analytics',
    category: 'Business & Analytics',
    description: 'Advanced SQL queries, window functions, CTEs, joins, query optimization, and relational data modeling.',
    demandLevel: 'Very High',
    associatedRoles: ['Data Analyst', 'Business Analyst', 'Product Analyst', 'BI Consultant'],
    associatedCompanies: ['Deloitte', 'Amazon', 'PwC', 'Flipkart', 'EY']
  },
  {
    id: 'skill-powerbi',
    name: 'Power BI & DAX',
    domain: 'Data Analytics',
    category: 'Business & Analytics',
    description: 'Interactive dashboard development, data modeling, DAX formulas, Power Query transformations, and visual storytelling.',
    demandLevel: 'Very High',
    associatedRoles: ['Business Analyst', 'BI Specialist', 'Management Consultant'],
    associatedCompanies: ['Deloitte', 'EY', 'PwC', 'HDFC Bank']
  },
  {
    id: 'skill-python-data',
    name: 'Python for Data Analysis',
    domain: 'Data Analytics',
    category: 'Technical',
    description: 'Pandas, NumPy, Matplotlib/Seaborn, data cleaning, exploratory data analysis, and predictive modeling.',
    demandLevel: 'Very High',
    associatedRoles: ['Data Scientist', 'Data Analyst', 'Quantitative Analyst'],
    associatedCompanies: ['Amazon', 'Microsoft', 'Goldman Sachs', 'Flipkart']
  },
  {
    id: 'skill-tableau',
    name: 'Tableau Visual Analytics',
    domain: 'Data Analytics',
    category: 'Business & Analytics',
    description: 'Data storytelling, LOD calculations, calculated fields, dashboard design best practices, and server publishing.',
    demandLevel: 'High',
    associatedRoles: ['Data Visualization Specialist', 'Business Intelligence Analyst'],
    associatedCompanies: ['McKinsey & Company', 'Amazon', 'Deloitte']
  },
  {
    id: 'skill-genai',
    name: 'Generative AI & Prompt Engineering',
    domain: 'Technology',
    category: 'Technical',
    description: 'LLM application development, LangChain, prompt patterns, RAG systems, and AI workplace productivity.',
    demandLevel: 'Very High',
    associatedRoles: ['AI Consultant', 'Product Manager - AI', 'Tech Analyst'],
    associatedCompanies: ['Microsoft', 'Amazon', 'PwC']
  },
  {
    id: 'skill-excel-advanced',
    name: 'Advanced Excel & VBA Macros',
    domain: 'Finance',
    category: 'Business & Analytics',
    description: 'Index-Match, XLOOKUP, Nested IFs, Pivot tables, Scenario Manager, Solver, dynamic charting, and automated VBA macros.',
    demandLevel: 'Very High',
    associatedRoles: ['Financial Analyst', 'Consulting Intern', 'Supply Chain Analyst'],
    associatedCompanies: ['Deloitte', 'Goldman Sachs', 'McKinsey & Company', 'HDFC Bank', 'HUL']
  },

  // Finance
  {
    id: 'skill-fin-modeling',
    name: 'Financial Modeling & 3-Statement Forecast',
    domain: 'Finance',
    category: 'Finance',
    description: 'Integrated 3-statement models (P&L, Balance Sheet, Cash Flow), debt schedules, working capital, and scenario stress testing.',
    demandLevel: 'Very High',
    associatedRoles: ['Investment Banking Analyst', 'Equity Research Associate', 'Corporate Finance Analyst'],
    associatedCompanies: ['Goldman Sachs', 'HDFC Bank', 'Deloitte']
  },
  {
    id: 'skill-dcf-valuation',
    name: 'DCF & Relative Valuation',
    domain: 'Finance',
    category: 'Finance',
    description: 'Discounted cash flow, WACC computation, terminal value, comparable company analysis (CCA), and precedent transactions.',
    demandLevel: 'Very High',
    associatedRoles: ['M&A Analyst', 'Valuation Consultant', 'Private Equity Analyst'],
    associatedCompanies: ['Goldman Sachs', 'EY', 'PwC']
  },
  {
    id: 'skill-equity-research',
    name: 'Equity Research & Sector Analysis',
    domain: 'Finance',
    category: 'Finance',
    description: 'Top-down & bottom-up sector analysis, revenue driver decomposition, competitive moats, and writing initiating coverage notes.',
    demandLevel: 'High',
    associatedRoles: ['Equity Research Analyst', 'Fund Management Intern'],
    associatedCompanies: ['Goldman Sachs', 'HDFC Bank']
  },

  // Strategy & Consulting
  {
    id: 'skill-case-prep',
    name: 'Case Study Frameworks (Profitability & Market Entry)',
    domain: 'Consulting',
    category: 'Strategy & Consulting',
    description: 'Structured case cracking, MECE issue trees, profitability breakdown, market entry, pricing, and M&A frameworks.',
    demandLevel: 'Very High',
    associatedRoles: ['Management Consultant', 'Strategy Analyst', 'Associate Consultant'],
    associatedCompanies: ['McKinsey & Company', 'Boston Consulting Group (BCG)', 'Bain & Company', 'Deloitte']
  },
  {
    id: 'skill-guesstimates',
    name: 'Guesstimates & Market Sizing',
    domain: 'Consulting',
    category: 'Strategy & Consulting',
    description: 'Demand-side & supply-side estimation techniques, population segmentation, sanity checks, and structured mental math.',
    demandLevel: 'Very High',
    associatedRoles: ['Consulting Associate', 'Strategy Analyst', 'Product Associate'],
    associatedCompanies: ['McKinsey & Company', 'BCG', 'Bain & Company', 'PwC']
  },
  {
    id: 'skill-deck-storylining',
    name: 'Executive Slide Design & Storylining',
    domain: 'Consulting',
    category: 'Strategy & Consulting',
    description: 'Pyramid principle, ghost decks, executive summary crafting, visual chart selection, and client-ready slide architecture.',
    demandLevel: 'High',
    associatedRoles: ['Strategy Consultant', 'Chief of Staff Intern'],
    associatedCompanies: ['Deloitte', 'McKinsey & Company', 'Bain & Company']
  },

  // Product Management
  {
    id: 'skill-prod-strategy',
    name: 'Product Strategy & Vision',
    domain: 'Product Management',
    category: 'Product',
    description: 'North Star metrics, feature prioritization (RICE / MoSCoW), product teardowns, and defining value propositions.',
    demandLevel: 'Very High',
    associatedRoles: ['Associate Product Manager (APM)', 'Product Analyst'],
    associatedCompanies: ['Microsoft', 'Amazon', 'Flipkart']
  },
  {
    id: 'skill-prd-writing',
    name: 'PRD Writing & User Story Mapping',
    domain: 'Product Management',
    category: 'Product',
    description: 'Creating comprehensive Product Requirement Documents, acceptance criteria, wireframe flows, and sprint backlogs.',
    demandLevel: 'High',
    associatedRoles: ['Product Manager', 'Technical Product Manager'],
    associatedCompanies: ['Amazon', 'Flipkart', 'Microsoft']
  },
  {
    id: 'skill-figma-wireframing',
    name: 'UI/UX Wireframing in Figma',
    domain: 'Product Management',
    category: 'Product',
    description: 'Rapid low-fidelity and high-fidelity wireframing, user journey maps, and clickable interactive prototypes.',
    demandLevel: 'High',
    associatedRoles: ['Product Designer', 'APM Intern'],
    associatedCompanies: ['Flipkart', 'Microsoft']
  },

  // Marketing
  {
    id: 'skill-digital-mktg',
    name: 'Performance Marketing & Digital Analytics',
    domain: 'Marketing',
    category: 'Business & Analytics',
    description: 'Google Analytics 4, Meta Ads Manager, ROAS optimization, CAC/LTV calculations, and conversion funnel analysis.',
    demandLevel: 'Very High',
    associatedRoles: ['Brand Manager', 'Growth Marketer', 'Digital Marketing Specialist'],
    associatedCompanies: ['Hindustan Unilever Limited (HUL)', 'Flipkart', 'Amazon']
  },
  {
    id: 'skill-brand-strategy',
    name: 'Brand Strategy & FMCG Marketing',
    domain: 'Marketing',
    category: 'Strategy & Consulting',
    description: 'Brand key frameworks, STP (Segmentation, Targeting, Positioning), trade marketing, consumer immersion, and GTM plans.',
    demandLevel: 'High',
    associatedRoles: ['Management Trainee - Sales & Marketing', 'Brand Associate'],
    associatedCompanies: ['Hindustan Unilever Limited (HUL)', 'Flipkart']
  },

  // Operations & Supply Chain
  {
    id: 'skill-supply-chain',
    name: 'Supply Chain Optimization & Inventory Models',
    domain: 'Operations',
    category: 'Business & Analytics',
    description: 'EOQ models, safety stock computation, demand forecasting, warehouse layout optimization, and logistics network design.',
    demandLevel: 'High',
    associatedRoles: ['Operations Manager', 'Supply Chain Consultant', 'Logistics Planner'],
    associatedCompanies: ['Amazon', 'Hindustan Unilever Limited (HUL)', 'Flipkart']
  },

  // Placement Prep & Soft Skills
  {
    id: 'skill-resume-ats',
    name: 'Resume Building & ATS Optimization',
    domain: 'Interview Prep',
    category: 'Soft Skills & Interview',
    description: 'Action-verb bullet point structuring (XYZ formula: Accomplished [X] as measured by [Y] by doing [Z]), formatting, and ATS tailoring.',
    demandLevel: 'Very High',
    associatedRoles: ['All Placement Aspirants'],
    associatedCompanies: ['All Campus Recruiters']
  },
  {
    id: 'skill-star-interview',
    name: 'STAR Technique for Behavioral & HR Rounds',
    domain: 'Interview Prep',
    category: 'Soft Skills & Interview',
    description: 'Mastering Situation-Task-Action-Result narratives for leadership, conflict resolution, failure, and ambition questions.',
    demandLevel: 'Very High',
    associatedRoles: ['All Placement Aspirants'],
    associatedCompanies: ['Amazon', 'Deloitte', 'McKinsey & Company', 'Goldman Sachs']
  },
  {
    id: 'skill-gd-prep',
    name: 'Group Discussion & Extempore Mastery',
    domain: 'Interview Prep',
    category: 'Soft Skills & Interview',
    description: 'Opening and summarizing techniques, generating fresh perspectives (PESTLE / stakeholder view), and polite intervention tactics.',
    demandLevel: 'High',
    associatedRoles: ['All Summer & Final Placement Candidates'],
    associatedCompanies: ['HUL', 'HDFC Bank', 'Deloitte']
  }
];

export const INITIAL_DOMAINS: DomainInfo[] = [
  {
    id: 'domain-analytics',
    name: 'Data Analytics',
    iconName: 'BarChart3',
    description: 'Translating complex datasets into actionable business intelligence, predictive dashboards, and strategic growth drivers.',
    popularRoles: ['Data Analyst', 'Business Analyst', 'BI Consultant', 'Data Scientist'],
    keySkills: ['SQL & Database Querying', 'Power BI & DAX', 'Python for Data Analysis', 'Tableau Visual Analytics'],
    topRecruiters: ['Deloitte', 'Amazon', 'PwC', 'EY', 'Flipkart'],
    avgPackage: '₹14.8 - ₹22.5 LPA',
    marketInsight: 'Over 65% of top campus recruiters in 2024 have made SQL and BI tools mandatory in their initial technical shortlisting tests.'
  },
  {
    id: 'domain-consulting',
    name: 'Consulting',
    iconName: 'Briefcase',
    description: 'Solving complex enterprise challenges across strategy, operational transformation, market expansion, and restructuring.',
    popularRoles: ['Management Consultant', 'Strategy Analyst', 'Associate Consultant', 'Advisory Analyst'],
    keySkills: ['Case Study Frameworks', 'Guesstimates & Market Sizing', 'Executive Slide Design & Storylining', 'Advanced Excel'],
    topRecruiters: ['McKinsey & Company', 'Boston Consulting Group (BCG)', 'Bain & Company', 'Deloitte', 'PwC'],
    avgPackage: '₹18.0 - ₹28.0 LPA',
    marketInsight: 'Consulting interviews heavily evaluate structured problem solving through live 30-minute case cracking rounds.'
  },
  {
    id: 'domain-finance',
    name: 'Finance',
    iconName: 'TrendingUp',
    description: 'Corporate financial management, valuation, capital structuring, equity analysis, and investment banking strategies.',
    popularRoles: ['Investment Banking Analyst', 'Equity Research Associate', 'Credit Risk Analyst', 'Corporate Finance Lead'],
    keySkills: ['Financial Modeling & 3-Statement Forecast', 'DCF & Relative Valuation', 'Advanced Excel & VBA Macros', 'Equity Research'],
    topRecruiters: ['Goldman Sachs', 'HDFC Bank', 'EY', 'Deloitte'],
    avgPackage: '₹16.5 - ₹26.0 LPA',
    marketInsight: 'Candidates with hands-on 3-statement modeling and DCF valuation experience receive priority in bulge-bracket banking shortlists.'
  },
  {
    id: 'domain-product',
    name: 'Product Management',
    iconName: 'Layers',
    description: 'Defining product roadmaps, uncovering customer pain points, and leading cross-functional engineering and design squads.',
    popularRoles: ['Associate Product Manager (APM)', 'Product Analyst', 'Technical Product Manager'],
    keySkills: ['Product Strategy & Vision', 'PRD Writing & User Story Mapping', 'UI/UX Wireframing in Figma', 'SQL & Database Querying'],
    topRecruiters: ['Microsoft', 'Amazon', 'Flipkart'],
    avgPackage: '₹18.5 - ₹30.0 LPA',
    marketInsight: 'High-demand domain where product teardowns and structured PRD samples in portfolios convert to direct interview offers.'
  },
  {
    id: 'domain-marketing',
    name: 'Marketing',
    iconName: 'Megaphone',
    description: 'Brand building, digital performance funnels, consumer insights, market research, and omnichannel retail campaigns.',
    popularRoles: ['Brand Manager', 'Growth Marketer', 'Management Trainee - Sales', 'Digital Marketing Lead'],
    keySkills: ['Performance Marketing & Digital Analytics', 'Brand Strategy & FMCG Marketing', 'Advanced Excel', 'Data Storytelling'],
    topRecruiters: ['Hindustan Unilever Limited (HUL)', 'Flipkart', 'Amazon'],
    avgPackage: '₹14.0 - ₹22.0 LPA',
    marketInsight: 'FMCG and E-commerce giants emphasize practical trade marketing logic and data-backed digital campaign analysis.'
  },
  {
    id: 'domain-technology',
    name: 'Technology',
    iconName: 'Cpu',
    description: 'Enterprise cloud architectures, modern software solutions, AI/ML integration, and digital transformation.',
    popularRoles: ['Tech Consultant', 'Cloud Solution Architect', 'AI Solutions Engineer', 'Systems Analyst'],
    keySkills: ['Generative AI & Prompt Engineering', 'Python for Data Analysis', 'SQL & Database Querying'],
    topRecruiters: ['Microsoft', 'Amazon', 'PwC'],
    avgPackage: '₹16.0 - ₹25.0 LPA',
    marketInsight: 'Prompt engineering and practical GenAI workflows are the fastest growing skill criteria among tech consulting firms.'
  },
  {
    id: 'domain-operations',
    name: 'Operations & Supply Chain',
    iconName: 'Truck',
    description: 'Warehouse automation, procurement optimization, inventory management, logistics planning, and manufacturing efficiency.',
    popularRoles: ['Operations Manager', 'Supply Chain Analyst', 'Procurement Specialist'],
    keySkills: ['Supply Chain Optimization & Inventory Models', 'Advanced Excel & VBA Macros', 'Power BI & DAX'],
    topRecruiters: ['Amazon', 'Hindustan Unilever Limited (HUL)', 'Flipkart'],
    avgPackage: '₹14.5 - ₹20.5 LPA',
    marketInsight: 'E-commerce and FMCG supply chains are adopting real-time BI dashboards, creating huge demand for analytics in ops.'
  },
  {
    id: 'domain-prep',
    name: 'Interview Prep',
    iconName: 'Award',
    description: 'Campus placement preparation, behavioral interviews, resume engineering, and high-impact communication.',
    popularRoles: ['All Academic Cohorts & Placement Rounds'],
    keySkills: ['Resume Building & ATS Optimization', 'STAR Technique for Behavioral & HR Rounds', 'Group Discussion & Extempore Mastery'],
    topRecruiters: ['All 120+ On-Campus Recruiters'],
    avgPackage: 'Campus-wide Success',
    marketInsight: 'Over 40% of candidate rejections in final rounds are attributed to unstructured answers in HR & behavioral interviews.'
  }
];

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-deloitte',
    name: 'Deloitte USI',
    logo: 'DL',
    industry: 'Management & Technology Consulting',
    domain: 'Consulting',
    description: 'Global leader in strategy, analytics, enterprise technology, and risk advisory services.',
    roles: [
      {
        title: 'Business Analyst - Strategy & Analytics',
        type: 'Final Placement',
        location: 'Gurugram / Bengaluru / Hyderabad',
        ctcOrStipend: '₹16.5 LPA + Performance Bonus',
        eligibility: 'Min 65% in 10th, 12th & Graduation. Current PGDM CGPA ≥ 6.8',
        deadline: '2026-09-15',
        requiredSkills: ['SQL & Database Querying', 'Power BI & DAX', 'Advanced Excel & VBA Macros', 'Case Study Frameworks (Profitability & Market Entry)'],
        preferredSkills: ['Python for Data Analysis', 'Executive Slide Design & Storylining']
      },
      {
        title: 'Consulting Summer Intern',
        type: 'Summer Internship',
        location: 'Gurugram / Mumbai',
        ctcOrStipend: '₹75,000 / month',
        eligibility: 'First-year PGDM students in good academic standing',
        deadline: '2026-09-28',
        requiredSkills: ['Case Study Frameworks (Profitability & Market Entry)', 'Guesstimates & Market Sizing', 'Advanced Excel & VBA Macros'],
        preferredSkills: ['Power BI & DAX', 'STAR Technique for Behavioral & HR Rounds']
      }
    ],
    requiredSkills: ['SQL & Database Querying', 'Power BI & DAX', 'Advanced Excel & VBA Macros', 'Case Study Frameworks (Profitability & Market Entry)'],
    preferredSkills: ['Python for Data Analysis', 'Executive Slide Design & Storylining', 'Guesstimates & Market Sizing'],
    eligibility: 'PGDM (All Specializations) with min 6.5 CGPA, no active backlogs.',
    location: 'Gurugram, Bengaluru, Hyderabad, Mumbai',
    hiringSeason: 'Phase 1 Autumn Placement Drive',
    tier: 'Tier 1 Dream',
    applicationDeadline: '2026-09-15'
  },
  {
    id: 'comp-mckinsey',
    name: 'McKinsey & Company',
    logo: 'McK',
    industry: 'Management Consulting',
    domain: 'Consulting',
    description: 'Premier global management consulting firm serving top enterprises and governments worldwide.',
    roles: [
      {
        title: 'Associate Consultant',
        type: 'Final Placement',
        location: 'Gurugram / Mumbai / Bengaluru',
        ctcOrStipend: '₹26.0 - ₹28.5 LPA',
        eligibility: 'Top 15% academic percentile or exceptional past work experience',
        deadline: '2026-09-10',
        requiredSkills: ['Case Study Frameworks (Profitability & Market Entry)', 'Guesstimates & Market Sizing', 'Executive Slide Design & Storylining', 'STAR Technique for Behavioral & HR Rounds'],
        preferredSkills: ['Financial Modeling & 3-Statement Forecast', 'Advanced Excel & VBA Macros']
      },
      {
        title: 'Summer Associate Intern',
        type: 'Summer Internship',
        location: 'Gurugram / Mumbai',
        ctcOrStipend: '₹1,50,000 / month',
        eligibility: 'First Year PGDM students with strong analytical problem solving',
        deadline: '2026-09-22',
        requiredSkills: ['Case Study Frameworks (Profitability & Market Entry)', 'Guesstimates & Market Sizing', 'Resume Building & ATS Optimization'],
        preferredSkills: ['Tableau Visual Analytics', 'Executive Slide Design & Storylining']
      }
    ],
    requiredSkills: ['Case Study Frameworks (Profitability & Market Entry)', 'Guesstimates & Market Sizing', 'Executive Slide Design & Storylining', 'STAR Technique for Behavioral & HR Rounds'],
    preferredSkills: ['Financial Modeling & 3-Statement Forecast', 'Advanced Excel & VBA Macros'],
    eligibility: 'Open to all PGDM cohorts with strong problem solving and leadership track record.',
    location: 'Gurugram, Mumbai, Bengaluru',
    hiringSeason: 'Early Marquee Slot 0',
    tier: 'Super Dream',
    applicationDeadline: '2026-09-10'
  },
  {
    id: 'comp-amazon',
    name: 'Amazon',
    logo: 'AMZ',
    industry: 'E-commerce & Cloud Services',
    domain: 'Data Analytics',
    description: 'Global technology giant driving cloud infrastructure, consumer retail, AI, and fulfillment logistics.',
    roles: [
      {
        title: 'Business Analyst - Operations & Customer Analytics',
        type: 'Final Placement',
        location: 'Bengaluru / Hyderabad',
        ctcOrStipend: '₹22.0 LPA + Stocks',
        eligibility: 'PGDM Analytics / General with strong SQL and Python foundation',
        deadline: '2026-09-18',
        requiredSkills: ['SQL & Database Querying', 'Python for Data Analysis', 'Advanced Excel & VBA Macros'],
        preferredSkills: ['Generative AI & Prompt Engineering', 'Supply Chain Optimization & Inventory Models']
      },
      {
        title: 'Program Manager Intern',
        type: 'Summer Internship',
        location: 'Bengaluru / Delhi NCR',
        ctcOrStipend: '₹1,10,000 / month',
        eligibility: 'PGDM First Year (All branches)',
        deadline: '2026-09-30',
        requiredSkills: ['SQL & Database Querying', 'Product Strategy & Vision', 'STAR Technique for Behavioral & HR Rounds'],
        preferredSkills: ['Power BI & DAX', 'Supply Chain Optimization & Inventory Models']
      }
    ],
    requiredSkills: ['SQL & Database Querying', 'Python for Data Analysis', 'Advanced Excel & VBA Macros', 'STAR Technique for Behavioral & HR Rounds'],
    preferredSkills: ['Generative AI & Prompt Engineering', 'Power BI & DAX', 'Supply Chain Optimization & Inventory Models'],
    eligibility: 'PGDM candidates with strong quantitative aptitude.',
    location: 'Bengaluru, Hyderabad, Delhi NCR',
    hiringSeason: 'Phase 1 Autumn Drive',
    tier: 'Super Dream',
    applicationDeadline: '2026-09-18'
  },
  {
    id: 'comp-goldman',
    name: 'Goldman Sachs',
    logo: 'GS',
    industry: 'Investment Banking & Financial Services',
    domain: 'Finance',
    description: 'Leading global investment banking, securities, and investment management firm.',
    roles: [
      {
        title: 'Financial Analyst - Global Investment Research & Valuation',
        type: 'Final Placement',
        location: 'Bengaluru / Mumbai',
        ctcOrStipend: '₹24.0 - ₹27.0 LPA',
        eligibility: 'PGDM Finance or CFA Level 1/2 candidates with 7.0+ CGPA',
        deadline: '2026-09-12',
        requiredSkills: ['Financial Modeling & 3-Statement Forecast', 'DCF & Relative Valuation', 'Advanced Excel & VBA Macros', 'Equity Research & Sector Analysis'],
        preferredSkills: ['Python for Data Analysis', 'STAR Technique for Behavioral & HR Rounds']
      },
      {
        title: 'Summer Financial Analyst Intern',
        type: 'Summer Internship',
        location: 'Bengaluru',
        ctcOrStipend: '₹1,25,000 / month',
        eligibility: 'First-year PGDM Finance students',
        deadline: '2026-09-25',
        requiredSkills: ['Financial Modeling & 3-Statement Forecast', 'DCF & Relative Valuation', 'Advanced Excel & VBA Macros'],
        preferredSkills: ['Equity Research & Sector Analysis', 'Group Discussion & Extempore Mastery']
      }
    ],
    requiredSkills: ['Financial Modeling & 3-Statement Forecast', 'DCF & Relative Valuation', 'Advanced Excel & VBA Macros', 'Equity Research & Sector Analysis'],
    preferredSkills: ['Python for Data Analysis', 'STAR Technique for Behavioral & HR Rounds'],
    eligibility: 'PGDM Finance with strong financial accounting and valuation foundations.',
    location: 'Bengaluru, Mumbai',
    hiringSeason: 'Slot 0 Marquee',
    tier: 'Super Dream',
    applicationDeadline: '2026-09-12'
  },
  {
    id: 'comp-microsoft',
    name: 'Microsoft',
    logo: 'MSFT',
    industry: 'Enterprise Software & Cloud Platforms',
    domain: 'Product Management',
    description: 'Global innovator in cloud infrastructure, AI models, developer tools, and enterprise productivity software.',
    roles: [
      {
        title: 'Associate Product Manager (APM)',
        type: 'Final Placement',
        location: 'Hyderabad / Bengaluru / Noida',
        ctcOrStipend: '₹28.0 LPA + RSUs',
        eligibility: 'PGDM / Engineering + MBA candidates with strong product sense',
        deadline: '2026-09-20',
        requiredSkills: ['Product Strategy & Vision', 'PRD Writing & User Story Mapping', 'Generative AI & Prompt Engineering', 'UI/UX Wireframing in Figma'],
        preferredSkills: ['SQL & Database Querying', 'Python for Data Analysis']
      }
    ],
    requiredSkills: ['Product Strategy & Vision', 'PRD Writing & User Story Mapping', 'Generative AI & Prompt Engineering', 'UI/UX Wireframing in Figma'],
    preferredSkills: ['SQL & Database Querying', 'Python for Data Analysis'],
    eligibility: 'Students with passionate product mindset, portfolio or teardown work.',
    location: 'Hyderabad, Bengaluru, Noida',
    hiringSeason: 'Phase 1 Placement Drive',
    tier: 'Super Dream',
    applicationDeadline: '2026-09-20'
  },
  {
    id: 'comp-pwc',
    name: 'PwC India',
    logo: 'PwC',
    industry: 'Consulting & Advisory Services',
    domain: 'Consulting',
    description: 'Multinational professional services network delivering strategic consulting, assurance, and risk solutions.',
    roles: [
      {
        title: 'Consultant - Management Consulting',
        type: 'Final Placement',
        location: 'Gurugram / Mumbai / Kolkata',
        ctcOrStipend: '₹15.5 LPA',
        eligibility: 'PGDM candidates with 60%+ throughout academics',
        deadline: '2026-09-24',
        requiredSkills: ['Case Study Frameworks (Profitability & Market Entry)', 'SQL & Database Querying', 'Advanced Excel & VBA Macros'],
        preferredSkills: ['Power BI & DAX', 'Executive Slide Design & Storylining']
      }
    ],
    requiredSkills: ['Case Study Frameworks (Profitability & Market Entry)', 'SQL & Database Querying', 'Advanced Excel & VBA Macros'],
    preferredSkills: ['Power BI & DAX', 'Executive Slide Design & Storylining'],
    eligibility: 'PGDM (All Specializations).',
    location: 'Gurugram, Mumbai, Kolkata, Bengaluru',
    hiringSeason: 'Phase 1 Placement Drive',
    tier: 'Tier 1 Dream',
    applicationDeadline: '2026-09-24'
  },
  {
    id: 'comp-hul',
    name: 'Hindustan Unilever Limited (HUL)',
    logo: 'HUL',
    industry: 'Fast-Moving Consumer Goods (FMCG)',
    domain: 'Marketing',
    description: 'India’s premier consumer goods company with household brands across beauty, foods, and home care.',
    roles: [
      {
        title: 'Management Trainee - Sales & Marketing',
        type: 'Final Placement',
        location: 'Mumbai / Pan-India',
        ctcOrStipend: '₹22.5 LPA',
        eligibility: 'PGDM Marketing with high academic and extra-curricular standing',
        deadline: '2026-09-14',
        requiredSkills: ['Brand Strategy & FMCG Marketing', 'Performance Marketing & Digital Analytics', 'Group Discussion & Extempore Mastery', 'STAR Technique for Behavioral & HR Rounds'],
        preferredSkills: ['Advanced Excel & VBA Macros', 'Supply Chain Optimization & Inventory Models']
      }
    ],
    requiredSkills: ['Brand Strategy & FMCG Marketing', 'Performance Marketing & Digital Analytics', 'Group Discussion & Extempore Mastery', 'STAR Technique for Behavioral & HR Rounds'],
    preferredSkills: ['Advanced Excel & VBA Macros', 'Supply Chain Optimization & Inventory Models'],
    eligibility: 'PGDM Marketing & Operations candidates.',
    location: 'Mumbai (HQ) / Pan-India',
    hiringSeason: 'Slot 0 Marquee',
    tier: 'Super Dream',
    applicationDeadline: '2026-09-14'
  },
  {
    id: 'comp-ey',
    name: 'Ernst & Young (EY)',
    logo: 'EY',
    industry: 'Assurance, Advisory & Transaction Advisory',
    domain: 'Finance',
    description: 'Global advisory giant providing transaction advisory, business consulting, and tech risk.',
    roles: [
      {
        title: 'Associate - Valuation & Business Modeling',
        type: 'Final Placement',
        location: 'Gurugram / Mumbai / Bengaluru',
        ctcOrStipend: '₹15.0 LPA',
        eligibility: 'PGDM Finance with good grasp of valuation concepts',
        deadline: '2026-09-26',
        requiredSkills: ['Financial Modeling & 3-Statement Forecast', 'DCF & Relative Valuation', 'Advanced Excel & VBA Macros'],
        preferredSkills: ['Power BI & DAX', 'Case Study Frameworks (Profitability & Market Entry)']
      }
    ],
    requiredSkills: ['Financial Modeling & 3-Statement Forecast', 'DCF & Relative Valuation', 'Advanced Excel & VBA Macros'],
    preferredSkills: ['Power BI & DAX', 'Case Study Frameworks (Profitability & Market Entry)'],
    eligibility: 'PGDM Finance & Analytics.',
    location: 'Gurugram, Mumbai, Bengaluru, Chennai',
    hiringSeason: 'Phase 1 Placement Drive',
    tier: 'Tier 1 Dream',
    applicationDeadline: '2026-09-26'
  },
  {
    id: 'comp-bcg',
    name: 'Boston Consulting Group (BCG)',
    logo: 'BCG',
    industry: 'Management Consulting & Strategy',
    domain: 'Consulting',
    description: 'Pioneering global management consulting firm partnering with business and society leaders.',
    roles: [
      {
        title: 'Junior Associate Consultant',
        type: 'Final Placement',
        location: 'New Delhi / Mumbai / Bengaluru',
        ctcOrStipend: '₹27.5 LPA',
        eligibility: 'Top quartile PGDM academic ranking',
        deadline: '2026-09-08',
        requiredSkills: ['Case Study Frameworks (Profitability & Market Entry)', 'Guesstimates & Market Sizing', 'Executive Slide Design & Storylining'],
        preferredSkills: ['Tableau Visual Analytics', 'STAR Technique for Behavioral & HR Rounds']
      }
    ],
    requiredSkills: ['Case Study Frameworks (Profitability & Market Entry)', 'Guesstimates & Market Sizing', 'Executive Slide Design & Storylining'],
    preferredSkills: ['Tableau Visual Analytics', 'STAR Technique for Behavioral & HR Rounds'],
    eligibility: 'All PGDM candidates with verified case prep competency.',
    location: 'New Delhi, Mumbai, Bengaluru',
    hiringSeason: 'Slot 0 Marquee',
    tier: 'Super Dream',
    applicationDeadline: '2026-09-08'
  },
  {
    id: 'comp-flipkart',
    name: 'Flipkart',
    logo: 'FK',
    industry: 'E-Commerce & Digital Marketplaces',
    domain: 'Product Management',
    description: 'Leading Indian e-commerce marketplace driving supply-chain innovation, fintech, and retail technology.',
    roles: [
      {
        title: 'Associate Product Manager',
        type: 'Final Placement',
        location: 'Bengaluru',
        ctcOrStipend: '₹21.0 LPA',
        eligibility: 'PGDM All branches with product and UX portfolio',
        deadline: '2026-09-21',
        requiredSkills: ['Product Strategy & Vision', 'PRD Writing & User Story Mapping', 'SQL & Database Querying', 'UI/UX Wireframing in Figma'],
        preferredSkills: ['Performance Marketing & Digital Analytics', 'Python for Data Analysis']
      }
    ],
    requiredSkills: ['Product Strategy & Vision', 'PRD Writing & User Story Mapping', 'SQL & Database Querying', 'UI/UX Wireframing in Figma'],
    preferredSkills: ['Performance Marketing & Digital Analytics', 'Python for Data Analysis'],
    eligibility: 'PGDM cohorts with high problem-solving velocity.',
    location: 'Bengaluru',
    hiringSeason: 'Phase 1 Placement Drive',
    tier: 'Tier 1 Dream',
    applicationDeadline: '2026-09-21'
  },
  {
    id: 'comp-bain',
    name: 'Bain & Company',
    logo: 'BAIN',
    industry: 'Management Consulting & Private Equity',
    domain: 'Consulting',
    description: 'Top-tier management consulting firm known for Results Delivery and private equity due diligence.',
    roles: [
      {
        title: 'Associate Consultant',
        type: 'Final Placement',
        location: 'Gurugram / Mumbai / Bengaluru',
        ctcOrStipend: '₹27.0 LPA',
        eligibility: 'Strong academic record and consulting case interview track record',
        deadline: '2026-09-09',
        requiredSkills: ['Case Study Frameworks (Profitability & Market Entry)', 'Guesstimates & Market Sizing', 'Executive Slide Design & Storylining', 'STAR Technique for Behavioral & HR Rounds'],
        preferredSkills: ['Financial Modeling & 3-Statement Forecast']
      }
    ],
    requiredSkills: ['Case Study Frameworks (Profitability & Market Entry)', 'Guesstimates & Market Sizing', 'Executive Slide Design & Storylining', 'STAR Technique for Behavioral & HR Rounds'],
    preferredSkills: ['Financial Modeling & 3-Statement Forecast'],
    eligibility: 'PGDM All Specializations.',
    location: 'Gurugram, Mumbai, Bengaluru',
    hiringSeason: 'Slot 0 Marquee',
    tier: 'Super Dream',
    applicationDeadline: '2026-09-09'
  },
  {
    id: 'comp-hdfc',
    name: 'HDFC Bank',
    logo: 'HDFC',
    industry: 'Banking & Financial Services',
    domain: 'Finance',
    description: 'India’s largest private sector bank offering corporate banking, treasury, wealth, and retail solutions.',
    roles: [
      {
        title: 'Management Trainee - Treasury & Corporate Banking',
        type: 'Final Placement',
        location: 'Mumbai / Delhi NCR',
        ctcOrStipend: '₹16.0 LPA',
        eligibility: 'PGDM Finance & Analytics with 6.5+ CGPA',
        deadline: '2026-09-29',
        requiredSkills: ['Financial Modeling & 3-Statement Forecast', 'Advanced Excel & VBA Macros', 'Group Discussion & Extempore Mastery'],
        preferredSkills: ['Power BI & DAX', 'DCF & Relative Valuation']
      }
    ],
    requiredSkills: ['Financial Modeling & 3-Statement Forecast', 'Advanced Excel & VBA Macros', 'Group Discussion & Extempore Mastery'],
    preferredSkills: ['Power BI & DAX', 'DCF & Relative Valuation'],
    eligibility: 'PGDM Finance students.',
    location: 'Mumbai, Delhi NCR, Chennai',
    hiringSeason: 'Phase 1 Placement Drive',
    tier: 'Core Marquee',
    applicationDeadline: '2026-09-29'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  // 1. PRIMARY LEARNER PERSONA
  {
    id: 'student-aadhaar',
    name: 'Aadhaar Verma',
    studentId: 'IMT2024PGDM042',
    email: 'aadhaar.verma@imt.edu',
    avatar: 'AV',
    program: 'PGDM (Analytics)',
    specialization: 'Business Analytics & IT',
    academicYear: 'Year 1 (Batch 2024–2026)',
    graduationYear: 2026,
    bio: 'First-year PGDM Analytics aspirant targeting Business Analyst & Consulting roles at Deloitte and Amazon. Eager to master SQL and Power BI through peer mentoring.',
    targetDomain: 'Data Analytics',
    targetRole: 'Business Analyst / Analytics Consultant',
    careerGoal: 'Secure a Summer Internship at Deloitte USI or Amazon as an Analytics Consultant.',
    skillsToTeach: [
      {
        skillId: 'skill-python-data',
        skillName: 'Python for Data Analysis',
        domain: 'Data Analytics',
        proficiency: 'Intermediate',
        experienceNote: 'Completed Python certification; proficient in Pandas & Matplotlib EDA.',
        verified: false,
        sessionsHelped: 2,
        isAvailable: true
      },
      {
        skillId: 'skill-excel-advanced',
        skillName: 'Advanced Excel & VBA Macros',
        domain: 'Finance',
        proficiency: 'Intermediate',
        experienceNote: 'Strong with Pivot tables, Index-Match, and conditional formatting.',
        verified: true,
        sessionsHelped: 4,
        isAvailable: true
      }
    ],
    skillsToLearn: [
      {
        skillId: 'skill-sql',
        skillName: 'SQL & Database Querying',
        domain: 'Data Analytics',
        currentLevel: 'Beginner',
        targetLevel: 'Advanced',
        priority: 'High'
      },
      {
        skillId: 'skill-powerbi',
        skillName: 'Power BI & DAX',
        domain: 'Data Analytics',
        currentLevel: 'Beginner',
        targetLevel: 'Intermediate',
        priority: 'High'
      },
      {
        skillId: 'skill-case-prep',
        skillName: 'Case Study Frameworks (Profitability & Market Entry)',
        domain: 'Consulting',
        currentLevel: 'Beginner',
        targetLevel: 'Advanced',
        priority: 'Medium'
      }
    ],
    availability: 'Weekday Evenings (7 PM - 10 PM) & Weekend Afternoons',
    rating: 4.8,
    ratingsCount: 6,
    sessionsCompleted: 6,
    isVerified: true,
    role: 'student',
    cgpa: '7.4 / 10',
    linkedinUrl: 'https://linkedin.com/in/aadhaar-verma-demo'
  },

  // 2. PRIMARY MENTOR PERSONA (DATA & ANALYTICS EXPERT)
  {
    id: 'student-rahul',
    name: 'Rahul Sharma',
    studentId: 'IMT2023PGDM118',
    email: 'rahul.sharma@imt.edu',
    avatar: 'RS',
    program: 'PGDM (Analytics)',
    specialization: 'Big Data & Business Intelligence',
    academicYear: 'Year 2 (Batch 2023–2025)',
    graduationYear: 2025,
    bio: 'Second-year student with Summer Internship PPO from Deloitte USI. Passionate about teaching SQL, Power BI DAX, and end-to-end dashboarding architecture.',
    targetDomain: 'Data Analytics',
    targetRole: 'Senior Business Analyst (Deloitte PPO Holder)',
    careerGoal: 'Joining Deloitte Strategy & Analytics as a Senior Consultant post graduation.',
    skillsToTeach: [
      {
        skillId: 'skill-sql',
        skillName: 'SQL & Database Querying',
        domain: 'Data Analytics',
        proficiency: 'Advanced',
        experienceNote: 'Led database architecture during 8-week summer internship at Deloitte. Solved 150+ LeetCode SQL problems.',
        verified: true,
        sessionsHelped: 16,
        isAvailable: true
      },
      {
        skillId: 'skill-powerbi',
        skillName: 'Power BI & DAX',
        domain: 'Data Analytics',
        proficiency: 'Advanced',
        experienceNote: 'Developed enterprise executive dashboard for regional sales tracking; Microsoft certified PL-300.',
        verified: true,
        sessionsHelped: 12,
        isAvailable: true
      },
      {
        skillId: 'skill-python-data',
        skillName: 'Python for Data Analysis',
        domain: 'Data Analytics',
        proficiency: 'Advanced',
        experienceNote: 'Built automated machine learning pipelines using Scikit-Learn and Pandas.',
        verified: true,
        sessionsHelped: 8,
        isAvailable: true
      }
    ],
    skillsToLearn: [
      {
        skillId: 'skill-genai',
        skillName: 'Generative AI & Prompt Engineering',
        domain: 'Technology',
        currentLevel: 'Intermediate',
        targetLevel: 'Expert',
        priority: 'High'
      }
    ],
    availability: 'Tuesday, Thursday, Saturday (6:30 PM - 9:30 PM)',
    rating: 4.9,
    ratingsCount: 22,
    sessionsCompleted: 24,
    isVerified: true,
    role: 'student',
    cgpa: '8.6 / 10',
    linkedinUrl: 'https://linkedin.com/in/rahul-sharma-demo'
  },

  // 3. FINANCE MENTOR PERSONA
  {
    id: 'student-priya',
    name: 'Priya Nair',
    studentId: 'IMT2023PGDMF087',
    email: 'priya.nair@imt.edu',
    avatar: 'PN',
    program: 'PGDM (Finance)',
    specialization: 'Corporate Finance & Investment Banking',
    academicYear: 'Year 2 (Batch 2023–2025)',
    graduationYear: 2025,
    bio: 'CFA Level 2 candidate & Goldman Sachs Summer Analyst. Mentored 15+ juniors in 3-statement financial modeling, DCF valuation, and M&A pitchbook design.',
    targetDomain: 'Finance',
    targetRole: 'Investment Banking Analyst (Goldman Sachs PPO)',
    careerGoal: 'Join Goldman Sachs Global Investment Research division full-time.',
    skillsToTeach: [
      {
        skillId: 'skill-fin-modeling',
        skillName: 'Financial Modeling & 3-Statement Forecast',
        domain: 'Finance',
        proficiency: 'Expert',
        experienceNote: 'Built dynamic 3-statement models for mid-cap infrastructure companies during GS internship.',
        verified: true,
        sessionsHelped: 14,
        isAvailable: true
      },
      {
        skillId: 'skill-dcf-valuation',
        skillName: 'DCF & Relative Valuation',
        domain: 'Finance',
        proficiency: 'Advanced',
        experienceNote: 'Conducted comprehensive valuation for 8 listed consumer goods entities.',
        verified: true,
        sessionsHelped: 11,
        isAvailable: true
      },
      {
        skillId: 'skill-excel-advanced',
        skillName: 'Advanced Excel & VBA Macros',
        domain: 'Finance',
        proficiency: 'Expert',
        experienceNote: 'Automated quarterly balance sheet variance calculations using VBA macros.',
        verified: true,
        sessionsHelped: 9,
        isAvailable: true
      }
    ],
    skillsToLearn: [
      {
        skillId: 'skill-python-data',
        skillName: 'Python for Data Analysis',
        domain: 'Data Analytics',
        currentLevel: 'Beginner',
        targetLevel: 'Intermediate',
        priority: 'High'
      }
    ],
    availability: 'Mondays, Wednesdays & Weekends (5 PM - 8 PM)',
    rating: 4.9,
    ratingsCount: 18,
    sessionsCompleted: 19,
    isVerified: true,
    role: 'student',
    cgpa: '8.9 / 10',
    linkedinUrl: 'https://linkedin.com/in/priya-nair-demo'
  },

  // 4. CONSULTING MENTOR PERSONA
  {
    id: 'student-rohan',
    name: 'Rohan Gupta',
    studentId: 'IMT2023PGDM015',
    email: 'rohan.gupta@imt.edu',
    avatar: 'RG',
    program: 'PGDM',
    specialization: 'Strategy & General Management',
    academicYear: 'Year 2 (Batch 2023–2025)',
    graduationYear: 2025,
    bio: 'McKinsey & Company Summer Associate with 100% case interview conversion record. Mentoring students in MECE framework thinking, market sizing, and executive slide structuring.',
    targetDomain: 'Consulting',
    targetRole: 'Management Consultant (McKinsey PPO)',
    careerGoal: 'Management Consulting & Private Equity Advisory.',
    skillsToTeach: [
      {
        skillId: 'skill-case-prep',
        skillName: 'Case Study Frameworks (Profitability & Market Entry)',
        domain: 'Consulting',
        proficiency: 'Expert',
        experienceNote: 'Cracked 8 consulting interview rounds; solved and debriefed over 90 business cases.',
        verified: true,
        sessionsHelped: 20,
        isAvailable: true
      },
      {
        skillId: 'skill-guesstimates',
        skillName: 'Guesstimates & Market Sizing',
        domain: 'Consulting',
        proficiency: 'Expert',
        experienceNote: 'Structured approach covering supply-side bottlenecks and demographic modeling.',
        verified: true,
        sessionsHelped: 17,
        isAvailable: true
      },
      {
        skillId: 'skill-deck-storylining',
        skillName: 'Executive Slide Design & Storylining',
        domain: 'Consulting',
        proficiency: 'Advanced',
        experienceNote: 'Designed board-level presentations following the Minto Pyramid Principle.',
        verified: true,
        sessionsHelped: 12,
        isAvailable: true
      }
    ],
    skillsToLearn: [
      {
        skillId: 'skill-powerbi',
        skillName: 'Power BI & DAX',
        domain: 'Data Analytics',
        currentLevel: 'Beginner',
        targetLevel: 'Intermediate',
        priority: 'Medium'
      }
    ],
    availability: 'Evenings 8 PM - 10:30 PM',
    rating: 5.0,
    ratingsCount: 26,
    sessionsCompleted: 28,
    isVerified: true,
    role: 'student',
    cgpa: '8.8 / 10',
    linkedinUrl: 'https://linkedin.com/in/rohan-gupta-demo'
  },

  // 5. PRODUCT MANAGEMENT MENTOR
  {
    id: 'student-ananya',
    name: 'Ananya Deshmukh',
    studentId: 'IMT2023PGDMM034',
    email: 'ananya.deshmukh@imt.edu',
    avatar: 'AD',
    program: 'PGDM (Marketing & Product)',
    specialization: 'Product Management & Digital Transformation',
    academicYear: 'Year 2 (Batch 2023–2025)',
    graduationYear: 2025,
    bio: 'Incoming APM at Microsoft. Top 5 finalist in National Product Teardown competitions. Specializes in PRD documentation, feature prioritization, and Figma prototypes.',
    targetDomain: 'Product Management',
    targetRole: 'Associate Product Manager (Microsoft PPO)',
    careerGoal: 'Building scalable consumer technology and AI products.',
    skillsToTeach: [
      {
        skillId: 'skill-prod-strategy',
        skillName: 'Product Strategy & Vision',
        domain: 'Product Management',
        proficiency: 'Expert',
        experienceNote: 'Authored 4 published product teardowns (Spotify, Swiggy, Notion).',
        verified: true,
        sessionsHelped: 15,
        isAvailable: true
      },
      {
        skillId: 'skill-prd-writing',
        skillName: 'PRD Writing & User Story Mapping',
        domain: 'Product Management',
        proficiency: 'Advanced',
        experienceNote: 'Structured end-to-end PRDs for Microsoft Teams developer platform during summer internship.',
        verified: true,
        sessionsHelped: 11,
        isAvailable: true
      },
      {
        skillId: 'skill-figma-wireframing',
        skillName: 'UI/UX Wireframing in Figma',
        domain: 'Product Management',
        proficiency: 'Intermediate',
        experienceNote: 'Created design systems and interactive UI wireframes for 3 campus startup apps.',
        verified: true,
        sessionsHelped: 7,
        isAvailable: true
      }
    ],
    skillsToLearn: [
      {
        skillId: 'skill-sql',
        skillName: 'SQL & Database Querying',
        domain: 'Data Analytics',
        currentLevel: 'Intermediate',
        targetLevel: 'Advanced',
        priority: 'High'
      }
    ],
    availability: 'Daily 7 PM - 9 PM',
    rating: 4.9,
    ratingsCount: 16,
    sessionsCompleted: 18,
    isVerified: true,
    role: 'student',
    cgpa: '8.5 / 10',
    linkedinUrl: 'https://linkedin.com/in/ananya-deshmukh-demo'
  },

  // 6. MARKETING & FMCG MENTOR
  {
    id: 'student-vikram',
    name: 'Vikram Malhotra',
    studentId: 'IMT2023PGDMM102',
    email: 'vikram.malhotra@imt.edu',
    avatar: 'VM',
    program: 'PGDM (Marketing)',
    specialization: 'Brand Management & FMCG',
    academicYear: 'Year 2 (Batch 2023–2025)',
    graduationYear: 2025,
    bio: 'HUL Management Trainee PPO holder. Conducted extensive rural market immersion and designed go-to-market strategies for consumer packaged goods.',
    targetDomain: 'Marketing',
    targetRole: 'Brand Manager (HUL PPO)',
    careerGoal: 'Drive brand equity and omnichannel trade marketing for national FMCG categories.',
    skillsToTeach: [
      {
        skillId: 'skill-brand-strategy',
        skillName: 'Brand Strategy & FMCG Marketing',
        domain: 'Marketing',
        proficiency: 'Expert',
        experienceNote: 'Formulated market activation strategy for Lifebuoy brand in Tier-2/3 distribution hubs.',
        verified: true,
        sessionsHelped: 12,
        isAvailable: true
      },
      {
        skillId: 'skill-digital-mktg',
        skillName: 'Performance Marketing & Digital Analytics',
        domain: 'Marketing',
        proficiency: 'Advanced',
        experienceNote: 'Managed ₹15L digital media budget with 3.8x blended ROAS for D2C brand.',
        verified: true,
        sessionsHelped: 8,
        isAvailable: true
      },
      {
        skillId: 'skill-gd-prep',
        skillName: 'Group Discussion & Extempore Mastery',
        domain: 'Interview Prep',
        proficiency: 'Expert',
        experienceNote: 'Moderated 20+ placement cell GD mock rounds with 95% shortlist conversion.',
        verified: true,
        sessionsHelped: 14,
        isAvailable: true
      }
    ],
    skillsToLearn: [
      {
        skillId: 'skill-powerbi',
        skillName: 'Power BI & DAX',
        domain: 'Data Analytics',
        currentLevel: 'Beginner',
        targetLevel: 'Intermediate',
        priority: 'Medium'
      }
    ],
    availability: 'Weekends & Friday Evenings',
    rating: 4.8,
    ratingsCount: 15,
    sessionsCompleted: 16,
    isVerified: true,
    role: 'student',
    cgpa: '8.4 / 10'
  },

  // 7. TECH & AI SPECIALIST
  {
    id: 'student-kavita',
    name: 'Kavita Iyer',
    studentId: 'IMT2024PGDM068',
    email: 'kavita.iyer@imt.edu',
    avatar: 'KI',
    program: 'PGDM (Analytics)',
    specialization: 'Artificial Intelligence & Enterprise Tech',
    academicYear: 'Year 1 (Batch 2024–2026)',
    graduationYear: 2026,
    bio: 'Ex-software engineer at Infosys. Specializing in Generative AI, Retrieval Augmented Generation (RAG), and cloud Python applications.',
    targetDomain: 'Technology',
    targetRole: 'AI & Cloud Consultant',
    careerGoal: 'Lead enterprise AI adoption strategies for multinational technology advisory firms.',
    skillsToTeach: [
      {
        skillId: 'skill-genai',
        skillName: 'Generative AI & Prompt Engineering',
        domain: 'Technology',
        proficiency: 'Expert',
        experienceNote: 'Published open-source RAG benchmark; built domain chatbots using LangChain & OpenAI API.',
        verified: true,
        sessionsHelped: 10,
        isAvailable: true
      },
      {
        skillId: 'skill-python-data',
        skillName: 'Python for Data Analysis',
        domain: 'Data Analytics',
        proficiency: 'Advanced',
        experienceNote: '4 years experience with Python scripting, FastAPI, and data wrangling.',
        verified: true,
        sessionsHelped: 9,
        isAvailable: true
      }
    ],
    skillsToLearn: [
      {
        skillId: 'skill-case-prep',
        skillName: 'Case Study Frameworks (Profitability & Market Entry)',
        domain: 'Consulting',
        currentLevel: 'Beginner',
        targetLevel: 'Advanced',
        priority: 'High'
      }
    ],
    availability: 'Daily 6 PM - 8 PM',
    rating: 4.9,
    ratingsCount: 11,
    sessionsCompleted: 12,
    isVerified: true,
    role: 'student',
    cgpa: '8.7 / 10'
  },

  // 8. INTERVIEW & RESUME SPECIALIST
  {
    id: 'student-tanvi',
    name: 'Tanvi Saxena',
    studentId: 'IMT2023PGDM145',
    email: 'tanvi.saxena@imt.edu',
    avatar: 'TS',
    program: 'PGDM (Human Resources)',
    specialization: 'Talent Acquisition & Strategic HR',
    academicYear: 'Year 2 (Batch 2023–2025)',
    graduationYear: 2025,
    bio: 'Placement Committee Student Coordinator. Reviewed 300+ MBA resumes and coached students on STAR method storytelling for behavioral interviews.',
    targetDomain: 'Interview Prep',
    targetRole: 'HR Business Partner / Talent Consultant',
    careerGoal: 'Lead campus recruitment and leadership hiring for Tier-1 consulting firms.',
    skillsToTeach: [
      {
        skillId: 'skill-resume-ats',
        skillName: 'Resume Building & ATS Optimization',
        domain: 'Interview Prep',
        proficiency: 'Expert',
        experienceNote: 'Certified resume strategist; reviewed 300+ resumes with 98% ATS pass rate.',
        verified: true,
        sessionsHelped: 30,
        isAvailable: true
      },
      {
        skillId: 'skill-star-interview',
        skillName: 'STAR Technique for Behavioral & HR Rounds',
        domain: 'Interview Prep',
        proficiency: 'Expert',
        experienceNote: 'Formulated the IMT behavioral interview question bank covering 40+ Amazon & McKinsey competencies.',
        verified: true,
        sessionsHelped: 25,
        isAvailable: true
      }
    ],
    skillsToLearn: [
      {
        skillId: 'skill-sql',
        skillName: 'SQL & Database Querying',
        domain: 'Data Analytics',
        currentLevel: 'None',
        targetLevel: 'Beginner',
        priority: 'Medium'
      }
    ],
    availability: 'Weekdays 5 PM - 7 PM & Sundays',
    rating: 5.0,
    ratingsCount: 34,
    sessionsCompleted: 35,
    isVerified: true,
    role: 'student',
    cgpa: '8.3 / 10'
  },

  // 9. SUPPLY CHAIN & OPERATIONS MENTOR
  {
    id: 'student-arjun',
    name: 'Arjun Mehta',
    studentId: 'IMT2023PGDMO055',
    email: 'arjun.mehta@imt.edu',
    avatar: 'AM',
    program: 'PGDM (Operations)',
    specialization: 'Supply Chain Analytics & Logistics',
    academicYear: 'Year 2 (Batch 2023–2025)',
    graduationYear: 2025,
    bio: 'Amazon Operations intern. Optimized last-mile delivery route scheduling using solver heuristics. Teaching inventory modeling and operations analytics.',
    targetDomain: 'Operations',
    targetRole: 'Operations Manager (Amazon PPO)',
    careerGoal: 'Fulfillment & Logistics Strategy Lead.',
    skillsToTeach: [
      {
        skillId: 'skill-supply-chain',
        skillName: 'Supply Chain Optimization & Inventory Models',
        domain: 'Operations',
        proficiency: 'Advanced',
        experienceNote: 'Engineered safety stock optimization tool for Amazon FC hub.',
        verified: true,
        sessionsHelped: 10,
        isAvailable: true
      },
      {
        skillId: 'skill-excel-advanced',
        skillName: 'Advanced Excel & VBA Macros',
        domain: 'Finance',
        proficiency: 'Advanced',
        experienceNote: 'Constructed linear programming solver models for supply routing.',
        verified: true,
        sessionsHelped: 7,
        isAvailable: true
      }
    ],
    skillsToLearn: [
      {
        skillId: 'skill-genai',
        skillName: 'Generative AI & Prompt Engineering',
        domain: 'Technology',
        currentLevel: 'Beginner',
        targetLevel: 'Intermediate',
        priority: 'High'
      }
    ],
    availability: 'Mon, Wed, Fri (7 PM - 9 PM)',
    rating: 4.7,
    ratingsCount: 9,
    sessionsCompleted: 10,
    isVerified: true,
    role: 'student',
    cgpa: '8.1 / 10'
  },

  // 10. SNEHA KULKARNI - MARKETING & DIGITAL GROWTH
  {
    id: 'student-sneha',
    name: 'Sneha Kulkarni',
    studentId: 'IMT2023PGDMM072',
    email: 'sneha.kulkarni@imt.edu',
    avatar: 'SK',
    program: 'PGDM (Marketing)',
    specialization: 'Brand & Digital Analytics',
    academicYear: 'Year 2 (Batch 2023–2025)',
    graduationYear: 2025,
    bio: 'Ex-Ogilvy digital strategist, incoming Brand Associate at ITC. Mentored 12 peers on customer lifetime value and brand storytelling decks.',
    targetDomain: 'Marketing',
    targetRole: 'Brand Associate (ITC PPO)',
    careerGoal: 'Consumer marketing leadership.',
    skillsToTeach: [
      {
        skillId: 'skill-digital-mktg',
        skillName: 'Performance Marketing & Digital Analytics',
        domain: 'Marketing',
        proficiency: 'Expert',
        experienceNote: 'Handled multi-platform ad spend analytics and retention cohort analysis.',
        verified: true,
        sessionsHelped: 12,
        isAvailable: true
      },
      {
        skillId: 'skill-brand-strategy',
        skillName: 'Brand Strategy & FMCG Marketing',
        domain: 'Marketing',
        proficiency: 'Advanced',
        experienceNote: 'Created consumer journey blueprints for OTC healthcare brand.',
        verified: true,
        sessionsHelped: 9,
        isAvailable: true
      }
    ],
    skillsToLearn: [
      {
        skillId: 'skill-sql',
        skillName: 'SQL & Database Querying',
        domain: 'Data Analytics',
        currentLevel: 'Beginner',
        targetLevel: 'Intermediate',
        priority: 'High'
      }
    ],
    availability: 'Tue & Thu 6 PM - 8 PM',
    rating: 4.9,
    ratingsCount: 14,
    sessionsCompleted: 15,
    isVerified: true,
    role: 'student',
    cgpa: '8.5 / 10'
  },

  // 11. ADITYA SINGHANIA - EQUITY RESEARCH & VALUATION
  {
    id: 'student-aditya',
    name: 'Aditya Singhania',
    studentId: 'IMT2023PGDMF019',
    email: 'aditya.singhania@imt.edu',
    avatar: 'AS',
    program: 'PGDM (Finance)',
    specialization: 'Capital Markets & Valuation',
    academicYear: 'Year 2 (Batch 2023–2025)',
    graduationYear: 2025,
    bio: 'CFA Level 2 passed, Summer Intern at Morgan Stanley. Deep expertise in DCF valuation models, cost of capital calculation, and Bloomberg data analysis.',
    targetDomain: 'Finance',
    targetRole: 'Equity Research Analyst',
    careerGoal: 'Sell-side equity research in technology and consumer sectors.',
    skillsToTeach: [
      {
        skillId: 'skill-equity-research',
        skillName: 'Equity Research & Sector Analysis',
        domain: 'Finance',
        proficiency: 'Expert',
        experienceNote: 'Published 4 equity initiation notes on Indian IT midcaps.',
        verified: true,
        sessionsHelped: 11,
        isAvailable: true
      },
      {
        skillId: 'skill-dcf-valuation',
        skillName: 'DCF & Relative Valuation',
        domain: 'Finance',
        proficiency: 'Expert',
        experienceNote: 'Built 10-year forecasts and sensitivity matrices for public REITs.',
        verified: true,
        sessionsHelped: 13,
        isAvailable: true
      }
    ],
    skillsToLearn: [
      {
        skillId: 'skill-python-data',
        skillName: 'Python for Data Analysis',
        domain: 'Data Analytics',
        currentLevel: 'Beginner',
        targetLevel: 'Intermediate',
        priority: 'High'
      }
    ],
    availability: 'Sat & Sun 10 AM - 1 PM',
    rating: 5.0,
    ratingsCount: 17,
    sessionsCompleted: 18,
    isVerified: true,
    role: 'student',
    cgpa: '9.1 / 10'
  },

  // 12. SIDDHARTH ROY - CONSULTING CASE CRACKING
  {
    id: 'student-siddharth',
    name: 'Siddharth Roy',
    studentId: 'IMT2023PGDM167',
    email: 'siddharth.roy@imt.edu',
    avatar: 'SR',
    program: 'PGDM',
    specialization: 'Strategy Consulting',
    academicYear: 'Year 2 (Batch 2023–2025)',
    graduationYear: 2025,
    bio: 'BCG Summer Associate PPO holder. Conducted 40+ mock case interviews for IMT students with special focus on market entry and cost reduction.',
    targetDomain: 'Consulting',
    targetRole: 'Associate Consultant (BCG PPO)',
    careerGoal: 'Strategy consulting across Southeast Asia & Middle East.',
    skillsToTeach: [
      {
        skillId: 'skill-case-prep',
        skillName: 'Case Study Frameworks (Profitability & Market Entry)',
        domain: 'Consulting',
        proficiency: 'Expert',
        experienceNote: 'Cracked 5 tier-1 strategy firm interview loops.',
        verified: true,
        sessionsHelped: 22,
        isAvailable: true
      },
      {
        skillId: 'skill-guesstimates',
        skillName: 'Guesstimates & Market Sizing',
        domain: 'Consulting',
        proficiency: 'Expert',
        experienceNote: 'Trained 35 juniors on structured guesstimates.',
        verified: true,
        sessionsHelped: 19,
        isAvailable: true
      }
    ],
    skillsToLearn: [
      {
        skillId: 'skill-genai',
        skillName: 'Generative AI & Prompt Engineering',
        domain: 'Technology',
        currentLevel: 'None',
        targetLevel: 'Intermediate',
        priority: 'Medium'
      }
    ],
    availability: 'Daily 8 PM - 10 PM',
    rating: 5.0,
    ratingsCount: 28,
    sessionsCompleted: 30,
    isVerified: true,
    role: 'student',
    cgpa: '8.9 / 10'
  },

  // 13. POOJA HEGDE - PRODUCT DESIGN & WIREFRAMES
  {
    id: 'student-pooja',
    name: 'Pooja Hegde',
    studentId: 'IMT2023PGDMM048',
    email: 'pooja.hegde@imt.edu',
    avatar: 'PH',
    program: 'PGDM (Marketing & Product)',
    specialization: 'Product & UX Strategy',
    academicYear: 'Year 2 (Batch 2023–2025)',
    graduationYear: 2025,
    bio: 'Flipkart APM Intern. Mentoring students on Figma interactive prototyping, UX heuristic reviews, and PRD writing.',
    targetDomain: 'Product Management',
    targetRole: 'Associate Product Manager (Flipkart PPO)',
    careerGoal: 'Leading digital marketplace and fintech product teams.',
    skillsToTeach: [
      {
        skillId: 'skill-figma-wireframing',
        skillName: 'UI/UX Wireframing in Figma',
        domain: 'Product Management',
        proficiency: 'Expert',
        experienceNote: 'Designed 6 full app wireframe prototypes and user usability testing sessions.',
        verified: true,
        sessionsHelped: 14,
        isAvailable: true
      },
      {
        skillId: 'skill-prd-writing',
        skillName: 'PRD Writing & User Story Mapping',
        domain: 'Product Management',
        proficiency: 'Advanced',
        experienceNote: 'Wrote PRDs for Flipkart checkout conversion improvements.',
        verified: true,
        sessionsHelped: 10,
        isAvailable: true
      }
    ],
    skillsToLearn: [
      {
        skillId: 'skill-sql',
        skillName: 'SQL & Database Querying',
        domain: 'Data Analytics',
        currentLevel: 'Beginner',
        targetLevel: 'Advanced',
        priority: 'High'
      }
    ],
    availability: 'Mon & Wed 7 PM - 9 PM',
    rating: 4.9,
    ratingsCount: 16,
    sessionsCompleted: 17,
    isVerified: true,
    role: 'student',
    cgpa: '8.6 / 10'
  },

  // 14. ADMIN PERSONA
  {
    id: 'admin-arvind',
    name: 'Dr. Arvind Swaminathan',
    studentId: 'IMT-FAC-PL01',
    email: 'placement.cell@imt.edu',
    avatar: 'AS',
    program: 'Faculty / Placement Cell Head',
    specialization: 'Corporate Relations & Skill Development',
    academicYear: 'Faculty Admin',
    graduationYear: 2026,
    bio: 'Head of Corporate Relations & Placement Cell, IMT Ghaziabad. Overseeing peer skill verification, campus readiness, and recruiter engagements.',
    targetDomain: 'Consulting',
    targetRole: 'Placement Cell Director',
    careerGoal: 'Empowering 720+ IMT students with industry-aligned capabilities.',
    skillsToTeach: [],
    skillsToLearn: [],
    availability: 'Office Hours (9 AM - 5 PM)',
    rating: 5.0,
    ratingsCount: 40,
    sessionsCompleted: 100,
    isVerified: true,
    role: 'admin',
    cgpa: 'Faculty'
  }
];

export const INITIAL_REQUESTS: MentoringRequest[] = [
  {
    id: 'req-001',
    requesterId: 'student-aadhaar',
    requesterName: 'Aadhaar Verma',
    requesterEmail: 'aadhaar.verma@imt.edu',
    requesterProgram: 'PGDM (Analytics)',
    requesterAvatar: 'AV',
    mentorId: 'student-rahul',
    mentorName: 'Rahul Sharma',
    mentorEmail: 'rahul.sharma@imt.edu',
    mentorAvatar: 'RS',
    skillId: 'skill-sql',
    skillName: 'SQL & Database Querying',
    skillDomain: 'Data Analytics',
    reason: 'Preparing for Deloitte USI Business Analyst technical round. Need hands-on coaching on window functions (ROW_NUMBER, RANK, DENSE_RANK) and complex JOIN queries.',
    preferredDate: '2026-08-28',
    preferredTime: '7:30 PM - 9:00 PM',
    message: 'Hi Rahul, I noticed you secured a PPO with Deloitte USI. I have basic SQL knowledge but struggle with multi-table window functions and CTE optimization. Would appreciate a 60-minute mock query session!',
    meetingLink: 'https://meet.google.com/imt-sql-prep',
    status: 'Accepted',
    createdAt: '2026-08-25T14:20:00Z',
    acceptedAt: '2026-08-25T16:45:00Z',
    mentorResponseNote: 'Looking forward to it! Have your SQL query editor ready with the sample e-commerce dataset.',
    sessionNotes: '-- Topic: Deloitte USI Business Analyst Mock Query Prep\n-- Problem 1: Find 2nd highest salary per department without subqueries\nSELECT emp_id, dept_id, salary, DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) as rnk FROM employees WHERE rnk = 2;\n\n-- Problem 2: Month-over-month revenue growth using LAG()\nSELECT month, revenue, LAG(revenue, 1) OVER (ORDER BY month) as prev_rev, ROUND((revenue - LAG(revenue, 1) OVER (ORDER BY month)) * 100.0 / LAG(revenue, 1) OVER (ORDER BY month), 2) as growth_pct FROM monthly_sales;'
  },
  {
    id: 'req-002',
    requesterId: 'student-aadhaar',
    requesterName: 'Aadhaar Verma',
    requesterEmail: 'aadhaar.verma@imt.edu',
    requesterProgram: 'PGDM (Analytics)',
    requesterAvatar: 'AV',
    mentorId: 'student-rohan',
    mentorName: 'Rohan Gupta',
    mentorEmail: 'rohan.gupta@imt.edu',
    mentorAvatar: 'RG',
    skillId: 'skill-case-prep',
    skillName: 'Case Study Frameworks (Profitability & Market Entry)',
    skillDomain: 'Consulting',
    reason: 'First-round consulting interview preparation. Need structured feedback on breaking down declining airline profitability cases.',
    preferredDate: '2026-08-29',
    preferredTime: '8:00 PM - 9:00 PM',
    message: 'Hey Rohan, would love to do a 45-minute live case crack on Profitability decomposition. I have read Case in Point but want real-time pacing practice.',
    status: 'Pending',
    createdAt: '2026-08-26T10:15:00Z'
  },
  {
    id: 'req-003',
    requesterId: 'student-kavita',
    requesterName: 'Kavita Iyer',
    requesterEmail: 'kavita.iyer@imt.edu',
    requesterProgram: 'PGDM (Analytics)',
    requesterAvatar: 'KI',
    mentorId: 'student-priya',
    mentorName: 'Priya Nair',
    mentorEmail: 'priya.nair@imt.edu',
    mentorAvatar: 'PN',
    skillId: 'skill-fin-modeling',
    skillName: 'Financial Modeling & 3-Statement Forecast',
    skillDomain: 'Finance',
    reason: 'Need understanding of how Working Capital cycles tie into Free Cash Flow forecasting for tech consulting valuations.',
    preferredDate: '2026-08-24',
    preferredTime: '6:00 PM - 7:30 PM',
    message: 'Hi Priya! Could you help me connect cash flow statements with balance sheet working capital schedules in Excel?',
    meetingLink: 'https://meet.google.com/fin-model-review',
    status: 'Completed',
    createdAt: '2026-08-22T11:00:00Z',
    acceptedAt: '2026-08-22T13:00:00Z',
    completedAt: '2026-08-24T19:30:00Z',
    mentorResponseNote: 'Great session Kavita, you picked up the circular debt schedule logic very quickly!'
  }
];

export const INITIAL_RATINGS: RatingReview[] = [
  {
    id: 'rat-001',
    requestId: 'req-003',
    reviewerId: 'student-kavita',
    reviewerName: 'Kavita Iyer',
    reviewerProgram: 'PGDM (Analytics)',
    reviewerAvatar: 'KI',
    mentorId: 'student-priya',
    mentorName: 'Priya Nair',
    skillName: 'Financial Modeling & 3-Statement Forecast',
    rating: 5,
    tags: ['Clear Explanations', 'Real-world Examples', 'Patient & Supportive', 'Excel Best Practices'],
    review: 'Priya is an incredible mentor! She simplified 3-statement financial linkages using a live retail company case study. Her tips on avoiding circular references in debt schedules were gold.',
    createdAt: '2026-08-24T20:10:00Z'
  },
  {
    id: 'rat-002',
    requestId: 'req-past-01',
    reviewerId: 'student-rahul',
    reviewerName: 'Rahul Sharma',
    reviewerProgram: 'PGDM (Analytics)',
    reviewerAvatar: 'RS',
    mentorId: 'student-tanvi',
    mentorName: 'Tanvi Saxena',
    skillName: 'Resume Building & ATS Optimization',
    rating: 5,
    tags: ['Actionable Feedback', 'Punctual & Dedicated', 'ATS Tailoring'],
    review: 'Tanvi transformed my resume bullets using the Google XYZ formula. Within 2 weeks of applying the revisions, my resume got shortlisted by Deloitte and PwC!',
    createdAt: '2026-08-20T18:30:00Z'
  },
  {
    id: 'rat-003',
    requestId: 'req-past-02',
    reviewerId: 'student-ananya',
    reviewerName: 'Ananya Deshmukh',
    reviewerProgram: 'PGDM (Marketing & Product)',
    reviewerAvatar: 'AD',
    mentorId: 'student-rohan',
    mentorName: 'Rohan Gupta',
    skillName: 'Guesstimates & Market Sizing',
    rating: 5,
    tags: ['Structured Thinking', 'Mental Math Shortcuts', 'Consulting Insight'],
    review: 'Rohan helped me structure market sizing questions from both supply and demand sides. His feedback during the live simulation gave me immense confidence.',
    createdAt: '2026-08-18T16:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-001',
    userId: 'student-aadhaar',
    type: 'request_accepted',
    title: 'Mentoring Request Accepted!',
    message: 'Rahul Sharma accepted your request for SQL & Database Querying. Session scheduled for Aug 28 at 7:30 PM.',
    targetTab: 'my_requests',
    targetId: 'req-001',
    isRead: false,
    createdAt: '2026-08-25T16:45:00Z'
  },
  {
    id: 'notif-002',
    userId: 'student-aadhaar',
    type: 'placement_alert',
    title: 'New Placement Drive: Deloitte USI',
    message: 'Deloitte USI opened applications for Business Analyst (Strategy & Analytics). Deadline: Sep 15, 2026.',
    targetTab: 'placements',
    targetId: 'comp-deloitte',
    isRead: false,
    createdAt: '2026-08-25T09:00:00Z'
  },
  {
    id: 'notif-003',
    userId: 'student-rahul',
    type: 'request_received',
    title: 'New Mentoring Request',
    message: 'Aadhaar Verma sent a mentoring request for SQL & Database Querying.',
    targetTab: 'my_requests',
    targetId: 'req-001',
    isRead: true,
    createdAt: '2026-08-25T14:20:00Z'
  },
  {
    id: 'notif-004',
    userId: 'student-aadhaar',
    type: 'skill_verified',
    title: 'Skill Verified: Advanced Excel & VBA',
    message: 'Placement Cell verified your competency badge in Advanced Excel & VBA Macros.',
    targetTab: 'my_skills',
    targetId: 'skill-excel-advanced',
    isRead: true,
    createdAt: '2026-08-24T12:00:00Z'
  }
];

export const INITIAL_VERIFICATIONS: SkillVerificationRequest[] = [
  {
    id: 'verif-001',
    studentId: 'student-aadhaar',
    studentName: 'Aadhaar Verma',
    studentProgram: 'PGDM (Analytics)',
    studentAvatar: 'AV',
    skillId: 'skill-python-data',
    skillName: 'Python for Data Analysis',
    domain: 'Data Analytics',
    claimedProficiency: 'Intermediate',
    evidenceNote: 'Completed 60-hour Python for Data Science certification on Coursera; built portfolio EDA notebook analyzing 50k housing records on GitHub.',
    submittedAt: '2026-08-24T15:30:00Z',
    status: 'Pending'
  },
  {
    id: 'verif-002',
    studentId: 'student-vikram',
    studentName: 'Vikram Malhotra',
    studentProgram: 'PGDM (Marketing)',
    studentAvatar: 'VM',
    skillId: 'skill-digital-mktg',
    skillName: 'Performance Marketing & Digital Analytics',
    domain: 'Marketing',
    claimedProficiency: 'Advanced',
    evidenceNote: 'Managed live Google Ads and Meta Ads campaigns for D2C skincare startup; certified in GA4 and Meta Certified Digital Marketing Associate.',
    submittedAt: '2026-08-25T11:20:00Z',
    status: 'Pending'
  },
  {
    id: 'verif-003',
    studentId: 'student-rahul',
    studentName: 'Rahul Sharma',
    studentProgram: 'PGDM (Analytics)',
    studentAvatar: 'RS',
    skillId: 'skill-powerbi',
    skillName: 'Power BI & DAX',
    domain: 'Data Analytics',
    claimedProficiency: 'Advanced',
    evidenceNote: 'Deloitte USI Summer Internship project involved building executive DAX models for 12,000 retail SKUs. Certified Microsoft Power BI Data Analyst (PL-300).',
    submittedAt: '2026-08-20T10:00:00Z',
    status: 'Approved',
    adminRemarks: 'Verified against Deloitte internship project evaluation sheet and Microsoft PL-300 credential.'
  }
];
