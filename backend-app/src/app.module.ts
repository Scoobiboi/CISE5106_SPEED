
import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoService {
  private client: MongoClient;

  async connectClient(): Promise<string> {
    if (!this.client) {
      try {
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=AtlasApp`;
        this.client = new MongoClient(uri);
        await this.client.connect();
        return 'connected';
      } catch (error) {
        console.error('MongoDB connection error:', error);
        return 'disconnected';
      }
    } else {
      return 'already connected';
    }
  }

  async closeConnection() {
    if (this.client) {
      await this.client.close();
      this.client = undefined;
    }
  }

  getConnectionInfo() {
    return this.connectClient();
  }
}
