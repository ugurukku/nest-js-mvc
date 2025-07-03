import { Injectable } from '@nestjs/common';
import { ContactStatus, ProjectStatus, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: DatabaseService) { }

  async getDashboardStats() {
    const [totalProjects, completedProjects, pendingContacts, totalEmployees] = await Promise.all([
      this.prisma.project.count(),
      this.prisma.project.count({ where: { status: 'completed' } }),
      this.prisma.contact.count({ where: { status: 'new' } }),
      this.prisma.employee.count()
    ]);

    const monthlyRevenue = await this.getMonthlyRevenue();

    return {
      totalProjects,
      completedProjects,
      pendingContacts,
      totalEmployees,
      monthlyRevenue
    };
  }

  async getRecentProjects(limit = 5) {
    return await this.prisma.project.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        client: true,
        category: true
      }
    });
  }

  async getRecentContacts(limit = 5) {
    return await this.prisma.contact.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' }
    });
  }

  async getChartData() {
    const projectStatusData = await this.prisma.project.groupBy({
      by: ['status'],
      _count: { status: true }
    });

    const revenueData = await this.getRevenueData();

    return {
      projectStatus: {
        labels: projectStatusData.map(item => item.status),
        data: projectStatusData.map(item => item._count.status)
      },
      revenue: revenueData
    };
  }

  // Projects Management
  async getProjects(options: { page: number; status?: string; limit: number }) {
    const { page, status, limit } = options;
    const skip = (page - 1) * limit;

    const where = status ? {status: status as ProjectStatus} : {};

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          client: true,
          category: true,
          _count: { select: { tasks: true } }
        }
      }),
      this.prisma.project.count({ where })
    ]);

    return {
      data: projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async createProject(createProjectDto: CreateProjectDto) {
    // Handle technologies array - if it's a string, split it
    let technologies: string[] = [];
    if (createProjectDto.technologies) {
      if (Array.isArray(createProjectDto.technologies)) {
        technologies = createProjectDto.technologies;
      } else if (typeof createProjectDto.technologies === 'string') {
        technologies = (createProjectDto.technologies as string)
          .split(',')
          .map(tech => tech.trim())
          .filter(tech => tech.length > 0);
      }
    }

    const projectData = {
      title: createProjectDto.title,
      description: createProjectDto.description,
      budget: createProjectDto.budget,
      startDate: createProjectDto.startDate ? new Date(createProjectDto.startDate) : null,
      endDate: createProjectDto.endDate ? new Date(createProjectDto.endDate) : null,
      duration: createProjectDto.duration,
      technologies,
      clientId: createProjectDto.clientId,
      categoryId: createProjectDto.categoryId,
      status: 'planning' as ProjectStatus,
      progress: 0
    };

    return await this.prisma.project.create({
      data: projectData
    });
  }

  async getProjectById(id: string) {
    return await this.prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: {
        client: true,
        category: true,
        tasks: {
          orderBy: { createdAt: 'desc' }
        },
        team: {
          include: {
            employee: true
          }
        }
      }
    });
  }

  async updateProject(id: string, updateData: any) {
    return await this.prisma.project.update({
      where: { id: parseInt(id) },
      data: updateData
    });
  }

  async deleteProject(id: string) {
    return await this.prisma.project.delete({
      where: { id: parseInt(id) }
    });
  }

  // Team Management
  async getEmployees(options: { page: number; role?: string; limit: number }) {
    const { page, role, limit } = options;
    const skip = (page - 1) * limit;

    const where = role ? { role: role as Role } : {};

    const [employees, total] = await Promise.all([
      this.prisma.employee.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: {
              projectTeam: true
            }
          }
        }
      }),
      this.prisma.employee.count({ where })
    ]);

    return {
      data: employees,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    return await this.prisma.employee.create({
      data: createEmployeeDto
    });
  }

  async getEmployeeById(id: string) {
    return await this.prisma.employee.findUnique({
      where: { id: parseInt(id) },
      include: {
        projectTeam: {
          include: {
            project: true
          }
        }
      }
    });
  }

  async updateEmployee(id: string, updateData: any) {
    return await this.prisma.employee.update({
      where: { id: parseInt(id) },
      data: updateData
    });
  }

  async deleteEmployee(id: string) {
    return await this.prisma.employee.delete({
      where: { id: parseInt(id) }
    });
  }

  // Contacts Management
  async getContacts(options: { page: number; status?: string; limit: number }) {
    const { page, status, limit } = options;
    const skip = (page - 1) * limit;

    const where = status ? { status: status as ContactStatus } : {};

    const [contacts, total] = await Promise.all([
      this.prisma.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.contact.count({ where })
    ]);

    return {
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async updateContactStatus(id: string, status: ContactStatus) {
    return await this.prisma.contact.update({
      where: { id: parseInt(id) },
      data: { status }
    });
  }

  async archiveContact(id: string) {
    return await this.prisma.contact.update({
      where: { id: parseInt(id) },
      data: { status: 'archived' }
    });
  }

  async exportContacts() {
    const contacts = await this.prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const headers = ['Name', 'Email', 'Subject', 'Message', 'Date', 'Status'];
    const rows = contacts.map(contact => [
      contact.name,
      contact.email,
      contact.subject || '',
      contact.message,
      contact.createdAt.toISOString().split('T')[0],
      contact.status
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return {
      filename: `contacts-${new Date().toISOString().split('T')[0]}.csv`,
      content: csv,
      contentType: 'text/csv'
    };
  }

  // Analytics
  async getAnalytics(period: string) {
    const days = this.getPeriodDays(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [projectStats, contactStats, revenueStats] = await Promise.all([
      this.getProjectAnalytics(startDate),
      this.getContactAnalytics(startDate),
      this.getRevenueAnalytics(startDate)
    ]);

    return {
      projects: projectStats,
      contacts: contactStats,
      revenue: revenueStats,
      period
    };
  }

  // Settings
  async getSettings() {
    return await this.prisma.setting.findMany();
  }

  async updateSettings(settingsData: any) {
    // Update or create settings
    const updates = Object.entries(settingsData).map(([key, value]) =>
      this.prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) }
      })
    );

    return await Promise.all(updates);
  }

  // Private helper methods
  private async getMonthlyRevenue(): Promise<number> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const result = await this.prisma.project.aggregate({
      where: {
        createdAt: { gte: startOfMonth },
        status: 'completed'
      },
      _sum: { budget: true }
    });

    return Math.round((result._sum.budget || 0) / 1000);
  }

  private async getRevenueData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = await Promise.all(
      months.map(async (month, index) => {
        const start = new Date(2025, index, 1);
        const end = new Date(2025, index + 1, 0);

        const result = await this.prisma.project.aggregate({
          where: {
            createdAt: { gte: start, lte: end },
            status: 'completed'
          },
          _sum: { budget: true }
        });

        return Math.round((result._sum.budget || 0) / 1000);
      })
    );

    return { labels: months, data };
  }

  private getPeriodDays(period: string): number {
    switch (period) {
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      case '365d': return 365;
      default: return 30;
    }
  }

  private async getProjectAnalytics(startDate: Date) {
    const [total, completed, inProgress] = await Promise.all([
      this.prisma.project.count({ where: { createdAt: { gte: startDate } } }),
      this.prisma.project.count({ where: { createdAt: { gte: startDate }, status: 'completed' } }),
      this.prisma.project.count({ where: { createdAt: { gte: startDate }, status: 'active' } })
    ]);

    return { total, completed, inProgress };
  }

  private async getContactAnalytics(startDate: Date) {
    const [total, new_, replied, converted] = await Promise.all([
      this.prisma.contact.count({ where: { createdAt: { gte: startDate } } }),
      this.prisma.contact.count({ where: { createdAt: { gte: startDate }, status: 'new' } }),
      this.prisma.contact.count({ where: { createdAt: { gte: startDate }, status: 'replied' } }),
      this.prisma.contact.count({ where: { createdAt: { gte: startDate }, status: 'converted' } })
    ]);

    return { total, new: new_, replied, converted };
  }

  private async getRevenueAnalytics(startDate: Date) {
    const result = await this.prisma.project.aggregate({
      where: {
        createdAt: { gte: startDate },
        status: 'completed'
      },
      _sum: { budget: true }
    });

    return { total: result._sum.budget || 0 };
  }

}
