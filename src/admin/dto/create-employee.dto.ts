import { Role } from '@prisma/client';

export class CreateEmployeeDto {
    name: string;

    email: string;

    role: Role;
}