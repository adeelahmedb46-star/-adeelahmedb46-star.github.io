/* =========================================================================
   PORTFOLIO CONTENT
   Edit this file to update the site. Everything in the repeated sections
   (education, skills, projects, experience, honours, certificates,
   contact links) comes from here.

   Empty strings ("") mean "not provided". While `showPlaceholders` is true,
   those spots show as dashed [PLACEHOLDER] tags; while false, they are
   simply hidden.
   ========================================================================= */

window.PORTFOLIO = {
  config: {
    showPlaceholders: false,

    email: "adeelahmedb46@gmail.com",
    linkedin: "https://www.linkedin.com/in/adeel-ahmed-949954378",
    github: "https://github.com/adeelahmedb46-star",
    cv: "assets/cv/Adeel-Ahmed-CV.pdf",
    photo: "assets/img/adeel-ahmed.jpg",

    // Optional: a form service URL (Formspree, Web3Forms, ...).
    // If empty, the contact form opens the visitor's email app addressed to `email`.
    formEndpoint: ""
  },

  education: [
    {
      degree: "BS Computer Science",
      school: "Balochistan University of Engineering & Technology, Khuzdar (BUETK)",
      period: "Mar 2023 – present · expected Dec 2026",
      current: true,
      details: ["CGPA 3.94 / 4.00", "Class topper", "Final year project: CARE-Safe"]
    },
    {
      degree: "Intermediate in Computer Science (ICS / HSSC)",
      school: "Punjab Group of Colleges, Rawalpindi D-9 Campus · BISE Rawalpindi",
      period: "2020 – 2022",
      details: []
    },
    {
      degree: "Matriculation (SSC), Science Group",
      school: "Government Boys High School Teertaje, Awaran · BBISE Quetta",
      period: "2018 – 2020",
      details: []
    }
  ],

  skills: [
    {
      title: "AI & Data",
      icon: "scan-face",
      items: ["Machine Learning", "Computer Vision", "Face Recognition", "Explainable AI", "OpenCV", "InsightFace", "Data Science", "Data Analytics"],
      usedIn: "CARE-Safe's recognition pipeline, plus Google, Cisco and Saylor data science courses."
    },
    {
      title: "Programming",
      icon: "code",
      items: ["Python", "JavaScript", "HTML", "CSS"],
      usedIn: "Python for CARE-Safe and data science coursework; JavaScript across web projects."
    },
    {
      title: "Web Development",
      icon: "globe",
      items: ["Node.js", "Express.js", "Flask", "Bootstrap"],
      usedIn: "CodeAlpha full-stack internship, Awaran E-Commerce Store and CARE-Safe's dashboard."
    },
    {
      title: "Databases",
      icon: "database",
      items: ["MongoDB", "Mongoose", "SQLite"],
      usedIn: "SQLite in CARE-Safe; MongoDB in e-commerce and university projects."
    },
   
  ],

  featured: {
    name: "CARE-Safe",
    title: "AI System for Secure School Child Pickup Verification Using Real-Time Face Recognition",
    status: "Final year project · in progress since March 2026",
    problem:
      "At a busy school gate, staff have to confirm who is collecting each child, often from memory or paper lists. Mistakes are easy to make and there's little record of who collected whom.",
    solution:
      "CARE-Safe recognises the person at the gate from a live camera feed, checks that they are an authorised guardian for that specific student, and records every pickup. Unauthorised attempts raise a security alert for staff, and the system explains why each decision was made.",
    pipeline: [
      "Enrol guardian faces",
      "Detect face in live video",
      "Extract face embedding",
      "Match to enrolled guardian",
      "Check student authorisation",
      "Log pickup or raise alert"
    ],
    features: [
      "Real-time face recognition",
      "Student–guardian authorisation checks",
      "Explainable AI for verification decisions",
      "Face enrolment",
      "Pickup logs",
      "Security alerts for unauthorised attempts",
      "Admin dashboard for students, guardians and pickups",
      "Context-aware pickup verification"
    ],
    tech: ["Python", "Flask", "OpenCV", "InsightFace", "SQLite", "Bootstrap", "HTML/CSS/JS"],
    role:
      "Developed the system: the real-time face recognition pipeline, authorisation checks, Explainable AI, pickup logs, security alerts and the admin dashboard.",
    links: {
      repo: "",        // GitHub repository URL
      demo: "",        // live demo or video URL
      caseStudy: ""    // report / write-up URL
    }
  },

  projects: [
    {
      name: "Awaran E-Commerce Store",
      kind: "Full-stack web app",
      icon: "globe",
      description:
        "An online store with user authentication, a product catalogue, search, a shopping cart and checkout, backed by a Node.js and Express API with MongoDB.",
      tech: ["Node.js", "Express.js", "MongoDB", "Bootstrap", "HTML", "CSS"],
      links: { repo: "", demo: "" }
    },
 
    {
      name: "Qandeel: Thalassemia Care Center",
      kind: "Healthcare website",
      icon: "globe",
      description:
        "A website for Qandeel, a thalassemia care center: a healthcare and community-focused web project.",
      tech: ["Web"],
      links: { repo: "", demo: "https://www.linkedin.com/safety/go/?url=https%3A%2F%2Flnkd.in%2FdUbuhy8d&urlhash=CBdT&mt=iZSKYM-av6-27C0zbBrEmRBhVGy4T2fxWsze88K1JWhlSlxqyXC4TqICR9feCUrYuMwBWMPpGY-UxnHL9yfyhM71BCA7rytYF0JkcdysaV03B8N0ekyUDxvcGHw&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_creator_profile_all_content_view%3BNG4VLRfYR8C5MFfgz53yEQ%3D%3D" }
    },
  
  ],

  // `documents` open in the certificate viewer; `verify` is an external link.
  experience: [
    {
      role: "Full Stack Development Intern",
      org: "CodeAlpha · Virtual internship",
      period: "Jun 2026 – Jul 2026",
      summary:
        "Completed CodeAlpha's one-month virtual internship programme in full-stack development and received a letter of recommendation.",
      points: [],
      quote: "…has excellent analytical skills… quickly acquired new skills and adeptly adapted to emerging technologies.",
      quoteSource: "CodeAlpha, letter of recommendation",
      tags: ["Full-stack development", "Teamwork", "Remote collaboration"],
      documents: [
        { label: "Certificate", image: "assets/certificates/codealpha-internship.jpg", title: "CodeAlpha Full Stack Development Internship certificate" },
        { label: "Recommendation letter", image: "assets/certificates/codealpha-recommendation.jpg", title: "CodeAlpha letter of recommendation" }
      ],
      verify: "https://www.codealpha.tech/#/verification?id=CA%252FDF1%252F130934"
    },
    {
      role: "Volunteer Head and Photographer",
      org: "Student Developer Society (SDS), BUETK",
      period: "Mar 2024 – Nov 2024",
      summary:
        "Held two roles in the university's student developer society, leading volunteers and covering society events as photographer.",
      points: [
        "Led a team of volunteers at workshops, competitions and student events, assigning tasks and coordinating with students and teachers",
        "Photographed university events, workshops and competitions, and organised photos for the society's records and social media",
        "Received a Certificate of Excellence as Volunteer Head"
      ],
      tags: ["Leadership", "Teamwork", "Event management", "Photography"],
      documents: []
    },
    {
      role: "Part-time Teacher",
      org: "Sadiq Public School, Hub Chowki",
      period: "",
      summary:
        "Taught students part-time, which built my ability to explain ideas clearly and take responsibility for a class.",
      points: [],
      tags: ["Teaching", "Communication", "Responsibility"],
      documents: []
    }
  ],

  honours: [
    { title: "1st Position, Typing Speed Competition", detail: "TechBuzz, Student Developer Society BUETK", date: "Dec 2024", kind: "award" },
    { title: "3rd Position, Photography Competition", detail: "TechBuzz, Student Developer Society BUETK", date: "Dec 2024", kind: "award" },
    { title: "Certificate of Excellence, Volunteer Head", detail: "Student Developer Society BUETK", date: "2024", kind: "award" },
    { title: "Best Participant, Certificate of Appreciation", detail: "Khuzdar Book Fair, Sports & Cultural Festival", date: "Oct 2025", kind: "award" },
    { title: "German Language & Opportunities Seminar", detail: "SDS BUETK & PELS Academy · higher education pathways in Germany", date: "Aug 2025", kind: "event" }
  ],

  // Categories drive the filter buttons in the Certifications section.
  certificationCategories: ["AI & Data", "Programming & Software", "Networking & Security", "Professional Skills"],

  // image: full-size file in assets/certificates/ (a "-thumb" version is used on the card).
  certifications: [
    { name: "Introduction to Data Science", issuer: "Cisco Networking Academy", date: "Sep 2026", category: "AI & Data", image: "assets/certificates/intro-data-science.jpg", link: "" },
    { name: "CS250: Python for Data Science", issuer: "Saylor University", date: "Sep 2026", category: "AI & Data", note: "67 hours · IACET CEUs", credential: "7967792176AA", image: "assets/certificates/python-for-data-science.jpg", link: "" },
    { name: "Foundations of Data Science", issuer: "Google · Coursera", date: "Sep 2026", category: "AI & Data", image: "assets/certificates/foundations-data-science.jpg", link: "https://coursera.org/verify/0FNGZEV3MOKL" },
    { name: "Soft and Employability Skills", issuer: "Balochistan Youth Development Programme, Youth Affairs Balochistan", date: "Sep 2026", category: "Professional Skills", note: "20 credit hours", image: "assets/certificates/soft-employability-skills.jpg", link: "" },
    { name: "SkillQuest: Generative AI Literacy", issuer: "Simplilearn SkillUp", date: "Aug 2026", category: "AI & Data", credential: "99609125", image: "assets/certificates/generative-ai-literacy.jpg", link: "" },
    { name: "Crash Course on Python", issuer: "Google · Coursera", date: "Aug 2026", category: "Programming & Software", image: "assets/certificates/crash-course-python.jpg", link: "https://coursera.org/verify/I0RJM3RZKOKH" },
    { name: "Ask Questions to Make Data-Driven Decisions", issuer: "Google · Coursera", date: "Jun 2026", category: "AI & Data", image: "assets/certificates/ask-questions-data-driven.jpg", link: "https://coursera.org/verify/IADOR69HVGGX" },
    { name: "Foundations: Data, Data, Everywhere", issuer: "Google · Coursera", date: "Apr 2026", category: "AI & Data", image: "assets/certificates/foundations-data-everywhere.jpg", link: "https://coursera.org/verify/RF3QKE1JKHZ7" },
    { name: "Core Hardware and Operating System", issuer: "Muslim Hands Informatics, Quetta", date: "", category: "Networking & Security", image: "", link: "" },
    { name: "Introduction to Modern AI", issuer: "Cisco Networking Academy", date: "Sep 2025", category: "AI & Data", image: "assets/certificates/modern-ai.jpg", link: "https://www.credly.com/badges/ff41d444-01f6-4383-b640-f0f40ab24729" },
    { name: "Learn CCNA 200-301 Network Fundamentals", issuer: "Simplilearn SkillUp", date: "Aug 2025", category: "Networking & Security", credential: "8742357", image: "assets/certificates/ccna-fundamentals.jpg", link: "" },
    { name: "CS406: Information Security", issuer: "Saylor Academy", date: "Aug 2024", category: "Networking & Security", credential: "1878956605AA", image: "assets/certificates/information-security.jpg", link: "" },
    { name: "CS402: Computer Communications and Networks", issuer: "Saylor Academy", date: "Aug 2024", category: "Networking & Security", credential: "7689562083AA", image: "assets/certificates/computer-networks.jpg", link: "" },
    { name: "CS302: Software Engineering", issuer: "Saylor Academy", date: "Jul 2024", category: "Programming & Software", credential: "9057130844AA", image: "assets/certificates/software-engineering.jpg", link: "" },
    { name: "ENGL001: English Composition I", issuer: "Saylor Academy", date: "Jul 2024", category: "Professional Skills", credential: "6040630822AA", image: "assets/certificates/english-composition.jpg", link: "" }
  ]
};
