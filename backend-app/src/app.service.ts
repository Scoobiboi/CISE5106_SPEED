import { Injectable } from '@nestjs/common';
import { getConnectionInfo } from '../config/db';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(getConnectionInfo());
    return 'Die World!';
  }
}
