import axios from 'axios';
import type { User } from '../types';

class APIService {
  private static instance: APIService;
  private base = 'https://jsonplaceholder.typicode.com';

  private constructor() {}

  static getInstance() {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  async fetchUsers(): Promise<User[]> {
    try {
      const resp = await axios.get<User[]>(`${this.base}/users`, {
        timeout: 5000,
      });
      console.log(resp.data);
      return resp.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
      throw new Error('Failed to fetch users');
    }
  }
}

export const apiService = APIService.getInstance();
