export interface PlacementJobRecord {
  srNo: number;
  companyName: string;
  sector: string;
  role: string;
  domain: string;
  ctcOffered: string;
  fixedPay: string;
  variablePay: string;
  location: string;
  experienceRequirements: string;
  cgpaCriteria: string;
  undergraduatePreferredDegree: string;
  majorMinorRequired: string;
  skillsRequired: string;
}

export const RAW_PLACEMENT_CSV = `Sr No.,Name of the company,Sector of Company,Roles offered,Domain of role offered,CTC Offered,Fixed Pay,Variable Pay,Location,Experience Requirements ,CGPA Creteria,Under Graduate Prefered Degree ,Major/Minor Required,Skills Set Required 
1,AAJ Supply Chain Management,Logistics & Supply Chain,SMT - Operations,Operations,10 LPA,10 LPA,-,Bangalore / Hyderabad,Fresher,80% in 10th & 12th,MBA Operations,Operations,Warehousing and supply chain operations; Telugu/Kannada language preferred; Strong analytical and problem-solving skills
2,AAJ Supply Chain Management,Logistics & Supply Chain,SMT - Logistics,Operations,10 LPA,10 LPA,-,Noida,Fresher,80% in 10th & 12th,MBA Operations,Operations,Logistics operations; Male candidates only; Strong analytical skills
3,AAJ Supply Chain Management,Logistics & Supply Chain,SMT - Solutions Design,Operations,10 LPA,10 LPA,-,Noida,Fresher,80% in 10th & 12th,B.Tech + MBA,Operations,B.Tech CS preferred; Supply chain solution design
4,AAJ Supply Chain Management,Logistics & Supply Chain,SMT - HR,HR,10 LPA,10 LPA,-,"Sonipat, Haryana",Fresher,80% in 10th & 12th,MBA HR,HR,"Employee development, training, employee relations, payroll processing, diversity & inclusion, policy development"
5,AAJ Supply Chain Management,Logistics & Supply Chain,Logistics Procurement,Operations,10 LPA,10 LPA,-,Noida,Fresher,80% in 10th & 12th,MBA Operations,Operations,Procurement and logistics operations; supply chain management
6,AAJ Supply Chain Management,Logistics & Supply Chain,Supply Chain Analytics Team Member,Operations,6 LPA + Benefits,6 LPA,-,Hyderabad,Fresher,-,MBA Operations / Analytics,Operations/Analytics,"Supply chain analytics; dashboards (Power BI, Tableau, Excel); KPI tracking (OTIF, forecast accuracy); S&OP reporting; data validation; ERP systems; MBA Operations/Analytics mandatory"
7,AAJ Supply Chain Management,Logistics & Supply Chain,Supply Chain Demand Planning Team Member,Operations,6 LPA + Benefits,6 LPA,-,Hyderabad,Fresher,-,MBA Operations / Marketing,Operations,Rolling demand forecasts (SKU/market/customer); statistical models; S&OP/IBP demand reviews; forecast accuracy and bias correction; commercial intelligence integration; MBA Operations/Marketing
8,AAJ Supply Chain Management,Logistics & Supply Chain,Supply Planning Team Member,Operations,6 LPA + Benefits,6 LPA,-,Hyderabad,Fresher,-,MBA Operations / Marketing,Operations,"Convert demand plans into supply/production plans; MPS and MRP; inventory management (raw materials, APIs, finished goods); coordinate with procurement; capacity planning; MBA Operations/Marketing"
9,Aditya Birla (Birla Pivot),Manufacturing,Management Trainee - Revenue (Sales),Marketing,9.2 LPA,8 LPA,1.2 LPA,Pan India,Fresher,-,-,-,"B2B sales; generate leads, onboard retailers/contractors/builders; CRM data management; upselling; strong communication and target achievement skills"
10,Aditya Birla Chemicals,Manufacturing,Sales Management Trainee,Marketing,8 LPA (incl. 10% variable),~7.3 LPA,10% Variable,Mumbai / Hyderabad / Kolkata / Delhi / Vadodara / Indore,Fresher,60% and above,B.Sc Chemistry / B.E / B.Tech Chemical,Marketing/Sales Major,Sales & marketing of chemicals; MBA in Sales & Marketing (Major); Strong communication and analytical skills
11,ADP,Consultancy,Associate Lead Consultant,,10 LPA,10 LPA,-,Mumbai / Hyderabad / Kolkata / Delhi / Vadodara / Indore,-,-,B.Tech,-,"· Good listening and communication skills.

· Inclusive team players be able to understand different point of view and manage conflict in client organization.

· Work collaboratively with teams spread across geography.

· Ability to take ownership and pressure.

· Understanding of tools and technology.

· Open to frequent travels."
12,Advance Auto Parts,Retail / Automobile,Pricing Specialist,Finance,10 LPA,10 LPA,-,Hyderabad (Hybrid),Fresher,70% or 7.0 CGPA,-,Finance,Pricing analytics; Finance specialization; No active backlogs; strong analytical skills
13,Advantis Quartz LLP,Manufacturing,Management Trainee – Sales & Business Development,Marketing,7-8.5 LPA (post-training),7-8.5 LPA,Performance-based incentives,Hyderabad (Hybrid),Fresher,-,MBA,Marketing/Sales,Excellent communication skills; Strong spoken English; Hindi speaking; Telugu preferred; Convincing & presentation abilities; Negotiation skills; Positive attitude
14,Alien Technology Transfer,Technology,Business Development Consultant,Marketing,10.08 - 11.08 LPA,7 LPA,2-3 LPA variable + allowances,"Kondapur, Hyderabad (3 PM - 12 Midnight shift)",Fresher,-,-,-,"Business development, outreach, and sales; Night shift (3 PM–12 AM); Strong communication skills; NightShift + Food allowances + Health Insurance"
15,Alien Technology Transfer,Technology,Business Development Consultant,Marketing,10.08 - 11.08 LPA,7 LPA,2-3 LPA variable + allowances,"Kondapur, Hyderabad (3 PM - 12 Midnight shift, WFH on Fridays)",Fresher,-,-,-,"Client acquisition & key account management for US-based innovation-funding clients; outreach via email/LinkedIn/calls; strong analytical ability and fluent English; entrepreneurial, self-motivated mindset; Night Shift + Food allowances + Health Insurance + Transport (for female employees)"
16,Aliens Group,Real Estate,Talent Acquisition,HR,7 LPA,7 LPA,-,-,Fresher (relevant internship must),80% in any one academic,-,HR,Talent acquisition for a real estate company; Relevant internship experience mandatory
17,Aliens Group,Real Estate,Management Trainee - Sales,Marketing,12 LPA,10 LPA,2 LPA,-,Fresher (relevant internship must),80% in any one academic,-,Marketing/Sales,Real estate sales; strong communication and negotiation skills; Relevant internship mandatory
18,Aliens Group,Real Estate,CRM Executive,Marketing,9 LPA,7 LPA,2 LPA,-,Fresher (relevant internship must),80% in any one academic,-,Marketing,Customer relationship management; real estate CRM; Relevant internship mandatory
19,Aliens Group,Real Estate,Management Trainee - Sales,Marketing,9 LPA (7 Fixed + 2 LPA Performance Variable) + Benefits,7 LPA,2 LPA,Hyderabad,Fresher,-,B.Tech/MBA/PGDM from NIRF ranked campus,-,"Real estate sales; lead follow-up, site visits and closures; excellent communication, presentation and negotiation skills; cold calling/mailing/referrals"
20,Allcargo Logistics,Logistics & Supply Chain,HR Business Partner – Management Trainee (Axelerate Program),HR,"6 LPA (during training); 7.5 LPA (post-confirmation as Asst. Manager, M-10)",6 LPA (training); 6.75 LPA (confirmed),"None during training; 0.75 LPA performance-based (confirmed) + Retention Bonus 1.5 LPA (paid 50,000 each at 15th/27th/39th month)","Pan India (field posting - NCR, Uttar Pradesh, West Bengal, Maharashtra, Gujarat, Karnataka, Tamil Nadu; posting location as deemed fit)",Fresher (2026 batch); 12-month structured field training under Axelerate MT Program,-,-,HR Major/Minor,"Strategic HR business partnering aligned to logistics operations goals; workforce planning, talent management & succession planning; performance & productivity metrics management (KPIs, appraisals, coaching managers); employee relations, grievance handling & engagement programs; change management support during org transformations; HR analytics (attrition, headcount, training ROI, workforce productivity); labour law, safety & compliance risk management; Axelerate MT Program selection - Qualifier Test, Group Discussion & Personal Interview; Master's degree in HR; strong communication, analytical & interpersonal skills"
21,Alliant Group,Professional Services / Tax Consulting,Associate – Tax Controversy Services (TCS),Finance,-,-,-,Hyderabad (Work from office),0-3 years in secondary research & report preparation,-,-,-,"Due diligence on small-to-midsize business tax incentive qualification; project & docket management for U.S. tax controversy engagements; collaboration with attorneys/tax professionals on administrative tax proceedings; legal research & analysis to support case strategies; drafting/reviewing legal documents (codes, regulations, case law, contracts); continuous subject-matter education & qualification exams; excellent English written/verbal communication; proficiency in MS Word/Office; Shift: 12:00 PM-10:00 PM"
22,Anand Rathi,BFSI,Account Manager,Finance,6.5-7 LPA,6.5-7 LPA (All Fixed),-,Chennai,Fresher,-,-,Finance / Finance & Marketing,"Acquire and manage quality client relationships; promote mutual funds, insurance, PMS; NISM certifications preferred; strong communication and relationship-building skills"
23,Anand Rathi Investment Services,BFSI,Dealer / Relationship Manager (MT – AM/DM),Finance,5.70 LPA + 90K Retention Bonus + Incentives,5.70 LPA,90K Retention Bonus + Performance Incentives,Hyderabad / Vijayawada / Visakhapatnam / Warangal,Fresher,-,-,Finance / Marketing preferred,"Acquire clients, distribute financial products (MF, Insurance, PMS), investment advisory, CRM, revenue growth; NISM certifications preferred"
24,Apoorva IT Solutions,IT,Business Development Executive,Marketing,8 LPA,5 LPA,3 LPA,Hyderabad,Fresher,-,Any Graduate/Post Graduate (MBA preferred),Marketing/Sales,Strong skills in business development & stakeholder management; Proficiency in technical presentations & proposal writing; Defence/PSU sector knowledge; Telugu and English mandatory; Order closure & project payment follow-up; Strong interpersonal & communication skills
25,Apple,IT / Technology,IS&T Early Career Functional Consultant,IT,31-33 LPA (Yr1); 71 LPA (Full-time),19.5 LPA Fixed,"RSUs: US$58,800 over 4 years",Pan India,3-month internship (₹1L/month stipend) then full-time,7 CGPA or 70%+,-,-,IT functional consulting; ERP / enterprise systems; All specializations; Strong analytical and communication skills
26,Apple,,SAP Functional Analyst,IT,18-20 LPA,-,-,"Hyderabad, Telangana",0-1 year experience in SAP SD/MM,-,-,-,"Apple IS&T SAP Global Systems Team; design & delivery of core business/technical infrastructure (Finance, Sales, Retail, Services, Operations) on SAP HANA platform & ECC/HANA; gather & define requirements with cross-functional teams; track & report project status to stakeholders; drive project execution for timely, on-budget delivery; foundational understanding of procurement, logistics, order-to-cash & supply chain execution; MBA in Supply Chain/Marketing/Operations (no gap between UG & PG); familiarity with Generative AI/cloud platforms a plus; strong communication, analytical & problem-solving skills"
27,Arcesium,BFSI / FinTech,Analyst,Finance,8.5 LPA + benefits,8.5 LPA,Benefits,Hyderabad / Bengaluru / Gurgaon,-,-,Post Graduate / CA / CPA / Bachelor's with 2 yrs exp,-,Strong analytical & problem-solving skills; Strong interpersonal & collaborative skills; Excellent oral/written communication; MS Excel proficiency; VBA macros / Python a plus; Ability to work under pressure; Support clients across different time zones
28,Avantel Limited,Technology / Defence,Program Manager / Coordinator,Operations,10 LPA + Benefits,10 LPA,-,Hyderabad,1–2 years work experience preferred,-,-,-,Program management and coordination; Aerospace/Defence sector; strong analytical and communication skills
29,Befach4X Pvt. Ltd.,Marketing / Digital Agency,Social Media Marketing Executive,Marketing,6-8 LPA + Benefits,-,-,Hyderabad,Fresher,-,-,Marketing,"Social media content strategy, planning and execution; brand engagement; Marketing specialization"
30,Berger Paints,Manufacturing / FMCG,Sales Officer (Internship + PPO),Marketing,PPO CTC: 7.08 LPA (Fixed: 4.68 LPA incl. Retirals),4.68 LPA (incl. Retirals),"Internship Stipend: ₹5,000/month; PPO upon completion",Telangana,Fresher (2026/2027 pass out; local candidate preferred),60% throughout,-,Marketing Major,Field sales activities; channel partner management; brand execution; comfortable with field sales; strong communication and selling skills
31,Blinkit,E-Commerce / QCommerce,Associate Program Manager,Operations,11 LPA + Benefits,11 LPA,-,Tamil Nadu / Kerala (Tamil/Malayalam speaking mandatory),Fresher,-,-,All specializations,"Dark store expansion – scouting, property evaluation, onboarding; coordinate with ops, legal, finance; build trackers and dashboards; Tamil/Malayalam fluency required"
32,Blue Ocean Multi Client Family Office,BFSI,Research Analyst/Associate – Equities,Finance,7-10 LPA + benefits,-,-,Hyderabad,2-4 years (equity research / buy-side),-,MBA (Tier 1 institution),Finance,"Financial modelling & valuation (DCF, relative valuation, SOTP); Advanced MS Excel; Investment memo writing; Bloomberg/FactSet preferred; CFA Level 3 preferred; Fundamental equity research & sector analysis"
33,BPL Medical Technologies,Healthcare,Management Trainee – Supply Chain Management,Operations,12 LPA,12 LPA,-,Pan India,Fresher,-,-,Operations,Supply chain management; All specializations; Retention bonus with clawback option
34,BPL Medical Technologies,Healthcare,Management Trainee – Finance,Finance,12 LPA,12 LPA,-,Pan India,Fresher,-,-,Finance,Finance management; All specializations; Retention bonus with clawback option
35,BPL Medical Technologies,Healthcare,Management Trainee – Marketing,Marketing,12 LPA,12 LPA,-,Pan India,Fresher,-,-,Marketing,Marketing; All specializations; Retention bonus with clawback option
36,BPL Medical Technologies,Healthcare,Management Trainee – HR,HR,12 LPA,12 LPA,-,Pan India,Fresher,-,-,HR,Human Resources; All specializations; Retention bonus with clawback option
37,Capgemini,Consultancy / IT,Sales Enablement Analyst,Marketing,9-10 LPA + 1L Joining Bonus,9-10 LPA,1L Joining Bonus,Pan India,0-48 months,"60% in 10th, 12th, Graduation, PG",-,-,Sales support and enablement; analytical skills; no active backlogs; max 1 yr educational gap
38,Capgemini,Consultancy / IT,Business Operations,Operations,9-10 LPA + 1L Joining Bonus,9-10 LPA,1L Joining Bonus,Pan India,0-48 months,"60% in 10th, 12th, Graduation, PG",-,-,Business operations management; analytical skills; MS Office proficiency
39,Capgemini,Consultancy / IT,Business Analyst,IT,9-10 LPA + 1L Joining Bonus,9-10 LPA,1L Joining Bonus,Pan India,0-48 months,"60% in 10th, 12th, Graduation, PG",-,-,Business analysis; technology consulting; strong analytical and communication skills
40,CBRE,Real Estate,Associate – Leasing Advisory,Finance,1050000,750000,300000,Gurgaon / Mumbai / Chennai / Bengaluru / Pune / Kolkata / Hyderabad,0-48 months,"60% in 10th, 12th, Graduation, PG",-,-,"Ability to comprehend and interpret instructions, short correspondence, and memos and ask clarifying questions to ensure understanding • Ability to write routine reports and correspondence. • Ability to respond to common inquiries or complaints from clients, co-workers, and/or supervisor. • Requires basic knowledge of financial terms and principles. • Ability to calculate simple figures such as percentages. • Ability to understand and carry out general instructions in standard situations. Ability to solve problems in standard situations. Requires basic analytical skills. • Advanced skills in Microsoft Word, Excel, and PowerPoint. • Ability to learn and operate industry specific databases and software. • Strong problem solving and organizational skills. • Ability to multi-task, work in cross-functional teams, perform under short time frames, perform efficient resource planning, establish, and maintain internal and external professional relationships and prioritize workload."
41,CBRE,Real Estate,Associate – Consulting & Valuation,Finance,10.5 LPA,7.5 LPA,1.5 LPA (retention) + 1.5 LPA benefits,Gurgaon / Mumbai / Chennai / Bengaluru / Pune / Kolkata / Hyderabad,Fresher,-,-,Finance / All except HR,"Consulting and valuation; real estate advisory; analytical skills; MS Excel, Word, PowerPoint"
42,CBRE,Real Estate,Associate – Finance (Investment Risk Monitoring),Finance,10.5 LPA,7.5 LPA,1.5 LPA (retention) + 1.5 LPA benefits,Mumbai,Fresher,-,-,Finance,Investment risk monitoring; financial analysis; valuation advisory; Finance specialization only
43,Coffee Day Global Ltd,Retail / F&B,Management Trainee,Marketing,10 LPA,10 LPA,-,-,Fresher,-,-,Marketing Major,Brand and retail management; MBA Marketing; sales and outlet operations
44,Cognizant,IT / Consultancy,BD Analyst and Lead,Marketing,-,-,-,PAN India,BD Analyst: 2-3 years relevant full-time experience; BD Lead: 4-5 years relevant full-time experience,"60% in 10th, 12th & UG; no standing arrears",-,-,"Pre-sales support for BD pursuits (proposal writing, pricing/estimation alignment); support solution architects in solution development & Bid Management; deal analytics, prospect list & BD asset ownership; RFP/RFI response & CRM tagging compliance; industry research & thought leadership collateral; stakeholder management across pursuit cycle; MBA/Executive MBA (2026 batch, full-time)"
45,Cognizant,IT / Consultancy,"Business Analyst – Sales & Order Management (Functional), SAP",IT,-,-,-,PAN India,Fresher (2026 pass out),"60% in 10th, 12th & UG; no standing arrears",-,-,"SAP S/4HANA-led transformation programs; business process analysis for Sales & Order Management (demand/supply, pricing, global trade, credit management, discounts & rebates, revenue accounting); structured & logical problem-solving; confident client-facing communication; flexibility to travel at short notice; exposure to an SAP functional module preferred; Life Sciences/Manufacturing/Retail industry understanding a plus; MBA/Executive MBA (2026 batch, full-time)"
46,Cognizant,IT / Consultancy,ERP Associate Consultant (Trainee) – Oracle HCM,HR,-,-,-,PAN India,Fresher (2026 pass out),"60% in 10th, 12th & UG; no standing arrears",-,HR Major,"Process consulting on Oracle HCM Cloud product ecosystem & business analysis; Solution Design/Functional Fit-Gap/Training/Testing sessions; end-to-end application validation against business requirements; Masters' degree in Human Resources; HR internship experience (HR ops/HRIS/HR tech) an advantage; understanding of employee lifecycle, key labor laws & data privacy (GDPR); awareness of Generative AI a plus"
47,Cognizant,IT / Consultancy,ISG Central,Marketing,-,-,-,PAN India,Fresher (2026 pass out),"60% in 10th, 12th & UG; no standing arrears",-,Marketing/Strategy/Operations Major,"Domain-specific market assessments, innovation & trend analysis; defining L1/L2/L3 process solutions; research on target clients' transformation strategies & business priorities; RFP tracking, follow-up & repository updates; MBA from a Tier 1/2 institute; strong MS PowerPoint & Excel skills; analytical mindset with attention to detail; interest in digital transformation"
48,Cognizant,IT / Consultancy,ISG LS Commercial,Marketing,-,-,-,PAN India,3-4 years experience with Global Pharma/Life Sciences clients,"60% in 10th, 12th & UG; no standing arrears",-,-,"End-to-end Pharma/Life Sciences Commercial Analytics (SFE, Sales, Marketing) via Data Modelling & Analytical techniques; business requirements, functional requirements, business rules, analytics plans & quality checklist documentation; BI/visualization tools (Tableau/QlikView/Qlik Sense); MBA/Executive MBA (2026 batch, full-time)"
49,Cognizant,IT / Consultancy,Cognizant IT – Fulfilment (TAG & L&D),HR,-,-,-,Hyderabad,Fresher (2026 pass out),"60% in 10th, 12th & UG; no standing arrears",-,HR Major,"HR program management within the CIO function blending core HR with tech-driven solutioning; recruitment, onboarding & campus hiring platform support; L&D program design, implementation & tracking; cross-functional program governance, KPI dashboards & stakeholder reporting; HR-IT systems integration & tech-enabled HR solutioning; design thinking/agile problem-solving; MBA HR (2026 batch); exposure to ATS/HRIS platforms (Workday, Oracle Recruit, SuccessFactors) preferred; Agile/PMP/Design Thinking certification a plus"
50,Cognizant,IT / Consultancy,Sr. Analyst – MDU Operations,Operations,-,-,-,PAN India,2-4 years experience in IT services/Business Operations preferred,"60% in 10th, 12th & UG; no standing arrears",-,-,"Analysis & optimization of business operations for the Market Delivery Unit (MDU); implementation of business strategies aligned with organizational goals; data-driven insights, performance metrics & senior management reporting; dashboards in Power BI; mastery of MS Excel; cross-functional collaboration & process improvement; MBA/Executive MBA (2026 batch, full-time)"
51,CRED,BFSI / FinTech,Location Lead - Collections,Operations,10 LPA (fixed) + Benefits,10 LPA,-,Andhra Pradesh & Telangana,-,-,-,All Specializations (Telugu proficiency required),"Manage end-to-end field collections operations for an assigned city/region; vendor onboarding, performance tracking, capacity planning, billing and validation; build, coach and mentor field teams; drive portfolio recovery and loss-reduction strategies; analyze collections data, roll rates and trends to forecast performance; track and report metrics against targets; collaborate with Risk, Product and Tech teams; flag early fraud/default warning signs; open to travel across locations"
52,CricClubs,IT / SaaS,Finance and Accounting Executive,Finance,5-9 LPA,-,-,"Kondapur, Hyderabad (WFO)",1-3 years,-,MBA / BCom,Finance,Payroll processing; Strong GST & invoicing knowledge (mandatory); MS Excel & documentation; HRMS/payroll software familiarity; Knowledge of PF/ESI compliance; Zoho/Tally experience preferred
53,Crisil,BFSI,Management Trainee - Structured Finance,Finance,10.78 LPA,9 LPA,1.78 LPA,Pune,-,-,-,Finance,"Communication
• Data Crunching
• Advanced Excel
• Solution Orientation
• Modelling"
54,Crisil,BFSI,Management Trainee - FS and Corporate GAC,Finance,10.78 LPA,9 LPA,1.78 LPA,Pune,-,-,-,Finance,"• Stakeholder
engagement
• Accounting and
Financial concepts
• Analytical Skills
• Solution
Orientation
• Execute Tasks
independently"
55,Curioused,EdTech,Pre-Sales / Sales / Customer Service / Product Development / Brand & Social Media – Asst Manager,Marketing,-,-,-,-,Fresher,-,-,-,EdTech – curated lesson plans and teaching materials; analytical thinking; communication skills; passion for education and innovation
56,Cyfuture,IT,Management Trainee - IT Sales,Marketing,10 LPA,10 LPA,-,Noida,0-5 years; B2B SaaS preferred,70% throughout,-,Marketing Major,IT/SaaS B2B sales; PGDM in Sales & Marketing; strong communication and results-oriented approach; no active backlogs
57,Digilogic Systems Limited,Technology / Defence,Management Trainee – Business Development,Marketing,10 LPA (incl. Loyalty Incentive ₹10K/month after 3 yrs),10 LPA,Loyalty Incentive: ₹10K/month post 3 years,Hyderabad / Bangalore,0–2 years,-,B.E/B.Tech – Electronics/EEE/E&C/Instrumentation + MBA,Marketing/Sales Major,"Client acquisition, relationship management, quotation, contract negotiation, sales targets; Defence/Automation sector exposure preferred"
58,Digital Nest,EdTech / Technology,Business Development,Marketing,9 LPA,9 LPA,-,-,Fresher,-,-,-,Business development and sales; strong communication skills; All specializations
59,Digital Nest,EdTech / Technology,Business Development – Corporate Relations,Marketing,9 LPA,9 LPA,-,-,Fresher,-,-,-,Corporate relations and partnerships; All specializations
60,Digital Nest,EdTech / Technology,Founders Office – Strategy & Operations Management,Operations,8 LPA,8 LPA,-,-,Fresher,-,-,-,Strategy and operations; All specializations; analytical and leadership skills
61,Digitide,IT / Marketing,Marketing Generalist Executive,Marketing,11 LPA,10 LPA,10% Variable,-,Fresher,70 percentile throughout,-,Marketing Major,"Marketing generalist – content, brand, campaigns, digital; MBA Marketing mandatory; strong analytical and creative skills"
62,Dr. Reddy's Laboratories,Pharma / Healthcare,L&D Apprentice,HR,6 LPA,6 LPA,-,"Bachupally, Hyderabad",Apprenticeship (6-12 months),-,"MBA/PGDM in HR or equivalent master's degree in HR, Psychology, Education, Instructional Design, or related fields",HR,"Support L&D Partners in training needs analysis, program delivery (e-learning, workshops, seminars) and effectiveness evaluation; design and develop e-learning content and storyboards applying adult learning/instructional design principles; LMS administration (enrolments, course assignment, assessments, training calendar, tier-1 query resolution); maintain training records and prepare learning-outcome reports; track L&D budgets; proficiency in MS Office and authoring tools (Articulate Storyline 360, Vyond); familiarity with LMS platforms (Cornerstone, SumTotal, SAP SuccessFactors) and SCORM content"
63,DSP,BFSI,Management Trainee - Relationship Manager (Institutional Sales),Marketing,-,-,-,Mumbai / Delhi / Bangalore / Kolkata / Hyderabad / Chennai / Pune,Fresher,-,-,Finance/Marketing Major,"Institutional relationship management, reactivation and business development; new institutional client acquisition; tracking companies/promoters for cash-fund flows; strengthening existing relationships; MBA/equivalent; strong relationship-building, presentation and MS Office skills; good understanding of financial markets"
64,Dun & Bradstreet,BFSI / Data Analytics,Analyst – People Business Partner,HR,10 LPA,10 LPA,-,Hyderabad,Fresher,-,-,HR Major,"HR business partnering, people analytics, talent management; HR specialization; freshers welcome"
65,Dun & Bradstreet,BFSI / Data Analytics,Data Operations Analyst,IT,10–12 LPA Fixed + Benefits,10–12 LPA,-,Hyderabad,Fresher,-,-,Analytics / IT,Data operations and analytics; data quality management; PGDM IT or Analytics specialization
66,Dun & Bradstreet,BFSI / Data Analytics,Intern – People Business Partner,HR,-,-,-,Hyderabad (India Solutions Center),Currently pursuing post-graduation (Intern),-,-,HR / Business Administration,"New hire onboarding support and pre-joining formalities; employee engagement activity planning (events, surveys, recognition programs); learning & development coordination including training session logistics, attendance tracking and feedback-driven effectiveness measurement; liaison support across the six People team functions (Business Partners, TA, C&B, L&D, OD, Analytics); proficiency in MS Office (Word, Excel, PowerPoint); strong organizational, multitasking and interpersonal communication skills"
67,Duroflex,Manufacturing / Retail,Management Trainee – Regional Sales HR Business Partner,HR,8 LPA (6L Fixed + 2L deferred after 1 yr) + Benefits,6 LPA,2 LPA (deferred after 1 year),Bangalore / Mumbai,Fresher,-,-,HR Major,HR business partnering in a regional sales context; talent management; stakeholder engagement; HR specialization mandatory
68,Enfinity India Pvt Ltd,Consultancy,Management Trainee - Business Analyst,Finance,15 LPA,12 LPA,3 LPA,Hyderabad ,-,-,-, Finance,". Climate change, Renewable Energy and Net Zero Carbon enthusiast 
. Excellent problem-solving and analytical skills 
. Good interpersonal and communication skills 
. Ability to collaborate across teams and roles 
. Ability to self-motivate and work under deadline constraints 
. Prior experience in renewable energy and/or sustainable development is a plus"
69,EPAK,Manufacturing / PEB,Sales – PEB Industry,Marketing,7–8 LPA,7–8 LPA,-,Ahmedabad / Chennai,Fresher (6-month probation),-,B.Tech (Mechanical) mandatory; MBA Sales & Marketing preferred,Marketing/Sales Major,"Generate leads, client meetings, promote PEB products, quotation preparation, follow-up for order finalization, client relationship management; local language preference for deployment location"
70,ETHIKA INSURANCE BROKING PVT LTD,BFSI / Insurance,Business Development Executive,Marketing,-,-,-,Bangalore / Mumbai / Hyderabad,Fresher,-,-,MBA – Sales / Finance / Marketing / HR,Identify and engage SME clients; present insurance solutions; maintain pipeline through cold calls/email/networking; onboard clients; meet sales targets
71,Evergent Technologies,IT / SaaS (Telecom & OTT),Management Trainee (Junior Account Manager),Marketing,6-10 LPA + benefits,-,-,Pan India,0-1 year; SaaS/BFSI/media internship a plus,-,MBA/PGDM (Tier-1 / reputed B-school),-,Analytical aptitude; Excel/spreadsheets & data interpretation; Strong written & verbal communication; CRM (Salesforce) familiarity; Structured problem-solving; Attention to detail
72,Evernorth,Heathcare,• Financial Planning Analyst,Finance,8.5 LPA,8.1 LPA,5% Variable + Benefits,Hyderabad,-,-,-,-,"•	Final-year students or recent graduates in Finance, Accounting, Economics, Commerce, Business Administration, or related fields.
•	Strong analytical, quantitative, and problem-solving skills.
•	Proficiency in Excel, PowerPoint, and basic financial modeling (knowledge of BI tools like Power BI/Tableau is a plus).
•	Good understanding of financial statements and corporate finance fundamentals.
•	Excellent communication and presentation skills.
•	Ability to work collaboratively in a fast-paced, team-oriented environment."
73,Evernorth,Heathcare,• Project Management – Associate/Analyst,Finance,8.5 LPA,8.1 LPA,5% Variable + Benefits,Hyderabad,-,-,-,-,"•	Pursuing Graduation /PG in Finance, Project Management, Business Administration, or related fields.
•	Strong academic performance.
•	Internship or academic project experience in project coordination, business analysis, or operations will be an added advantage.
•	Strong organizational and time management skills.
•	Excellent communication, presentation, and interpersonal skills.
•	Ability to work collaboratively in cross-functional teams.
•	Proficiency in MS Office (Excel, PowerPoint, Word); exposure to project management tools (MS Project, JIRA, Trello, Asana, etc.) is a plus.
•	Analytical mindset with problem-solving ability.
•	Attention to detail and a proactive approach."
74,Evernorth,Heathcare,• Analyst – Data Analytics,IT,8.5 LPA,8.1 LPA,5% Variable + Benefits,Hyderabad,-,-,-,-,"•	Pursuing a degree in Engineering, Statistics, Mathematics, Economics, Computer Science, Business Analytics, or related fields.
•	Strong academic performance.
•	Exposure to data-related projects, internships, or coursework will be an added advantage.
•	Strong analytical, problem-solving, and critical thinking skills.
•	Proficiency in Excel and familiarity with data visualization tools (Power BI, Tableau, or similar).
•	Basic knowledge of SQL, Python, or R for data handling and analysis.
•	Understanding statistical concepts and data modeling.
•	Excellent communication and presentation skills.
•	Curiosity, adaptability, and a passion for working with data."
75,Evernorth,Heathcare,• Financial Accounting Analyst,Finance,8.5 LPA,8.1 LPA,5% Variable + Benefits,Hyderabad,-,-,-,-,"•	Bachelor’s/Master’s degree in Commerce, Accounting, Finance, or related fields.
•	Strong understanding of accounting principles and financial concepts.
•	Proficiency in MS Excel; familiarity with ERP systems (SAP/Oracle) is a plus.
•	Analytical mindset with strong attention to detail and accuracy.
•	Good communication and collaboration skills.
•	Eagerness to learn, adapt, and grow in a fast-paced finance environment."
76,Evernorth,Heathcare,Management Trainee,Finance,8.84 LPA,8.34 LPA,50k joining ,Hyderabad,-,7 across,-,Finance,"•Post Graduate degree in Commerce, Business Management, Finance/Accounting from premiere B’ Schools
•Experience in Fundamentals/Financial Data Collection from financial statements is preferred.
•Strong numerical skills to accurately interpret and process financial data.
•Excellent verbal and written communication skills for effective team leadership and alignment with client deliverables.
•Strong analytical, reasoning, and detail-oriented skills to ensure data accuracy.
•Proven ability to motivate teams and boost employee morale continuously.
•Good understanding of management concepts and tools
•Accurate numerical ability and reporting skills.
• Flexible and adaptable to evolving business requirements and work in different shifts.
• Proficiency in MS Office tools: Excel, PowerPoint, and Word.
• Drive to learn new things and deliver in a challenging environment
• Exposed to decision making, process improvement tools and techniques."
77,Evernorth,Heathcare,Services Operations Specialist,Finance,8.52 LPA,8.52 LPA,+ 15 Days Accommodation (non-local),Hyderabad,Fresher,-,-,Finance Major,Financial data operations and client services; Finance specialization; strong analytical and numerical skills
78,Evernorth,Heathcare,Advisor – Client Solutions,Finance,8.52 LPA,8.52 LPA,+ 15 Days Accommodation (non-local),Hyderabad,Fresher,-,Finance + B.Tech preferred,Finance Major,Client solutions advisory; financial technology; B.Tech + MBA Finance preferred; strong communication and problem-solving
79,Federal Bank,BFSI,Officer – Sales & Client Acquisition,Marketing,13.08-17.22 LPA,-,-,-,Fresher,-,-,-,Sales and client acquisition; All specializations; strong interpersonal and communication skills
80,Genpact,Consultancy / BPO,Front Line Manager – Contact Centre / Operations,Operations,10.85 LPA,8.5 LPA,0.85 LPA Variable + 1.5 LPA Joining Bonus,"Pan India (24x7 Shift, WFO)",Fresher,-,-,-,Contact centre and operations management; All specializations (except HR); flexible with any shift; Work from office
81,GenY Medium,Marketing / Digital Agency,Digital Business Associate,Marketing,-,-,-,Hyderabad,0-1 year,-,MBA or equivalent (reputed institute),-,Client advisory & relationship management; Google Ads & Meta Ads monitoring; Advanced Excel for reporting; Data analytics & KPI tracking; Strong communication; Instagram/Facebook awareness; Structured thinking & problem-solving
82,GLS Elopak,Manufacturing / Packaging,Sales Management Trainee / Deputy Manager,Marketing,8 LPA + benefits,8 LPA,Benefits,Gurugram / Bengaluru,Fresher,-,B.Tech/MBA (Business / Marketing),Marketing/Sales,Sales strategy implementation; Client relationship management; Sustainability-oriented selling; Communication & presentation skills; Team collaboration; Goal-oriented mindset
83,Goldman Sachs,BFSI,Controllers – Analyst,Finance,12-15 LPA,-,-,Bengaluru / Hyderabad,-,-,CA / MBA Finance,Finance,Financial statements preparation & review; US GAAP & IFRS knowledge; Alternative investments / private funds knowledge; NAV review for PE & hedge funds; Fund administration & auditor coordination; Compliance with financial regulations; Strong ethics & attention to detail
84,HCL Tech,IT,Senior Management Trainee- Sales,Marketing,1000000,900000,100000,Pan India,-,60% across academics,-,-,You have experience implementing certain strategies. • Exceptional communication and interpersonal skills • Understanding of the IT Financial Services Industry and domain • Analytical and business skills • You have strong analytical skills and an aptitude for decision-making. • You show resilience when faced with challenges. • You believe in continuous learning and growth. • You possess a strong work ethic. • You're able to connect with new and existing team members quickly. • You enjoy collaborating with colleagues across the globe. • You enjoy learning new skills and applying them. • You are passionate about innovation. • You want to make an impact.
85,HCL Tech,IT,Senior Management Trainee- Project Management,Marketing,1000000,900000,100000,Pan India,-,60% across academics,-,-,"Effective leadership, interpersonal and communication skills • Influence and Persuasion - Positively influencing and persuading others to take a specific course of action when there is no direct line of command or control. • Strong business awareness, understanding the broader context in which IT delivery has an impact on overall business performance. • Previous experience in consulting in Project Mgmt. role. • Experience of having worked in IT Technology firms will be preferred • Excellent analytical skills and a strong sense for structure and logic • Career bend towards Project Mgmt. • Excellent written and verbal communication • Established academic and previous job record"
86,HCL Tech,IT,Senior Management Trainee- Product Management,Marketing,1000000,900000,100000,Pan India,-,60% across academics,-,-,You have experience implementing certain strategies. • Exceptional communication and interpersonal skills • Understanding of the IT Financial Services Industry and domain • Analytical and business skills • You have strong analytical skills and an aptitude for decision-making. • You show resilience when faced with challenges. • You believe in continuous learning and growth. • You possess a strong work ethic. • You're able to connect with new and existing team members quickly. • You enjoy collaborating with colleagues across the globe. • You enjoy learning new skills and applying them. • You are passionate about innovation. • You want to make an impact.
87,HCL Tech,IT,Senior Management Trainee- sales EMEA,Marketing,1000000,900000,100000,Pan India,-,60% across academics,-,-,"Excellent communication and problem-solving skills • Understanding of latest technology trends across industries • High-Level knowledge of Industry Business Processes and best practices for an industry vertical • Understanding of or experience working with an organization in an industry outside of IT • Ability to prioritize tasks to meet stringent timelines and deadlines • Ability to anticipate issues, challenges and respond to unforeseen changes swiftly • Ability to see problems from different dimensions with instinct to solve them through excellent analytical skills • Interested in learning new technologies and domain related knowledge and ready to take on challenges • Competitor, market, technology, and industry awareness • Budgeting management skills • Problem solving skills • Relationship management • Attention to detail and drive for innovation • Strong presentation skills • Negotiation skills • Collaborative skills"
88,HCL Tech,IT,Senior Management Trainee- Sales FS,Marketing,1000000,900000,100000,Pan India,-,60% across academics,-,-,Ability to learn and adapt quickly. • Excellent analytical skills and a strong sense for structure and logic. • Knowledge of MS Office. • Ability to priorities and deliver to deadlines. • Excellent written and verbal
89,HCL Tech,IT,Senior Management Trainee- GME Sales support,Marketing,1000000,900000,100000,Pan India,-,60% across academics,-,-,Ability to learn and adapt quickly. • Excellent analytical skills and a strong sense for structure and logic. • Knowledge of MS Office. • Ability to priorities and deliver to deadlines. • Excellent written and verbal communication.
90,HCL Tech,IT,Senior Management Trainee- Sales,Marketing,1000000,900000,100000,Pan India,-,60% across academics,-,-,"A “can do” positive attitude • A strong communicator and with an ability to build relationships with various stakeholders • Understanding of Engineering & IT Outsourcing and Offshore Development Centre concept • Work experience preferably in Engineering Service Providers (ESPs) / MNCs / Indian IT Companies, OEMs or Tier 1 • Strong analytical and problem-solving skills with a data-driven mindset. • Ability to work in a fast-paced, global environment with senior leadership exposure. • Proficiency in MS Office (Excel, PowerPoint) and familiarity with digital/social media platforms."
91,HCL Tech,IT,Senior Management Trainee- LSH,Marketing,1000000,900000,100000,Pan India,-,60% across academics,-,-,You have experience implementing certain strategies. • You have strong analytical skills and an aptitude for decision-making. • You show resilience when faced with challenges. • You believe in continuous learning and growth. • You possess a strong work ethic. • You're able to connect with new and existing team members quickly. • You enjoy collaborating with colleagues across the globe. • You enjoy learning new skills and applying them. • You have good communication skills • You are passionate about innovation. • You want to make an impact.
92,Hexaware Technologies,IT / Consultancy,Management Trainee,IT,9-11 LPA + benefits,9-11 LPA,Benefits,"Siruseri, Chennai",6-35 months (travel/transport domain preferred),60% throughout,MBA/PGDM (2-year full-time),-,"Strong analytical skills; MS Office expertise (Excel, Word, PPT, Visio); Exceptional communication & interpersonal skills; Cross-functional teamwork; Multitasking & time management; IT/IT consulting background preferred"
93,HighRadius,IT / SaaS (FinTech),Talent Acquisition Intern (PPO basis),HR,8 LPA (PPO full-time),-,Stipend: 22K/month (27K post-PPO),Hyderabad,Currently pursuing MBA (HR),-,MBA – Human Resources,HR,"Advanced sourcing (LinkedIn, GitHub, campus networks); ATS management & data hygiene; Candidate experience management; Tech-savvy with interest in tech stacks; Strong hustle mentality & data-driven approach; Excellent communication"
94,Hunger box,Technology / F&B,Business Development Manager,Marketing,8 LPA Fixed + Performance-Based Incentive,8 LPA,Performance-Based Incentive,Pan India (Bangalore / Chennai / Hyderabad / Delhi / Mumbai / Pune),Fresher; prior Sales internship preferred,-,-,Marketing / Sales preferred,B2B sales and business development; corporate food services; strong communication and negotiation skills
95,Hunger box,Technology / F&B,Supply Associate,Operations,8 LPA Fixed + Performance-Based Incentive,8 LPA,Performance-Based Incentive,Pan India (Bangalore / Chennai / Hyderabad / Delhi / Mumbai / Pune),Fresher,-,-,Marketing / Sales preferred,Supply chain coordination for corporate food services; vendor management; operational support
96,ICICI Bank,BFSI,Relationship Manager,Marketing,9 LPA,7.45 LPA,1.55 LPA,Mumbai,-,-,-,-,-
97,ICICI Prudential Life Insurance,BFSI,Management Trainee (Non-Frontline),Marketing,-,-,-,-,Fresher,-,-,-,Insurance – non-frontline management roles; All specializations; CTC as per company policy
98,Infosys,IT,FSDCG - Associate Consultant/Senior Associate Consultant ,Finance,1000000,-,-,Pan India,-,-,All specialization & Open to B.E./B.Tech. with more than 1 year of Experience (Preferably in IT).,-,"Knowledge: Either Process understanding or Domain Knowledge in one or two areas, ITIL, COBIT, CMM, Six Sigma and other operational process frameworks awareness, ESM tools and architecture knowledge. A graduation degree in B Tech/BE (Any stream) or BSc (Comp Sc), and two or more years of work experience prior to MBA preferred. Skills: Communication (Written & Verbal) Consulting, Assessment, Design, Deployment, testing, Client Interfacing skills, Team management"
99,Infosys,IT,CIS ServiceNow - Associate Consultant/Senior Associate Consultant,Finance,1000000,-,-,Pan India,-,-,All specialization & Open to B.E./B.Tech. with more than 1 year of Experience (Preferably in IT).,-,"Knowledge: Either Process understanding or Domain Knowledge in one or two areas, ITIL, COBIT, CMM, Six Sigma and other operational process frameworks awareness, ESM tools and architecture knowledge. A graduation degree in B Tech/BE (Any stream) or BSc (Comp Sc), and two or more years of work experience prior to MBA preferred. Skills: Communication (Written & Verbal) Consulting, Assessment, Design, Deployment, testing, Client Interfacing skills, Team management"
100,Infosys,IT,Associate Lead / Senior Associate Lead – Talent Acquisition,HR,11.5-13 LPA,-,-,Pan India,Fresher,-,-,HR Major,Talent acquisition and HR; HR specialization required; strong communication and networking skills
101,Infosys,IT,DX – Associate Consultant / Senior Associate Consultant,IT,8.5-10 LPA,-,-,Pan India,Fresher,-,-,Marketing / Operations Major,Digital transformation consulting; Marketing and Operations specialization; strong communication and analytical skills
102,Infosys,IT,TPD – Analyst / Senior Analyst,HR,8.5-10 LPA,-,-,Pan India,2-3 years IT background workex,-,-,HR Major,Technology and process design; HR specialization; 2-3 years IT background required
103,Invesco,BFSI,A. Marketing Compliance,Finance,13.3 LPA,9 LPA," Annual Bonus: ~INR 90,000 (0–10% of fixed pay)
 Joining Bonus: INR 90,000 (with a 12-month clawback)
 Relocation Allowance: INR 2,50,000 (if eligible)",Pan India,-,60% across,-,Finance,"• Understanding of Financial markets, Financial Products and Mutual fund industry
• Good analytical skills and attention to detail
• Strong communication and interpersonal skills to work effectively with a network of colleagues spread across 
different time zones
• Proficiency in MS Office applications
• A positive attitude and willingness to learn
• High standards of ethics and integrity with strong emphasis on compliance with rules/regulations 
• Open to flexible working hours"
104,Invesco,BFSI,B. Global Regulatory Reporting,Finance,13.3 LPA,9 LPA," Annual Bonus: ~INR 90,000 (0–10% of fixed pay)
 Joining Bonus: INR 90,000 (with a 12-month clawback)
 Relocation Allowance: INR 2,50,000 (if eligible)",Pan India,-,60% across,-,Finance,"• Understanding of Financial markets, Financial Products and Mutual fund industry
• Good analytical skills and attention to detail
• Strong communication and interpersonal skills to work effectively with a network of colleagues spread across 
different time zones
• Proficiency in MS Office applications
• A positive attitude and willingness to learn
• High standards of ethics and integrity with strong emphasis on compliance with rules/regulations 
• Open to flexible working hours"
105,Invesco,BFSI,Business Trainee (Finance Operations),Finance,13.3 LPA,9 LPA,Annual Bonus ~90K + Joining Bonus 90K + Relocation 2.5L,Pan India,Fresher,50% throughout,-,Finance Major,Financial markets and mutual fund operations; MBA/PGDM Finance; understanding of financial products; strong analytical and communication skills
106,Invesco,BFSI,Business Trainee – Front Office Operations,Finance,-,-,-,Hyderabad,Fresher,60% across,-,Finance,"Front office operations support for global fund managers; platform management, process improvements, control monitoring; Understanding of financial markets and asset management operations"
107,IQEQ,BFSI / Fund Accounting,Fund Accountant (AC1/AC2/AC3),Finance,6.90–8 LPA,6.90–8 LPA,-,India,Fresher,-,-,Finance Major,"NAV reporting, financial statements, journal entries, capital call/distribution workings; private equity/debt fund accounting; Investran/Paxus platforms; Finance specialization mandatory"
108,James Douglas,Consultancy / Research,Research Consultant,Finance,11-14 LPA,-,-,Mumbai,Fresher,-,-,-,Market research and consulting; All specializations; strong analytical and research skills
109,Jeh Aerospace,Aerospace / Manufacturing,Management Trainee – HR,HR,9–10 LPA (All Fixed),9–10 LPA,-,-,Fresher,-,-,HR Major,"HR management trainee role in aerospace; recruitment, employee relations, HR operations; HR specialization mandatory"
110,Kansai Nerolac Paints Limited,Manufacturing / FMCG,Management Trainee (Deco Sales),Marketing,9.5 LPA (incl. 15% PLI),~8.26 LPA,15% PLI,-,Fresher,60% and above throughout,-,-,Decorative paints sales; MT role; All specializations; strong analytical and interpersonal skills; 60%+ in all academics
111,Keertana Finserv,BFSI,Credit Analyst,Finance,15 LPA,10 LPA,5 LPA,Hyderabad,-,-,-,Finance,"•
Strong analytical skills with the ability to interpret financial data, cashflows, and business metrics.
•
Good understanding of credit risk assessment, financial analysis, and loan appraisal processes.
•
Excellent communication and interpersonal skills, with the ability to interact effectively with clients and stakeholders.
•
Attention to detail and a thorough approach to evaluating clients’ creditworthiness.
•
Proficiency in Microsoft Office, especially Excel; familiarity with credit analysis tools or software is a plus.
•
Ability to work independently and make sound decisions under pressure.
•
Strong ethical standards and a commitment to maintaining confidentiality and integrity in handling client information."
112,Keertana Finserv,BFSI,Grievance Handling Executive – Customer & Employee Relations,"HR, Marketing",15 LPA,10 LPA,5 LPA,Hyderabad,-,-,-,-,"•
Strong verbal and written communication skills (English and local language preferred)
•
Empathy, patience, and problem-solving attitude
•
Proficiency in MS Excel / Google Sheets for tracker maintenance
•
Ability to multitask and manage time effectively
•
High attention to detail and accuracy in data entry"
113,Keertana Finserv,BFSI,Executive- Business Progress Monitoring,,15 LPA,10 LPA,5 LPA,Hyderabad,-,-,-,-,"

Excellent communication and motivational skills

Telugu language speaking is mandatory, as the role involves interaction with officials across rural branches in Andhra Pradesh and Telangana

Strong voice command and presentable demeanor

Above-average aptitude test scores

Basic proficiency in Microsoft Excel

Proven ability to take accountability and responsibility for assigned tasks

Experience in tracking and reporting financial metrics (preferred)"
114,Keertana Finserv,BFSI,HR ,HR,15 LPA,10 LPA,5 LPA,Hyderabad,-,-,-,HR,"•
Effective verbal and written communication skills
•
Demonstrated proficiency in the Microsoft Office suite
•
Knowledge of a broad range of human resource strategies and practices, including compensation, performance management, safety, hiring and employee relations; able to apply these strategies and practices in compliance with employment regulations
•
Ability to create a culture of collaboration and teamwork
• Experience with analyzing data to guide strategic employment planning"
115,Keertana Finserv,BFSI,Executive,Finance,15 LPA,10 LPA,5 LPA,Hyderabad,-,-,B.Com,-,"• B.Com
• Good knowledge of accounting principles and practices."
116,Keertana Finserv,BFSI,Executive – Internal Audit,Finance,15 LPA,10 LPA,5 LPA,Hyderabad,-,-,-,Finance/Operations/General,"• Good communication and analytical skills
• Basic knowledge of financial products, NBFC functioning is a plus"
117,Keertana Finserv,BFSI,Executive – Backend Operations,Operations,8 LPA (6L Fixed + 2L Variable) + Benefits,6 LPA,2 LPA Variable,Hyderabad,Fresher,-,-,All Specializations (Telugu mandatory),"KYC verification, NEFT processing, repayment monitoring, MIS reports, collections follow-up, loan documentation; Telugu language mandatory"
118,Keertana Finserv,BFSI,Executive – Branch Surveillance (Gold Segment),Operations,8 LPA (6L Fixed + 2L Variable) + Benefits,6 LPA,2 LPA Variable,Hyderabad,Fresher,-,-,All Specializations (Telugu mandatory),Branch monitoring via CCTV and dashboards; gold loan procedure compliance; vault/locker access verification; branch opening/closing compliance; risk mitigation; Telugu language mandatory
119,KonnectNXT,Technology / SaaS,Growth - GTM,Marketing,12 LPA,8 LPA,4 LPA Incentives,-,Fresher,-,-,-,Go-to-market strategy and growth; All specializations; strong communication and analytical skills
120,KPi-Tech Services Inc.,Healthcare IT,People & Talent Manager,HR,-,-,-,Hyderabad,0-2 years,-,MBA – HR Specialization,HR,Full talent acquisition lifecycle ownership; HR operations management; Recruitment strategy & JD development; ATS & HRMS proficiency; AI tools & automation in HR; Client-facing recruitment coordination; Team leadership; Strong communication & assertiveness
121,Loyalty Juggernaut,IT / SaaS (Loyalty Management),Product Specialist,Marketing,8-12 LPA + Benefits,-,-,-,Fresher (2026 batch),7 CGPA (or equivalent) and above,Engineering degree (CS/IT preferred),Marketing/Operations Major,"Client discovery sessions, requirement analysis & KPI definition; business case & market feasibility development; loyalty strategy guidance & tailored solution recommendations; GRAVTY® loyalty program implementation oversight; client training program design & delivery; project documentation & SLA compliance; product marketing collateral (white papers, presentations); go-to-market strategy contribution; MBA Marketing/Operations + Engineering (CS/IT preferred); strong communication & problem-solving mindset"
122,Loyalty Juggernaut,IT / SaaS (Loyalty Management),Sr. Pre-Sales Specialist,Marketing,8-12 LPA + Benefits,-,-,-,Fresher (2026 batch),7 CGPA (or equivalent) and above,Engineering background in CS/IT OR Mass Communication,Marketing/Analytics Major,"Technical pre-sales support & solution articulation for the sales team; customized proposals & RFP/RFQ responses (cost estimates, timelines, scope); product demonstrations & POC facilitation; deep expertise in GRAVTY® product features & industry trends; client relationship building & technical query resolution; cross-functional collaboration with product, marketing & customer success; MBA Marketing/Analytics + Engineering (CS/IT) or Mass Comm; strong MS PowerPoint/Excel skills; B2B SaaS customer success/account management experience a plus"
123,Loyalty Juggernaut,IT / SaaS (Loyalty Management),Sr. Specialist-Analytics,IT,8-12 LPA + Benefits,-,-,-,Fresher (2026 batch),7 CGPA (or equivalent) and above,Engineering degree (CS/IT preferred),Analytics Major,"Data-led business & product strategy across Marketing, Product & Sales; interpretation of large data sets for growth opportunities & customer behaviour patterns; KPIs, dashboards & business scorecards; predictive analytics (forecasting, churn prediction, customer segmentation); cross-functional collaboration with global teams; MBA Analytics + Engineering (CS/IT preferred); proficiency in Excel, SQL & a visualization tool (Tableau/Power BI); strong analytical & storytelling skills"
124,Macquarie Group Limited,BFSI,Senior Associate – Data Management,IT,13 LPA,13 LPA,-,-,Fresher,7 CGPA,B.Tech + MBA,-,Data management and analytics; All specializations + B.Tech; strong analytical skills
125,Maha Cement (My Home Industries Pvt. Ltd.),Manufacturing / Cement,Management Trainee – Finance,Finance,6-8 LPA + benefits,-,-,Hyderabad (Head Office),Fresher,-,MBA Finance / M.Com / CA Inter / CMA Inter,Finance,"Strong numerical & analytical ability; Attention to detail & accuracy; Accounting & financial concepts; MIS reporting; MS Excel (Advanced); Power BI/Tableau basics; Tally/ERP/SAP preferred; GST, TDS & statutory compliance knowledge"
126,Maha Cement (My Home Industries Pvt. Ltd.),Manufacturing / Cement,Management Trainee – Logistics,Operations,6-8 LPA + benefits,-,-,Hyderabad (Head Office),Fresher,-,MBA (Logistics/SCM/Operations) / BE/B.Tech Industrial/Mechanical,Operations,Analytical & problem-solving skills; Logistics technology & SCM analytics; MS Excel (Advanced preferred); Power BI / Data Analytics basics; ERP/SAP knowledge preferred; GPS & ERP-based vehicle tracking; Willingness to travel
127,Maha Cement (My Home Industries Pvt. Ltd.),Manufacturing / Cement,Management Trainee – Marketing,Marketing,6-8 LPA + benefits,-,-,Hyderabad (Head Office),Fresher,-,MBA Marketing / BBA,Marketing/Sales,Strong communication & interpersonal skills; Analytical thinking & presentation; Willingness to travel for market visits; Customer-focused & target-oriented; MS Excel & PowerPoint; CRM tools basics; Power BI basics; Digital marketing awareness
128,Mahindra Finance,BFSI,Process Manager - Sales Reward,Marketing,1000000,800000,200000,Pan India,-,-,-,-,Analytical Ability • Communication Skills • Good Interpersonal Skills. • Policy Adherence. • Customer Focus • Decision Making • Problem solving • Team Work
129,Mahindra Finance,BFSI,Sales Manager,Marketing,1000000,800000,200000,Pan India,-,-,-,-,Analytical Ability • Communication Skills • Good Interpersonal Skills. • Policy Adherence. • Customer Focus • Decision Making • Problem solving • Team Work
130,Mahindra Finance,BFSI,Area Collection Manager,Marketing,1000000,800000,200000,Pan India,-,-,-,-,Analytical Ability • Communication Skills • Good Interpersonal Skills. • Policy Adherence. • Customer Focus • Decision Making • Problem solving • Team Work
131,Mahindra Finance,BFSI,Dealer Sales Associate,Marketing,1000000,800000,200000,Pan India,-,-,-,-,Analytical Ability • Communication Skills • Good Interpersonal Skills. • Policy Adherence. • Customer Focus • Decision Making • Problem solving • Team Work
132,Mahindra Finance,BFSI,Area Business Manage,Marketing,1000000,800000,200000,Pan India,-,-,-,-,Analytical Ability • Communication Skills • Good Interpersonal Skills. • Policy Adherence. • Customer Focus • Decision Making • Problem solving • Team Work
133,Mahindra Finance,BFSI,Pre Due CC & Operations Manager,Marketing,1000000,800000,200000,Pan India,-,-,-,-,Analytical Ability • Communication Skills • Good Interpersonal Skills. • Policy Adherence. • Customer Focus • Decision Making • Problem solving • Team Work
134,MedPlus Health Services Limited,Heatlthcare,Project Management,Operations,9 LPA,7.2 LPA,1.8 LPA,-,-,PGDM 8.5 ,-,-,"•	Education: MBA/PGDM or equivalent degree in Operations, Strategy, Analytics.
•	Experience: 0–1 years (freshers with relevant internships/projects are welcome)
•	Strong analytical mindset with attention to detail
•	Proficiency in Excel, PowerPoint, and familiarity with analytical tools.
•	Effective communication, coordination, and stakeholder management skills."
135,MedPlus Health Services Limited,Heatlthcare,Private Label Supply Chain,Operations,9 LPA,7.2 LPA,1.8 LPA,-,-,PGDM 8.5 ,-,-,"•	An analytical mind with a strategic ability
•	Excellent communication and people skills
•	Proven experience as category manager or similar role a plus
•	Solid knowledge of category management, marketing and sales principles
•	Understanding of data analysis and forecasting methods
•	Proficient in MS Office"
136,MedPlus Health Services Limited,Heatlthcare,Retail Operations,Marketing,8 LPA,6.2 LPA,1.8 LPA,-,-,PGDM 7.5 ,-,-,-
137,MedPlus Health Services Limited,Heatlthcare,Management Trainee – Retail Operations,Operations,12 LPA (incl. 2L Retention Bonus),10 LPA,2 LPA Retention Bonus,-,Fresher,-,-,-,Retail pharmacy operations; All specializations; strong analytical and team management skills
138,Meridian Data Labs,Technology / DeepTech,Business Development Associate,Marketing,6.5 LPA + Performance-Based Variable,6.5 LPA,Performance-Based Variable (discussed at interview),"Hyderabad, Telangana",Fresher,-,Bachelor's in Engineering (mandatory),Marketing/Sales Major,"Identify and qualify business opportunities across Defence, Manufacturing, Energy and Telecom sectors; market research; build enterprise customer relationships; prepare proposals and presentations; manage sales pipeline/CRM; MBA/PGDM in Marketing/Strategy/Operations with Engineering UG mandatory; strong analytical, communication and stakeholder management skills; interest in AI/IoT/Edge Computing technologies"
139,Micron,Manufacturing, Business Analyst,IT,13.13 LPA,8.25 LPA,4.88 LPA,Hyderabad ,-,PGDM - 7.5,-,-,"• Some experience or knowledge of ERP Tools under Enterprise Applications.
• Some experience in Software Engineering background is value added.
• Strong analytical, problem solving, and organizational skills.
• Strong verbal and written communication skills.
• Attention to detail.
• Exposure to Project Methodology is an added advantage"
140,Minfy Technologies,IT / Cloud Services,Management Trainee,IT,8.5 LPA + Variable,8.5 LPA,Variable,Hyderabad,Fresher,-,MBA/PGDM,-,"Cloud services – alliances, sales operations, pre-sales, practices; analytical mindset; strong communication; high ownership and adaptability"
141,Mobavenue,IT / AdTech & MarTech,Sales & Client Servicing Executive,Marketing,7 LPA,6 LPA,1 LPA variable,Bengaluru / Mumbai,0-1 year (Fresher),-,Bachelor's/Master's (Marketing/Business/Management),Marketing/Sales,"Strong communication & interpersonal skills; Basic digital marketing / mobile app ecosystem understanding; Analytical mindset; Excel proficiency; CRM records management; Campaign KPI monitoring (CPI, CPA, CTR)"
142,MSN Labs,Pharma / Healthcare,Management Trainee – Business Development,Marketing,6 LPA + Benefits,6 LPA,-,Hyderabad,Fresher,-,MBA Operations / Marketing / Analytics,Marketing/Sales or Operations/Analytics,"Pharmaceutical business development; portfolio strategy, market dynamics; structured exposure across verticals; B2B sales and client engagement"
143,MSN Labs,Pharma / Healthcare,HR Management Trainee,HR,6 LPA + Benefits,6 LPA,-,Hyderabad,Fresher,-,MBA HR,HR Major,"Domestic and international HR operations; recruitment, payroll coordination, employee engagement, global HR processes"
144,MSN Labs,Pharma / Healthcare,Supply Chain / Demand Planning / Analytics Team Member,Operations,6 LPA + Benefits,6 LPA,-,Hyderabad,Fresher,-,MBA Operations / Marketing / Analytics,Operations/Analytics,"Supply chain analytics, demand planning, supply planning; ERP tools, Power BI/Tableau/Excel; S&OP support; KPI tracking; MBA Operations or Analytics mandatory"
145,MSN Labs,Pharma / Healthcare,Business Development – Digital Operations & Xperience (DOX) Team,Marketing,6 LPA,6 LPA,-,"Hyderabad (Corporate Office, Hitech City)",Fresher,-,-,Marketing Major,"Digital customer onboarding workflow automation (team member details, communication matrix, escalation matrix, project charter, periodic surveys); building secure customer-facing project dashboards with automated milestone/delay alerts to BD and Ops leadership; development of a quarterly production planning and visibility tool (MSN vs CRAMSN project scheduling); cross-functional coordination across Digital Operations and Xperience (DOX); MBA Marketing specialization mandatory"
146,Nalsoft,IT / ERP Consulting,Trainee Consultant,IT,7 LPA,7 LPA,-,Hyderabad,Fresher (2026 batch),70% in 10th & 12th; 60% in UG & PG,MBA/PGDM/PGDBM (2026 batch),Operations/SCM/HR/Finance/IB/Marketing,"Good domain knowledge in specialization; Excellent verbal & written communication; Presentation & interpersonal skills; Analytical thinking; Team player & independent worker; MS Word, Excel, Access, PowerPoint; Willingness to travel abroad; ERP consulting exposure"
147,Nayas Laboratories Pvt. Ltd.,Pharma / Healthcare,Business Development – Open Roles,Marketing,11-15 LPA (Performance Based),-,Performance based,Hyderabad,Fresher,-,B.Pharm + MBA/PGDM,Marketing/Sales,Pharma business development; B.Pharm in graduation preferred; strong sales and communication skills
148,Neilsoft Ltd,Technology / AEC,Management Trainee – Sales,Marketing,6–7 LPA,6–7 LPA,-,Ahmedabad / Pune / Bangalore / Delhi / Hyderabad,Fresher,-,B.E/B.Tech + MBA Sales/Marketing preferred,Marketing/Sales Major,AECO technology sales (BIM/Bluebeam solutions); client relationship management; identify business opportunities; SaaS/technology sales background preferred
149,NephroPlus,Healthcare / Operations,Management Trainee – Operations,Operations,10.5 LPA (incl. 10% Variable),~9.55 LPA,10% Variable,Pan India,Fresher,-,-,Operations Major,Strategic decision-making support; process improvement; workflow analysis; cross-functional project leadership; field visits; stakeholder presentations; MBA Operations
150,NSL Infratech,Real Estate / Infrastructure,Management Trainee – Investment Research & Analysis,Finance,8 LPA + Benefits,8 LPA,-,Hyderabad,Fresher (2–3 yrs preferred for FO role),-,MBA Finance,Finance Major,"Investment research across equities, fixed income, real estate, private equity; financial modelling; portfolio monitoring; family office context; Finance specialization mandatory"
151,Optimidea Network Private Limited,IT / Digital Advertising (Performance Marketing),Business Development Manager – International,Marketing,"Probation (3 months): 3 LPA; Post-Probation: 7 LPA (6 LPA Fixed + 1 LPA Performance Bonus, target-linked)",6 LPA (Post-Probation),1 LPA Performance Bonus (target-linked),"Gurugram, Haryana",Fresher,-,-,Marketing/Sales Major,"Prospecting international advertisers, agencies and brand partners across US/Europe/SEA/Middle East; pitching CPS, CPL and CPI performance marketing solutions; driving programmatic advertising partnerships with DSPs, SSPs and trading desks; negotiating CPM/CPC deals and managing audience-targeted display, video and native campaigns; building long-term relationships with international advertisers and media buying agencies; monitoring global market and competitor trends; MS Excel proficiency; familiarity with Google Ads, Meta Ads, Adjust, Branch, AppsFlyer and Affise; hunter mindset with strong ownership of revenue targets; ability to work across time zones"
152,Optimidea Network Private Limited,IT / Digital Advertising (Performance Marketing),Publisher Manager,Marketing,"Probation (3 months): 3 LPA; Post-Probation: 7 LPA (6 LPA Fixed + 1 LPA Performance Bonus, target-linked)",6 LPA (Post-Probation),1 LPA Performance Bonus (target-linked),"Gurugram, Haryana",Fresher,-,-,Marketing/Sales Major,"Onboarding and managing affiliate/publisher portfolios across Finance, FMCG, E-Commerce and Telecom verticals; briefing publishers on offer details, payout structures, creatives and targeting criteria; monitoring traffic quality via anti-fraud and tracking platforms (Adjust, Branch, AppsFlyer, P360, Affise, Mfilterit); managing campaign caps, pauses and real-time budgets across live campaigns; analyzing funnel metrics and MTD performance reports to optimize conversions; resolving billing disputes and coordinating invoice approvals; close collaboration with Client Success and Ad Ops teams; MS Excel proficiency and a quality-first, detail-oriented mindset"
153,Oracle,IT,Staff Consultant- EPM,Finance,10.6 LPA,9.98 LPA,62k,-,-,PGDM 7,-,Finance,"▪ Master’s degree in business administration (MBA Finance)
▪ Strong functional understanding of accounting, finance, and taxation processes
▪ Excellent communication skills – both written & verbal, mandatory
▪ Ability to present ideas and solutions in a clear & concise manner.
▪ Self-motivated, energetic, and self-driven with ability and willingness to learn quickly.
▪ Should have good analytical and research skills
▪ Excellent MS Office Skills (Excel, PowerPoint and Word)
▪ Exposure to Enterprise Application systems would be an added advantage.
▪ Good interpersonal skills with ability to build rapport with all stakeholders."
154,Oracle,IT,Staff Consultant- Finance,Finance,10.6 LPA,9.98 LPA,62k,-,-,PGDM 7,-,Finance,"▪ Master’s degree in business administration (MBA Finance)
▪ Excellent communication skills – both written & verbal, mandatory
▪ Ability to present ideas and solutions in a clear & concise manner.
▪ Excellent MS Office Skills (Excel, PowerPoint, and Word)
▪ Self-motivated, energetic, and self-driven with ability and willingness to learn quickly.
▪ Passion for reading and learning as way of life.
▪ Good interpersonal skills with ability to build rapport with all stakeholders.
▪ Should have good analytical and research skills.
▪ 2-4 years of experience in Finance function or Industry experience will be an added advantage.
▪ Exposure to Enterprise Application systems would be an added advantage."
155,Oracle,IT,Associate Engineer / Associate Analyst,IT,11.06 LPA,11.06 LPA,-,Bangalore,Fresher,7 CGPA or 70%+,Any UG,HR / IT / Finance + B.Tech / Business Analytics + B.Tech,"Enterprise application support and development; no active arrears; HR, IT, Finance, or BA specialization with BE/B.Tech UG"
156,Orange Health Labs,Healthcare / Diagnostics,Business Development Manager,Marketing,7.8 LPA (incl. performance-based incentive),~7 LPA,Performance-Based Incentive,Mumbai / Noida / Hyderabad / Bangalore,Fresher,-,Science Graduate preferred,Marketing/Sales,B2B sales to doctors/KOLs; territory management; lead generation; achieve sales targets; strong verbal/written communication; diagnostics sales experience preferred
157,Orange Health Labs,Healthcare / Diagnostics,Account Executive,Operations,-,-,-,-,Prior experience as Account Executive with insurers (mandatory),-,-,-,Strong communication & relationship management; Detail-oriented & highly organized; Data analysis for operational decisions; Proactive & accountable; Insurer onboarding & process compliance; Cross-team collaboration
158,Otis Elevator (via The Career Company),Manufacturing / Elevator & Escalator,Management Trainee – Sales (Sales Management Associate Program),Marketing,7 LPA (training); 9-10 LPA (post-conversion),7 LPA,-,Bengaluru / Delhi / Kolkata / Pune / Mumbai / Noida / Gurgaon,Fresher,-,B.Tech/BE + MBA,Marketing/Sales,"Strong communication, negotiation & interpersonal skills; Sales strategy development; Customer relationship management; Market research; Proposal preparation; Willingness to travel; Women candidates preferred for Sales Management Associate Program"
159,Oxane Partners,BFSI / Private Credit,Senior Analyst – Platform Solutions Group,Finance,15.85 LPA (Fixed: 10.5L + Bonus: 1.05L + Benefits: 4.3L),10.5 LPA,1.05 LPA Annual Performance Bonus + Shift Allowance,Gurgaon / Hyderabad,Fresher,-,-,Finance / All (private credit background preferred),Private credit platform management; understand client requirements; report building; cross-team implementation; general/afternoon/evening/night shift options; cab facility
160,OYO Rooms,Hospitality / Technology,Demand Manager,Marketing,7.5 LPA,6 LPA,1.5 LPA variable,Multiple locations,2-7 years; B2B sales; Hospitality/travel industry a plus,-,-,Marketing/Sales,Networking ability; ERP/App usage & Excel; Negotiation skills; Analytical ability; Internal stakeholder management; Cold calling & offline sales; Channel partner development
161,OYO Rooms,Hospitality / Technology,Relationship Manager,Marketing,7.5 LPA,6 LPA,1.5 LPA variable,Multiple locations,2-7 years; Operations/key accounts; Hospitality/travel a plus,-,-,Marketing/Sales,Networking ability; ERP/App usage & Excel; Negotiation skills; Analytical ability; Portfolio management; Revenue generation through booking conversions; Customer & guest experience management
162,OYO Rooms,Hospitality / Technology,Business Development Manager,Marketing,7.5 LPA,6 LPA,1.5 LPA variable,Multiple locations,2-7 years; B2B sales/client onboarding; Hospitality/travel a plus,-,-,Marketing/Sales,Networking ability; ERP/App usage & Excel; Negotiation & contract review; Analytical ability; Property acquisition & onboarding; Stakeholder liaison; Market trend monitoring
163,Pacific Engineered Surfaces Pvt Ltd,Manufacturing,Management Trainee - Business Development,Marketing,13 LPA (8 LPA Fixed + 5 LPA Variable),8 LPA,"Up to 5 LPA (Commission, Incentives & Performance Bonus)",Bengaluru,Fresher (2-month probation at 50% fixed pay),-,-,Marketing/Sales Major,"Architect engagement, project sales, client outreach, pipeline management and market development across Bangalore and other key markets; MBA/PGDM with strong communication skills, ownership mindset, and willingness to work in a fast-paced environment"
164,PalTech,IT,Business Analyst,IT,13 LPA (8 LPA Fixed + 5 LPA Variable),8 LPA,"Up to 5 LPA (Commission, Incentives & Performance Bonus)",Hyderabad,-,65 % across,-,-,"❖
Excellent communication skills
❖
Strong analytical and problem-solving skills
❖
Proven experience working with cross-functional and self-managing Agile teams.
❖
Ability to work in a fast-paced, dynamic environment with changing priorities
❖
Familiarity with Agile/Scrum events and artifacts
❖
Strong understanding of specific domains such as Healthcare, Finance, Logistics, etc.
❖
Good hands-on experience with Microsoft Office and Google Suite
❖
Familiarity with SQL Basics/Advanced
❖
Functional/Data Testing
❖
Authored and Published Articles or Whitepapers
❖
Familiarity with requirement management tools such as Jira, Confluence, Figma, Microsoft Visio, or similar tools
❖
Proven working experience as a Business Analyst/Consultant in the IT Services sector and exposure to Retail, eCommerce, Vendor Management System"
165,PalTech,IT,HR ,HR,13 LPA (8 LPA Fixed + 5 LPA Variable),8 LPA,"Up to 5 LPA (Commission, Incentives & Performance Bonus)",Hyderabad,-,-,-,HR,"❖ Must have a master’s degree in HR field
❖ Strong networking and collaborative skills
❖ Excellent communication skills
❖ Demonstrated ability to align human capital strategies with overarching business objectives
❖ Strong interpersonal and emotional intelligence skills to navigate complex stakeholder relationships
❖ Proven agility in adapting to dynamic, fast-paced, and evolving business environments
❖ Proficiency in leveraging HR data and analytics to support evidence-based decision making
❖ Experience in managing cross-functional stakeholders and driving collaborative outcomes across the organization"
166,PalTech,IT,Executive – Talent Acquisition,HR,8-11 LPA,-,-,Hyderabad,Fresher,65% throughout,-,HR Major,Talent acquisition; HR specialization; strong communication and networking skills; 65% throughout academics
167,Patil Group,Logistics / Infrastructure,Management Trainee – Logistics,Operations,12 LPA,12 LPA,-,Hyderabad,0-2 years (logistics/supply chain preferred),-,-,Operations Major,Logistics and transportation management; supply chain operations; Manufacturing/Infrastructure sector exposure preferred
168,Pee Safe,FMCG / Consumer,Management Trainee – Sales & Business Leadership Track,Marketing,13 LPA,13 LPA,-,-,Fresher,-,-,Marketing Major,Sales and business leadership; FMCG/consumer goods; Marketing specialization; strong communication and leadership skills
169,Peepal Consulting,Consultancy / Staffing,Founders Office – Growth,Operations,10 LPA (incl. 25% variable),7.5 LPA,2.5 LPA Variable,-,Fresher,7 CGPA in PGDM,-,-,"Growth strategy and operations; talent consulting firm; analytical, high ownership; work closely with leadership; drive business expansion"
170,Peepal Consulting,Consultancy / Staffing,Business Development Executive,Marketing,10 LPA (incl. 25% variable),7.5 LPA,2.5 LPA Variable,-,Fresher,7 CGPA in PGDM,-,-,Business development; client acquisition; talent consulting industry; strong communication and sales skills
171,Phenom,IT / HR Tech (Applied AI),Associate Technical Program Manager (Big Bets),IT,10 LPA + Benefits,10 LPA,-,Hyderabad (Onsite),Fresher / Entry-level,-,B.Tech in Computer Science (or closely related Engineering),-,"Structuring & driving cross-functional technical initiatives; translating ambiguous business problems into technical roadmaps; program metrics/timeline/risk tracking; stakeholder alignment across Product, Engineering & Business; working familiarity with APIs/cloud/SDLC; MBA from premium institute (IIM/ISB/equivalent) preferred; strong analytical and communication skills"
172,PNB MetLife,BFSI / Insurance,Territory Manager,Marketing,12 LPA (6 LPA Fixed + 6 LPA Variable) + Benefits,6 LPA,6 LPA,-,-,-,-,All Specializations,"Recruit, onboard and train Business Partners (Agency Leaders) and Insurance Advisors; provide product, sales and process training; drive team sales targets, KPIs and incentive milestones; conduct review meetings and monitor daily sales activities/lead generation/policy closures; ensure IRDAI, AML/KYC and compliance adherence; track productivity via MIS reports and dashboards; drive recruitment, training programs and digital adoption of CRM/sales tools; strong leadership, coaching and relationship-building skills"
173,Policy Bazaar,BFSI / InsurTech,Management Trainee – Corporate Sales,Marketing,9 LPA + Incentives (avg 1.5L) + 1L Retention Bonus,7.5 LPA,~1.5 LPA Incentives,Pan India,Fresher,-,-,-,Insurance corporate sales; All specializations; strong communication; retention bonus after 12 months
174,Policy Bazaar,BFSI / InsurTech,Management Trainee – Key Account Manager / Client Servicing,Marketing,9 LPA + Incentives (avg 1.5L) + 1L Retention Bonus,7.5 LPA,~1.5 LPA Incentives,Pan India,Fresher,-,-,-,Key account management and client servicing; All specializations; relationship management skills
175,Pur Energy Pvt. Ltd.,Technology / Energy,Business Associate (AI Entrepreneur in Residence),IT,9-12 LPA,-,-,-,Fresher,-,-,IT / Analytics preferred,AI and technology business associate; All specializations; IT/Analytics majors preferred; strong analytical and strategic thinking
176,Randstad India Pvt. Ltd.,HR Consulting / Staffing,Sales Advisor (Talent Advisor / Practise Advisor),Marketing,10-10.5 LPA + Variable (up to 15% Fixed),10-10.5 LPA,Up to 15% Variable,Bangalore / Delhi / Hyderabad / Gurgaon,Fresher,75% and above in PGDM,-,-,HR staffing and recruitment sales; client acquisition; All specializations; strong communication and relationship skills
177,Randstad India Pvt. Ltd.,HR Consulting / Staffing,Practise Consultant / Account Manager,Marketing,10-10.5 LPA + Variable,10-10.5 LPA,Up to 15% Variable,Bangalore / Delhi / Pune / Chennai,Fresher,75% and above in PGDM,-,-,Client management and talent consulting; staffing industry; strong communication and analytical skills
178,Recrivio,Technology / SaaS,GTM Associate,Marketing,18-22 LPA OTE,8-10 LPA,1L Retention + 1L Perf Bonus + 8-10L OTE Incentives,Bengaluru (On-site),Fresher,-,-,-,Go-to-market strategy and sales; All specializations; strong analytical and communication skills; high incentive earning potential
179,Recykal,CleanTech / Sustainability,Management Trainee (Cross-Functional Program),Operations,10 LPA (Yr1); 18 LPA post-absorption,6 LPA,2 LPA Variable + 2 LPA Retention,Hyderabad,Fresher,-,-,-,"Circular economy and sustainability; 12-month rotational program across Operations, Product, Marketing, Strategy; 18 LPA upon absorption as Manager"
180,Red Rose Mart,Retail,Business Development,Marketing,20-24 LPA,20-24 LPA,-,-,Fresher,-,-,-,Business development in retail; All specializations; strong communication and sales skills
181,Rockwell Industries Limited,Manufacturing / Cooling Solutions,Management Trainee – Marketing,Marketing,-,-,-,Hyderabad,Fresher,-,-,Marketing Major,"Brand building, social media marketing, market research, campaign execution, events; coordinate with Sales, Product, Design; MBA/PGDM Marketing mandatory"
182,Rockwell Industries Limited,Manufacturing / Cooling Solutions,Key Account Manager – Sales,Marketing,5–6 LPA,5–6 LPA,-,Hyderabad,Fresher,-,-,-,Key account management and sales; cooling solutions / commercial refrigeration sector; strong communication and client management skills
183,Ryan,Consultancy / Tax,Tax Associate,Finance,5 LPA + Benefits,5 LPA,-,Hyderabad,Fresher (2026 pass outs),-,-,Finance Major,"Tax bill verification, refund processing, property tax returns, handling calls with tax jurisdictions; rotational shifts (7AM–4PM / 2PM–11PM); transport provided; MBA Finance mandatory"
184,Sapphire Human Capital,HR Consulting,Management Trainee (Research Associate),HR,11 LPA,8 LPA,1 LPA Retention Bonus + 2 LPA Performance Incentive,Gurgaon / Mumbai / Bengaluru,0-2 years; freshers welcome,-,-,-,CXO-level executive search; client relationship management; All specializations; strong research and communication skills; P&L-driven approach
185,SBI Life Insurance Co. Ltd.,BFSI,Assistant Manager – Marketing (Sales),Marketing,12 LPA,7 LPA,Up to 2.5 LPA Variable + 2.5 LPA Long-term Retention Bonus,Pan India,Fresher,60% in 10th & 12th; 55% in Graduation,-,Marketing Major,Retail agency and insurance sales; MBA Marketing; strong communication and persuasion skills
186,Schneider Electric,Manufacturing,MANAGEMENT TRAINEE - SALES,Marketing,12 LPA,10 LPA,2 LPA ,Pan India,1 - 2 years preferred ,-,"BE/B.Tech (Electrical Engineering/ Electrical 
and Electronics, Engineering/ Electronics & Communication Engineering /
Instrumentation /Mechanical)",Marketing/Sales Major,"• Passion to sell and interest in building a career in Sales domain
• One should have an aptitude to learn new technologies & solutions
• Good communication, analytical and problem-solving skills
• Strong Customer focus & highly adaptable to meet business requirements
• Digital skills and agility to adapt digital ways of working and connecting with customers
• Strong orientation to sell technology products and technical acumen"
187,ShadowFax,Logistics / Technology,Manager – Operations (Last Mile),Operations,10-12 LPA,10-12 LPA,-,Hyderabad,MBA Operations; 18 months experience good to have,-,-,Operations Major,Delivery performance governance; control tower monitoring; SLA management; capacity planning; data-led operations management
188,SHREE MALANI FOAMS PVT.LTD.,Manufacturing / Retail,Sales Executive,Marketing,6 LPA,6 LPA,-,Hyderabad,Fresher,-,-,Marketing/Sales,Sales and distribution network management for Foam & Mattress business; achieve sales targets; manage channel partners; market execution and collections; expand market presence
189,SHREE MALANI FOAMS PVT.LTD.,Manufacturing / Retail,Management Trainees in Business Development and Market Research,Marketing,9 LPA,-,-,-,-,-,-,-,"•	Strong analytical and problem-solving skills.
•	Good communication and presentation ability.
•	Interest in sales, retail, and consumer behaviour.
•	Proficiency in MS Excel, PowerPoint, and research tools.
•	Ability to travel for market visits and field research."
190,SHREE MALANI FOAMS PVT.LTD.,Manufacturing / Retail,Management Trainee - Purchase,Operations,Upto 9 LPA,-,-,"Head Office, Hyderabad",Fresher,-,Bachelor's Degree in any discipline (mandatory); Postgraduate preferred,Operations Major,"Purchase negotiations, PO creation and vendor coordination in SAP MM; procurement reporting and data analysis; process improvement using Power BI and AI tools; willingness to travel for vendor development/audits; English mandatory, Telugu/Hindi preferred"
191,SHV Energy,Energy / LPG,Management Trainee – HR & Marketing,"HR, Marketing",8 LPA + Benefits,8 LPA,-,Pan India,"Fresher (65% or above in 10th, 12th, Engineering/Graduation, MBA; no backlogs; location mobility required)",65% throughout,B.E/B.Tech + MBA,HR / Marketing,LPG distribution operations; HR and Marketing functions; pan-India mobility required; B.E/B.Tech + MBA from reputable B-school; Sales/Marketing internship preferred
192,SHV Energy,Energy / LPG,Executive – Partner Coordinator,Marketing,Up to 8 LPA (Negotiable),Up to 8 LPA,-,Kolkata,Fresher / 6+ months sales internship preferred,65% throughout,B.E/B.Tech + MBA,Marketing/Sales,"Lead generation from OEMs and partners; build and strengthen partner relationships; organize webinars; manage partner-related activities; coverage: Kolkata, Jamshedpur, Siliguri, Hyderabad"
193,SHV Energy,Energy / LPG,HR Trainee,HR,8 LPA,8 LPA,-,Hyderabad,Fresher,-,PGDM/MBA – HR Specialization,HR,"Strong communication skills; Interpersonal & stakeholder management; MS Excel, PowerPoint & Word; Analytical & problem-solving skills; Attention to detail; HR fundamentals (TA, HR Ops, Employee Engagement, L&D, Analytics)"
194,SMFG India Home Finance Co. Ltd. (SMFG Grihashakti),BFSI / Housing Finance,Management Trainee – Sales/Credit/Collections/Operations,Marketing,6 LPA + Variable + Benefits,-,Variable,Pan India (Mostly Tamil Nadu),Fresher,-,-,-,"Tamil speaking (mandatory); Field sales & lead generation; Credit assessment & loan processing; Collection & portfolio management; KYC documentation; Cross-functional coordination (credit, ops, legal); Willingness to work in field roles"
195,South Indian Bank,BFSI,Probationary Officer,Finance,15 LPA,-,-,-,Fresher; max age 25 yrs (2yr relaxation with 1yr workex),"60% in X, XII, Grad, PG",-,-,Banking – probationary officer; All specializations; age max 25 years; strong communication and banking knowledge
196,Tata Capital,BFSI,Sales Manager – Retail / Housing Finance,Marketing,9.45 LPA (7L Fixed + up to 2.45L Variable),7 LPA,Up to 2.45 LPA,Pan India,Fresher,-,-,-,Retail and housing finance sales; All specializations; strong communication and sales skills
197,Tata Capital,BFSI,Relationship Manager / Sales Manager – SME,Marketing,9.45 LPA,7 LPA,Up to 2.45 LPA,Pan India,Fresher,-,-,-,SME relationship and sales management; All specializations; strong client-facing skills
198,Tata Capital,BFSI,Sales Manager – Housing Finance (South India & Mumbai),Marketing,9.45 LPA,7 LPA,Up to 2.45 LPA,South India & Mumbai,Fresher,-,-,-,Housing finance sales; South India & Mumbai focus; All specializations
199,TDK India Private Limited,Manufacturing / Electronics,Management Trainee – Sales,Marketing,8 LPA,8 LPA,-,-,Fresher,-,B.Tech Electronics + MBA Marketing,Marketing Major,Electronics component sales; B.Tech Electronics + MBA Marketing required; strong technical and sales skills
200,Techsec Digital Global Private Limited,IT / Cybersecurity & Digital Transformation,Sales Representative Trainee,Marketing,-,-,-,"Goregaon, Mumbai (role covers Mumbai / Chennai / Pune / Bengaluru / Kerala / Hyderabad)",Fresher (freshers with relevant interest encouraged to apply),-,Bachelor's degree in any field (Master's in Management is a plus),Marketing/Sales Major (open to all specializations with sales interest),"Quota-carrying B2B/Enterprise sales role across Cybersecurity, Cloud (AWS/Azure/GCP), Server & Storage, HCI and Database solutions; building and maintaining enterprise customer relationships; identifying new business opportunities and potential markets; collaborating with senior sales members on account plans and proposals; participating in customer meetings, presentations and product demos; coordinating with pre-sales, marketing and operations teams; techno-commercial mindset with strong communication, negotiation and interpersonal skills"
201,Tesla,Automobile / EV Technology,Sales Trainee (PPO basis),Marketing,8-10 LPA + Equity (performance-based),-,"Stipend: 40,000/month (6-month internship)",Hyderabad / Bengaluru / Chennai,6-month internship then PPO,-,-,Marketing/Sales,Telugu mandatory (Hyderabad); Kannada mandatory (Bengaluru); Tamil mandatory (Chennai); Local candidate from respective city; Valid 4-wheeler driver's license mandatory; Strong communication & sales aptitude
202,Tesla,Automobile / EV Technology,Management Trainee - Delivery Experience Coordinator,Operations,-,-,"Stipend: 50,000/month (1 yearinternship)",-,"0-3 years (Contract-to-start, 1 year)",-,Bachelor's degree or equivalent combination of education and experience,-,"Direct point of contact for customers taking delivery of their Tesla; vehicle preparation and hosting delivery appointments/new owner orientations; supporting Delivery Manager with delivery center and vehicle operations; contributing ideas to improve delivery experience and back-end processes; mastery of Tesla products and services; excellent verbal and customer service skills; cross-functional collaboration with sales, service, logistics and admin teams; flexible schedule and valid driver's license preferred"
203,Tiger Analytics,IT / Analytics,Technology Consulting – Senior Business Analyst,IT,14.5 LPA,13.5 LPA,1 LPA Joining Bonus,Chennai,2+ years pre-MBA IT industry experience,-,B.E / B.Tech,-,Technology consulting; analytics and strategy; 2+ years pre-MBA IT experience required; strong analytical skills
204,TopHire,HR Consulting / Staffing,Recruitment Consultant – US Market,HR,Mentioned in JD (variable + incentives),-,Performance-based incentives,Mumbai (Andheri West) / Bangalore (Indiranagar),Fresher,-,-,All specializations,US market tech recruitment; talent sourcing on LinkedIn Recruiter; full-cycle recruitment; candidate pipeline building; client consultative engagement; US shift hours
205,Track3D AI,Technology / Construction,Product Marketing Analyst,Marketing,8–12 LPA,8–12 LPA,-,Hyderabad (In-Office),0–1 years,-,-,Marketing preferred,"Content and copywriting (blogs, one-pagers, email copy); market research; buyer persona development; GTM launch support; competitive tracking; construction technology / SaaS sector"
206,UPL Ltd,Specialty Chemicals / Agri,NextGen Management Trainee – Sales (Specialty Chemicals),Marketing,8.5 LPA,7.72 LPA,77K variable,Navi Mumbai,Fresher,60% across all academic backgrounds,MBA (Marketing/Sales); B.Tech Chemical/Mechanical / B.Sc Chemistry preferred,Marketing/Sales,Sales strategy execution in specialty chemicals; Market research & competitive analysis; Customer relationship management; Sales data analysis & reporting; Cross-functional collaboration; Industry event participation; Strong analytical & communication skills
207,VComply,IT / SaaS (GRC),Customer Success Executive,Marketing,-,-,-,Hyderabad (flexible shifts for EU/NA markets),Fresher/limited experience,-,Any (relevant bachelor's preferred),-,Good communication & presentation skills; Eagerness to learn & grow; Customer onboarding & implementation; Product demonstrations; CRM & knowledge base maintenance; Customer trend analysis; Flexibility with timings for EU/NA markets
208,VComply,IT / SaaS (GRC),Project Manager + Business Analyst,IT,-,-,-,Hyderabad / Bengaluru / Kolkata,Fresher,-,MBA/PGDM or relevant degree,-,"Strong analytical & problem-solving skills; Excellent communication & stakeholder management; MS Excel, PowerPoint & documentation tools; Project planning, execution & monitoring; Business requirements gathering & documentation; Risk identification & process improvement"
209,VE Commercials,Automobile,MANAGEMENT TRAINEE - SALES,Marketing,10 LPA,8.25 LPA,") Performance Pay (Average 10% Basis the performance 
rating) Retention Bonus (Rs. 100,000) Other benefits)",Hyderabad / Bengaluru / Kolkata,-,60% across,B. Tech in Mechanical/Automobile/Electrical/Production.,Marketing/Sales Major,"• Sales Strategy - It involves channel management, new product seeding, targeting segments, 
creating markets, and achieving sales and financial goals through customer outreach.
• Business Development Activities - Supervise unassisted sales, provide sales coaching, 
ensure training compliance, manage VIP deliveries, resolve operational issues, implement 
BPS/Segmentation, oversee testimonials collection, and enhance Dealer Sales Executive
productivity.
• Sales & Market Share targets -Conduct customer profiling, develop DSE-wise sales plans, 
coordinate with financiers, boost Value Truck sales contribution, arrange customer events, 
and train dealer sales teams.
• Customer engagement and process adherence - Manage customer engagement plans and 
budgets, oversee Area Sales Manager-prepared action plans, enhance stakeholder 
engagement, and ensure process adherence including DSE follow-up, daily/weekly huddles, 
activity planning and review, joint visits.
• Improving Market Penetration: Attain area expertise, align dealership manpower, execute 
monthly plans, review DSE performance, and clarify value proposition to customers for 
precise commercial outcomes.
• Stakeholder Management: Engage diverse stakeholders through various channels for 
optimal product performance and customer satisfaction.
• Customer issues resolution - Weekly capture of War Room issues and tracking for 
resolution."
210,Vishal Peripherals,IT / Technology,Product Manager,IT,9 LPA,8.1 LPA,0.9 LPA Variable/Incentives,Hyderabad,Fresher; prior IT work experience preferred,-,B.Tech preferred,Marketing / Operations / Product Management,Product management; IT industry; B.Tech preferred; PGDM in Marketing/Operations; strong communication and analytical skills
211,Vishal Peripherals,IT / Technology,Corporate Marketing Executive,Marketing,9 LPA,8.1 LPA,0.9 LPA Variable/Incentives,Hyderabad,Fresher; prior IT work experience preferred,-,B.Tech preferred,Marketing Major,Corporate marketing; IT products; PGDM in Marketing; strong communication and digital marketing skills
212,Volvo Financial Services,BFSI / Automobile,Marketing Executive (Sales),Marketing,7 LPA,7 LPA,-,Hyderabad,Fresher (2026 pass outs),65% throughout; no active backlogs,-,All specializations (sales inclination required),Financial services sales; strong inclination for sales; Telugu proficiency mandatory; Male candidates only
213,VotaryTech,IT / Technology,Management Trainee (Rotational),IT,8 LPA,8 LPA,-,-,Fresher,-,MBA/PGDM,-,"Excellent communication & interpersonal skills; Strong analytical & problem-solving capabilities; MS Office proficiency (Excel, PowerPoint, Word); Rotational across Data Analytics, PMO, Business Finance & Talent Acquisition; Adaptability & eagerness to learn"
214,Wealth First Group,BFSI / Wealth Management,Relationship Manager – Wealth Management,Finance,7 LPA (fixed),7 LPA,-,Hyderabad,Fresher; Internship with banks/NBFCs/wealth mgmt preferred,-,Graduation mandatory; MBA/CFP/CFA/FRM preferred,Finance,"New investor acquisition & portfolio building; AUM & revenue target management; Investment advice (MFs, equities, bonds, PMS, insurance); Goal-based financial planning; Market knowledge & investor education; Compliance & investor governance; Strong relationship-building capability"
215,Wells Fargo,BFSI,Senior Commercial Loan Closing Representative,Finance,7–9 LPA,7–9 LPA,-,Hyderabad,Fresher,-,-,Finance Major,Commercial loan closing; documentation; loan processing; MBA Finance mandatory; official IMT email registration required
216,Wise,BFSI / FinTech,People Operations Intern,HR,5 LPA (prorated) + Benefits,5 LPA (prorated),-,Hyderabad,Internship (9-12 months),-,-,-,"Onboarding support for new joiners including relocation, orientation and induction sessions; People team ticketing/query resolution and leave-policy guidance; Workday and Confluence process administration; documentation of SOPs, checklists and templates; identifying process-improvement and automation opportunities (templates, workflows, ticketing macros); tracking operational metrics; strong organizational, stakeholder-coordination and communication skills"
217,Zeta Global,BFSI,FP&A,Finance, 25.84 LPA,10.5 LPA," Bonus: Rs. 3 Lakhs per annum + $14K 
worth of RSUs)","Hyderabad, Delhi",-,PGDM 7 CGPA,-,Finance,"• Professional Qualification: CA / CMA / CFA / MBA (Finance).
• Strong analytical skills, proficiency in Excel & PowerPoint. Ability to convert large datasets into 
meaningful insights.
• Ability to work across all levels of the organization, with strong executive communication skills.
• Excellent communication and interpersonal skills.
• Self-starter with a positive attitude, able to work under tight deadlines with minimal supervision.
• Flexibility to work in shifts to collaborate with teams across different time zones"
218,Zeta Global,BFSI,GL Accounting,Finance, 25.84 LPA,10.5 LPA," Bonus: Rs. 3 Lakhs per annum + $14K 
worth of RSUs)","Hyderabad, Delhi",-,PGDM 7 CGPA,-,Finance,"• Finance & Accounting Team (including Financials Planning & Analysis Team)
• StatutoryAuditors
• Consultants"
219,Zeta Global,BFSI,IT SOX,IT, 25.84 LPA,10.5 LPA," Bonus: Rs. 3 Lakhs per annum + $14K 
worth of RSUs)","Hyderabad, Delhi",-,-,-,-,"1.
Good Enthusiasm for IT applications and controls
2.
Have good audit mindset
3.
Basic understanding of IT General Controls is an added advantage
4.
Ability to manage assignments independently, maintain data integrity/accuracy.
5.
Ability to plan, organize and prioritize multiple tasks within a defined timeline.
6.
Good communication (written and oral) with ability to articulate the points effectively.
7.
Demonstrate strong teamwork and collaboration skills."
220,Zeta Global,BFSI,Analyst – IT SOX,IT,25.84 LPA,10.5 LPA,3L Bonus + $14K RSUs,Hyderabad / Delhi (3 PM - 12 AM Hybrid),Fresher,7 CGPA,-,-,IT SOX and general controls audit; All specializations; CGPA 7+; good IT application and audit mindset; strong communication skills
221,ZikZuk Technologies Pvt Ltd,BFSI / FinTech (PPI / Payments),Founder's Office,Operations,6-7 LPA,-,-,Hyderabad,Fresher (ignoring JD experience requirement),-,MBA/PGDM,-,"Cross-functional project execution & management; Stakeholder & partner coordination (banks, NPCI, Visa, Mastercard); RBI compliance & SOP documentation; Recruitment support; Research notes & investor communications; Structured problem-solving; High ownership & output orientation"
222,ZikZuk Technologies Pvt Ltd,BFSI / FinTech (PPI / Payments),Performance Marketing Executive,Marketing,6-8 LPA + Benefits,-,-,Hyderabad,Fresher,-,-,Marketing,Paid campaign management (Google/Meta Ads); ROI & performance tracking; Marketing specialization
223,ZikZuk Technologies Pvt Ltd,BFSI / FinTech (PPI / Payments),Digital Marketing Executive,Marketing,6-8 LPA + Benefits,-,-,Hyderabad,Fresher,-,-,Marketing,Digital marketing execution (SEO/SEM/content/campaigns); Marketing specialization
224,ZikZuk Technologies Pvt Ltd,BFSI / FinTech (PPI / Payments),Self Lead Generator – Real Estate Sales & Digital Marketing,Marketing,9 LPA (7 Fixed + 2 LPA Performance Variable) + Benefits,7 LPA,2 LPA,Hyderabad,Fresher,-,-,-,"End-to-end ownership of self-generated leads for Aliens Space Station project: content creation for social media (Instagram/FB/LinkedIn/YouTube Shorts), events & activations, customer pitching & follow-ups, site visits and sales closure; strong social media and communication skills"
225,ZikZuk Technologies Pvt Ltd,BFSI / FinTech (PPI / Payments),Management Trainee - Relationship Manager (Retail Sales),Marketing,7 LPA (6 LPA Fixed + 1 LPA Variable),6 LPA,1 LPA (upon completion of 1 year),Kolhapur,Fresher,-,-,Finance/Marketing Major,Develop understanding of mutual funds and financial markets; provide market commentary; build and maintain retail client relationships to generate future sales; assist team leader in executing sales plans and presentations; MBA/equivalent; strong relationship-building and presentation skills
226,ZikZuk Technologies Pvt Ltd,BFSI / FinTech (PPI / Payments),Management Trainee - Sales Trainee,Marketing,-,-,-,"Mumbai, Bangalore, Delhi, Gurgaon, Hyderabad",-,-,-,Marketing/Sales Major,"Engaging showroom walk-in customers and building a robust customer profile; driving sales through product knowledge, merchandise presentation and promotion; educating guests on Tesla products, services and local EV incentives; maintaining sales pipeline via CRM updates and scheduling test drives; strong time management, attention to detail and communication skills; ability to manage multiple projects and work flexible shifts; valid driver's license required"`;

// Robust CSV Parser supporting multiline and quoted fields
export function parsePlacementJobs(): PlacementJobRecord[] {
  const records: PlacementJobRecord[] = [];
  const lines: string[] = [];
  let currentLine = '';
  let inQuotes = false;

  for (let i = 0; i < RAW_PLACEMENT_CSV.length; i++) {
    const char = RAW_PLACEMENT_CSV[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      currentLine += char;
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      }
      currentLine = '';
      if (char === '\r' && RAW_PLACEMENT_CSV[i + 1] === '\n') {
        i++;
      }
    } else {
      currentLine += char;
    }
  }
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  // Skip header line
  for (let idx = 1; idx < lines.length; idx++) {
    const line = lines[idx];
    const cells: string[] = [];
    let cell = '';
    let inQ = false;

    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"') {
        inQ = !inQ;
      } else if (char === ',' && !inQ) {
        cells.push(cell.trim().replace(/^"|"$/g, '').trim());
        cell = '';
      } else {
        cell += char;
      }
    }
    cells.push(cell.trim().replace(/^"|"$/g, '').trim());

    if (cells.length >= 14) {
      records.push({
        srNo: parseInt(cells[0]) || idx,
        companyName: cells[1] || 'Company',
        sector: cells[2] || 'General',
        role: cells[3] || 'Management Trainee',
        domain: cells[4] || 'General',
        ctcOffered: cells[5] || 'As per norms',
        fixedPay: cells[6] || '-',
        variablePay: cells[7] || '-',
        location: cells[8] || 'Pan India',
        experienceRequirements: cells[9] || 'Fresher',
        cgpaCriteria: cells[10] || '-',
        undergraduatePreferredDegree: cells[11] || 'Any',
        majorMinorRequired: cells[12] || '-',
        skillsRequired: cells[13] || '-'
      });
    }
  }

  return records;
}
