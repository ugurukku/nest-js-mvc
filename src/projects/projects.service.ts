import { Injectable } from '@nestjs/common';

export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  category: 'web' | 'mobile' | 'cloud' | 'ai' | 'security' | 'data';
  categoryName: string;
  technologies: string[];
  date: string;
  duration: string;
  teamSize: string;
  icon: string;
  features: string[];
  challenge: string;
  solution: string;
  results: Array<{ value: string; label: string }>;
  liveUrl?: string;
  githubUrl?: string;
}

@Injectable()
export class ProjectsService {
  private projects: PortfolioProject[] = [
    {
      id: 1,
      title: 'E-Commerce Platform Revolution',
      description: 'A scalable e-commerce solution built with modern microservices architecture, handling millions of transactions.',
      fullDescription: 'We developed a comprehensive e-commerce platform that revolutionized online retail for our client. The platform features real-time inventory management, advanced analytics, personalized recommendations, and seamless payment processing. Built with a microservices architecture, it can handle massive traffic spikes during sales events.',
      category: 'web',
      categoryName: 'Web Development',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      date: 'March 2024',
      duration: '8 months',
      teamSize: '12 developers',
      icon: '🛒',
      features: [
        'Real-time inventory management across multiple warehouses',
        'AI-powered product recommendations engine',
        'Advanced analytics dashboard with sales insights',
        'Multi-currency and multi-language support',
        'Automated order fulfillment workflow',
        'Mobile-responsive progressive web app',
        'Integrated payment gateway with fraud detection',
        'Customer service chatbot with NLP capabilities'
      ],
      challenge: 'The client needed to replace their legacy monolithic system that couldn\'t handle peak traffic during sales events, leading to crashes and lost revenue. They required a solution that could scale infinitely while maintaining data consistency.',
      solution: 'We implemented a microservices architecture using containerized applications, implemented event-driven communication, added Redis for caching, and used AWS auto-scaling to handle traffic spikes. The result was a system that could handle 100x the original traffic.',
      results: [
        { value: '500%', label: 'Increase in concurrent users' },
        { value: '99.9%', label: 'System uptime achieved' },
        { value: '40%', label: 'Boost in conversion rate' },
        { value: '60%', label: 'Reduction in page load time' }
      ],
      liveUrl: 'https://example-ecommerce.com',
      githubUrl: 'https://github.com/devcraft/ecommerce-platform'
    },
    {
      id: 2,
      title: 'Healthcare Mobile App',
      description: 'HIPAA-compliant mobile application connecting patients with healthcare providers through telemedicine.',
      fullDescription: 'A comprehensive healthcare mobile application that bridges the gap between patients and healthcare providers. The app includes telemedicine capabilities, appointment scheduling, prescription management, and secure messaging. Built with strict adherence to HIPAA compliance and medical data security standards.',
      category: 'mobile',
      categoryName: 'Mobile Apps',
      technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB', 'WebRTC', 'Stripe'],
      date: 'January 2024',
      duration: '6 months',
      teamSize: '8 developers',
      icon: '🏥',
      features: [
        'HIPAA-compliant video consultations with end-to-end encryption',
        'Real-time appointment scheduling and calendar integration',
        'Secure messaging between patients and healthcare providers',
        'Electronic prescription management and pharmacy integration',
        'Medical record storage with blockchain verification',
        'Symptom checker with AI-powered initial assessment',
        'Insurance verification and claims processing',
        'Emergency contact and location services'
      ],
      challenge: 'Creating a secure, HIPAA-compliant platform that could handle sensitive medical data while providing seamless user experience across different devices and ensuring reliable video consultations.',
      solution: 'We implemented end-to-end encryption, used Firebase for real-time communication, integrated WebRTC for video calls, and built a comprehensive audit trail system. All data is encrypted at rest and in transit with multi-factor authentication.',
      results: [
        { value: '50K+', label: 'Active users' },
        { value: '100%', label: 'HIPAA compliance' },
        { value: '95%', label: 'User satisfaction rate' },
        { value: '30%', label: 'Reduction in no-shows' }
      ],
      liveUrl: 'https://healthapp-example.com'
    },
    {
      id: 3,
      title: 'Cloud Migration & DevOps',
      description: 'Complete cloud migration strategy for a Fortune 500 company, reducing infrastructure costs by 60%.',
      fullDescription: 'Led a comprehensive cloud migration project for a Fortune 500 manufacturing company, transitioning their entire infrastructure from on-premises data centers to AWS. The project included containerization of legacy applications, implementation of CI/CD pipelines, and establishment of monitoring and alerting systems.',
      category: 'cloud',
      categoryName: 'Cloud Solutions',
      technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Prometheus', 'Grafana'],
      date: 'November 2023',
      duration: '12 months',
      teamSize: '15 engineers',
      icon: '☁️',
      features: [
        'Complete infrastructure as code using Terraform',
        'Kubernetes orchestration for containerized applications',
        'Automated CI/CD pipelines with zero-downtime deployments',
        'Comprehensive monitoring and alerting system',
        'Auto-scaling infrastructure based on demand',
        'Disaster recovery and backup automation',
        'Security compliance and vulnerability scanning',
        'Cost optimization and resource management'
      ],
      challenge: 'The client had legacy applications running on aging hardware with manual deployment processes, high maintenance costs, and limited scalability. They needed to modernize without disrupting business operations.',
      solution: 'We executed a phased migration approach, containerized applications, implemented infrastructure as code, and established robust CI/CD pipelines. This allowed for gradual migration with minimal downtime and immediate cost savings.',
      results: [
        { value: '60%', label: 'Reduction in infrastructure costs' },
        { value: '99.95%', label: 'System availability' },
        { value: '80%', label: 'Faster deployment cycles' },
        { value: '100%', label: 'Zero-downtime deployments' }
      ]
    },
    {
      id: 4,
      title: 'AI-Powered Analytics Dashboard',
      description: 'Machine learning platform providing predictive analytics and automated insights for business intelligence.',
      fullDescription: 'Developed an advanced analytics platform that uses machine learning to provide predictive insights and automated reporting. The system processes massive datasets in real-time, identifies trends, and generates actionable business intelligence reports with natural language explanations.',
      category: 'ai',
      categoryName: 'AI Integration',
      technologies: ['Python', 'TensorFlow', 'Pandas', 'React', 'PostgreSQL', 'Apache Kafka', 'Docker'],
      date: 'September 2023',
      duration: '10 months',
      teamSize: '10 data scientists',
      icon: '🤖',
      features: [
        'Real-time data processing and analysis',
        'Predictive modeling with 95% accuracy',
        'Natural language report generation',
        'Interactive data visualization dashboards',
        'Anomaly detection and alerting system',
        'Custom machine learning model training',
        'Integration with multiple data sources',
        'Automated insight discovery and recommendations'
      ],
      challenge: 'The client struggled with manual data analysis that took weeks to complete, leading to delayed business decisions. They needed an automated system that could process complex datasets and provide immediate insights.',
      solution: 'We built a machine learning pipeline that automatically processes data, applies predictive models, and generates insights in natural language. The system learns from historical patterns and continuously improves its predictions.',
      results: [
        { value: '95%', label: 'Prediction accuracy' },
        { value: '10x', label: 'Faster insights generation' },
        { value: '300%', label: 'Increase in data processing speed' },
        { value: '85%', label: 'Reduction in manual analysis time' }
      ],
      githubUrl: 'https://github.com/devcraft/ai-analytics'
    },
    {
      id: 5,
      title: 'Financial Trading Platform',
      description: 'High-frequency trading platform with microsecond latency and advanced risk management systems.',
      fullDescription: 'Built a sophisticated financial trading platform capable of executing thousands of trades per second with microsecond latency. The platform includes real-time market data processing, advanced risk management, portfolio optimization, and comprehensive compliance reporting.',
      category: 'web',
      categoryName: 'Web Development',
      technologies: ['C++', 'Python', 'React', 'PostgreSQL', 'Redis', 'Kafka', 'FIX Protocol'],
      date: 'July 2023',
      duration: '14 months',
      teamSize: '20 developers',
      icon: '📈',
      features: [
        'Microsecond latency order execution',
        'Real-time market data processing',
        'Advanced algorithmic trading strategies',
        'Comprehensive risk management system',
        'Portfolio optimization and rebalancing',
        'Regulatory compliance and reporting',
        'Multi-asset class support',
        'Advanced charting and technical analysis tools'
      ],
      challenge: 'Building a system that could handle massive transaction volumes with extremely low latency while maintaining data integrity and regulatory compliance in a highly regulated financial environment.',
      solution: 'We used C++ for the core trading engine to achieve maximum performance, implemented in-memory databases for ultra-fast data access, and built comprehensive monitoring systems to ensure system reliability and compliance.',
      results: [
        { value: '<1ms', label: 'Average trade execution time' },
        { value: '10K+', label: 'Trades per second capacity' },
        { value: '99.999%', label: 'System uptime' },
        { value: '100%', label: 'Regulatory compliance' }
      ]
    },
    {
      id: 6,
      title: 'Smart City IoT Platform',
      description: 'IoT platform managing city infrastructure with real-time monitoring and automated control systems.',
      fullDescription: 'Developed a comprehensive IoT platform for smart city management, integrating thousands of sensors and devices across urban infrastructure. The system provides real-time monitoring, predictive maintenance, energy optimization, and automated control of city services.',
      category: 'cloud',
      categoryName: 'Cloud Solutions',
      technologies: ['Node.js', 'MongoDB', 'MQTT', 'InfluxDB', 'Grafana', 'Docker', 'Kubernetes'],
      date: 'May 2023',
      duration: '18 months',
      teamSize: '25 engineers',
      icon: '🏙️',
      features: [
        'Real-time monitoring of 10,000+ IoT devices',
        'Predictive maintenance algorithms',
        'Energy consumption optimization',
        'Traffic flow management and optimization',
        'Environmental monitoring and alerts',
        'Automated street lighting control',
        'Waste management optimization',
        'Emergency response coordination system'
      ],
      challenge: 'Creating a scalable platform that could handle massive amounts of sensor data from diverse IoT devices while providing real-time insights and automated responses for city management.',
      solution: 'We implemented a microservices architecture with MQTT for device communication, used time-series databases for sensor data, and built machine learning models for predictive analytics and automated decision-making.',
      results: [
        { value: '30%', label: 'Reduction in energy consumption' },
        { value: '50%', label: 'Improvement in traffic flow' },
        { value: '40%', label: 'Faster emergency response' },
        { value: '25%', label: 'Reduction in maintenance costs' }
      ]
    },
    {
      id: 7,
      title: 'Cybersecurity Threat Detection',
      description: 'AI-powered cybersecurity platform providing real-time threat detection and automated response.',
      fullDescription: 'Developed an advanced cybersecurity platform that uses artificial intelligence and machine learning to detect, analyze, and respond to cyber threats in real-time. The system monitors network traffic, analyzes behavior patterns, and automatically implements security measures to protect against various types of cyber attacks.',
      category: 'security',
      categoryName: 'Cybersecurity',
      technologies: ['Python', 'TensorFlow', 'Elasticsearch', 'Kibana', 'Docker', 'Kubernetes', 'SIEM'],
      date: 'April 2023',
      duration: '9 months',
      teamSize: '14 security experts',
      icon: '🔒',
      features: [
        'Real-time network traffic analysis',
        'AI-powered anomaly detection',
        'Automated threat response and mitigation',
        'Advanced malware detection and sandboxing',
        'Behavioral analysis and user profiling',
        'Vulnerability assessment and penetration testing',
        'Incident response and forensics tools',
        'Compliance reporting and audit trails'
      ],
      challenge: 'The client faced increasingly sophisticated cyber attacks that their traditional security tools couldn\'t detect. They needed an intelligent system that could adapt to new threats and respond automatically.',
      solution: 'We built an AI-powered security platform that learns from network behavior, identifies anomalies in real-time, and automatically implements countermeasures. The system continuously evolves to detect new attack patterns.',
      results: [
        { value: '99.5%', label: 'Threat detection accuracy' },
        { value: '80%', label: 'Reduction in false positives' },
        { value: '<1min', label: 'Average response time' },
        { value: '95%', label: 'Automated threat mitigation' }
      ]
    },
    {
      id: 8,
      title: 'Big Data Analytics Platform',
      description: 'Enterprise data warehouse and analytics platform processing petabytes of data for business insights.',
      fullDescription: 'Built a comprehensive big data analytics platform capable of processing and analyzing petabytes of data from multiple sources. The platform provides real-time analytics, machine learning capabilities, and interactive dashboards for enterprise decision-making.',
      category: 'data',
      categoryName: 'Data Analytics',
      technologies: ['Apache Spark', 'Hadoop', 'Kafka', 'Elasticsearch', 'Python', 'Scala', 'Tableau'],
      date: 'February 2023',
      duration: '16 months',
      teamSize: '18 data engineers',
      icon: '📊',
      features: [
        'Petabyte-scale data processing capabilities',
        'Real-time streaming analytics',
        'Machine learning model deployment',
        'Interactive business intelligence dashboards',
        'Data lake architecture with multiple formats',
        'Automated data quality monitoring',
        'Self-service analytics for business users',
        'Advanced data visualization and reporting'
      ],
      challenge: 'The enterprise had data scattered across multiple systems with no unified view. They needed to process massive amounts of data quickly while ensuring data quality and providing insights to business users.',
      solution: 'We implemented a modern data lake architecture using Apache Spark for processing, Kafka for streaming, and built self-service analytics tools that allow business users to explore data independently.',
      results: [
        { value: '1000x', label: 'Faster data processing' },
        { value: '90%', label: 'Improvement in data quality' },
        { value: '70%', label: 'Reduction in time to insights' },
        { value: '300%', label: 'Increase in data utilization' }
      ]
    }
  ];

  getAllProjects(): PortfolioProject[] {
    return this.projects;
  }

  getProjectById(id: number): PortfolioProject | undefined {
    return this.projects.find(project => project.id === id);
  }

  getProjectsByCategory(category: string): PortfolioProject[] {
    if (category === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === category);
  }

  getFeaturedProjects(limit: number = 3): PortfolioProject[] {
    return this.projects.slice(0, limit);
  }

  getRecentProjects(limit: number = 4): PortfolioProject[] {
    return this.projects
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  getTechnologies(): string[] {
    const allTechnologies = this.projects.flatMap(project => project.technologies);
    return [...new Set(allTechnologies)].sort();
  }

  getCategories(): Array<{ key: string; name: string; count: number }> {
    const categoryCount = this.projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCount).map(([key, count]) => ({
      key,
      name: this.projects.find(p => p.category === key)?.categoryName || key,
      count
    }));
  }
}