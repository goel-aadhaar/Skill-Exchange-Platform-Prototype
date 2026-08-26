export interface InternshipRecord {
  companyName: string;
  noticeDate: string;
  role: string;
  stipend: string;
  locations: string;
  skillsRequired: string;
}

export const RAW_SIP_CSV = `Company Name,Date of IP Notice,Role,Stipend,Locations,Skills Required
Averixis Solutions Pvt. Ltd.,31-Dec-2025,Business Development Associate (BDA),"₹15,000/month (Fixed) + incentives up to ₹15,000 (performance-based)",Bangalore (Electronic City),"Excellent English communication; strong interpersonal, presentation & analytical skills; self-motivated & disciplined; professionalism, integrity, adaptability; willingness to learn and take initiative"
Apollo Radiology Intl. Pvt Ltd,24-Mar-2026,Intern – Business Development (Sales & Marketing),"₹10,000/month",Hyderabad,"Excellent verbal & written communication; interpersonal skills; analytical/research skills; proactive self-starter; team player; MS Office (Word, Excel, PowerPoint); Graduate + MBA/PGDM (Marketing)"
Capital Fortunes Private Limited,10-Nov-2025,Intern (Debt/Equity Syndication & M&A),"₹30,000/month",Hyderabad,Finance specialization mandatory; pitchbook/CIM preparation; industry research; valuations; M&A trend analysis; tracking tools & reporting
ContexQ,08-Sep-2025,Marketing & Technical Support Intern (Live Project),"INR 25,000 – 30,000/month",Remote,Marketing & technical support skills; Engineering degree in Computer Science (base qualification); 2 years industry experience preferred but not limiting
Mindenious,18-Nov-2025,Business Development Intern / Marketing Intern,"₹15,000–18,000 (base) + ₹10,000 (variable)",Bangalore,0–3 years' experience; all graduates/postgraduates eligible; minimum CGPA 6.0; MS Office Suite; CRM software; inside sales/BD experience (Edu-tech preferred)
Simply Science (Wiki Kids Pvt Ltd),24-Mar-2026,Sales and Marketing Interns,"₹18,000/month",Hyderabad,Excellent English communication; basic marketing principles; social media familiarity; self-starter; attention to detail; sales target orientation; presentation & demo skills; digital marketing fundamentals; MBA
Supergas,26-Mar-2026,Marketing Intern,"₹10,000/month",Hyderabad,Interaction with functional teams; understanding of filling/plant operations; interest in FMCG operations (no formal skill list specified)
BlueStone,23-Mar-2026,Intern – Retail Sales,"₹15,000 for the month (2-month duration)",Bangalore & Hyderabad,Strong communication skills; ability to convince customers; interpersonal skills; presentable appearance; local language + English
Infosys,27-Feb-2026,Ingenious One Program (Management Intern),"INR 30,000/month",As per business requirement / project allocation,"Analytical ability, logical reasoning & general aptitude; innovation & clarity of thought; business understanding; presentation skills"
BNY International Operations,25-Aug-2025,BNY Summer Internship Program (Operations),"INR 35,000/month",Pune or Chennai,MBA – Finance/General Management; problem-solving; statistical methods; self-starter; agile delivery; strong communication & interpersonal skills; risk awareness
ekincare,20-Mar-2026,Program Manager Intern (Chief of Staff),"₹15,000–18,000/month",Hyderabad,"Final-year student/recent graduate in Business, Engineering or related field; strong analytical & problem-solving skills; stakeholder management; MS Excel, PowerPoint & data analysis tools; multitasking; high ownership & attention to detail"
Shrey Automotives Hyderabad Pvt. Ltd.,29-Dec-2025,Market Development & Sales (Automotive Lubricants),"₹18,000/month + fuel allowance",Hyderabad,Marketing/Sales/Operations background preferred; strong communication; local language knowledge preferred; must own a two-wheeler
BDO India Services Pvt. Ltd.,12-Nov-2025,Research Intern – Energy Sector (Business Development & Project Execution),"₹25,000/month","Gurgaon, Haryana",Secondary & primary research skills; proposal/concept-note & presentation preparation; data collection & analysis; stakeholder consultation & coordination
Evernorth,07-Oct-2025,Financial Planning Analyst / Project Management Associate-Analyst / Analyst – Data Analytics / Financial Accounting Analyst,"₹21,000/month",Hyderabad,"Role-dependent: Excel, SQL/Python/R, Power BI/Tableau, statistical concepts (Data Analytics); accounting standards (IFRS/US GAAP/Ind AS), journal entries & reconciliations (Financial Accounting); MS Office & PM tools, Agile/Waterfall (Project Management); strong analytical, communication & presentation skills across all roles"
First Citizens India,14-Oct-2025,Credit Analysis – Commercial Real Estate / Innovation Banking; Credit Analytics – Competitor Analysis / External Factors; Credit Modelling & Reserves; Credit Risk Quality Assurance; First Line Control Assurance; Operational Risk Management,"INR 40,000/month","Bangalore (Manyata Tech Park, Nagavara)","MS Office tools & SharePoint; understanding of lending cycle, credit risk ratings & portfolio management; financial statement analysis; attention to detail; effective communication & presentation; SQL/Power BI/Tableau/Python (good to have); MBA – Finance/Analytics"
Invesco,24-Feb-2026,Process & PMO Intern / Client Research Intern,"₹40,000/month",Hyderabad,MBA in Marketing (2027 batch); strong organizational skills; MS Office proficiency (Excel macros preferred); excellent written & verbal communication; stakeholder management; agile/iterative working; 70% CGPA/CQPI cutoff
Visionaize,31-Oct-2025,Marketing Intern,"₹15,000–20,000/month (profile-dependent)",Not specified,Profiles in the marketing space; Computer Science as basic engineering qualification
ALPLA India,05-Jan-2026,Operational Excellence Intern,"₹15,000/month",Hyderabad (Jubilee Hills),"Pursuing Master's in Engineering/Operations/Industrial Engineering/Business Management; strong analytical & problem-solving skills; MS Excel, PowerPoint & data analysis tools; communication, teamwork & documentation; willingness to travel occasionally"
ALPLA India,10-Dec-2025,Sales & Marketing Intern,"₹15,000/month",Hyderabad and Silvassa,"MBA in Marketing + B.Tech in Mechanical/Automobile/Electrical; proactive team member; excellent communication & written skills; good interpersonal skills; MS Office (Excel, Word, PowerPoint)"
Address Advisors,05-Feb-2026,Business Development Intern,"₹10,000/month",Hyderabad,"Own two-wheeler mandatory; research & connect with prospective clients; excellent written & verbal communication; MS Word, Excel & PowerPoint; self-starter, resourceful, well-organized, detail-oriented"
Address Advisors,27-Oct-2025,Business Development,"₹10,000/month",Hyderabad,"Research & connect with prospective clients; excellent written & verbal communication; MS Word, Excel & PowerPoint; self-starter, resourceful, well-organized, detail-oriented"
Advance Auto Parts (AIIC),26-Dec-2025,Pricing Intern,"₹35,000/month",Hyderabad (Hybrid),"MBA/Masters in Mathematics/Computer Science/Industrial Engineering/Finance; strong business acumen; excellent communication & collaboration in cross-functional global teams; analytics techniques; Advanced Excel, Python/R, SQL (desirable)"
Adyapan Edutech Pvt Ltd,23-Feb-2026,Community Development Executive (Sales & Marketing),"₹15,000/month + up to ₹10,000 variable",Hyderabad,Lead generation & client outreach; relationship management; sales & marketing communication skills; practical exposure to EdTech industry
Apollo Radiology International,16-Mar-2026,Business Development and Sales Intern,"₹10,000/month",Hyderabad,Excellent verbal & written communication; interpersonal skills; market research & analytical skills; proactive self-starter; MS Office Suite
Blinkit (Blink Commerce Pvt Ltd),10-Nov-2025,Fleet Operations Intern / Marketing Intern / Instore Operations Intern,"INR 25,000/month",Telangana & Andhra Pradesh,"Good problem-solving, communication & analytical skills; customer insight gathering; knowledge of advanced Excel/Google Sheets recommended"
BPL Medical Technologies,19-Feb-2026,Sales Intern / HR Intern / Supply Chain Management Intern,"₹40,000/month",Not specified (Pan-India / Bangalore HQ),MBA (SCM/Operations/Finance/Marketing/Healthcare); strong analytical & communication skills; proficiency in MS Excel & presentations; ability to collaborate & learn quickly; good problem-solving and coordination skills
Corefit Care,05-Jan-2026,Finance Intern / Marketing Intern / HR Intern / Business Analytics Intern,"₹15,000/month",Delhi/NCR (Hybrid/Virtual/Remote optional),"Management student across Marketing, HR, Finance & Business Analytics domains; hands-on wellness/fitness industry exposure"
Craqit Education,12-Feb-2026,Marketing & Operations Intern / B2B Sales Intern,"₹15,000/month",Delhi (NCR),B2B sales meetings & partnership building; lead pipeline management; sales & marketing material development; data analysis on sales/marketing tools; event & inventory management; Google Docs/Sheets & Canva preferred
DEzen Technology Solutions Pvt Ltd,05-Feb-2026,Market Strategy & Business Development Intern,"₹10,000/month",Hyderabad (Gachibowli),"Practical understanding of IT business models & solution selling; B2B market dynamics; business communication & negotiation basics; MBA concepts (marketing strategy, BD, CRM); strong problem solver; self-driven & proactive"
Digital Nest,05-Jan-2026,Business Development Intern / Business Development (Corporate Relations) Intern / HR Intern,"₹20,000/month (₹10,000 Fixed + ₹10,000 Performance Bonus)",Hyderabad,Excellent communication & interpersonal skills; strong organization & multitasking; analytical mindset for research & data analysis; creative problem-solving; familiarity with CRM software (e.g. Leadsquared) a plus
Dr. Mehta's Hospitals,08-Jan-2026,Project Management Intern / Marketing & Branding Intern / Analytics & IT Intern,"₹10,000/month",Chennai,Content writing; events coordination; design assistance; project planning to closure; data collection & validation; presentation preparation; dashboard creation & implementation
Ewoke Studio,08-Jan-2026,Digital Marketing and PR Intern / Sales and Business Development Intern,"₹10,000/month",Hyderabad,Digital marketing & PR fundamentals; sales & business development orientation
FinAdvantage Consulting Pvt. Ltd.,08-Jan-2026,Marketing Intern / HR Intern / Finance Intern,"₹10,000/month","Hyderabad, Bangalore and Gurugram","Marketing: digital marketing & social media basics, MS Excel/PowerPoint/Word, creativity; HR: HR concepts & labor law basics, MS Office, confidentiality handling; strong communication & interpersonal skills across roles"
Gigfactory,18-Feb-2026,Marketing Intern,"₹10,000/month",Thane,Analytical thinking; research orientation; content writing & storytelling; attention to detail; self-driven and proactive approach
GrayQuest,02-Mar-2026,Sales Intern,"₹15,000/month",Delhi NCR/Punjab,"PGDM/MBA (any specialization); 0–3 years' experience; relationship building with schools/colleges/institutes; sales target achievement, cross-sell/upsell"
GrayQuest,11-Jan-2026,GQ Campus Captain,"₹10,000 + ₹2,000 travel allowance + performance-based incentives",PAN India,Sales enthusiasm & customer engagement; fast learner; high integrity; extreme ownership; strong communication ('Communication Maestro')
Greenko Group,13-Nov-2025,HR Intern (HR Generalist / TM / TA / HR-Ops),"₹18,000/month",Not specified,"Bridging organizational values with behavioural competencies; critical thinking & business acumen; talent management, employee relations & training exposure"
Infinite Blends Pvt Ltd,23-Feb-2026,Social Media B2B Intern / Social Media D2C Intern,"₹12,000/month (+ possible performance incentive)",Off-site (remote),Content creation for Instagram/Meta/LinkedIn; Canva design; organic SEO & keyword research; Google Ads monitoring; CRM tools; social media scheduling & reporting
Kumbayah Foods Pvt Ltd,22-Jan-2026,Growth Intern,"₹12,000 + ₹2,000 travel allowance/month",Hyderabad,B2B FMCG pitch & sales execution; lead generation & qualification; daily reporting; customer feedback capture; relationship building
Middle Earth HR,12-Nov-2025,HR Intern and Marketing Intern,"₹7,500/month",Hyderabad,"MS Office (Word, Excel, PPT); interpersonal skills; oral/written communication; good analytical skills; quick learner"
Mindenious,03-Feb-2026,Marketing Intern / Business Development Intern,"₹15,000–18,000 (base) + ₹10,000 (variable)",Bangalore,0–3 years' experience; all graduates/postgraduates eligible; minimum CGPA 6.0; MS Office Suite proficiency; inside sales/BD experience (Edu-tech preferred)
Minfy Technologies,04-Feb-2026,Management Intern,"₹15,000/month",Hyderabad,"MBA/PGDM (any specialization); good analytical & problem-solving skills; comfortable with data, spreadsheets & presentations; strong written & verbal communication; adaptability & curiosity"
Myntra,02-Dec-2025,HR Intern,Available in registration link,Bengaluru (In-person),Not specified in notice (JD & stipend shared via registration link)
New Development Bank (NDB),23-Jan-2026,"Finance, Budget & Accounting Intern / Human Resource Intern / Information Technology Intern / Research Intern","₹2,50,000/month","Shanghai, China","Not detailed in notice; role-specific finance, HR, IT & research skills expected"
PACCS (Curengo.ai),29-Jan-2026,Marketing Intern (Healthcare/Sales preferred),"₹10,000/month",Hyderabad,MBA/PGDM (Marketing/Strategy/Healthcare/Operations preferred); strong communication & research skills; comfortable with virtual outreach & client interaction; interest in healthcare/tech/startup environments
Peepal Consulting,26-Dec-2025,Business Development Executive Intern / Founder's Office (Growth),"₹50,000/month",Bengaluru (MG Road),"BDE: strong communication & stakeholder handling, ownership, CRM/prospecting tools; Founder's Office: high ownership & execution, strong analytical thinking, market research/GTM strategy, dashboards/Excel/basic SQL, automation comfort (Notion/Airtable/Zapier)"
Rasimo Lifesciences Pvt Ltd,04-Dec-2025,HR Intern / Analytics Intern / Corporate Strategy & Business Expansion Intern / Business Development Intern / Finance & Accounts Intern / Sales & Marketing Intern / Operations & Supply Chain Intern,"₹15,000/month + Travel Allowance",Hyderabad,"Role-specific: BD – confident communicators, comfortable with field meetings; Ops & SCM – detail-oriented, basic Excel skills; Sales & Marketing – strong communication & presentation, digital marketing basics; HR – strong communication & interpersonal skills, organized & people-focused"
Reliance Retail,09-Oct-2025,HR Intern / Marketing Intern / Operations Intern,"₹20,000/month",Pan India,Not detailed in notice
Sand Network Pvt Ltd,11-Mar-2026,Summer HR Intern,"₹15,000/month",Mumbai,Pursuing/recently completed MBA/PGDM in HR or related field; strong organizational & communication skills; basic knowledge of HR practices & MS Excel/MS Office; attention to detail; confidentiality handling
Shelf Merch,13-Nov-2025,Corporate Sales Executive Intern,"₹10,000–25,000/month","Hyderabad, Telangana (preferred)","Strong communication & coordination skills; attention to detail with proactive problem-solving; familiarity with merchandise/e-commerce/marketing a plus; negotiation skills; Hindi (required), Telugu (preferred), English (required)"
Tapadia Diagnostic Centre,12-Feb-2026,HR Intern / Marketing Intern,"₹15,000–18,000/month (interview-dependent)",Hyderabad,"HR: good communication & interpersonal skills, basic MS Office/Google Workspace, organizational & time management skills; Marketing: good communication & presentation skills, social media basics, Canva/PowerPoint/design tools"
Tapadia Diagnostic Centre,06-Feb-2026,HR Intern / Marketing Intern / Operations Intern / Data Analytics Intern,"₹15,000–18,000/month (interview-dependent)",Hyderabad,"HR & Marketing: as above; Operations: strong organizational & coordination skills, MS Excel/Google Sheets; Data Analytics: strong Excel/Sheets (Pivot Tables, VLOOKUP/XLOOKUP), Power BI/Tableau & basic SQL/Python knowledge preferred"
The Go To Guy,23-Jan-2026,Business Development Trainee,"₹10,000/month",Hyderabad,Marketing specialization; fresh graduates (any stream); strong communication skills (English + local language) mandatory; goal-driven & proactive mindset
The Humanize Group,20-Feb-2026,Content Development & Operations Intern,"₹15,000/month",Kolkata,"Curious, open-minded learner; enjoys reading/writing/organizing; comfortable with Google Docs, Notion/Trello, Canva & AI tools; emotionally aware & professional communication"
Tvisha Technologies,29-Jan-2026,Sales & Marketing Intern,"₹10,000/month",Hyderabad,Strong communication skills (verbal & written); basic understanding of sales & marketing concepts; comfortable with MS Office/Google Workspace; good organizational & time-management skills
Upwisery,18-Feb-2026,Product Research Intern,"₹10,000/month",Hyderabad (Madhapur),"Postgraduate in Finance/Economics/Management; strong interest in financial markets & investments; proficient in Excel; familiarity with research tools (Morningstar, Bloomberg) a plus; detail-oriented & analytical"
Verity Knowledge Solutions,09-Oct-2025,Finance (Investment Banking) Intern,"₹15,000/month",Hyderabad,"Financial analysis, modelling & valuation using Excel; familiarity with Bloomberg, FactSet, Merger Market, Thomson Research & Factiva; MBA/PGDM Finance; cut-off ≥70% in X, XII & UG"
Viatris,09-Feb-2026,Finance Intern (Indirect Tax),"₹15,000/month",Hyderabad,Understanding of Indirect Tax rules & compliance processes; ERP-related process support; account reconciliation; process documentation; continuous improvement mindset
Vishal Peripherals,02-Mar-2026,Retail Sales Intern,"₹10,000/month",Hyderabad,"Customer interaction & sales support; product knowledge of IT products (laptops, desktops, accessories); billing & inventory support; customer service follow-up"
Vishal Peripherals,17-Feb-2026,Corporate Sales Intern,"₹10,000/month",Hyderabad,Understanding/interest in IT infrastructure & enterprise technology products; excellent communication & negotiation skills; sales-oriented mindset; MS Office & CRM tools
WealthEase,22-Jan-2026,Intern (Investment Research & Content),"₹10,000/month",Work from home,MS Excel; excellent written English; Canva/PowerPoint; problem-solving mindset; ability to work independently
Zapak Games Pvt Ltd (Reliance Games),26-Dec-2025,HR (Talent Acquisition) Intern,"₹10,000/month",Pune,"Pursuing/completed degree in HR, Business Administration or related field; excellent written & verbal English communication; proficient in MS Office & Google Suite; HRIS experience a plus; strong organizational skills"
Booking Holdings India Center of Excellence,13-Jan-2026,Embark Flagship Internship & Hiring Program 2026,Not specified in notice,Not specified in notice,Details shared via program page (mycareernet.in) and official LinkedIn updates; not specified in notice
Arcesium,26-Sep-2025,Intern – Financial Operations,"₹50,000/month (excluding accommodation & other benefits)",Hyderabad/Bangalore/Gurgaon,"Exposure to financial instruments across asset classes; Fund Accounting, Treasury, Pricing, Fund & Investor Allocations knowledge areas; strong analytical ability"
Crisil,09-Sep-2025,Credit Analyst Intern,"₹30,000/month",Across India,"Research, financial accounting & analysis skills; stakeholder engagement; accounting & financial concepts; understanding of rating principles & methodology; MS Excel/Word/PowerPoint"
Micron,05-Oct-2025,Global Procurement Intern / Global Procurement Business Information Security Intern,"₹22,000/month",Hyderabad,"Master's/Bachelor's in Business Administration, Supply Chain Management, Information Systems, Cybersecurity or Data Analytics; SAP ECC/S4 HANA & Ariba (advantage); SharePoint, Tableau/Power BI (advantage); strong analytical, problem-solving & organizational skills; MS Office"
Oxane Partners,11-Sep-2025,Summer Intern – Platform Solutions Group,"₹40,000/month",Gurgaon or Hyderabad,"MBA in Finance with software engineering background; keen interest in technology; strong attention to detail & logical thought process; strong written & verbal communication; financial concepts, Excel & SQL; self-starter"
Schools365 & Plaeto,26-Nov-2025,"Operations, Supply Chain & Business Development","₹10,000 Fixed + ₹5,000 Performance-Based/month + conveyance reimbursement",Pan India,"Passionate, entrepreneurial & collaborative learner; problem-solving orientation; sales/BD or operations & planning skills depending on track"
VE Commercial Vehicles,05-Sep-2025,Management Trainee – Sales & Marketing,"₹35,000/month",As per business/dealer territory requirement,MBA in Marketing + B.Tech in Mechanical/Automobile/Electrical; sales strategy & channel management; business development & stakeholder management; minimum 60% cutoff across academics; no backlogs
Calvin Klein & Tommy Hilfiger,12-Sep-2025,Customer Relationship Officer (Internship),Tier 1 Cities ₹26K / Tier 2 ₹22K / Tier 3 ₹20K per month,Pan India,Good communication skills; approachable personality & positive attitude; customer service orientation; merchandising & inventory management basics; backgrounds in Fashion/Management/Arts/Mass Comm/Hospitality/Retail welcome
Incluvate,09-Nov-2025,Marketing – Programme Management / Marketing & Operations – Business Associate Program / Finance Operations,"₹10,000/month",Bengaluru (Jayanagar 4th Block),"Marketing: market research, social media management, content creation; Finance Ops: business process development, budgeting/forecasting, vendor & channel-partner management; Business Associate Program: channel partner development & onboarding"
First Impressions Training Solutions Pvt. Ltd. (F.I.T.S.),Not available – IP Notice file corrupted in archive,HR Strategy & Operations Intern / Marketing Operations Intern,"₹10,000/month + incentive & commission",Hyderabad (Marketing role based in Begumpet),"HR: independent task management, Canva, ChatGPT/AI tools, Advanced Excel/Google Sheets; Marketing: Canva, ChatGPT/AI tools, basic SEO tools, CRM tools (HubSpot/Zoho), strong Excel/Sheets analytical skills"
UNIDENTIFIED — see notes,Corrupted archive file: 'IP Notice –PeeSafe.pdf',Not recoverable (file corrupted),Not recoverable,Not recoverable,IP Notice for PeeSafe could not be extracted — the file was corrupted inside the RAR archive. Please re-share this document if the data is needed.
UNIDENTIFIED — see notes,"JD file only, no company name in document ('JD_Sales Trainee.txt')",Summer Trainee – Sales & Distribution (FMCG),"₹15,000 Fixed + Field Allowance ₹300/day (up to ₹6,000) = ₹21,000/month total","Mumbai, Kolkata, Pune, Chennai, Bangalore, Delhi, Hyderabad, Gurgaon","FMCG distribution audit & trade marketing execution; MBA/PGDM Sales & Marketing; fieldwork, data analysis & presentation skills; company name not stated in the source document"
UNIDENTIFIED — see notes,"JD file only, no company name in document ('Internship - JD Finance (1).txt')",Finance Intern,Not specified,Not specified,"Financial modelling, general accounting support, accounts receivable, budgeting assistance; Finance/Economics major; MS Excel; company name not stated in the source document"`;

export function parseInternshipOpportunities(): InternshipRecord[] {
  const records: InternshipRecord[] = [];
  const lines: string[] = [];
  let currentLine = '';
  let inQuotes = false;

  for (let i = 0; i < RAW_SIP_CSV.length; i++) {
    const char = RAW_SIP_CSV[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      currentLine += char;
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      }
      currentLine = '';
      if (char === '\r' && RAW_SIP_CSV[i + 1] === '\n') {
        i++;
      }
    } else {
      currentLine += char;
    }
  }
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

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

    if (cells.length >= 6) {
      records.push({
        companyName: cells[0] || 'Company',
        noticeDate: cells[1] || '-',
        role: cells[2] || 'Intern',
        stipend: cells[3] || 'Stipend as per norms',
        locations: cells[4] || 'Hyderabad',
        skillsRequired: cells[5] || '-'
      });
    }
  }

  return records;
}
