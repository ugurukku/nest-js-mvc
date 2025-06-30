import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin-dashboard')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get()
  @Render('admin-dashboard')
  async getDashboard() {
    return {
      user: { name: 'Admin User' },
      stats: {
        totalProjects: 42,
        completedProjects: 38,
        pendingContacts: 15,
        monthlyRevenue: 125
      },
      recentProjects: [
        {
          id: 1,
          title: 'HealthTech Platform',
          client: 'MediCare Solutions',
          categoryName: 'Web Development',
          status: 'active',
          statusLabel: 'In Progress',
          progress: 75
        },
        {
          id: 2,
          title: 'E-Commerce Mobile App',
          client: 'ShopSmart Inc.',
          categoryName: 'Mobile Apps',
          status: 'completed',
          statusLabel: 'Completed',
          progress: 100
        },
        {
          id: 3,
          title: 'AI Customer Service',
          client: 'TechCorp',
          categoryName: 'AI Integration',
          status: 'active',
          statusLabel: 'In Progress',
          progress: 45
        },
        {
          id: 4,
          title: 'Cloud Migration',
          client: 'DataFlow Systems',
          categoryName: 'Cloud Solutions',
          status: 'pending',
          statusLabel: 'Planning',
          progress: 10
        }
      ],
      recentContacts: [
        {
          id: 1,
          name: 'John Smith',
          email: 'john@company.com',
          message: 'Interested in web development services for our new startup project',
          date: 'Jun 29, 2025',
          status: 'new',
          statusLabel: 'New'
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah@startup.io',
          message: 'Looking for mobile app development team for iOS and Android',
          date: 'Jun 28, 2025',
          status: 'replied',
          statusLabel: 'Replied'
        },
        {
          id: 3,
          name: 'Mike Davis',
          email: 'mike@enterprise.com',
          message: 'Need consultation for cloud migration from on-premise servers',
          date: 'Jun 27, 2025',
          status: 'converted',
          statusLabel: 'Converted'
        }
      ],
      chartData: {
        projectStatus: {
          labels: ['Completed', 'In Progress', 'Planning'],
          data: [38, 12, 4]
        },
        revenue: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          data: [85, 92, 78, 95, 110, 125]
        }
      }
    };
  }
}
