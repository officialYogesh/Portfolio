// About Page Content Configuration
// This file contains all content for the About page narrative

export interface StorySection {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  anecdote?: string;
  highlight?: string;
  emotion?: "curiosity" | "challenge" | "growth" | "achievement" | "reflection";
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
    greeting: "Hello! I'm Yogesh Patil",
    introduction:
      "A passionate full-stack developer who believes technology should solve real problems and make life better.",
    tagline: "Crafting digital experiences that matter",
    personalTouch:
      "When I'm not coding, you'll find me exploring new technologies, contributing to open source, or sharing knowledge with the developer community.",
  },

  storyArc: {
    introduction: {
      id: "introduction",
      title: "Where It All Began",
      content: [
        "My journey into technology started with a simple question: 'How can I use code to solve real-world problems?' This curiosity led me from writing my first 'Hello World' program to building applications that impact thousands of users.",
        "Growing up in Mumbai, I was fascinated by how technology could bridge gaps and create opportunities. This fascination turned into a passion, and eventually, into a career where I get to build solutions that matter.",
      ],
      anecdote:
        "I still remember the excitement I felt when my first web application went live – seeing real users interact with something I built was magical.",
      emotion: "curiosity",
      visualCue: "✨",
    },

    journey: [
      {
        id: "early-days",
        title: "The Learning Years",
        subtitle: "Building Foundations",
        content: [
          "During my computer science studies at the University of Mumbai, I dove deep into programming fundamentals. But it was the late-night coding sessions, hackathons, and side projects that truly shaped my understanding of software development.",
          "I learned that great code isn't just about syntax – it's about empathy, understanding user needs, and crafting solutions that feel intuitive and powerful.",
        ],
        anecdote:
          "During one hackathon, our team built a solution for local businesses to manage inventory. Seeing a small shop owner's face light up when they understood how our app could save them hours of manual work – that's when I knew I wanted to build technology that truly serves people.",
        emotion: "growth",
        visualCue: "🚀",
      },
      {
        id: "professional-growth",
        title: "Entering the Professional World",
        subtitle: "From Code to Impact",
        content: [
          "My first professional role taught me that engineering isn't just about writing code – it's about understanding business needs, collaborating with diverse teams, and delivering value consistently.",
          "I've had the privilege of working on projects ranging from e-commerce platforms handling thousands of transactions to AI-powered applications that automate complex workflows.",
        ],
        highlight:
          "Led development of a system that reduced manual processing time by 70%, directly impacting the daily workflow of over 100 team members.",
        emotion: "achievement",
        visualCue: "💼",
      },
      {
        id: "specialization",
        title: "Finding My Niche",
        subtitle: "The AI Revolution",
        content: [
          "The emergence of generative AI opened up new possibilities for solving complex problems. I dove deep into this space, exploring how AI can augment human capabilities rather than replace them.",
          "Working with large language models, RAG systems, and prompt engineering has shown me the incredible potential of AI when combined with thoughtful engineering and user-centered design.",
        ],
        anecdote:
          "Building my first RAG-powered application felt like giving a computer the ability to have context-aware conversations. The possibilities seemed endless.",
        emotion: "challenge",
        visualCue: "🤖",
      },
    ],

    currentState: {
      id: "current-state",
      title: "Where I Am Today",
      content: [
        "Today, I'm a full-stack developer with a specialization in AI-powered solutions. I work across the entire technology stack, from crafting responsive user interfaces to designing scalable backend systems and integrating cutting-edge AI capabilities.",
        "My approach combines technical excellence with user empathy. I believe the best solutions are those that feel invisible to users – they just work, and they work beautifully.",
        "I'm particularly passionate about the intersection of AI and user experience, exploring how we can make powerful technologies accessible and helpful for everyone.",
      ],
      highlight:
        "Currently focused on building AI-enhanced applications that democratize access to advanced capabilities while maintaining user privacy and control.",
      emotion: "reflection",
      visualCue: "🎯",
    },

    futureAspirations: {
      id: "future-aspirations",
      title: "Looking Ahead",
      content: [
        "The future excites me. I see a world where AI and human creativity work together to solve our biggest challenges – from climate change to education accessibility.",
        "I want to be part of building that future. Whether it's through open-source contributions, mentoring other developers, or creating products that make a real difference, I'm committed to using technology as a force for good.",
        "My goal is to continue growing as both a technologist and a problem-solver, always staying curious and always putting people first.",
      ],
      anecdote:
        "Every line of code I write is a small bet on a better future. That's what keeps me motivated.",
      emotion: "growth",
      visualCue: "🌟",
    },
  },

  personalJourney: [
    {
      phase: "Discovery",
      title: "First Lines of Code",
      period: "2015-2019",
      description:
        "University years focused on building strong programming fundamentals and discovering my passion for web development.",
      challenge:
        "Learning to think in code and understanding how to translate ideas into working software.",
      growth:
        "Developed problem-solving mindset and learned the importance of user-centered design.",
      keyMoment:
        "Built first full-stack application - a task management system for my student organization.",
    },
    {
      phase: "Foundation",
      title: "Professional Growth",
      period: "2019-2022",
      description:
        "Early career focused on mastering modern web technologies and understanding business requirements.",
      challenge:
        "Balancing technical excellence with business needs and tight deadlines.",
      growth:
        "Learned to communicate technical concepts to non-technical stakeholders and lead small development teams.",
      keyMoment:
        "Led my first major project - an e-commerce platform that increased client revenue by 40%.",
    },
    {
      phase: "Specialization",
      title: "AI Integration",
      period: "2022-Present",
      description:
        "Diving deep into AI/ML integration, focusing on practical applications that enhance user experiences.",
      challenge:
        "Staying current with rapidly evolving AI landscape while building production-ready systems.",
      growth:
        "Developed expertise in AI engineering and learned to bridge the gap between AI research and practical applications.",
      keyMoment:
        "Successfully deployed first LLM-powered application that automated 60% of customer service inquiries.",
    },
  ],

  workPhilosophy: [
    {
      principle: "User-Centric Design",
      description:
        "Every technical decision should ultimately serve the user's needs and improve their experience.",
      example:
        "I always start by understanding the problem from the user's perspective before diving into technical solutions.",
      icon: "👥",
    },
    {
      principle: "Continuous Learning",
      description:
        "Technology evolves rapidly, and staying curious is essential for building relevant solutions.",
      example:
        "I dedicate time each week to exploring new technologies and contributing to open-source projects.",
      icon: "📚",
    },
    {
      principle: "Collaborative Excellence",
      description:
        "The best solutions emerge when diverse perspectives come together with shared goals.",
      example:
        "I believe in clear communication, knowledge sharing, and lifting up fellow developers.",
      icon: "🤝",
    },
    {
      principle: "Quality Over Speed",
      description:
        "Well-crafted code that's maintainable and scalable serves everyone better in the long run.",
      example:
        "I prioritize clean architecture, comprehensive testing, and thoughtful documentation.",
      icon: "⚡",
    },
  ],

  workInfo: {
    title: "My Work",
    description:
      "I specialize in building full-stack web applications with a focus on user experience and AI integration.",
    highlights: [
      "Full-stack development with React, Next.js, Node.js, and Python",
      "AI/ML integration using LangChain, OpenAI APIs, and custom models",
      "Cloud architecture and deployment on AWS and Vercel",
      "Database design and optimization (PostgreSQL, MongoDB)",
      "API design and microservices architecture",
    ],
    approach:
      "I believe in building solutions that are not just functional, but delightful to use. Every project starts with understanding the real problem and ends with measuring real impact.",
    link: "/resume",
  },

  projectsInfo: {
    title: "My Projects",
    description:
      "A collection of applications that solve real problems, from AI-powered tools to full-stack web applications.",
    passion:
      "Each project represents a learning journey and an opportunity to explore new technologies while solving meaningful problems.",
    link: "/projects",
  },

  offlineInfo: {
    title: "Beyond the Code",
    description:
      "When I'm not coding, I'm usually exploring ideas that eventually find their way back into my work.",
    interests: [
      {
        activity: "Technical Writing",
        description:
          "Sharing knowledge through blog posts and tutorials about web development and AI integration.",
        connection:
          "Writing helps me clarify complex concepts and stay connected with the developer community.",
      },
      {
        activity: "Open Source",
        description:
          "Contributing to projects that make development easier and more accessible for everyone.",
        connection:
          "Open source teaches me about code quality, collaboration, and building for diverse use cases.",
      },
      {
        activity: "Mentoring",
        description:
          "Helping new developers navigate their journey in tech through informal mentoring and code reviews.",
        connection:
          "Teaching others helps me see familiar problems from fresh perspectives.",
      },
      {
        activity: "Reading",
        description:
          "Exploring topics ranging from system design to psychology and design thinking.",
        connection:
          "Understanding human behavior and mental models makes me a better product developer.",
      },
    ],
  },

  connectInfo: {
    title: "Let's Connect",
    description:
      "I'm always excited to discuss technology, share ideas, or explore collaboration opportunities.",
    invitation:
      "Whether you're working on an interesting project, need technical advice, or just want to chat about the future of web development, I'd love to hear from you.",
    preferredChannels: [
      "Email for detailed discussions",
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
