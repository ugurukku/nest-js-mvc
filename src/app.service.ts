import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { CreateContactDto } from './admin/dto/create-contact.dto';

@Injectable()
export class AppService {
  constructor(private readonly prisma: DatabaseService) { }
  getHello(): string {
    return 'Hello World!';
  }

  async createContact(createContactDto: CreateContactDto) {
    try {
      const contact = await this.prisma.contact.create({
        data: {
          name: createContactDto.name,
          email: createContactDto.email,
          message: createContactDto.message,
          status: 'new'
        }
      });
      return contact;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw new Error('Failed to create contact');
    }
  }

}
