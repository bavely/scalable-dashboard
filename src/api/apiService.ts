import axios from 'axios';
import type { User } from '../types';

class APIService {
  private static instance: APIService;
  private base = import.meta.env.VITE_API_URL || "";
  

  private constructor() {}

  static getInstance() {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  async fetchUsers(): Promise<User[]> {
    try {
      if (!this.base) {
        throw new Error("API URL is not set");
      }
      const resp = await axios.get<User[]>(`${this.base}/users`, {
        timeout: 5000,
      });
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
