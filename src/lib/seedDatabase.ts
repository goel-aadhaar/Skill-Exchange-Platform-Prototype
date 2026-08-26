import { query } from './db';
import { parsePlacementJobs } from '../data/importedJdData';
import { parseInternshipOpportunities } from '../data/importedSipData';

export async function initializeDatabase() {
  console.log('[Neon PostgreSQL] Initializing database tables...');

  // 1. Users Table
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      student_id VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      avatar VARCHAR(10),
      program VARCHAR(100),
      specialization VARCHAR(100),
      academic_year VARCHAR(100),
      graduation_year INT,
      bio TEXT,
      target_domain VARCHAR(100),
      target_role VARCHAR(100),
      career_goal TEXT,
      availability VARCHAR(255),
      rating NUMERIC(3,2) DEFAULT 5.0,
      ratings_count INT DEFAULT 0,
      sessions_completed INT DEFAULT 0,
      is_verified BOOLEAN DEFAULT TRUE,
      role VARCHAR(20) DEFAULT 'student',
      cgpa VARCHAR(20),
      linkedin_url VARCHAR(255),
      github_url VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  // 2. Skills Table
  await query(`
    CREATE TABLE IF NOT EXISTS skills (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      domain VARCHAR(100) NOT NULL,
      category VARCHAR(100) NOT NULL,
      description TEXT,
      demand_level VARCHAR(50),
      associated_roles TEXT[],
      associated_companies TEXT[],
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  // 3. Student Skills (Many-to-Many with TEACH / LEARN types)
  await query(`
    CREATE TABLE IF NOT EXISTS student_skills (
      id VARCHAR(100) PRIMARY KEY,
      student_id VARCHAR(100) REFERENCES users(id) ON DELETE CASCADE,
      skill_id VARCHAR(100) REFERENCES skills(id) ON DELETE CASCADE,
      skill_type VARCHAR(20) NOT NULL, -- 'TEACH' or 'LEARN'
      proficiency VARCHAR(50),
      experience_note TEXT,
      is_verified BOOLEAN DEFAULT FALSE,
      sessions_helped INT DEFAULT 0,
      is_available BOOLEAN DEFAULT TRUE,
      current_level VARCHAR(50),
      target_level VARCHAR(50),
      priority VARCHAR(20),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(student_id, skill_id, skill_type)
    );
  `);

  // 4. Domains Table
  await query(`
    CREATE TABLE IF NOT EXISTS domains (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL,
      icon_name VARCHAR(50),
      description TEXT,
      popular_roles TEXT[],
      key_skills TEXT[],
      top_recruiters TEXT[],
      avg_package VARCHAR(100),
      market_insight TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  // 5. Placement Jobs Table (226 records from JD_Repository)
  await query(`
    CREATE TABLE IF NOT EXISTS placement_jobs (
      id SERIAL PRIMARY KEY,
      sr_no INT,
      company_name VARCHAR(255) NOT NULL,
      sector VARCHAR(255),
      role VARCHAR(255) NOT NULL,
      domain VARCHAR(100),
      ctc_offered VARCHAR(255),
      fixed_pay VARCHAR(255),
      variable_pay VARCHAR(255),
      location VARCHAR(255),
      experience_requirements TEXT,
      cgpa_criteria VARCHAR(255),
      undergraduate_preferred_degree VARCHAR(255),
      major_minor_required VARCHAR(255),
      skills_required TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  // 6. Internship Opportunities Table (75 records from SIP_Companies)
  await query(`
    CREATE TABLE IF NOT EXISTS internship_opportunities (
      id SERIAL PRIMARY KEY,
      company_name VARCHAR(255) NOT NULL,
      notice_date VARCHAR(100),
      role VARCHAR(255) NOT NULL,
      stipend VARCHAR(255),
      locations VARCHAR(255),
      skills_required TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  // 7. Mentoring Requests Table
  await query(`
    CREATE TABLE IF NOT EXISTS mentoring_requests (
      id VARCHAR(100) PRIMARY KEY,
      requester_id VARCHAR(100) REFERENCES users(id) ON DELETE CASCADE,
      mentor_id VARCHAR(100) REFERENCES users(id) ON DELETE CASCADE,
      skill_id VARCHAR(100) REFERENCES skills(id) ON DELETE CASCADE,
      reason TEXT,
      preferred_date VARCHAR(50),
      preferred_time VARCHAR(50),
      message TEXT,
      meeting_link VARCHAR(255),
      status VARCHAR(50) DEFAULT 'PENDING',
      mentor_response_note TEXT,
      session_notes TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      accepted_at TIMESTAMP WITH TIME ZONE,
      completed_at TIMESTAMP WITH TIME ZONE
    );
  `);

  // 8. Ratings & Reviews Table
  await query(`
    CREATE TABLE IF NOT EXISTS ratings_reviews (
      id VARCHAR(100) PRIMARY KEY,
      request_id VARCHAR(100) REFERENCES mentoring_requests(id) ON DELETE CASCADE,
      reviewer_id VARCHAR(100) REFERENCES users(id) ON DELETE CASCADE,
      mentor_id VARCHAR(100) REFERENCES users(id) ON DELETE CASCADE,
      skill_name VARCHAR(255),
      rating INT NOT NULL,
      tags TEXT[],
      review TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  // 9. Notifications Table
  await query(`
    CREATE TABLE IF NOT EXISTS notifications (
      id VARCHAR(100) PRIMARY KEY,
      user_id VARCHAR(100) REFERENCES users(id) ON DELETE CASCADE,
      type VARCHAR(50) NOT NULL,
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      related_entity_id VARCHAR(100),
      target_tab VARCHAR(50),
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  // 10. Skill Verifications Table
  await query(`
    CREATE TABLE IF NOT EXISTS skill_verifications (
      id VARCHAR(100) PRIMARY KEY,
      student_id VARCHAR(100) REFERENCES users(id) ON DELETE CASCADE,
      skill_id VARCHAR(100) REFERENCES skills(id) ON DELETE CASCADE,
      claimed_proficiency VARCHAR(50),
      evidence_note TEXT,
      status VARCHAR(50) DEFAULT 'Pending',
      admin_remarks TEXT,
      submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      reviewed_at TIMESTAMP WITH TIME ZONE
    );
  `);

  // Create Indexes
  await query(`CREATE INDEX IF NOT EXISTS idx_users_student_id ON users(student_id);`);
  await query(`CREATE INDEX IF NOT EXISTS idx_student_skills_student_id ON student_skills(student_id);`);
  await query(`CREATE INDEX IF NOT EXISTS idx_student_skills_skill_id ON student_skills(skill_id);`);
  await query(`CREATE INDEX IF NOT EXISTS idx_requests_requester ON mentoring_requests(requester_id);`);
  await query(`CREATE INDEX IF NOT EXISTS idx_requests_mentor ON mentoring_requests(mentor_id);`);
  await query(`CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);`);
  await query(`CREATE INDEX IF NOT EXISTS idx_placement_jobs_company ON placement_jobs(company_name);`);
  await query(`CREATE INDEX IF NOT EXISTS idx_internships_company ON internship_opportunities(company_name);`);

  console.log('[Neon PostgreSQL] Schema verified successfully.');
}

export async function seedInitialData() {
  console.log('[Neon PostgreSQL] Seeding initial data...');

  // 1. Seed Skills
  const initialSkills = [
    {
      id: 'skill-python-data',
      name: 'Python for Data Analysis',
      domain: 'Data Analytics',
      category: 'Technical',
      description: 'Pandas, NumPy, Matplotlib/Seaborn, exploratory data analysis, and predictive modeling in Python.',
      demandLevel: 'Very High',
      associatedRoles: ['Data Scientist', 'Data Analyst', 'BI Specialist'],
      associatedCompanies: ['Deloitte', 'Amazon', 'Microsoft', 'Flipkart']
    },
    {
      id: 'skill-sql',
      name: 'SQL & Database Querying',
      domain: 'Data Analytics',
      category: 'Business & Analytics',
      description: 'Advanced SQL queries, window functions (ROW_NUMBER, DENSE_RANK), CTEs, joins, query optimization, and relational data modeling.',
      demandLevel: 'Very High',
      associatedRoles: ['Data Analyst', 'Business Analyst', 'BI Consultant'],
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
      id: 'skill-excel-advanced',
      name: 'Advanced Excel & VBA Macros',
      domain: 'Finance',
      category: 'Business & Analytics',
      description: 'Index-Match, XLOOKUP, Nested IFs, Pivot tables, Scenario Manager, Solver, dynamic charting, and automated VBA macros.',
      demandLevel: 'Very High',
      associatedRoles: ['Financial Analyst', 'Consulting Intern', 'Supply Chain Analyst'],
      associatedCompanies: ['Deloitte', 'Goldman Sachs', 'McKinsey & Company', 'HDFC Bank', 'HUL']
    },
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
    {
      id: 'skill-resume-ats',
      name: 'Resume Building & ATS Optimization',
      domain: 'Interview Prep',
      category: 'Soft Skills & Interview',
      description: 'Action-verb bullet point structuring (XYZ formula), formatting, and ATS tailoring for MBA placements.',
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
    }
  ];

  for (const s of initialSkills) {
    await query(
      `
      INSERT INTO skills (id, name, domain, category, description, demand_level, associated_roles, associated_companies)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        domain = EXCLUDED.domain,
        category = EXCLUDED.category,
        description = EXCLUDED.description,
        demand_level = EXCLUDED.demand_level;
    `,
      [s.id, s.name, s.domain, s.category, s.description, s.demandLevel, s.associatedRoles, s.associatedCompanies]
    );
  }

  // 2. Seed Domains
  const initialDomains = [
    {
      id: 'domain-analytics',
      name: 'Data Analytics',
      iconName: 'BarChart3',
      description: 'Translating complex datasets into actionable business intelligence, predictive dashboards, and strategic growth drivers.',
      popularRoles: ['Data Analyst', 'Business Analyst', 'BI Consultant', 'Data Scientist'],
      keySkills: ['SQL & Database Querying', 'Power BI & DAX', 'Python for Data Analysis', 'Tableau Visual Analytics'],
      topRecruiters: ['Deloitte', 'Amazon', 'PwC', 'EY', 'Flipkart'],
      avgPackage: '₹14.8 - ₹22.5 LPA',
      marketInsight: 'Over 65% of top campus recruiters at IMT Hyderabad have made SQL and BI tools mandatory in their initial technical rounds.'
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
      keySkills: ['Financial Modeling & 3-Statement Forecast', 'DCF & Relative Valuation', 'Advanced Excel & VBA Macros'],
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
      keySkills: ['Product Strategy & Vision', 'PRD Writing & User Story Mapping', 'UI/UX Wireframing in Figma'],
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
      keySkills: ['Performance Marketing & Digital Analytics', 'Brand Strategy & FMCG Marketing', 'Advanced Excel'],
      topRecruiters: ['Hindustan Unilever Limited (HUL)', 'Flipkart', 'Amazon'],
      avgPackage: '₹14.0 - ₹22.0 LPA',
      marketInsight: 'FMCG and E-commerce giants emphasize practical trade marketing logic and data-backed digital campaign analysis.'
    },
    {
      id: 'domain-technology',
      name: 'Technology',
      iconName: 'Cpu',
      description: 'Enterprise cloud architectures, modern software solutions, AI/ML integration, and digital transformation.',
      popularRoles: ['Tech Consultant', 'Cloud Solution Architect', 'AI Solutions Engineer'],
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
      keySkills: ['Resume Building & ATS Optimization', 'STAR Technique for Behavioral & HR Rounds'],
      topRecruiters: ['All 120+ On-Campus Recruiters'],
      avgPackage: 'Campus-wide Success',
      marketInsight: 'Over 40% of candidate rejections in final rounds are attributed to unstructured answers in HR & behavioral interviews.'
    }
  ];

  for (const d of initialDomains) {
    await query(
      `
      INSERT INTO domains (id, name, icon_name, description, popular_roles, key_skills, top_recruiters, avg_package, market_insight)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        avg_package = EXCLUDED.avg_package;
    `,
      [d.id, d.name, d.iconName, d.description, d.popularRoles, d.keySkills, d.topRecruiters, d.avgPackage, d.marketInsight]
    );
  }

  // 3. Seed 5 Real Personas + Admin
  const personas = [
    {
      id: 'user-tushar',
      name: 'Tushar Goel',
      student_id: '25A3HP658',
      email: 'tushar.goel@imthyderabad.edu.in',
      avatar: 'TG',
      program: 'PGDM (Analytics)',
      specialization: 'Data Analytics & IT',
      academic_year: 'Year 1 (Batch 2024–2026)',
      graduation_year: 2026,
      bio: 'First-year PGDM student at IMT Hyderabad targeting Business Analyst and Consulting roles. Eager to master Python for Data Science, SQL, and Power BI through peer mentoring.',
      target_domain: 'Data Analytics',
      target_role: 'Business Analyst / Analytics Consultant',
      career_goal: 'Secure a Summer Internship at a premier analytics firm like Deloitte USI or Amazon.',
      availability: 'Weekday Evenings (7 PM - 10 PM) & Weekends',
      rating: 4.8,
      ratings_count: 5,
      sessions_completed: 5,
      is_verified: true,
      role: 'student',
      cgpa: '7.8 / 10',
      teachSkills: [
        {
          skillId: 'skill-excel-advanced',
          proficiency: 'Intermediate',
          experienceNote: 'Solid command over Pivot tables, Index-Match, and sensitivity formulas.',
          isVerified: true,
          sessionsHelped: 3
        }
      ],
      learnSkills: [
        { skillId: 'skill-python-data', currentLevel: 'Beginner', targetLevel: 'Advanced', priority: 'High' },
        { skillId: 'skill-sql', currentLevel: 'Beginner', targetLevel: 'Advanced', priority: 'High' },
        { skillId: 'skill-powerbi', currentLevel: 'Beginner', targetLevel: 'Intermediate', priority: 'Medium' }
      ]
    },
    {
      id: 'user-oshi',
      name: 'Oshi Shrivastava',
      student_id: '25A3HP651',
      email: 'oshi.shrivastava@imthyderabad.edu.in',
      avatar: 'OS',
      program: 'PGDM (Analytics)',
      specialization: 'Big Data & Business Analytics',
      academic_year: 'Year 2 (Batch 2023–2025)',
      graduation_year: 2025,
      bio: 'Second-year senior at IMT Hyderabad with Summer Internship PPO from Deloitte USI. Passionate about mentoring peers in Python for Data Science, SQL queries, and Power BI dashboards.',
      target_domain: 'Data Analytics',
      target_role: 'Senior Analytics Consultant (Deloitte PPO)',
      career_goal: 'Leading enterprise data architecture and BI strategy post graduation.',
      availability: 'Mon, Wed, Fri (6:30 PM - 9:30 PM)',
      rating: 4.95,
      ratings_count: 24,
      sessions_completed: 26,
      is_verified: true,
      role: 'student',
      cgpa: '8.7 / 10',
      teachSkills: [
        {
          skillId: 'skill-python-data',
          proficiency: 'Expert',
          experienceNote: 'Deloitte USI Summer Intern. Built automated machine learning pipelines with Pandas and Scikit-Learn.',
          isVerified: true,
          sessionsHelped: 16
        },
        {
          skillId: 'skill-sql',
          proficiency: 'Advanced',
          experienceNote: 'Extensive experience in relational schema design and complex window functions.',
          isVerified: true,
          sessionsHelped: 12
        },
        {
          skillId: 'skill-powerbi',
          proficiency: 'Advanced',
          experienceNote: 'Developed enterprise executive dashboard; Microsoft certified PL-300.',
          isVerified: true,
          sessionsHelped: 10
        }
      ],
      learnSkills: [
        { skillId: 'skill-case-prep', currentLevel: 'Intermediate', targetLevel: 'Expert', priority: 'High' }
      ]
    },
    {
      id: 'user-naman',
      name: 'Naman Aggarwal',
      student_id: '25A3HP613',
      email: 'naman.aggarwal@imthyderabad.edu.in',
      avatar: 'NA',
      program: 'PGDM (Finance)',
      specialization: 'Corporate Finance & Valuation',
      academic_year: 'Year 2 (Batch 2023–2025)',
      graduation_year: 2025,
      bio: 'CFA Level 2 candidate & Goldman Sachs Summer Analyst at IMT Hyderabad. Mentored 15+ juniors in 3-statement financial modeling, DCF valuation, and M&A pitchbook design.',
      target_domain: 'Finance',
      target_role: 'Investment Banking Analyst (Goldman Sachs PPO)',
      career_goal: 'Global Investment Research & Equity Valuation.',
      availability: 'Tue, Thu, Sat (5 PM - 8 PM)',
      rating: 4.9,
      ratings_count: 19,
      sessions_completed: 20,
      is_verified: true,
      role: 'student',
      cgpa: '8.9 / 10',
      teachSkills: [
        {
          skillId: 'skill-fin-modeling',
          proficiency: 'Expert',
          experienceNote: 'Built dynamic 3-statement forecast models for tech companies during Goldman Sachs internship.',
          isVerified: true,
          sessionsHelped: 15
        },
        {
          skillId: 'skill-dcf-valuation',
          proficiency: 'Advanced',
          experienceNote: 'Valued 10+ public equities with WACC and sensitivity matrices.',
          isVerified: true,
          sessionsHelped: 11
        }
      ],
      learnSkills: [
        { skillId: 'skill-python-data', currentLevel: 'Beginner', targetLevel: 'Intermediate', priority: 'High' }
      ]
    },
    {
      id: 'user-lavisha',
      name: 'Lavisha Khandelwal',
      student_id: '25A3HP082',
      email: 'lavisha.khandelwal@imthyderabad.edu.in',
      avatar: 'LK',
      program: 'PGDM (Consulting & Strategy)',
      specialization: 'Management Consulting & Strategy',
      academic_year: 'Year 2 (Batch 2023–2025)',
      graduation_year: 2025,
      bio: 'McKinsey & Company Summer Associate with 100% case interview conversion record. Mentoring IMT Hyderabad peers in MECE framework thinking, market sizing, and executive slide structuring.',
      target_domain: 'Consulting',
      target_role: 'Management Consultant (McKinsey PPO)',
      career_goal: 'Management Consulting & Growth Advisory.',
      availability: 'Weekdays (8 PM - 10:30 PM)',
      rating: 5.0,
      ratings_count: 28,
      sessions_completed: 30,
      is_verified: true,
      role: 'student',
      cgpa: '8.8 / 10',
      teachSkills: [
        {
          skillId: 'skill-case-prep',
          proficiency: 'Expert',
          experienceNote: 'Solved and debriefed 80+ consulting business cases across profitability and market entry.',
          isVerified: true,
          sessionsHelped: 22
        },
        {
          skillId: 'skill-guesstimates',
          proficiency: 'Expert',
          experienceNote: 'Trained 30+ students on structured demographic and supply-side estimation.',
          isVerified: true,
          sessionsHelped: 18
        }
      ],
      learnSkills: [
        { skillId: 'skill-powerbi', currentLevel: 'Beginner', targetLevel: 'Intermediate', priority: 'Medium' }
      ]
    },
    {
      id: 'user-tanvi',
      name: 'Tanvi Khandelwal',
      student_id: '25A3HP175',
      email: 'tanvi.khandelwal@imthyderabad.edu.in',
      avatar: 'TK',
      program: 'PGDM (Marketing & Product)',
      specialization: 'Product Management & Growth Marketing',
      academic_year: 'Year 2 (Batch 2023–2025)',
      graduation_year: 2025,
      bio: 'Incoming APM at Microsoft. Specializes in PRD documentation, feature prioritization, wireframing in Figma, and performance marketing analytics.',
      target_domain: 'Product Management',
      target_role: 'Associate Product Manager (Microsoft PPO)',
      career_goal: 'Digital marketplace and consumer software leadership.',
      availability: 'Daily 7 PM - 9 PM',
      rating: 4.9,
      ratings_count: 17,
      sessions_completed: 18,
      is_verified: true,
      role: 'student',
      cgpa: '8.6 / 10',
      teachSkills: [
        {
          skillId: 'skill-prod-strategy',
          proficiency: 'Expert',
          experienceNote: 'Authored 4 published product teardowns; incoming APM at Microsoft.',
          isVerified: true,
          sessionsHelped: 14
        },
        {
          skillId: 'skill-figma-wireframing',
          proficiency: 'Advanced',
          experienceNote: 'Designed full design systems and interactive UI wireframes.',
          isVerified: true,
          sessionsHelped: 9
        },
        {
          skillId: 'skill-digital-mktg',
          proficiency: 'Advanced',
          experienceNote: 'Managed live digital advertising campaigns with 3.5x blended ROAS.',
          isVerified: true,
          sessionsHelped: 8
        }
      ],
      learnSkills: [
        { skillId: 'skill-sql', currentLevel: 'Intermediate', targetLevel: 'Advanced', priority: 'High' }
      ]
    },
    {
      id: 'user-admin',
      name: 'Dr. Arvind Swaminathan',
      student_id: 'IMTH-FAC-PL01',
      email: 'placement.cell@imthyderabad.edu.in',
      avatar: 'AS',
      program: 'Faculty / Placement Cell Head',
      specialization: 'Corporate Relations & Skill Governance',
      academic_year: 'Faculty Admin',
      graduation_year: 2026,
      bio: 'Head of Corporate Relations & Placement Cell, IMT Hyderabad. Overseeing peer skill verification, campus readiness, and recruiter engagements.',
      target_domain: 'Consulting',
      target_role: 'Placement Cell Director',
      career_goal: 'Empowering 720+ IMT Hyderabad students with industry-aligned capabilities.',
      availability: 'Office Hours (9 AM - 5 PM)',
      rating: 5.0,
      ratings_count: 50,
      sessions_completed: 100,
      is_verified: true,
      role: 'admin',
      cgpa: 'Faculty',
      teachSkills: [],
      learnSkills: []
    }
  ];

  for (const p of personas) {
    await query(
      `
      INSERT INTO users (
        id, name, student_id, email, avatar, program, specialization,
        academic_year, graduation_year, bio, target_domain, target_role,
        career_goal, availability, rating, ratings_count, sessions_completed,
        is_verified, role, cgpa
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        student_id = EXCLUDED.student_id,
        email = EXCLUDED.email,
        bio = EXCLUDED.bio,
        rating = EXCLUDED.rating,
        ratings_count = EXCLUDED.ratings_count,
        sessions_completed = EXCLUDED.sessions_completed,
        is_verified = EXCLUDED.is_verified;
    `,
      [
        p.id,
        p.name,
        p.student_id,
        p.email,
        p.avatar,
        p.program,
        p.specialization,
        p.academic_year,
        p.graduation_year,
        p.bio,
        p.target_domain,
        p.target_role,
        p.career_goal,
        p.availability,
        p.rating,
        p.ratings_count,
        p.sessions_completed,
        p.is_verified,
        p.role,
        p.cgpa
      ]
    );

    // Seed teaching skills
    for (const ts of p.teachSkills) {
      await query(
        `
        INSERT INTO student_skills (
          id, student_id, skill_id, skill_type, proficiency, experience_note, is_verified, sessions_helped, is_available
        ) VALUES ($1, $2, $3, 'TEACH', $4, $5, $6, $7, true)
        ON CONFLICT (student_id, skill_id, skill_type) DO UPDATE SET
          proficiency = EXCLUDED.proficiency,
          experience_note = EXCLUDED.experience_note,
          is_verified = EXCLUDED.is_verified;
      `,
        [`ss-t-${p.id}-${ts.skillId}`, p.id, ts.skillId, ts.proficiency, ts.experienceNote, ts.isVerified, ts.sessionsHelped]
      );
    }

    // Seed learning skills
    for (const ls of p.learnSkills) {
      await query(
        `
        INSERT INTO student_skills (
          id, student_id, skill_id, skill_type, current_level, target_level, priority
        ) VALUES ($1, $2, $3, 'LEARN', $4, $5, $6)
        ON CONFLICT (student_id, skill_id, skill_type) DO UPDATE SET
          current_level = EXCLUDED.current_level,
          target_level = EXCLUDED.target_level,
          priority = EXCLUDED.priority;
      `,
        [`ss-l-${p.id}-${ls.skillId}`, p.id, ls.skillId, ls.currentLevel, ls.targetLevel, ls.priority]
      );
    }
  }

  // 4. Import Placement Jobs (226 records from JD_Repository)
  const placementRecords = parsePlacementJobs();
  console.log(`[Neon PostgreSQL] Importing ${placementRecords.length} placement records...`);

  // Truncate and re-seed to ensure fresh, clean 226 records
  await query(`DELETE FROM placement_jobs;`);
  for (const job of placementRecords) {
    await query(
      `
      INSERT INTO placement_jobs (
        sr_no, company_name, sector, role, domain, ctc_offered, fixed_pay, variable_pay,
        location, experience_requirements, cgpa_criteria, undergraduate_preferred_degree,
        major_minor_required, skills_required
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
    `,
      [
        job.srNo,
        job.companyName,
        job.sector,
        job.role,
        job.domain,
        job.ctcOffered,
        job.fixedPay,
        job.variablePay,
        job.location,
        job.experienceRequirements,
        job.cgpaCriteria,
        job.undergraduatePreferredDegree,
        job.majorMinorRequired,
        job.skillsRequired
      ]
    );
  }

  // 5. Import Internship Opportunities (75 records from SIP_Companies_2026)
  const sipRecords = parseInternshipOpportunities();
  console.log(`[Neon PostgreSQL] Importing ${sipRecords.length} internship records...`);

  await query(`DELETE FROM internship_opportunities;`);
  for (const sip of sipRecords) {
    await query(
      `
      INSERT INTO internship_opportunities (
        company_name, notice_date, role, stipend, locations, skills_required
      ) VALUES ($1, $2, $3, $4, $5, $6);
    `,
      [sip.companyName, sip.noticeDate, sip.role, sip.stipend, sip.locations, sip.skillsRequired]
    );
  }

  // 6. Initial Seed Mentoring Requests
  await query(`
    INSERT INTO mentoring_requests (
      id, requester_id, mentor_id, skill_id, reason, preferred_date, preferred_time, message, meeting_link, status, mentor_response_note, session_notes
    ) VALUES (
      'req-demo-001',
      'user-tushar',
      'user-oshi',
      'skill-python-data',
      'Preparing for Deloitte USI Analytics Summer Internship round. Need hands-on coaching on Pandas DataFrame manipulation and data cleaning logic.',
      '2026-08-28',
      '7:30 PM - 9:00 PM',
      'Hi Oshi, I saw that you interned at Deloitte USI. I have basic Python syntax down but want to practice real-time case data manipulation. Would love a 60-min session!',
      'https://meet.google.com/imth-python-session',
      'ACCEPTED',
      'Looking forward to helping you Tushar! Keep Jupyter Notebook or VS Code ready with the sample dataset.',
      '-- IMT Hyderabad Peer Session Scratchpad\n-- Python for Data Analysis & Pandas\nimport pandas as pd\nimport numpy as np\n\ndf = pd.read_csv("campus_placement_data.csv")\nprint(df.groupby("domain")["ctc"].mean())'
    ) ON CONFLICT (id) DO NOTHING;
  `);

  // 7. Initial Seed Notifications
  await query(`
    INSERT INTO notifications (
      id, user_id, type, title, message, related_entity_id, target_tab, is_read
    ) VALUES (
      'notif-tushar-1',
      'user-tushar',
      'request_accepted',
      'Mentoring Request Accepted!',
      'Oshi Shrivastava accepted your request for Python for Data Analysis. Session scheduled for Aug 28 at 7:30 PM.',
      'req-demo-001',
      'my_requests',
      false
    ) ON CONFLICT (id) DO NOTHING;
  `);

  // 8. Initial Skill Verification Queue
  await query(`
    INSERT INTO skill_verifications (
      id, student_id, skill_id, claimed_proficiency, evidence_note, status
    ) VALUES (
      'verif-001',
      'user-tushar',
      'skill-excel-advanced',
      'Intermediate',
      'Completed 40-hour Advanced Excel & Financial Modeling course. Built automated DCF workbook with sensitivity tables.',
      'Pending'
    ) ON CONFLICT (id) DO NOTHING;
  `);

  console.log('[Neon PostgreSQL] Database seeded successfully with 226 placement jobs and 75 internships!');
}
