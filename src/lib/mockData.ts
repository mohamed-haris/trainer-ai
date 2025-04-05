// src/lib/mockData.ts

// User types
export type UserRole = "admin" | "manager" | "employee";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department: string;
  position: string;
  lastLogin: string;
  credits: number;
  company: string;
  createdAt: string;
}

// Agent types
export type AgentType = "training" | "evaluation" | "simulation" | "onboarding";

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  description: string;
  content: string;
  industry: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isTemplate: boolean;
  instructions?: string;
}

// Training types
export interface TrainingSession {
  id: string;
  title: string;
  agentId: string;
  agentName: string;
  userId: string;
  userName: string;
  progress: number;
  status: "not_started" | "in_progress" | "completed";
  startDate?: string;
  completionDate?: string;
  timeSpent: number; // in minutes
  createdAt: string;
  recommendation?: string;
}

// Evaluation types
export interface EvaluationSession {
  id: string;
  title: string;
  agentId: string;
  agentName: string;
  userId: string;
  userName: string;
  score?: number;
  status: "pending" | "in_progress" | "completed";
  startDate?: string;
  completionDate?: string;
  timeSpent: number; // in minutes
  createdAt: string;
  strengths: string[];
  weaknesses: string[];
  recommendation?: string;
}

// Conversation types
export interface Message {
  id: string;
  sender: "user" | "agent";
  content: string;
  timestamp: string;
  sessionId: string;
}

// Analytics types
export interface PerformanceMetric {
  id: string;
  userId: string;
  userName: string;
  metricName: string;
  value: number;
  previousValue?: number;
  changePercentage?: number;
  date: string;
}

export interface TeamMetric {
  id: string;
  teamId: string;
  teamName: string;
  metricName: string;
  value: number;
  previousValue?: number;
  changePercentage?: number;
  date: string;
}

// Integration types
export interface Integration {
  id: string;
  name: string;
  type: "hris" | "lms" | "crm" | "communication" | "knowledge_base";
  status: "connected" | "disconnected" | "error";
  lastSync?: string;
  configuration: Record<string, any>;
}

// Mock data generation
export const currentUser: User = {
  id: "user_1",
  name: "Mohamed Haris",
  email: "haris@digitalagents.io",
  role: "admin",
  avatar: "/images/avatars/haris.png",
  department: "Product Development",
  position: "Product Manager",
  lastLogin: "2025-04-04T01:31:54",
  credits: 10,
  company: "DigitalAgents.io",
  createdAt: "2024-12-15T10:30:00",
};

export const users: User[] = [
  currentUser,
  {
    id: "user_2",
    name: "Sarah Johnson",
    email: "sarah@acme.com",
    role: "manager",
    avatar: "/images/avatars/sarah.png",
    department: "Sales",
    position: "Sales Director",
    lastLogin: "2025-04-03T14:22:10",
    credits: 8,
    company: "Acme Corporation",
    createdAt: "2025-01-10T09:15:00",
  },
  {
    id: "user_3",
    name: "David Martinez",
    email: "david@acme.com",
    role: "employee",
    avatar: "/images/avatars/david.png",
    department: "Sales",
    position: "Sales Representative",
    lastLogin: "2025-04-02T11:45:33",
    credits: 5,
    company: "Acme Corporation",
    createdAt: "2025-01-15T10:30:00",
  },
  {
    id: "user_4",
    name: "Emily Wong",
    email: "emily@globex.com",
    role: "manager",
    avatar: "/images/avatars/emily.png",
    department: "Customer Support",
    position: "Support Team Lead",
    lastLogin: "2025-04-03T16:08:22",
    credits: 7,
    company: "Globex Industries",
    createdAt: "2025-02-05T14:20:00",
  },
  {
    id: "user_5",
    name: "Michael Brown",
    email: "michael@globex.com",
    role: "employee",
    avatar: "/images/avatars/michael.png",
    department: "Customer Support",
    position: "Support Specialist",
    lastLogin: "2025-04-04T09:12:45",
    credits: 3,
    company: "Globex Industries",
    createdAt: "2025-02-10T09:30:00",
  },
];

export const agents: Agent[] = [
  {
    id: "agent_1",
    name: "Restaurant Employee Onboarding Trainer",
    type: "training",
    description:
      "AI trainer responsible for onboarding new restaurant employees",
    content:
      "You are an AI trainer responsible for onboarding new restaurant employees. Your job is to guide them through the restaurant's key processes, safety standards, customer service expectations, and food handling procedures. Topics you cover: - Greeting customers and taking orders. - Using the POS (Point of Sale) system. - Food hygiene and cleanliness. - Team communication and kitchen etiquette. - Upselling and promoting combo deals. - Handling complaints professionally. - Dress code and punctuality. You will simulate real-life situations and ask questions to test the employee's understanding. You should be friendly, informative, and supportive — just like a helpful senior colleague.",
    industry: "Hospitality",
    createdBy: "user_1",
    createdAt: "2025-03-10T13:45:00",
    updatedAt: "2025-03-15T09:30:00",
    isTemplate: true,
    instructions:
      "Create a supportive learning environment. Focus on practical scenarios.",
  },
  {
    id: "agent_2",
    name: "HVAC Technician Trainer",
    type: "training",
    description: "Specialized AI trainer for HVAC technicians",
    content:
      "You are an experienced HVAC training specialist responsible for onboarding seasoned HVAC Technicians with 5-7 years of field experience. Your mission is to guide these technicians through the company's service protocols, safety standards, technical troubleshooting, and customer communication best practices. Topics you cover: Overview of major HVAC brands and system types. Diagnosing and troubleshooting common HVAC issues. Adhering to safety standards and regulatory compliance. Proper use and maintenance of diagnostic and repair tools. Effective communication with customers and team members. Documenting service calls and maintaining accurate records. You should adapt to the technician's experience level while ensuring they meet company standards.",
    industry: "HVAC & Construction",
    createdBy: "user_1",
    createdAt: "2025-03-12T10:15:00",
    updatedAt: "2025-03-16T14:20:00",
    isTemplate: true,
    instructions:
      "Adapt to the technician's experience level. Focus on company-specific protocols.",
  },
  {
    id: "agent_3",
    name: "Sales Representative Evaluator",
    type: "evaluation",
    description: "AI agent for evaluating sales representative performance",
    content:
      "You are an AI evaluator tasked with assessing the skills and knowledge of sales representatives. You will simulate customer interactions, testing the representative's ability to understand customer needs, present solutions, handle objections, and close deals effectively. Your evaluation covers: - Product knowledge accuracy - Needs assessment techniques - Solution presentation skills - Objection handling capabilities - Closing techniques and follow-up processes. You will score performance across multiple dimensions and provide specific feedback on strengths and areas for improvement.",
    industry: "Sales",
    createdBy: "user_2",
    createdAt: "2025-03-20T11:30:00",
    updatedAt: "2025-03-21T15:45:00",
    isTemplate: false,
  },
  {
    id: "agent_4",
    name: "Dental Office Receptionist Trainer",
    type: "training",
    description: "AI trainer for dental office front desk staff",
    content:
      "You are an AI trainer for dental office receptionists and front desk staff. Your role is to prepare them for efficiently managing patient interactions, scheduling, insurance verification, and creating a welcoming environment. Topics covered include: - Greeting patients and managing the waiting room - Efficient appointment scheduling and management - Insurance verification and billing procedures - HIPAA compliance and patient privacy - Handling difficult patient situations - Coordinating with the clinical team - Using the office's practice management software",
    industry: "Healthcare - Dental",
    createdBy: "user_1",
    createdAt: "2025-03-18T09:20:00",
    updatedAt: "2025-03-19T16:10:00",
    isTemplate: true,
  },
  {
    id: "agent_5",
    name: "Financial Advisor Simulation",
    type: "simulation",
    description: "AI agent for simulating client investment conversations",
    content:
      "You are an AI simulator that role-plays as various client types seeking financial advice. Your purpose is to help financial advisors practice client interactions in realistic scenarios. You will present as different client personas with varying financial goals, risk tolerances, and communication styles. The advisor will need to appropriately: - Assess your financial situation and goals - Explain investment concepts clearly - Recommend suitable financial products - Address concerns and objections - Comply with regulatory requirements - Demonstrate ethical practice standards",
    industry: "Financial Services",
    createdBy: "user_1",
    createdAt: "2025-03-22T13:40:00",
    updatedAt: "2025-03-23T10:15:00",
    isTemplate: true,
  },
];

export const trainingSessions: TrainingSession[] = [
  {
    id: "training_1",
    title: "Restaurant Employee Onboarding",
    agentId: "agent_1",
    agentName: "Restaurant Employee Onboarding Trainer",
    userId: "user_3",
    userName: "David Martinez",
    progress: 30,
    status: "in_progress",
    startDate: "2025-04-01T10:00:00",
    timeSpent: 45,
    createdAt: "2025-03-30T14:20:00",
    recommendation:
      "Approve, but needs to continue with the onboarding process to ensure user gains complete understanding of all necessary topics.",
  },
  {
    id: "training_2",
    title: "HVAC Service Protocols",
    agentId: "agent_2",
    agentName: "HVAC Technician Trainer",
    userId: "user_5",
    userName: "Michael Brown",
    progress: 30,
    status: "in_progress",
    startDate: "2025-04-02T11:30:00",
    timeSpent: 60,
    createdAt: "2025-04-01T09:15:00",
    recommendation:
      "Reject, as the user has shown limited engagement with the material and has not demonstrated a clear understanding of the HVAC Technician Trainer program.",
  },
  {
    id: "training_3",
    title: "Restaurant Employee Onboarding",
    agentId: "agent_1",
    agentName: "Restaurant Employee Onboarding Trainer",
    userId: "user_5",
    userName: "Michael Brown",
    progress: 10,
    status: "in_progress",
    startDate: "2025-04-03T09:00:00",
    timeSpent: 20,
    createdAt: "2025-04-02T16:30:00",
    recommendation:
      "Reject due to lack of user interaction and understanding. The user needs to engage more actively and ask detailed questions to learn about the process or product effectively.",
  },
];

export const evaluationSessions: EvaluationSession[] = [
  {
    id: "eval_1",
    title: "Sales Performance Evaluation",
    agentId: "agent_3",
    agentName: "Sales Representative Evaluator",
    userId: "user_3",
    userName: "David Martinez",
    score: 72,
    status: "completed",
    startDate: "2025-03-28T14:00:00",
    completionDate: "2025-03-28T15:30:00",
    timeSpent: 90,
    createdAt: "2025-03-27T11:45:00",
    strengths: [
      "Strong product knowledge",
      "Excellent rapport building with customers",
      "Clear communication style",
    ],
    weaknesses: [
      "Needs improvement in handling price objections",
      "Limited use of upselling techniques",
      "Follow-up process could be more structured",
    ],
    recommendation:
      "Recommend targeted training on objection handling and sales closing techniques.",
  },
  {
    id: "eval_2",
    title: "Customer Support Skills Assessment",
    agentId: "agent_4",
    agentName: "Customer Support Evaluator",
    userId: "user_5",
    userName: "Michael Brown",
    score: 65,
    status: "completed",
    startDate: "2025-03-30T10:00:00",
    completionDate: "2025-03-30T11:15:00",
    timeSpent: 75,
    createdAt: "2025-03-29T15:30:00",
    strengths: [
      "Empathetic listening",
      "Good technical knowledge",
      "Professional demeanor",
    ],
    weaknesses: [
      "Resolution time could be improved",
      "Needs more familiarity with escalation procedures",
      "Documentation could be more thorough",
    ],
    recommendation:
      "Schedule training sessions focused on efficient problem resolution and proper documentation protocols.",
  },
];

export const messages: Message[] = [
  {
    id: "msg_1",
    sender: "user",
    content: "Very exciting, and can't wait to start.",
    timestamp: "2025-04-01T10:05:00",
    sessionId: "training_1",
  },
  {
    id: "msg_2",
    sender: "agent",
    content:
      "That's great to hear! Let's dive into the first module: greeting customers and taking orders. It's all about making a great first impression. How do you think you would greet a customer who just walked in?",
    timestamp: "2025-04-01T10:05:30",
    sessionId: "training_1",
  },
  {
    id: "msg_3",
    sender: "user",
    content:
      "I would say, hi. How was today? And what would you like to order?",
    timestamp: "2025-04-01T10:06:15",
    sessionId: "training_1",
  },
  {
    id: "msg_4",
    sender: "agent",
    content:
      "That's a great start! Being friendly and approachable is key. You could enhance it by adding a smile and saying something like, \"Hi! Welcome to [Restaurant Name]. How's your day going so far?\" What do you think about adding that little extra warmth?",
    timestamp: "2025-04-01T10:07:00",
    sessionId: "training_1",
  },
  {
    id: "msg_5",
    sender: "user",
    content:
      "Hello, I'm not sure how to diagnose this AC unit that's showing error code E-35.",
    timestamp: "2025-04-02T11:35:00",
    sessionId: "training_2",
  },
  {
    id: "msg_6",
    sender: "agent",
    content:
      "Thanks for bringing that up. Error code E-35 typically indicates a communication issue between the indoor and outdoor units. Let's walk through the diagnostic steps: First, you'll want to check if the communication wires are properly connected at both the indoor and outdoor units. Are you familiar with where to locate these connection points?",
    timestamp: "2025-04-02T11:36:00",
    sessionId: "training_2",
  },
];

export const performanceMetrics: PerformanceMetric[] = [
  {
    id: "metric_1",
    userId: "user_3",
    userName: "David Martinez",
    metricName: "Sales Conversion Rate",
    value: 28.5,
    previousValue: 24.2,
    changePercentage: 17.8,
    date: "2025-04-01",
  },
  {
    id: "metric_2",
    userId: "user_3",
    userName: "David Martinez",
    metricName: "Average Deal Size",
    value: 5250,
    previousValue: 4800,
    changePercentage: 9.4,
    date: "2025-04-01",
  },
  {
    id: "metric_3",
    userId: "user_3",
    userName: "David Martinez",
    metricName: "Customer Satisfaction",
    value: 4.2,
    previousValue: 3.9,
    changePercentage: 7.7,
    date: "2025-04-01",
  },
  {
    id: "metric_4",
    userId: "user_5",
    userName: "Michael Brown",
    metricName: "Support Ticket Resolution Time",
    value: 47.2,
    previousValue: 52.8,
    changePercentage: -10.6,
    date: "2025-04-01",
  },
  {
    id: "metric_5",
    userId: "user_5",
    userName: "Michael Brown",
    metricName: "First Contact Resolution Rate",
    value: 68.5,
    previousValue: 65.0,
    changePercentage: 5.4,
    date: "2025-04-01",
  },
];

export const teamMetrics: TeamMetric[] = [
  {
    id: "team_metric_1",
    teamId: "team_1",
    teamName: "Sales Team",
    metricName: "Average Sales Cycle",
    value: 18.5,
    previousValue: 21.2,
    changePercentage: -12.7,
    date: "2025-04-01",
  },
  {
    id: "team_metric_2",
    teamId: "team_1",
    teamName: "Sales Team",
    metricName: "Team Quota Attainment",
    value: 92.5,
    previousValue: 86.0,
    changePercentage: 7.6,
    date: "2025-04-01",
  },
  {
    id: "team_metric_3",
    // Continuation of mockData.ts

    teamId: "team_2",
    teamName: "Support Team",
    metricName: "Average Resolution Time",
    value: 42.5,
    previousValue: 48.3,
    changePercentage: -12.0,
    date: "2025-04-01",
  },
  {
    id: "team_metric_4",
    teamId: "team_2",
    teamName: "Support Team",
    metricName: "Customer Satisfaction",
    value: 4.4,
    previousValue: 4.1,
    changePercentage: 7.3,
    date: "2025-04-01",
  },
];

export const integrations: Integration[] = [
  {
    id: "integration_1",
    name: "Workday",
    type: "hris",
    status: "connected",
    lastSync: "2025-04-04T01:00:00",
    configuration: {
      apiKey: "********",
      syncFrequency: "daily",
      dataMapping: {
        employees: true,
        departments: true,
        positions: true,
      },
    },
  },
  {
    id: "integration_2",
    name: "Salesforce",
    type: "crm",
    status: "connected",
    lastSync: "2025-04-04T02:30:00",
    configuration: {
      apiKey: "********",
      syncFrequency: "hourly",
      dataMapping: {
        accounts: true,
        opportunities: true,
        contacts: true,
      },
    },
  },
  {
    id: "integration_3",
    name: "Cornerstone LMS",
    type: "lms",
    status: "error",
    lastSync: "2025-04-03T10:15:00",
    configuration: {
      apiKey: "********",
      syncFrequency: "daily",
      dataMapping: {
        courses: true,
        completions: true,
        certifications: true,
      },
    },
  },
  {
    id: "integration_4",
    name: "Microsoft Teams",
    type: "communication",
    status: "connected",
    lastSync: "2025-04-04T00:45:00",
    configuration: {
      apiKey: "********",
      syncFrequency: "realtime",
      dataMapping: {
        notifications: true,
        channels: true,
      },
    },
  },
  {
    id: "integration_5",
    name: "Confluence",
    type: "knowledge_base",
    status: "disconnected",
    configuration: {
      apiKey: "",
      syncFrequency: "daily",
      dataMapping: {
        pages: true,
        attachments: false,
      },
    },
  },
];

// Industry templates data
export const industryTemplates = [
  { id: "industry_1", name: "HVAC Services", icon: "fan", agentCount: 5 },
  {
    id: "industry_2",
    name: "Healthcare & Dental",
    icon: "stethoscope",
    agentCount: 7,
  },
  {
    id: "industry_3",
    name: "Retail Sales",
    icon: "shopping-bag",
    agentCount: 6,
  },
  {
    id: "industry_4",
    name: "Contracting & Construction",
    icon: "hard-hat",
    agentCount: 4,
  },
  {
    id: "industry_5",
    name: "Automotive Sales & Service",
    icon: "car",
    agentCount: 5,
  },
  {
    id: "industry_6",
    name: "Fitness & Wellness",
    icon: "activity",
    agentCount: 3,
  },
  {
    id: "industry_7",
    name: "Travel & Hospitality",
    icon: "plane",
    agentCount: 6,
  },
  {
    id: "industry_8",
    name: "Professional Services",
    icon: "briefcase",
    agentCount: 8,
  },
  { id: "industry_9", name: "SaaS & Technology", icon: "code", agentCount: 7 },
  {
    id: "industry_10",
    name: "Financial Services",
    icon: "dollar-sign",
    agentCount: 5,
  },
];

// Pricing plans data
export const pricingPlans = [
  {
    id: "plan_1",
    name: "Starter Team",
    price: 299,
    billingPeriod: "monthly",
    features: [
      "Up to 15 users",
      "5 industry-specific agents",
      "20 AI conversation hours included",
      "Basic analytics and reporting",
      "Email support",
      "14-day free trial",
    ],
    isPopular: false,
  },
  {
    id: "plan_2",
    name: "Growth Team",
    price: 599,
    billingPeriod: "monthly",
    features: [
      "Up to 50 users",
      "10 industry-specific agents",
      "75 AI conversation hours included",
      "Advanced analytics and team insights",
      "Integration with 1 external system",
      "Email and chat support",
      "14-day free trial",
    ],
    isPopular: true,
  },
  {
    id: "plan_3",
    name: "Enterprise Team",
    price: null,
    billingPeriod: "custom",
    features: [
      "Unlimited users",
      "Custom agent development",
      "Volume-based AI conversation hours",
      "Full analytics suite with custom reporting",
      "Multiple system integrations",
      "Dedicated customer success manager",
      "On-premise deployment option",
      "SSO and advanced security",
    ],
    isPopular: false,
  },
];

// FAQs data
export const faqs = [
  {
    question: "How does the AI training system work?",
    answer:
      "Our AI training system uses advanced language models to create interactive, conversational training experiences. Agents are designed to simulate real-world scenarios specific to your industry, provide immediate feedback, and adapt to each employee's learning pace and style.",
  },
  {
    question: "Can I customize the AI agents for my company's specific needs?",
    answer:
      "Absolutely! While we offer pre-configured templates for various industries, you can fully customize the agents to reflect your company's specific processes, products, values, and terminology. Our platform makes it easy to adapt existing templates or create entirely new agents from scratch.",
  },
  {
    question: "How do you measure training effectiveness?",
    answer:
      "Our platform includes comprehensive analytics that track multiple performance indicators, including completion rates, evaluation scores, time-to-proficiency, and improvement over time. We can also integrate with your existing performance metrics to correlate training activities with real-world outcomes.",
  },
  {
    question: "Is my company data secure on your platform?",
    answer:
      "Security is our top priority. We implement enterprise-grade encryption, role-based access controls, and regular security audits. For enterprise customers, we offer on-premise deployment options and custom security configurations. We are compliant with major data protection regulations and can provide detailed information about our security practices.",
  },
  {
    question: "How long does it take to implement the platform?",
    answer:
      "For standard implementations using our pre-built templates, you can be up and running in as little as one day. For custom implementations with integrations and tailored content, typical setup time ranges from 1-3 weeks depending on complexity. Our customer success team will guide you through every step of the process.",
  },
];

// Notifications data
export const notifications = [
  {
    id: "notif_1",
    type: "evaluation_completed",
    title: "Evaluation Completed",
    message:
      "David Martinez has completed the Sales Performance Evaluation with a score of 72%.",
    date: "2025-04-04T09:30:00",
    read: false,
    actionUrl: "/dashboard/evaluation/eval_1",
  },
  {
    id: "notif_2",
    type: "training_milestone",
    title: "Training Milestone",
    message:
      "David Martinez has reached 30% completion in Restaurant Employee Onboarding.",
    date: "2025-04-03T14:15:00",
    read: true,
    actionUrl: "/dashboard/training/training_1",
  },
  {
    id: "notif_3",
    type: "integration_error",
    title: "Integration Error",
    message:
      "Cornerstone LMS integration has encountered an authentication error.",
    date: "2025-04-03T10:20:00",
    read: false,
    actionUrl: "/dashboard/settings/integrations",
  },
  {
    id: "notif_4",
    type: "new_team_member",
    title: "New Team Member",
    message: "Michael Brown has joined the Customer Support team.",
    date: "2025-04-02T15:45:00",
    read: true,
    actionUrl: "/dashboard/team",
  },
  {
    id: "notif_5",
    type: "credit_running_low",
    title: "Credits Running Low",
    message:
      "Your team is down to 10 AI conversation credits for this billing period.",
    date: "2025-04-01T11:10:00",
    read: true,
    actionUrl: "/dashboard/settings/billing",
  },
];

// Helper function to get a random item from an array
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to generate a random ID
export function generateId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 10)}`;
}
