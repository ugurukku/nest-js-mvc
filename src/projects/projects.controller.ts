import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get()
  @Render('projects')
  async findAll(@Param() category?: string) {
    const portfolioItems = await this.projectsService.getAllProjects(category);
    return {
      portfolioItems,
      title: 'Our Portfolio - DevCraft Solutions'
    };

  }

  @Get(':id')
  @Render('project-details')
  async getPortfolioDetail(@Param('id') id: string) {
    const project = await this.projectsService.getProjectById(+id);
    console.log(id);
    console.log(project)
    return {
      project,
    };
  }

}
