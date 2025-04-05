import { 
    Bot, 
    FileText, 
    BarChart3, 
    Brain, 
    Shield, 
    Users,
    Zap,
    Layers
  } from "lucide-react";
  
  export function Features() {
    const features = [
      {
        icon: <Bot className="h-8 w-8 text-primary" />,
        title: "Industry-Specific AI Agents",
        description: "Pre-configured AI agents designed for your specific industry needs, from sales to HVAC service to healthcare."
      },
      {
        icon: <FileText className="h-8 w-8 text-primary" />,
        title: "Personalized Evaluations",
        description: "Assess skills and knowledge through realistic AI-driven conversations and simulations tailored to each role."
      },
      {
        icon: <BarChart3 className="h-8 w-8 text-primary" />,
        title: "Comprehensive Analytics",
        description: "Track performance metrics, improvement trends, and training ROI with detailed dashboards and reports."
      },
      {
        icon: <Brain className="h-8 w-8 text-primary" />,
        title: "Adaptive Learning Paths",
        description: "AI creates personalized training journeys based on evaluation results and learning progress."
      },
      {
        icon: <Shield className="h-8 w-8 text-primary" />,
        title: "Enterprise Security",
        description: "SOC 2 compliant with role-based access controls, data encryption, and optional on-premise deployment."
      },
      {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "Team Performance Insights",
        description: "Identify team-wide skill gaps and strengths with aggregated performance data and benchmarking."
      },
      {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "Quick Prep Sessions",
        description: "Just-in-time training for specific scenarios or product updates when your team needs it most."
      },
      {
        icon: <Layers className="h-8 w-8 text-primary" />,
        title: "Seamless Integrations",
        description: "Connect with your existing HRIS, LMS, and CRM systems for unified data and workflows."
      }
    ];
  
    return (
      <section className="py-20 bg-background" id="features">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Powerful Features for Every Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines advanced AI with industry expertise to create a comprehensive talent development solution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-muted/50 p-6 rounded-lg">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  