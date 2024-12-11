import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendMail(
    @Body() body: { to: string; subject: string; content: string },
  ) {
    const { to, subject, content } = body;
    await this.mailService.sendMail(to, subject, content);
    return { message: 'Correo enviado' };
  }
}
