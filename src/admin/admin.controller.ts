import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Query, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';
import { Response } from 'express' 
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ContactStatus } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get()
  @Render('admin-dashboard')
  async getDashboard() {
    const stats = await this.adminService.getDashboardStats();
    const recentProjects = await this.adminService.getRecentProjects();
    const recentContacts = await this.adminService.getRecentContacts();

    return {
      user: { name: 'Admin User' },
      stats,
      recentProjects,
      recentContacts,
      chartData: await this.adminService.getChartData()
    };
  }

  @Get('projects')
  @Render('admin-projects')
  async getProjects(@Query('page') page: string = '1', @Query('status') status?: string) {
    const projects = await this.adminService.getProjects({
      page: parseInt(page),
      status,
      limit: 10
    });

    return {
      projects: projects.data,
      pagination: projects.pagination,
      currentStatus: status,
      user: { name: 'Admin User' }
    };
  }

  @Post('projects')
  async createProject(@Body() createProjectDto: CreateProjectDto, @Res() res: Response) {
    await this.adminService.createProject(createProjectDto);
    res.redirect('/admin/projects?success=Project created successfully');
  }

  @Get('projects/:id')
  @Render('admin-project-detail')
  async getProjectDetail(@Param('id') id: string) {
    const project = await this.adminService.getProjectById(id);
    return {
      project,
      user: { name: 'Admin User' }
    };
  }

  @Patch('projects/:id')
  async updateProject(@Param('id') id: string, @Body() updateData: any, @Res() res: Response) {
    await this.adminService.updateProject(id, updateData);
    res.redirect(`/admin/projects/${id}?success=Project updated successfully`);
  }

  @Delete('projects/:id')
  async deleteProject(@Param('id') id: string, @Res() res: Response) {
    await this.adminService.deleteProject(id);
    res.redirect('/admin/projects?success=Project deleted successfully');
  }

  @Get('team')
  @Render('admin-team-management')
  async getTeam(@Query('page') page: string = '1', @Query('role') role?: string) {
    const employees = await this.adminService.getEmployees({
      page: parseInt(page),
      role,
      limit: 10
    });

    return {
      employees: employees.data,
      pagination: employees.pagination,
      currentRole: role,
      user: { name: 'Admin User' }
    };
  }

  @Post('team')
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto, @Res() res: Response) {
    await this.adminService.createEmployee(createEmployeeDto);
    res.redirect('/admin/team?success=Employee added successfully');
  }

  @Get('team/:id')
  @Render('admin-employee-detail')
  async getEmployeeDetail(@Param('id') id: string) {
    const employee = await this.adminService.getEmployeeById(id);
    return {
      employee,
      user: { name: 'Admin User' }
    };
  }

  @Patch('team/:id')
  async updateEmployee(@Param('id') id: string, @Body() updateData: any, @Res() res: Response) {
    await this.adminService.updateEmployee(id, updateData);
    res.redirect(`/admin/team/${id}?success=Employee updated successfully`);
  }

  @Delete('team/:id')
  async deleteEmployee(@Param('id') id: string, @Res() res: Response) {
    await this.adminService.deleteEmployee(id);
    res.redirect('/admin/team?success=Employee removed successfully');
  }

  @Get('contacts')
  @Render('admin-contacts')
  async getContacts(@Query('page') page: string = '1', @Query('status') status?: string) {
    const contacts = await this.adminService.getContacts({
      page: parseInt(page),
      status,
      limit: 10
    });

    return {
      contacts: contacts.data,
      pagination: contacts.pagination,
      currentStatus: status,
      user: { name: 'Admin User' }
    };
  }

  @Patch('contacts/:id/status')
  async updateContactStatus(@Param('id') id: string, @Body('status') status: string, @Res() res: Response) {
    await this.adminService.updateContactStatus(id, status as ContactStatus);
    res.redirect('/admin/contacts?success=Contact status updated');
  }

  @Delete('contacts/:id')
  async archiveContact(@Param('id') id: string, @Res() res: Response) {
    await this.adminService.archiveContact(id);
    res.redirect('/admin/contacts?success=Contact archived');
  }

  @Get('contacts/export')
  async exportContacts(@Res() res: Response) {
    const exportData = await this.adminService.exportContacts();

    res.setHeader('Content-Type', exportData.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${exportData.filename}"`);
    res.send(exportData.content);
  }

  // Analytics
  @Get('analytics')
  @Render('admin-analytics')
  async getAnalytics(@Query('period') period: string = '30d') {
    const analytics = await this.adminService.getAnalytics(period);

    return {
      analytics,
      currentPeriod: period,
      user: { name: 'Admin User' }
    };
  }

  // Settings
  @Get('settings')
  @Render('admin-settings')
  async getSettings() {
    const settings = await this.adminService.getSettings();

    return {
      settings,
      user: { name: 'Admin User' }
    };
  }

  @Post('settings')
  async updateSettings(@Body() settingsData: any, @Res() res: Response) {
    await this.adminService.updateSettings(settingsData);
    res.redirect('/admin/settings?success=Settings updated successfully');
  }

}
