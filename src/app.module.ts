import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ProjectsModule } from './projects/projects.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [UsersModule, DatabaseModule, EmployeesModule, ProjectsModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
