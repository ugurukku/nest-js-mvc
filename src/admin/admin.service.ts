import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {

  async createProject(projectData: any) {
    // Create project logic
    return {
      id: Date.now(),
      ...projectData,
      createdAt: new Date()
    };
  }

  async getProject(id: string) {
    // Get project by ID
    return {
      id,
      title: 'Sample Project',
      client: 'Sample Client',
      category: 'web',
      categoryName: 'Web Development',
      description: 'A sample project description',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      status: 'active',
      progress: 50,
      startDate: new Date(),
      duration: '3 months',
      teamSize: 5
    };
  }

  async archiveContact(id: string) {
    // Archive contact logic
    console.log(`Archiving contact ${id}`);
    return true;
  }

  async exportContacts() {
    // Generate CSV export
    const contacts = await this.getAllContacts();

    // Convert to CSV format
    const headers = ['Name', 'Email', 'Message', 'Date', 'Status'];
    const rows = contacts.map(contact => [
      contact.name,
      contact.email,
      contact.message,
      contact.date,
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

  private async getAllContacts() {
    // In a real app, this would fetch from database
    return [
      {
        name: 'John Smith',
        email: 'john@company.com',
        message: 'Interested in web development services',
        date: 'Jun 29, 2025',
        status: 'new'
      }
    ];
  }

}
