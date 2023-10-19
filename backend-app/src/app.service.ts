import { Injectable } from '@nestjs/common';
import { getConnectionInfo } from '../config/db';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    console.log(await getConnectionInfo());
    return 'Hi World!';
  }
  
}

