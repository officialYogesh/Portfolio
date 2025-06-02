// About Page Content Configuration
// This file contains all content for the About page narrative

export interface StorySection {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  anecdote?: string;
  highlight?: string;
  emotion?:
    | "curiosity"
    | "challenge"
    | "growth"
    | "achievement"
    | "reflection"
    | "innovation"
    | "confidence"
    | "vision";
  visualCue?: string; // Icon or visual element
}

export interface PersonalJourney {
  phase: string;
  title: string;
  period: string;
  description: string;
  challenge?: string;
  growth: string;
  keyMoment?: string;
}

export interface WorkPhilosophy {
  principle: string;
  description: string;
  example?: string;
  icon: string;
}

export interface AboutPageContent {
  hero: {
    greeting: string;
    introduction: string;
    tagline: string;
    personalTouch: string;
    professionalImage: {
      src: string;
      alt: string;
      description: string;
    };
    quickStats: Array<{
      label: string;
      value: string;
      description: string;
    }>;
  };
  storyArc: {
    introduction: StorySection;
    journey: StorySection[];
    currentState: StorySection;
    futureAspirations: StorySection;
  };
  personalJourney: PersonalJourney[];
  workPhilosophy: WorkPhilosophy[];
  workInfo: {
    title: string;
    description: string;
    highlights: string[];
    approach: string;
    link?: string;
  };
  projectsInfo: {
    title: string;
    description: string;
    passion: string;
    link: string;
  };
  offlineInfo: {
    title: string;
    description: string;
    interests: Array<{
      activity: string;
      description: string;
      connection?: string; // How it connects to professional life
    }>;
  };
  connectInfo: {
    title: string;
    description: string;
    invitation: string;
    preferredChannels: string[];
  };
}

// Main About Page Content
export const aboutPageContent: AboutPageContent = {
  hero: {
    greeting: "Hello, my name is Yogesh",
    introduction:
      "I'm a Software Development Engineer specializing in GenAI solutions, cloud architecture, and full-stack development.",
    tagline: "Crafting digital experiences that matter",
    personalTouch:
      "When I'm not coding, you'll find me exploring new technologies, contributing to open source, or sharing knowledge with the developer community.",
    professionalImage: {
      src: "/images/profile/profile.jpg",
      alt: "Yogesh Patil - Software Development Engineer",
      description: "Professional headshot of Yogesh Patil",
    },
    quickStats: [
      {
        label: "Experience",
        value: "4+ years",
        description: "Building scalable systems and AI solutions",
      },
      {
        label: "Current Focus",
        value: "GenAI & LLMs",
        description: "LangChain, RAG, and AI automation",
      },
      {
        label: "Location",
        value: "Remote, NY",
        description: "Available for remote opportunities",
      },
    ],
  },

  storyArc: {
    introduction: {
      id: "introduction",
      title: "From Mumbai Streets to Global Tech",
      content: [
        "Growing up in Mumbai, I was that kid who took apart every gadget I could find, desperate to understand how things worked. What started as childhood curiosity in the bustling tech markets of Mumbai became a journey across continents, building systems that now serve thousands.",
        "Today, from my desk in Syracuse, I create AI solutions that automate entire business workflows. But the foundation was laid in those early days—always asking 'How can this work better?'",
      ],
      anecdote:
        "My first 'Hello World' program in Mumbai felt like magic. Now, watching our AI systems save companies 20+ hours weekly feels like that same magic, just scaled.",
      emotion: "curiosity",
      visualCue: "🌍",
    },

    journey: [
      {
        id: "foundation-and-dreams",
        title: "The Mumbai Foundation",
        subtitle: "Where Every Coder's Journey Begins",
        content: [
          "At University of Mumbai, I wasn't just learning Computer Science—I was dreaming in code. The breakthrough came with 'Upside Down,' our Stranger Things-inspired game where players swipe between parallel worlds. When it hit 1,000+ downloads and won the Teknack Hackathon, I realized something powerful: great technology isn't about complex algorithms—it's about creating experiences people can't put down.",
          "Mumbai taught me to build with constraints, to solve real problems with limited resources. That scrappy mindset became my superpower.",
        ],
        emotion: "achievement",
        visualCue: "🏗️",
      },
      {
        id: "enterprise-scaling",
        title: "American Enterprise",
        subtitle: "From Local Solutions to Global Systems",
        content: [
          "Moving from Mumbai's startup energy to American enterprise architecture was like switching from street cricket to the major leagues. At Tech Prescient and Xoriant, I learned that great engineering isn't just about making things work—it's about making them work for thousands of users simultaneously.",
          "The Vonage portal I built didn't just function; it drove 400% adoption growth. The Maxar platform didn't just process data; it enabled $100K+ in new revenue. Each project taught me that the best technology amplifies human potential.",
        ],
        highlight:
          "Built systems serving 10,000+ users while maintaining zero security incidents—proving that innovation and reliability aren't mutually exclusive.",
        emotion: "growth",
        visualCue: "🚀",
      },
      {
        id: "ai-breakthrough",
        title: "The AI Revolution",
        subtitle: "Where Experience Meets Innovation",
        content: [
          "At Impel AI, everything clicked. Years of enterprise experience met cutting-edge AI, and suddenly I was building systems that don't just automate tasks—they think ahead. Our dealership AI reduces scheduling time by 80% while improving customer satisfaction.",
          "The IBM TechXchange Hackathon was validation: our financial compliance AI proved that experience-driven engineering can tame even the most complex AI challenges.",
        ],
        anecdote:
          "When our AI prevented a major scheduling conflict before it happened, saving a dealership thousands in lost revenue—that's when I knew we'd built something truly intelligent.",
        emotion: "innovation",
        visualCue: "🧠",
      },
    ],

    currentState: {
      id: "current-state",
      title: "The Syracuse Chapter",
      content: [
        "Now pursuing my Master's at Syracuse University, I'm not just learning—I'm synthesizing everything. The Mumbai hustle, the enterprise precision, the AI innovation—all converging into something bigger.",
        "I build systems that businesses bet their growth on. React interfaces that users love, Python backends that scale effortlessly, AI that makes complex decisions transparently. The kid from Mumbai is now engineering the future.",
      ],
      highlight:
        "From Mumbai's constraints to Syracuse's possibilities—every challenge shaped the engineer I am today.",
      emotion: "confidence",
      visualCue: "🎓",
    },

    futureAspirations: {
      id: "future-aspirations",
      title: "The Next Chapter",
      content: [
        "The journey from Mumbai to Syracuse taught me that great engineering transcends geography. I want to build AI systems that don't just serve Silicon Valley—they empower people everywhere, solving problems I first witnessed on Mumbai's streets.",
        "The future I'm building is one where technology adapts to humans, not the other way around.",
      ],
      anecdote:
        "Every line of code I write today carries the dreams of that Mumbai kid who believed technology could change everything.",
      emotion: "vision",
      visualCue: "🌟",
    },
  },

  personalJourney: [
    {
      phase: "Innovation Foundation",
      title: "Award-Winning Creator",
      period: "2016 - 2020",
      description:
        "Built strong technical fundamentals at University of Mumbai while proving innovation ability through award-winning game development and academic excellence.",
      challenge:
        "Balancing rigorous computer science coursework with hands-on development that people would actually use and love.",
      growth:
        "Learned that technical skill without user impact is incomplete—developed my philosophy of building technology that genuinely improves people's lives.",
      keyMoment:
        "Winning first place at Teknack Game Development Hackathon with 'Upside Down' game, achieving 1,000+ downloads and proving I could build products people actually wanted to use.",
    },
    {
      phase: "Enterprise Excellence",
      title: "Business Impact Driver",
      period: "2020 - 2023",
      description:
        "Mastered enterprise-scale system development at Xoriant Solutions and Tech Prescient, building platforms that drove measurable business outcomes and revenue growth.",
      challenge:
        "Scaling from individual contributor to technical leader while delivering systems that balance innovation with enterprise reliability requirements.",
      growth:
        "Developed expertise in architecting systems that don't just work technically—they drive business results, from 4x platform adoption to $100K+ revenue enablement.",
      keyMoment:
        "Leading the Vonage enterprise portal that achieved 400% platform adoption growth, proving I could build systems that users and businesses both love.",
    },
    {
      phase: "AI Innovation Leadership",
      title: "Intelligent Automation Pioneer",
      period: "2023 - Present",
      description:
        "Advancing Computer Science studies at Syracuse University while pioneering GenAI solutions at Impel AI, demonstrating leadership in the most cutting-edge areas of technology.",
      challenge:
        "Integrating breakthrough AI technologies with enterprise-grade reliability while maintaining the performance and security standards of production systems.",
      growth:
        "Became an expert in LangChain, RAG systems, and prompt engineering while proving these technologies can deliver transformational business impact at scale.",
      keyMoment:
        "Automating 70% of dealership workflows with GenAI pipelines and winning recognition at IBM TechXchange watsonx Hackathon—establishing myself as a leader in practical AI implementation.",
    },
  ],

  workPhilosophy: [
    {
      principle: "Impact-Driven Innovation",
      description:
        "Every technical decision should ultimately create measurable value—whether that's saving time, generating revenue, or fundamentally improving how people work.",
      example:
        "Built LangChain RAG pipelines that automated 70% of dealership workflows while reducing scheduling time by 80%, proving AI can deliver both efficiency and user experience improvements.",
      icon: "target",
    },
    {
      principle: "Performance as a Feature",
      description:
        "Speed and reliability aren't just technical requirements—they're user experience features that can make or break adoption and business success.",
      example:
        "Improved API response times by 42% and reduced communication latency by 66%, directly contributing to 19% increase in appointment confirmations and better customer satisfaction.",
      icon: "zap",
    },
    {
      principle: "Scalable Problem-Solving",
      description:
        "Build solutions that grow with the problem—from supporting thousands of users today to millions tomorrow, while maintaining quality and reliability.",
      example:
        "Designed microservices handling 100+ data sources and 5K+ concurrent data points, plus multi-tenant RBAC systems that scale from startups to enterprise clients.",
      icon: "layers",
    },
    {
      principle: "Human-Centered AI",
      description:
        "The best AI systems don't replace human judgment—they amplify human capabilities while maintaining transparency, control, and ethical considerations.",
      example:
        "Created AI-powered compliance assistant for financial services that augments regulatory expertise rather than replacing it, ensuring humans remain in control of critical decisions.",
      icon: "brain",
    },
  ],

  workInfo: {
    title: "Work",
    description:
      "Currently working as a Software Engineer Intern at Impel AI, where I specialize in building GenAI solutions for the automotive industry. My focus is on LangChain-powered automation systems, microservices architecture, and cloud infrastructure that drives real business impact.",
    highlights: [
      "Automated 70% of dealership service appointment workflows",
      "Improved communication latency by 66% with asynchronous messaging",
      "Built LLM-based validation middleware with 32% accuracy improvement",
      "Increased appointment confirmations by 19% through AI personalization",
    ],
    approach:
      "I combine cutting-edge AI technologies with proven software engineering practices to build systems that are not only innovative but also reliable, scalable, and maintainable.",
    link: "/resume",
  },

  projectsInfo: {
    title: "Projects",
    description:
      "I love building innovative solutions that solve real-world problems. From AI-powered career platforms to enterprise automation systems, my projects showcase the intersection of cutting-edge technology and practical application.",
    passion:
      "My projects reflect my passion for AI innovation, performance optimization, and creating technology that makes a meaningful difference in people's lives and business operations.",
    link: "/projects",
  },

  offlineInfo: {
    title: "Beyond the Screen",
    description:
      "Exploring the world, one destination at a time—each journey bringing fresh perspectives to my work.",
    interests: [
      {
        activity: "Global Explorer",
        description:
          "From Niagara's thundering falls to NYC's electric energy, Boston's historic charm to Vegas's innovative entertainment—each destination teaches me something new about human experience and technology's role in connecting us.",
        connection:
          "Travel shapes how I build—creating software that works for everyone, everywhere.",
      },
    ],
  },

  connectInfo: {
    title: "Let's Connect",
    description:
      "I'm always interested in discussing new opportunities, innovative projects, or just talking about the latest developments in AI and software engineering.",
    invitation:
      "Feel free to reach out – I'd love to hear about your projects and explore how we can collaborate or create something amazing together.",
    preferredChannels: [
      "Email for opportunities and detailed discussions",
      "LinkedIn for professional networking",
      "GitHub for code collaboration",
    ],
  },
};

// Export individual sections for easy access
export const {
  hero,
  storyArc,
  personalJourney,
  workPhilosophy,
  workInfo,
  projectsInfo,
  offlineInfo,
  connectInfo,
} = aboutPageContent;
