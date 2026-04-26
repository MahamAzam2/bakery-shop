import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async submitContactForm(@Body() contactData: any) {
    // In a real application, you would:
    // 1. Validate the contact data
    // 2. Send an email notification
    // 3. Store the message in the database
    // 4. Return a success response
    
    return this.contactService.handleContactSubmission(contactData);
  }
}