import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  
  checkHealth() {
    return {
      status: 'ok',
      service: 'notifyflow-api',
    };
  }
}

