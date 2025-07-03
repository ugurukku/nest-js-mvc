import { Injectable } from '@nestjs/common';
import { Category, Client, ProjectStatus } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

export interface PortfolioProject {
  id: number;
  title: string;
  description: string | null;
  status: ProjectStatus;
  budget: number | null;
  startDate: Date | null;
  endDate: Date | null;
  duration: string | null;
  technologies: string[];
  progress: number | null;
  clientId: number | null;
  categoryId: number | null;
  createdAt: Date;
  updatedAt: Date;
  category?: Category;
  client?: Client;
}

@Injectable()
export class ProjectsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async getAllProjects(category?: string): Promise<PortfolioProject[]> {
    if(category){
    return await this.databaseService.project.findMany({
      where:{
        categoryId: +category
      }
    });  
    }
    return await this.databaseService.project.findMany();
  }

  async getProjectById(id: number): Promise<PortfolioProject> {
    const project = await this.databaseService.project.findUnique(
      {
        where: {
          id,
        }
      }
    );

    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }

    return project;
  }

  async getProjectsByCategory(category: string): Promise<PortfolioProject[]> {
    return await this.databaseService.project.findMany({
      where: {
        categoryId: +category,
      }
    });
  }



}