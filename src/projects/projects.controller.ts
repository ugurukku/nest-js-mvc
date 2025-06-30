import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get()
  @Render('projects')
  findAll() {
    const portfolioItems = this.projectsService.getAllProjects();
    return {
      portfolioItems,
      title: 'Our Portfolio - DevCraft Solutions'
    };

  }

  @Get(':id')
  @Render('project-details')
  getPortfolioDetail(@Param('id') id: string) {
    const project = this.projectsService.getProjectById(+id);
    if (project)
      return {
        project,
        title: `${project.title} - DevCraft Solutions`
      };
  }

}
