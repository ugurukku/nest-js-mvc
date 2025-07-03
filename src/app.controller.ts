import { Body, Controller, Get, HttpStatus, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateContactDto } from './admin/dto/create-contact.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };;
  }

  @Post('contact')
  async submitContact(@Body() createContactDto: CreateContactDto, @Res() res: Response) {
    try {
      // Log the received data for debugging
      console.log('Received contact form data:', createContactDto);

      await this.appService.createContact(createContactDto);

      // Return success response for AJAX calls
      if (res.req.headers['content-type']?.includes('application/json')) {
        return res.status(HttpStatus.CREATED).json({
          success: true,
          message: 'Thank you for your message! We will get back to you soon.'
        });
      }

      // Redirect for form submissions
      res.redirect('/?success=Thank you for your message! We will get back to you soon.');
    } catch (error) {
      console.error('Error creating contact:', error);

      // Return error response for AJAX calls
      if (res.req.headers['content-type']?.includes('application/json')) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Sorry, there was an error sending your message. Please try again.'
        });
      }

      // Redirect with error for form submissions
      res.redirect('/?error=Sorry, there was an error sending your message. Please try again.');
    }
  }

}
