import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  getHello(): string {
    return 'Hello World!';
  }

  bill(data) {
    console.log('recieved data:', data);
    this.logger.log('Billing...', data);
  }
}
