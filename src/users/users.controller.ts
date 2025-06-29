import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.usersService.findById(+id)
    }

    @Post()
    save(@Body() user: { name: string; email: string; role: "admin" | "user" | "moderator"; }) {
        return this.usersService.save(user)
    }

}
